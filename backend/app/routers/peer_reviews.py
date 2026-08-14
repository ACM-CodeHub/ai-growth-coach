from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.database import supabase

router = APIRouter(
    prefix="/peer-reviews",
    tags=["Peer Reviews"]
)

# Request model
class PeerReviewRequest(BaseModel):
    submission_id: str
    reviewer_id: str
    score: int
    comment: Optional[str] = None

@router.get("/test")
def test_peer():
    return {
        "message":"peer router working"
    }

# Submit peer review
@router.post("/")
def create_peer_review(payload: PeerReviewRequest):
    try:
        # Validate score
        if payload.score < 1 or payload.score > 5:
            raise HTTPException(
                status_code=400,
                detail="Score must be between 1 and 5"
            )

        # Check duplicate review
        existing = (
            supabase
            .table("peer_reviews")
            .select("*")
            .eq("submission_id", payload.submission_id)
            .eq("reviewer_id", payload.reviewer_id)
            .execute()
        )

        if existing.data:
            raise HTTPException(
                status_code=400,
                detail="You already reviewed this submission"
            )

        # Prepare review data
        review_data = {
            "submission_id": payload.submission_id,
            "reviewer_id": payload.reviewer_id,
            "score": payload.score,
            "comment": payload.comment
        }

        # Insert review
        response = (
            supabase
            .table("peer_reviews")
            .insert(review_data)
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=400,
                detail="Failed to create peer review"
            )

        return {
            "message": "Peer review submitted successfully",
            "review": response.data[0]
        }

    except HTTPException:
        # keep our custom errors
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc)
        )
    
# Get reviews of a submission

@router.get("/{submission_id}")
def get_peer_reviews(submission_id: str):
    try:
        response = (
            supabase
            .table("peer_reviews")
            .select("*")
            .eq("submission_id", submission_id)
            .execute()
        )
        return {
            "reviews": response.data or []
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc)
        )