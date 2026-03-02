from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserSignup(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    email: EmailStr
    created_at: datetime
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str