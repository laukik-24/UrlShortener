from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt, JWTError
from app.core.config import SECRET_KEY, ALGORITHM
from app.models.user import get_user_by_id

security = HTTPBearer()


async def get_current_user(credentials=Depends(security)):

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=401)

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = await get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=401)

    return user