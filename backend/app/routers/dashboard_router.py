from datetime import datetime, date, timedelta
from fastapi import APIRouter, HTTPException
from app.database import supabase

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats/{user_id}")
def get_dashboard_stats(user_id: str):
    try:
        # 1. Fetch all submissions for this user
        submissions_res = supabase.table("submissions").select("*").eq("user_id", user_id).execute()
        submissions = submissions_res.data or []
        total_reviews = len(submissions)

        if total_reviews == 0:
            return {
                "coding_score": 0,
                "total_reviews": 0,
                "streak": 0,
                "skills": "None yet",
                "recommendations": ["Submit your first code snippet to get personalized AI recommendations!"]
            }

        submission_ids = [sub["id"] for sub in submissions]

        # 2. Calculate Coding Score (Average of overall_score)
        reviews_res = supabase.table("ai_reviews").select("submission_id, overall_score").in_("submission_id", submission_ids).execute()
        reviews = reviews_res.data or []

        avg_score = 0
        if reviews:
            valid_scores = [r["overall_score"] for r in reviews if r.get("overall_score") is not None]
            if valid_scores:
                avg_score = round(sum(valid_scores) / len(valid_scores))

        # 3. Calculate Streak safely
        submission_dates = set()
        for sub in submissions:
            created_at = sub.get("created_at") 
            if created_at:
                try:
                    sub_date = datetime.fromisoformat(created_at.replace("Z", "+00:00")).date()
                    submission_dates.add(sub_date)
                except Exception:
                    pass

        current_streak = 0
        check_date = date.today()
        
        if check_date not in submission_dates and (check_date - timedelta(days=1)) in submission_dates:
            check_date = check_date - timedelta(days=1)

        while check_date in submission_dates:
            current_streak += 1
            check_date -= timedelta(days=1)

        # If no dates parsed properly, give a default streak based on total submissions
        if current_streak == 0 and total_reviews > 0:
            current_streak = 1

        # 4. Extract unique skills (languages)
        unique_langs = list(set(item["language"] for item in submissions if item.get("language")))
        skills_str = ", ".join(unique_langs) if unique_langs else "General Programming"

        # 5. Fetch Database-Driven AI Recommendations from `ai_issues`
        issues_res = supabase.table("ai_issues").select("category, severity").execute()
        all_issues = issues_res.data or []

        dynamic_recommendations = []
        
        # Check for critical or high-severity patterns in database
        critical_issues = [i for i in all_issues if i.get("severity") in ["critical", "high"]]
        
        if critical_issues:
            categories = list(set(i.get("category") for i in critical_issues if i.get("category")))
            for cat in categories[:2]:
                dynamic_recommendations.append(f"Focus on improving your {cat} logic. High-severity issues detected!")
        
        if avg_score > 0 and avg_score < 75:
            dynamic_recommendations.append("Your coding score is currently below 75%. Try focusing on clean code practices.")
        
        if len(dynamic_recommendations) < 2:
            dynamic_recommendations.extend([
                "Review past issues to improve your overall code structure and score.",
                "Explore advanced algorithmic patterns in your preferred language."
            ])

        return {
            "coding_score": avg_score,
            "total_reviews": total_reviews,
            "streak": current_streak,
            "skills": skills_str,
            "recommendations": dynamic_recommendations[:3] #top 3
        }

    except Exception as e:
        print("Dashboard Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/ai-review/{user_id}")
def get_user_ai_review(user_id: str):
    try:

        # --------------------------------------------------
        # 1. Get latest submission of this user
        # --------------------------------------------------

        sub_response = (
            supabase.table("submissions")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(1)
            .execute()
        )

        if not sub_response.data:
            return None

        latest_submission = sub_response.data[0]

        submission_id = latest_submission["id"]

        # --------------------------------------------------
        # 2. Get AI review for this submission
        # --------------------------------------------------

        review_response = (
            supabase.table("ai_reviews")
            .select("*")
            .eq("submission_id", submission_id)
            .limit(1)
            .execute()
        )

        if not review_response.data:
            return {
                "title": latest_submission.get("title") or "Untitled Submission",
                "language": latest_submission.get("language") or "Unknown",
                "code": latest_submission.get("code") or "",
                "overall_score": 0,
                "summary": "AI review is not available yet.",
                "issues": []
            }

        ai_review = review_response.data[0]

        review_id = ai_review["id"]

        # --------------------------------------------------
        # 3. Get AI issues
        # --------------------------------------------------

        issues_response = (
            supabase.table("ai_issues")
            .select("*")
            .eq("review_id", review_id)
            .execute()
        )

        issues = issues_response.data or []

        # --------------------------------------------------
        # 4. Return complete review
        # --------------------------------------------------

        return {
            "submission_id": submission_id,
            "review_id": review_id,

            "title": latest_submission.get("title") or "Untitled Submission",
            "language": latest_submission.get("language") or "Unknown",
            "code": latest_submission.get("code") or "",

            "overall_score": ai_review.get("overall_score", 0),
            "summary": ai_review.get(
                "summary",
                "No summary available."
            ),

            "issues": issues
        }

    except Exception as exc:

        print("AI Review Fetch Error:", str(exc))

        raise HTTPException(
            status_code=500,
            detail=str(exc)
        )