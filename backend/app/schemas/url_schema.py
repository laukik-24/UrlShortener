from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional


class URLCreate(BaseModel):
    original_url: HttpUrl


class URLResponse(BaseModel):
    short_code: str
    original_url: str
    clicks: int
    created_at: datetime



class URLCreate(BaseModel):
    original_url: HttpUrl
    custom_code: Optional[str] = None