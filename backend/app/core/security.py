import os
from datetime import datetime, timedelta
from jose import jwt
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from .db import get_db
from app.models.user import User
SECRET_KEY = os.getenv("SECRET_KEY","secret"); ALGORITHM="HS256"; ACCESS_TOKEN_EXPIRE_MINUTES=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES","60"))
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
def verify_password(plain, hashed): return pwd_context.verify(plain, hashed)
def hash_password(p): return pwd_context.hash(p)
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy(); expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire}); return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try: payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]); user_id = int(payload.get("sub"))
    except Exception: raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = db.query(User).filter(User.id==user_id).first()
    if not user: raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return user
