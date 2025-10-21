from sqlalchemy import Column, Integer, Float, ForeignKey, UniqueConstraint
from app.core.db import Base
class Grade(Base):
    __tablename__ = "grades"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    discipline_id = Column(Integer, ForeignKey("disciplines.id"), nullable=False)
    grade1 = Column(Float, default=0)
    grade2 = Column(Float, default=0)
    __table_args__ = (UniqueConstraint("student_id","discipline_id", name="uq_student_discipline"),)
