from sqlalchemy import Column, Integer, String
from app.core.db import Base
class Professor(Base):
    __tablename__ = "professors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    degree = Column(String, nullable=True)
    tenure = Column(Integer, nullable=True)
    email = Column(String, nullable=True)
