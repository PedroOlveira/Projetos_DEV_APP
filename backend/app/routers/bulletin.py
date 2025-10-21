from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any
from app.core.db import get_db
from app.models.grade import Grade
from app.models.discipline import Discipline
router = APIRouter()
@router.get("/{student_id}")
def get_bulletin(student_id: int, db: Session = Depends(get_db)) -> Dict[str, Any]:
    rows = (db.query(Grade, Discipline).join(Discipline, Grade.discipline_id == Discipline.id).filter(Grade.student_id == student_id).all())
    result = []
    for g, d in rows:
        avg = (g.grade1 + g.grade2) / 2.0
        result.append({"discipline": d.name, "grade1": g.grade1, "grade2": g.grade2, "average": avg})
    return {"student_id": student_id, "rows": result}
