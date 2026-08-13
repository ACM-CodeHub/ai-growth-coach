import os
import json
import requests
from dotenv import load_dotenv
from app.database import supabase

# ENVIRONMENT
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not configured in the environment.")

# GROQ CONFIGURATION
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

# Current Groq model suitable for advanced coding/reasoning.
MODEL = "openai/gpt-oss-120b"

# AI REVIEW SYSTEM PROMPT
SYSTEM_PROMPT = """
You are an expert senior software engineer, code reviewer,and technical mentor.
You are reviewing code for an AI-powered developer growth platform.
Your goal is to provide accurate, useful, fair, and actionable feedback that helps the developer improve.
============================================================
REVIEW PRINCIPLES
============================================================
1. Do not invent bugs.

2. Only report issues that are actually supported by the
   submitted code.

3. Distinguish real bugs from subjective style preferences.

4. Consider:
   - Correctness
   - Error handling
   - Security
   - Performance
   - Readability
   - Maintainability
   - Architecture
   - Testing
   - Edge cases
   - Language-specific best practices

5. Be aware of the programming language being reviewed.

6. Do not recommend unnecessarily complicated solutions.

7. If the code is already simple and correct, do not criticize
   it merely because it could be written differently.

8. Previous submissions are context only. Do not assume that
   a previous problem exists in the current code unless the
   current code actually demonstrates it.

9. Identify genuine improvement or regression when previous
   submissions provide useful evidence.

10. Give actionable suggestions.

11. Do not create fake issues just to make the review look useful.

12. If there are no meaningful problems, return an empty issues
    array.

13. Report at most 8 meaningful issues.

14. Do not report multiple issues that are essentially the same
    underlying problem.

============================================================
SCORING
============================================================
Give a score from 0 to 100.

90-100:
Excellent. Correct, robust, readable, maintainable, and handles
important edge cases well.

80-89:
Very good. Minor issues or improvements remain.

70-79:
Good, but several meaningful improvements are possible.

60-69:
Acceptable, but important improvements are needed.

40-59:
Significant problems affect correctness, reliability,
maintainability, security, or design.

0-39:
Major correctness, security, or implementation problems.

The score must reflect the actual quality of the submitted code.

Do not lower the score merely because the code is short.

============================================================
ISSUE SEVERITY
============================================================

critical:
Severe security vulnerability, major data loss risk, or a
problem that can seriously break the application.

high:
Major correctness, reliability, security, or architectural issue.

medium:
Meaningful bug, missing edge case, poor error handling,
performance concern, or maintainability problem.

low:
Minor readability, naming, style, or small improvement.

Do not classify purely subjective style preferences as bugs.

============================================================
ISSUE CATEGORIES
============================================================

Use useful categories such as:

Correctness
Error Handling
Security
Performance
Readability
Maintainability
Testing
Architecture
Edge Cases
Language Practices
Other

============================================================
OUTPUT
============================================================

Return ONLY the structured response requested by the JSON schema.

Do not add Markdown.

Do not add explanations outside the JSON structure.
"""


# JSON SCHEMA
REVIEW_RESPONSE_SCHEMA = {
    "type": "json_schema",
    "json_schema": {
        "name": "code_review",
        "strict": True,
        "schema": {
            "type": "object",
            "properties": {
                "overall_score": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 100,
                },
                "summary": {
                    "type": "string",
                },
                "issues": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "category": {"type": "string"},
                            "severity": {
                                "type": "string",
                                "enum": ["critical", "high", "medium", "low"],
                            },
                            "title": {"type": "string"},
                            "description": {"type": "string"},
                            "suggestion": {"type": "string"},
                        },
                        "required": [
                            "category",
                            "severity",
                            "title",
                            "description",
                            "suggestion",
                        ],
                        "additionalProperties": False,
                    },
                },
            },
            "required": ["overall_score", "summary", "issues"],
            "additionalProperties": False,
        },
    },
}


