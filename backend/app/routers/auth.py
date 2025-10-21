from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.db import get_db, Base, engine
from app.core.security import verify_password, create_access_token, hash_password
from app.schemas.common import UserLogin, UserOut
from app.models.user import User

router = APIRouter()
Base.metadata.create_all(bind=engine)

@router.post("/login")
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "user": UserOut.model_validate(user)}
