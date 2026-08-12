from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.schemas.user import UserCreate, UserLogin
from passlib.context import CryptContext

router = APIRouter(prefix="/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
def register_user(user: UserCreate):
    # Check if user already exists
    existing = supabase.table("users").select("*").eq("email", user.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password securely
    hashed_password = pwd_context.hash(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }
    
    response = supabase.table("users").insert(new_user).execute()

    if not response.data:
        raise HTTPException(status_code=400, detail="Registration failed")

    # Exclude password from the returned response object
    created_user = response.data[0]
    created_user.pop("password", None)

    return {"message": "User registered successfully", "user": created_user}

@router.post("/login")
def login_user(user: UserLogin):
    # Fetch user by email
    response = supabase.table("users").select("*").eq("email", user.email).execute()

    if not response.data:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    db_user = response.data[0]

    # Verify plain-text password against the stored bcrypt hash
    if not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Exclude password from the returned response object
    db_user.pop("password", None)

    return {"message": "Login successful", "user": db_user}