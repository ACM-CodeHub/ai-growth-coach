from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.services.ai_coach import analyze_code_with_memory
from app.database import supabase

router = APIRouter(prefix="/submissions", tags=["Submissions"])

class CodeSubmissionRequest(BaseModel):
    user_id: str
    code_snippet: str
    language: str
    title: Optional[str] = "Untitled Code"

@router.post("/review")
def review_submission(payload: CodeSubmissionRequest):
    try:
        # 1. Save submission to Supabase first to satisfy the foreign key constraint
        submission_data = {
            "user_id": payload.user_id,
            "code": payload.code_snippet,
            "language": payload.language,
            "title": payload.title
        }
        
        insert_response = supabase.table("submissions").insert(submission_data).execute()
        
        if not insert_response.data:
            raise HTTPException(status_code=400, detail="Failed to create submission record.")        
        new_submission = insert_response.data[0]
        submission_id = new_submission["id"]

        # 2. Now run the AI review using the newly generated valid submission_id
        result = analyze_code_with_memory(
            user_id=payload.user_id,
            submission_id=submission_id,
            code_snippet=payload.code_snippet,
            language=payload.language
        )
        return result
        
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc)
        )

# Get submissions for peer review

@router.get("/")
def get_submissions_for_review():
    try:
        response = (
            supabase
            .table("submissions")
            .select(
                "id,title,language,created_at"
            )
            .execute()
        )
        return response.data or []
    
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc)
        )