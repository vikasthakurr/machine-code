from pydantic import BaseModel
from typing import Optional, List


class TestCase(BaseModel):
    input: str = ""
    expectedOutput: str = ""


class EvaluationRequest(BaseModel):
    submissionId: str
    language: str
    code: str
    problemId: str
    testCases: List[TestCase] = []


class TestCaseResult(BaseModel):
    input: str
    expectedOutput: str
    actualOutput: str
    passed: bool


class EvaluationResponse(BaseModel):
    submissionId: str
    stdout: str = ""
    stderr: str = ""
    exitCode: int = 0
    duration: float = 0.0
    passed: bool = False
    totalTests: int = 0
    passedTests: int = 0
    testResults: List[TestCaseResult] = []
    error: Optional[str] = None
