from fastapi import APIRouter, HTTPException
from google.oauth2 import id_token
from google.auth.transport import requests
from app.database.mongodb import database
from app.utils.jwt import create_access_token
import os

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


@router.post("/google")
async def google_login(data: dict):

    token = data.get("token")

    idinfo = id_token.verify_oauth2_token(
        token,
        requests.Request(),
        GOOGLE_CLIENT_ID
    )

    email = idinfo["email"]
    name = idinfo.get("name")

    user = await database.users.find_one({"email": email})

    if not user:

        user = {
            "email": email,
            "name": name,
            "provider": "google"
        }

        result = await database.users.insert_one(user)
        user["_id"] = result.inserted_id

    access_token = create_access_token({
        "user_id": str(user["_id"])
    })

    return {
        "access_token": access_token
    }