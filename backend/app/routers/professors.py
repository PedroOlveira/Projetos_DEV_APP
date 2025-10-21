from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.db import get_db
from app.models.professor import Professor
from app.schemas.entities import ProfessorIn, ProfessorOut
from app.core.security import get_current_user
router = APIRouter()
@router.get("/", response_model=List[ProfessorOut])
def list_professors(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Professor).all()
@router.post("/", response_model=ProfessorOut)
def create_professor(payload: ProfessorIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    obj = Professor(**payload.dict()); db.add(obj); db.commit(); db.refresh(obj); return obj
