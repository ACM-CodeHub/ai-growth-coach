from fastapi import FastAPI
from app.database import supabase
from app.routers import auth

app = FastAPI()

# Include routers
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