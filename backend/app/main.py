from fastapi import FastAPI
from app.core.config import APP_NAME
from app.utils.dependencies import get_current_user
from fastapi import Depends
from app.routes.url import router as url_router
from fastapi.responses import RedirectResponse
from app.models.url import get_url_by_code, increment_click
from fastapi.middleware.cors import CORSMiddleware
from app.routes import google_auth
import os


app = FastAPI(title=APP_NAME)

FRONTEND_URL=os.getenv("FRONTEND_URL")

origins = [
    FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(url_router)

app.include_router(
    google_auth.router,
    prefix="/auth",
    tags=["Google Auth"]
)


@app.get("/")
async def root():
    return {"message": f"{APP_NAME} Running 🚀"}


@app.get("/protected")
async def protected_route(
    user=Depends(get_current_user)
):
    return {
        "message": "You are authenticated",
        "email": user["email"]
    }

@app.get("/{short_code}")
async def redirect(short_code: str):

    url = await get_url_by_code(short_code)

    if not url:
        return {"error": "URL not found"}

    await increment_click(short_code)

    return RedirectResponse(url["original_url"])