# HELPER: GET PREVIOUS SUBMISSIONS
def get_previous_submissions(user_id: str, current_submission_id: str):
    """
    Get the user's three most recent submissions,
    excluding the current submission.
    """
    response = (
        supabase.table("submissions")
        .select("id, code, language, title, description, created_at")
        .eq("user_id", user_id)
        .neq("id", current_submission_id)
        .order("created_at", desc=True)
        .limit(3)
        .execute()
    )

    return response.data or []


# HELPER: GET PREVIOUS AI REVIEWS
def get_previous_reviews(submission_ids):
    """
    Get AI reviews belonging to the previous submissions.
    """
    if not submission_ids:
        return []

    response = (
        supabase.table("ai_reviews")
        .select("id, submission_id, overall_score, summary, created_at")
        .in_("submission_id", submission_ids)
        .execute()
    )

    return response.data or []


# HELPER: GET PREVIOUS AI ISSUES
def get_previous_issues(review_ids):
    """
    Get AI issues belonging to previous AI reviews.
    """
    if not review_ids:
        return []

    response = (
        supabase.table("ai_issues")
        .select(
            "review_id, category, severity, title, description, suggestion"
        )
        .in_("review_id", review_ids)
        .execute()
    )

    return response.data or []

# HELPER: BUILD MEMORY CONTEXT
def build_memory_context(previous_submissions, previous_reviews, previous_issues):
    """
    Convert previous submissions/reviews/issues into a readable
    context for the AI.
    """
    if not previous_submissions:
        return "No previous submissions exist for this developer."

    history_parts = []

    for submission in previous_submissions:
        submission_id = submission["id"]

        # Find review for this submission
        matching_review = next(
            (
                review
                for review in previous_reviews
                if review["submission_id"] == submission_id
            ),
            None,
        )

        # --------------------------------------------------------
        # No previous review
        # --------------------------------------------------------
        if not matching_review:
            history_parts.append(
                f"""
------------------------------------------------------------
PREVIOUS SUBMISSION
------------------------------------------------------------

Title:
{submission.get("title") or "Untitled"}

Language:
{submission.get("language")}

No AI review was available for this submission.

Code:

```{submission.get("language")}
{submission.get("code")}
```
"""
            )
            continue

        # --------------------------------------------------------
        # Find issues for this review
        # --------------------------------------------------------
        review_id = matching_review["id"]

        matching_issues = [
            issue for issue in previous_issues if issue["review_id"] == review_id
        ]

        # --------------------------------------------------------
        # Format issues
        # --------------------------------------------------------
        if matching_issues:
            issue_lines = []

            for issue in matching_issues:
                issue_lines.append(
                    f"""
- Category: {issue.get("category")}
  Severity: {issue.get("severity")}
  Title: {issue.get("title")}
  Description: {issue.get("description")}
  Suggestion: {issue.get("suggestion")}
"""
                )

            issues_text = "\n".join(issue_lines)
        else:
            issues_text = "No significant issues were found."

        # --------------------------------------------------------
        # Add complete historical context
        # --------------------------------------------------------
        history_parts.append(
            f"""
------------------------------------------------------------
PREVIOUS SUBMISSION
------------------------------------------------------------

Title:
{submission.get("title") or "Untitled"}

Language:
{submission.get("language")}

Previous AI Score:
{matching_review.get("overall_score")}/100

Previous AI Summary:
{matching_review.get("summary")}

Previous AI Issues:
{issues_text}

Previous Code:

```{submission.get("language")}
{submission.get("code")}
```
"""
        )

    return "\n".join(history_parts)


