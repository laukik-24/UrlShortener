from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from bson import ObjectId
import os
from app.schemas.url_schema import URLCreate
from app.utils.dependencies import get_current_user
from app.utils.shortener import generate_short_code
from app.models.url import (
    create_short_url,
    get_url_by_code,
    increment_click,
    get_user_urls,
    delete_url
)

router = APIRouter(prefix="/url", tags=["URL"])

BASE_URL = os.getenv("BASE_URL")

@router.get("/my-urls")
async def my_urls(
    user=Depends(get_current_user)
):

    cursor = await get_user_urls(str(user["_id"]))

    urls = []

    for url in cursor:
        url["_id"] = str(url["_id"])
        urls.append(url)

    return urls

@router.post("/shorten")
async def shorten_url(
    data: URLCreate,
    user=Depends(get_current_user)
):

    if data.custom_code:
        existing = await get_url_by_code(
            data.custom_code
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Custom code already taken"
            )

        short_code = data.custom_code
    else:
        short_code = generate_short_code()

    await create_short_url(
        str(user["_id"]),
        data.original_url,
        short_code
    )

    return {
        "short_url": f"{BASE_URL}/{short_code}"
    }

@router.get("/{short_code}")
async def redirect_url(short_code: str):

    url = await get_url_by_code(short_code)

    if not url:
        raise HTTPException(
            status_code=404,
            detail="URL not found"
        )

    await increment_click(short_code)

    return RedirectResponse(
        url=url["original_url"]
    )


@router.delete("/{url_id}")
async def delete_user_url(
    url_id: str,
    user=Depends(get_current_user)
):

    result = await delete_url(
        url_id,
        str(user["_id"])
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="URL not found"
        )

    return {"message": "URL deleted"}

