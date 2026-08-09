import os
import requests
from app.database import supabase

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def analyze_code_with_memory(user_id: str, code_snippet: str, language: str):
    # 1. Fetch user's past submissions & AI reviews for "memory"
    past_submissions = supabase.table("submissions") \
        .select("id, code, language") \
        .eq("user_id", user_id) \
        .order("created_at", desc=True) \
        .limit(3) \
        .execute()
    
    # Extract past context if available
    context_text = "No prior submissions yet."
    if past_submissions.data:
        context_text = "Past code snippets from this user: " + str([sub["code"] for sub in past_submissions.data])

    # 2. Build Prompt for Llama 3 via Groq
    prompt = f"""
    You are an expert technical mentor and code reviewer. 
    Here is context about the developer's historical coding habits:
    {context_text}

    Now, review this new {language} code submission:
    ```
    {code_snippet}
    ```

    Provide:
    1. An overall score (0-100).
    2. A short summary of the review.
    3. Specific issues found (category, severity, title, description, suggestion).
    """

    # 3. Call Groq API (Llama 3 endpoint)
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "llama3-70b-8192", # or your preferred Llama 3 variant on Groq
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.3
    }

    response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
    result = response.json()
    
    return result["choices"]["message"]["content"]