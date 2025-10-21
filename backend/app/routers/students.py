from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.db import get_db
from app.models.student import Student
from app.schemas.entities import StudentIn, StudentOut
from app.core.security import get_current_user

router = APIRouter()
@router.get("/", response_model=List[StudentOut])
def list_students(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Student).all()
@router.post("/", response_model=StudentOut)
def create_student(payload: StudentIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    obj = Student(**payload.dict()); db.add(obj); db.commit(); db.refresh(obj); return obj
