from fastapi import FastAPI
from app.database import supabase
from app.routers import auth,submissions
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Growth Coach API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(submissions.router)
app.include_router(auth.router)

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Growth Coach Backend!"
    }

@app.get("/test-db")
def test_database_connection():
    # Simple query to test if Supabase connection works
    try:
        response = supabase.table("users").select("id").limit(1).execute()
        return {"status": "Connected successfully", "data": response.data}
    except Exception as e:
        return {"status": "Connection failed", "error": str(e)}