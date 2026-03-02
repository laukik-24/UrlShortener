from datetime import datetime
from app.database.mongodb import database
from bson import ObjectId

urls_collection = database["urls"]


# ✅ Create Short URL
async def create_short_url(
    user_id: str,
    original_url,
    short_code: str
):
    url = {
        "user_id": user_id,
        "original_url": str(original_url),  # ✅ Fix HttpUrl issue
        "short_code": short_code,
        "clicks": 0,
        "created_at": datetime.utcnow()
    }

    result = await urls_collection.insert_one(url)

    # ✅ Convert ObjectId → string (FastAPI safe)
    url["_id"] = str(result.inserted_id)

    return url


# ✅ Get URL by short code
async def get_url_by_code(code: str):
    url = await urls_collection.find_one(
        {"short_code": code}
    )

    if url:
        url["_id"] = str(url["_id"])

    return url


# ✅ Increment clicks
async def increment_click(code: str):
    await urls_collection.update_one(
        {"short_code": code},
        {"$inc": {"clicks": 1}}
    )


# ✅ Get all URLs of a user
async def get_user_urls(user_id: str):
    return await urls_collection.find(
        {"user_id": user_id}
    ).to_list(length=None)

    urls = []

    async for url in cursor:
        url["_id"] = str(url["_id"])
        urls.append(url)

    return urls

async def delete_url(url_id: str, user_id: str):

    return await urls_collection.delete_one({
        "_id": ObjectId(url_id),
        "user_id": user_id
    })