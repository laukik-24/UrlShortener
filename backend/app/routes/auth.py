from fastapi import APIRouter, HTTPException
from app.schemas.user_schema import UserSignup
from app.models.user import get_user_by_email, create_user
from app.utils.hash import hash_password
from app.schemas.user_schema import UserLogin
from app.utils.hash import verify_password
from app.utils.jwt import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup")
async def signup(user: UserSignup):

    # check existing user
    existing_user = await get_user_by_email(user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # hash password
    hashed_password = hash_password(user.password)

    # create user
    new_user = await create_user(
        user.email,
        hashed_password
    )

    return {
        "message": "User created successfully",
        "email": new_user["email"]
    }

@router.post("/login")
async def login(user: UserLogin):

    db_user = await get_user_by_email(user.email)

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"user_id": str(db_user["_id"])}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }