from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.services.ai_coach import analyze_code_with_memory

router = APIRouter(prefix="/submissions", tags=["Submissions"])

class CodeSubmissionRequest(BaseModel):
    user_id: str
    submission_id: str
    code_snippet: str
    language: str

@router.post("/review")
def review_submission(payload: CodeSubmissionRequest):
    try:
        result = analyze_code_with_memory(
            user_id=payload.user_id,
            submission_id=payload.submission_id,
            code_snippet=payload.code_snippet,
            language=payload.language
        )
        return result
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc)
        )