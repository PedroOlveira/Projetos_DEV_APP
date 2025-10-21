from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base
class Discipline(Base):
    __tablename__ = "disciplines"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    workload = Column(Integer, nullable=True)
    professor_id = Column(Integer, ForeignKey("professors.id"), nullable=True)
    professor = relationship("Professor")
