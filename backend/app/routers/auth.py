from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas.user import UserCreate, UserLogin

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
def register_user(user: UserCreate):
    # Check if user already exists
    existing = supabase.table("users").select("*").eq("email", user.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Insert new user into Supabase 'users' table
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": user.password  # Note: In production, hash this password with bcrypt!
    }
    response = supabase.table("users").insert(new_user).execute()

    if not response.data:
        raise HTTPException(status_code=400, detail="Registration failed")

    return {"message": "User registered successfully", "user": response.data[0]}

@router.post("/login")
def login_user(user: UserLogin):
    # Verify user credentials against Supabase 'users' table
    response = supabase.table("users").select("*").eq("email", user.email).eq("password", user.password).execute()

    if not response.data:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "user": response.data[0]}