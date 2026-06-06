from fastapi import APIRouter, HTTPException
from app.schemas import EvaluationRequest, EvaluationResponse
from app.evaluator import evaluate_code

router = APIRouter()


@router.post("/evaluate", response_model=EvaluationResponse)
async def evaluate(request: EvaluationRequest):
    """
    Receives a code submission, runs it in a sandboxed Docker container,
    and returns the execution result with test case comparison.
    """
    try:
        # Convert test cases to list of dicts
        test_cases = [tc.model_dump() for tc in request.testCases] if request.testCases else None

        result = await evaluate_code(
            submission_id=request.submissionId,
            language=request.language,
            code=request.code,
            problem_id=request.problemId,
            test_cases=test_cases,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
