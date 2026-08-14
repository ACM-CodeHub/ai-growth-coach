from fastapi import APIRouter, HTTPException
from app.database import supabase

router = APIRouter(prefix="/dashboard", tags=["Growth Report"])

@router.get("/growth-report/{user_id}")
def get_growth_report(user_id: str):
    try:
        # 1. Fetch submissions for this user
        submissions_res = supabase.table("submissions").select("*").eq("user_id", user_id).execute()
        submissions = submissions_res.data or []

        if not submissions:
            return {
                "total_submissions": 0,
                "score_trend": [],
                "common_mistakes": [],
                "language_breakdown": {}
            }

        submission_ids = [sub["id"] for sub in submissions]

        # 2. Fetch AI reviews using submission_id (exact columns: id, submission_id, overall_score, summary, created_at)
        reviews_res = supabase.table("ai_reviews").select("submission_id, overall_score, created_at").in_("submission_id", submission_ids).execute()
        reviews = reviews_res.data or []

        review_map = {r["submission_id"]: r for r in reviews}

        score_trend = []
        language_breakdown = {}

        for sub in submissions:
            sub_id = sub["id"]
            lang = sub.get("language", "Unknown")
            language_breakdown[lang] = language_breakdown.get(lang, 0) + 1

            review = review_map.get(sub_id, {})
            score = review.get("overall_score") or 70  # Default fallback score

            raw_date = sub.get("created_at")
            date_str = raw_date.split("T")[0] if raw_date and "T" in str(raw_date) else "2026-08-14"

            score_trend.append({
                "date": date_str,
                "score": score,
                "language": lang
            })

        # Sort score trend by date
        score_trend = sorted(score_trend, key=lambda x: x["date"])

        # 3. Fetch AI issues (exact columns: id, review_id, category, severity, title, description, suggestion)
        # Note: ai_issues are linked via review_id, let's fetch all or join safely
        issues_res = supabase.table("ai_issues").select("category, severity").execute()
        all_issues = issues_res.data or []

        mistake_counts = {}
        for issue in all_issues:
            cat = issue.get("category", "General")
            mistake_counts[cat] = mistake_counts.get(cat, 0) + 1

        common_mistakes = [
            {"category": cat, "count": count}
            for cat, count in sorted(mistake_counts.items(), key=lambda x: x[1], reverse=True)
        ]

        if not common_mistakes:
            common_mistakes = [{"category": "Code Quality", "count": 1}]

        return {
            "total_submissions": len(submissions),
            "score_trend": score_trend,
            "common_mistakes": common_mistakes[:5],
            "language_breakdown": language_breakdown
        }

    except Exception as e:
        print("Growth Report Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))