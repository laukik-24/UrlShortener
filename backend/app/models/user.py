from datetime import datetime
from app.database.mongodb import database
from bson import ObjectId

users_collection = database["users"]


async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})


async def create_google_user(email: str, name: str, picture: str, google_id: str):

    user = {
        "email": email,
        "name": name,
        "picture": picture,
        "google_id": google_id,
        "created_at": datetime.utcnow()
    }

    result = await users_collection.insert_one(user)
    user["_id"] = str(result.inserted_id)

    return user


async def get_user_by_id(user_id: str):
    return await users_collection.find_one({"_id": ObjectId(user_id)})