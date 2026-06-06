import { env } from "./config/env.js";
import { Execution } from "./models/execution.model.js";
import { Notification } from "./models/notification.model.js";
import { Problem } from "./models/problem.model.js";
import { Submission } from "./models/submission.model.js";

/**
 * Process a submission job:
 * 1. Mark submission as "running"
 * 2. Fetch test cases from the problem
 * 3. Call the evaluation service with test cases
 * 4. Store execution result
 * 5. Update submission status
 * 6. Create notification for user
 */
export async function processSubmission(job) {
  const { submissionId } = job.data;

  const submission = await Submission.findById(submissionId);
  if (!submission) throw new Error(`Submission ${submissionId} not found`);

  // Mark as running
  submission.status = "running";
  await submission.save();

  try {
    // Fetch the problem's test cases
    const problem = await Problem.findById(submission.problemId).select(
      "testCases",
    );
    const testCases = problem?.testCases || [];

    // Call evaluation service with test cases
    const response = await fetch(`${env.EVALUATION_SERVICE_URL}/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: submission._id.toString(),
        language: submission.language,
        code: submission.code,
        problemId: submission.problemId.toString(),
        testCases: testCases.map((tc) => ({
          input: tc.input || "",
          expectedOutput: tc.expectedOutput || "",
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Evaluation service returned ${response.status}`);
    }

    const result = await response.json();

    // Store execution result
    await Execution.create({
      submissionId: submission._id,
      stdout: result.stdout || "",
      stderr: result.stderr || "",
      exitCode: result.exitCode ?? 1,
      duration: result.duration || 0,
      passed: result.passed || false,
      totalTests: result.totalTests || 0,
      passedTests: result.passedTests || 0,
      testResults: result.testResults || [],
    });

    // Update submission status
    submission.status = result.passed ? "accepted" : "rejected";
    submission.result = {
      passed: result.passed,
      totalTests: result.totalTests,
      passedTests: result.passedTests,
      duration: result.duration,
    };
    await submission.save();

    // Notify user
    const msg = result.passed
      ? "Your submission was accepted! All test cases passed."
      : `Your submission was rejected. Passed ${result.passedTests}/${result.totalTests} test cases.`;

    await Notification.create({
      userId: submission.userId,
      type: "submission_result",
      message: msg,
    });

    return { status: submission.status };
  } catch (err) {
    submission.status = "error";
    submission.result = { error: err.message };
    await submission.save();

    await Notification.create({
      userId: submission.userId,
      type: "submission_error",
      message: `Your submission encountered an error: ${err.message}`,
    });

    throw err;
  }
}
