import asyncio
import tempfile
import os
import time
from typing import Dict, List

# Language → Docker image mapping
LANGUAGE_IMAGES: Dict[str, str] = {
    "javascript": "devpractice-runner-node",
    "python": "devpractice-runner-python",
    "java": "devpractice-runner-java",
}

# Language → file extension mapping
LANGUAGE_EXTENSIONS: Dict[str, str] = {
    "javascript": "js",
    "python": "py",
    "java": "java",
}

# Language → run command template
LANGUAGE_COMMANDS: Dict[str, str] = {
    "javascript": "node /sandbox/solution.js",
    "python": "python3 /sandbox/solution.py",
    "java": "cd /sandbox && javac Solution.java && java Solution",
}

# Execution limits
TIMEOUT_SECONDS = 10
MEMORY_LIMIT = "128m"
CPU_LIMIT = "0.5"


async def run_code(tmpdir: str, image: str, cmd: str, stdin_input: str = "") -> dict:
    """Run code in a Docker container with optional stdin input."""
    docker_cmd = (
        f"docker run --rm -i "
        f"--memory={MEMORY_LIMIT} "
        f"--cpus={CPU_LIMIT} "
        f"--network=none "
        f"--read-only "
        f"-v {tmpdir}:/sandbox:ro "
        f"{image} "
        f"sh -c '{cmd}'"
    )

    start_time = time.time()
    try:
        proc = await asyncio.create_subprocess_shell(
            docker_cmd,
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, stderr = await asyncio.wait_for(
            proc.communicate(input=stdin_input.encode() if stdin_input else None),
            timeout=TIMEOUT_SECONDS,
        )
        duration = time.time() - start_time

        return {
            "stdout": stdout.decode("utf-8", errors="replace").strip(),
            "stderr": stderr.decode("utf-8", errors="replace").strip(),
            "exitCode": proc.returncode,
            "duration": round(duration, 3),
        }

    except asyncio.TimeoutError:
        duration = time.time() - start_time
        return {
            "stdout": "",
            "stderr": "Execution timed out",
            "exitCode": 124,
            "duration": round(duration, 3),
            "error": "Time limit exceeded",
        }
    except Exception as e:
        duration = time.time() - start_time
        return {
            "stdout": "",
            "stderr": str(e),
            "exitCode": 1,
            "duration": round(duration, 3),
            "error": str(e),
        }


async def evaluate_code(
    submission_id: str,
    language: str,
    code: str,
    problem_id: str,
    test_cases: List[dict] = None,
) -> dict:
    """
    Run user code inside a sandboxed Docker container.
    If test cases are provided, run each one and compare output.
    Otherwise, just run the code and check exit code.
    """
    if language not in LANGUAGE_IMAGES:
        return {
            "submissionId": submission_id,
            "stdout": "",
            "stderr": f"Unsupported language: {language}",
            "exitCode": 1,
            "duration": 0,
            "passed": False,
            "totalTests": 0,
            "passedTests": 0,
            "testResults": [],
            "error": f"Unsupported language: {language}",
        }

    image = LANGUAGE_IMAGES[language]
    ext = LANGUAGE_EXTENSIONS[language]
    cmd = LANGUAGE_COMMANDS[language]

    # Write code to a temp file
    with tempfile.TemporaryDirectory() as tmpdir:
        filename = f"solution.{ext}" if language != "java" else "Solution.java"
        filepath = os.path.join(tmpdir, filename)
        with open(filepath, "w") as f:
            f.write(code)

        # If no test cases, just run and check exit code
        if not test_cases:
            result = await run_code(tmpdir, image, cmd)
            return {
                "submissionId": submission_id,
                "stdout": result["stdout"],
                "stderr": result["stderr"],
                "exitCode": result["exitCode"],
                "duration": result["duration"],
                "passed": result["exitCode"] == 0,
                "totalTests": 0,
                "passedTests": 0,
                "testResults": [],
                "error": result.get("error"),
            }

        # Run against each test case
        test_results = []
        total_duration = 0
        all_passed = True
        last_stderr = ""

        for tc in test_cases:
            tc_input = tc.get("input", "")
            expected = tc.get("expectedOutput", "").strip()

            result = await run_code(tmpdir, image, cmd, stdin_input=tc_input)
            total_duration += result["duration"]
            actual = result["stdout"].strip()

            # Compare output (normalize whitespace)
            passed = actual == expected

            if not passed:
                all_passed = False

            if result.get("stderr"):
                last_stderr = result["stderr"]

            # If code crashed, mark failed and stop
            if result["exitCode"] != 0 and result["exitCode"] != 124:
                test_results.append({
                    "input": tc_input,
                    "expectedOutput": expected,
                    "actualOutput": result.get("stderr", result["stdout"]),
                    "passed": False,
                })
                all_passed = False
                break

            test_results.append({
                "input": tc_input,
                "expectedOutput": expected,
                "actualOutput": actual,
                "passed": passed,
            })

        passed_count = sum(1 for r in test_results if r["passed"])

        return {
            "submissionId": submission_id,
            "stdout": test_results[-1]["actualOutput"] if test_results else "",
            "stderr": last_stderr,
            "exitCode": 0 if all_passed else 1,
            "duration": round(total_duration, 3),
            "passed": all_passed,
            "totalTests": len(test_cases),
            "passedTests": passed_count,
            "testResults": test_results,
            "error": None if all_passed else f"Failed {len(test_cases) - passed_count}/{len(test_cases)} test cases",
        }