# HELPER: CALL GROQ
def call_groq(system_prompt: str, user_prompt: str, user_id: str):
    """
    Send the code-review request to Groq.
    """
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        # Structured JSON output
        "response_format": REVIEW_RESPONSE_SCHEMA,
        # Low randomness gives more consistent reviews
        "temperature": 0.3,
        # GPT-OSS supports reasoning effort.
        "reasoning_effort": "low",
        # Maximum generated tokens
        "max_completion_tokens": 2000,
        # Optional identifier for request tracking
        "user": user_id,
    }

    try:
        response = requests.post(GROQ_URL, headers=headers, json=payload, timeout=120)
    except requests.RequestException as exc:
        raise RuntimeError(f"Failed to connect to Groq: {exc}") from exc

    # Handle HTTP errors
    if not response.ok:
        try:
            error_data = response.json()
        except ValueError:
            error_data = response.text

        raise RuntimeError(
            f"Groq API error (HTTP {response.status_code}): {error_data}"
        )

    # Parse response JSON
    try:
        result = response.json()
    except ValueError as exc:
        raise RuntimeError("Groq returned an invalid JSON response.") from exc

    # Extract message content
    try:
        content = result["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise RuntimeError(f"Unexpected Groq response format: {result}") from exc

    if not content:
        raise RuntimeError("Groq returned an empty message.")

    return content

# HELPER: PARSE AI REVIEW
def parse_review(content: str):
    """
    Convert Groq's structured JSON string into a Python dict.
    """
    try:
        review_data = json.loads(content)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Groq returned invalid review JSON:\n{content}") from exc

    # Validate overall score
    score = review_data.get("overall_score")

    if (
        not isinstance(score, int)
        or isinstance(score, bool)
        or score < 0
        or score > 100
    ):
        raise RuntimeError(f"Invalid AI score: {score}")

    # Validate summary
    summary = review_data.get("summary")

    if not isinstance(summary, str):
        raise RuntimeError("AI review summary is missing or invalid.")

    # Validate issues
    issues = review_data.get("issues")

    if not isinstance(issues, list):
        raise RuntimeError("AI issues must be a list.")

    # Limit maximum issues
    issues = issues[:8]
    # Validate each issue
    validated_issues = []

    allowed_severities = {"critical", "high", "medium", "low"}

    required_fields = ["category", "severity", "title", "description", "suggestion"]

    for index, issue in enumerate(issues):
        if not isinstance(issue, dict):
            raise RuntimeError(f"AI issue #{index + 1} is not an object.")

        for field in required_fields:
            if field not in issue:
                raise RuntimeError(f"AI issue #{index + 1} is missing field: {field}")

            if not isinstance(issue[field], str):
                raise RuntimeError(
                    f"AI issue #{index + 1} field '{field}' must be a string."
                )

        if issue["severity"] not in allowed_severities:
            raise RuntimeError(f"Invalid issue severity: {issue['severity']}")

        validated_issues.append(
            {
                "category": issue["category"].strip(),
                "severity": issue["severity"].strip(),
                "title": issue["title"].strip(),
                "description": issue["description"].strip(),
                "suggestion": issue["suggestion"].strip(),
            }
        )

    return {
        "overall_score": score,
        "summary": summary.strip(),
        "issues": validated_issues,
    }

# HELPER: CHECK EXISTING REVIEW
def get_existing_review(submission_id: str):
    """
    Check whether this submission already has an AI review.

    This protects against accidentally reviewing the same
    submission multiple times.
    """
    response = (
        supabase.table("ai_reviews")
        .select("id, submission_id, overall_score, summary, created_at")
        .eq("submission_id", submission_id)
        .limit(1)
        .execute()
    )

    if response.data:
        return response.data[0]

    return None

# HELPER: SAVE AI REVIEW
def save_ai_review(submission_id: str, overall_score: int, summary: str):
    """
    Save the main AI review.
    """
    response = (
        supabase.table("ai_reviews")
        .insert(
            {
                "submission_id": submission_id,
                "overall_score": overall_score,
                "summary": summary,
            }
        )
        .execute()
    )

    if not response.data:
        raise RuntimeError("AI review was not saved to the database.")

    return response.data[0]

# HELPER: SAVE AI ISSUES
def save_ai_issues(review_id: str, issues: list):
    """
    Save all issues belonging to an AI review.
    """
    if not issues:
        return []

    rows = []

    for issue in issues:
        rows.append(
            {
                "review_id": review_id,
                "category": issue["category"],
                "severity": issue["severity"],
                "title": issue["title"],
                "description": issue["description"],
                "suggestion": issue["suggestion"],
            }
        )

    response = supabase.table("ai_issues").insert(rows).execute()

    return response.data or []

# MAIN FUNCTION
def analyze_code_with_memory(
    user_id: str,
    submission_id: str,
    code_snippet: str,
    language: str,
):
    """
    Complete AI code-review pipeline.

    Steps:
        1. Check whether submission was already reviewed.
        2. Get previous submissions.
        3. Get previous AI reviews.
        4. Get previous AI issues.
        5. Build developer memory.
        6. Send current code + memory to Groq.
        7. Parse structured AI response.
        8. Save AI review.
        9. Save AI issues.
        10. Return saved data.
    """

    # 1. CHECK FOR EXISTING REVIEW
    existing_review = get_existing_review(submission_id)

    if existing_review:
        # Get existing issues
        issues_response = (
            supabase.table("ai_issues")
            .select(
                "id, review_id, category, severity, title, description, suggestion"
            )
            .eq("review_id", existing_review["id"])
            .execute()
        )

        return {
            "review": existing_review,
            "issues": issues_response.data or [],
            "already_reviewed": True,
        }

    # 2. GET PREVIOUS SUBMISSIONS
    try:
        previous_submissions = get_previous_submissions(
            user_id=user_id,
            current_submission_id=submission_id,
        )
    except Exception as exc:
        raise RuntimeError(f"Failed to fetch previous submissions: {exc}") from exc

    # 3. GET PREVIOUS AI REVIEWS
    previous_submission_ids = [
        submission["id"] for submission in previous_submissions
    ]

    try:
        previous_reviews = get_previous_reviews(previous_submission_ids)
    except Exception as exc:
        raise RuntimeError(f"Failed to fetch previous AI reviews: {exc}") from exc

    # 4. GET PREVIOUS AI ISSUES
    previous_review_ids = [review["id"] for review in previous_reviews]

    try:
        previous_issues = get_previous_issues(previous_review_ids)
    except Exception as exc:
        raise RuntimeError(f"Failed to fetch previous AI issues: {exc}") from exc

    # 5. BUILD MEMORY
    memory_context = build_memory_context(
        previous_submissions=previous_submissions,
        previous_reviews=previous_reviews,
        previous_issues=previous_issues,
    )

    # 6. BUILD CURRENT REVIEW PROMPT
    user_prompt = f"""
The following is the developer's recent history.

Use it only as context for understanding their development
patterns and growth.

============================================================
DEVELOPER HISTORY
============================================================

{memory_context}

============================================================
CURRENT SUBMISSION
============================================================

Programming Language:
{language}

Current Code:

```{language}
{code_snippet}
```

============================================================
TASK
============================================================

Review ONLY the current submission.

Evaluate its actual quality.

Compare it with previous submissions only when that comparison
provides meaningful evidence about improvement, regression, or
recurring problems.

Return:

1. overall_score
2. summary
3. issues

Report at most 8 meaningful issues.

If there are no meaningful issues, return:

"issues": []

Do not invent problems.
"""

    # 7. CALL GROQ
    try:
        ai_content = call_groq(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            user_id=user_id,
        )
    except Exception as exc:
        raise RuntimeError(f"AI analysis failed: {exc}") from exc

    # 8. PARSE AI RESPONSE
    review_data = parse_review(ai_content)

    # 9. SAVE AI REVIEW
    try:
        saved_review = save_ai_review(
            submission_id=submission_id,
            overall_score=review_data["overall_score"],
            summary=review_data["summary"],
        )
    except Exception as exc:
        raise RuntimeError(f"Failed to save AI review: {exc}") from exc

    # 10. SAVE AI ISSUES
    try:
        saved_issues = save_ai_issues(
            review_id=saved_review["id"],
            issues=review_data["issues"],
        )
    except Exception as exc:
        raise RuntimeError(f"Failed to save AI issues: {exc}") from exc

    # 11. RETURN RESULT
    return {
        "review": saved_review,
        "issues": saved_issues,
        "already_reviewed": False,
    }