from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.db import get_db
from app.models.discipline import Discipline
from app.schemas.entities import DisciplineIn, DisciplineOut
from app.core.security import get_current_user
router = APIRouter()
@router.get("/", response_model=List[DisciplineOut])
def list_disciplines(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Discipline).all()
@router.post("/", response_model=DisciplineOut)
def create_disc(payload: DisciplineIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    obj = Discipline(**payload.dict()); db.add(obj); db.commit(); db.refresh(obj); return obj
