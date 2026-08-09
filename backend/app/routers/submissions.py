from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database import supabase
from app.services.ai_coach import analyze_code_with_memory

router = APIRouter(prefix="/submissions", tags=["Submissions"])

class SubmissionCreate(BaseModel):
    user_id: str
    title: str
    description: str
    language: str
    code: str

@router.post("/")
def create_submission(submission: SubmissionCreate):
    # 1. Save submission to Supabase
    sub_data = {
        "user_id": submission.user_id,
        "title": submission.title,
        "description": submission.description,
        "language": submission.language,
        "code": submission.code
    }
    db_res = supabase.table("submissions").insert(sub_data).execute()
    
    if not db_res.data:
        raise HTTPException(status_code=400, detail="Failed to save submission")
    
    saved_sub = db_res.data[0]

    # 2. Run AI Coach Analysis with Memory
    ai_feedback = analyze_code_with_memory(
        user_id=submission.user_id, 
        code_snippet=submission.code, 
        language=submission.language
    )

    # 3. Save AI review to `ai_reviews` table
    review_data = {
        "submission_id": saved_sub["id"],
        "overall_score": 85, # Parse this dynamically from AI response later
        "summary": ai_feedback
    }
    supabase.table("ai_reviews").insert(review_data).execute()

    return {"message": "Submission analyzed successfully", "ai_feedback": ai_feedback}