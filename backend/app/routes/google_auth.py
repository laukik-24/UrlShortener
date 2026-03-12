from fastapi import APIRouter, HTTPException
from google.oauth2 import id_token
from google.auth.transport import requests
from app.database.mongodb import database
from app.utils.jwt import create_access_token
from app.schemas.user_schema import GoogleAuth
from datetime import datetime
import os

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


@router.post("/google")
async def google_login(data: GoogleAuth):

    try:

        idinfo = id_token.verify_oauth2_token(
            data.token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid Google token"
        )

    email = idinfo["email"]
    name = idinfo.get("name")
    picture = idinfo.get("picture")
    google_id = idinfo.get("sub")

    user = await database.users.find_one({"email": email})

    if not user:

        user_data = {
            "email": email,
            "name": name,
            "picture": picture,
            "google_id": google_id,
            "provider": "google",
            "created_at": datetime.utcnow()
        }

        result = await database.users.insert_one(user_data)
        user_data["_id"] = result.inserted_id
        user = user_data

    else:

        await database.users.update_one(
            {"_id": user["_id"]},
            {
                "$set": {
                    "name": name,
                    "picture": picture
                }
            }
        )

        user["name"] = name
        user["picture"] = picture

    access_token = create_access_token({
        "user_id": str(user["_id"])
    })

    return {
        "access_token": access_token,
        "user": {
            "name": user["name"],
            "email": user["email"],
            "picture": user.get("picture")
        }
    }