from fastapi import APIRouter, HTTPException
from app.database import supabase

router = APIRouter(prefix="/dashboard", tags=["History"])

@router.get("/history/{user_id}")
def get_user_history(user_id: str):
    try:
        # 1. Fetch all submissions for this user
        submissions_res = supabase.table("submissions").select("*").eq("user_id", user_id).execute()
        submissions = submissions_res.data or []

        if not submissions:
            return []

        submission_ids = [sub["id"] for sub in submissions]

        # 2. Fetch corresponding AI reviews
        reviews_res = supabase.table("ai_reviews").select("*").in_("submission_id", submission_ids).execute()
        reviews = reviews_res.data or []

        # Map reviews to their respective submissions
        review_map = {r["submission_id"]: r for r in reviews}

        history_data = []
        for sub in submissions:
            review = review_map.get(sub["id"], {})
            history_data.append({
                "id": sub["id"],
                "title": sub.get("title", "Untitled Code"),
                "language": sub.get("language", "Unknown"),
                "code": sub.get("code", ""),
                "overall_score": review.get("overall_score", "N/A"),
                "summary": review.get("summary", "No summary available"),
                "created_at": sub.get("created_at") or sub.get("submitted_at") or "Recent"
            })

        return history_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))