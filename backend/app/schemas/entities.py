from pydantic import BaseModel
from typing import Optional
class StudentIn(BaseModel):
    name: str; code: str; course: Optional[str]=None; email: Optional[str]=None
class StudentOut(StudentIn):
    id: int
    class Config: from_attributes = True
class ProfessorIn(BaseModel):
    name: str; degree: str|None=None; tenure: int|None=None; email: str|None=None
class ProfessorOut(ProfessorIn):
    id: int
    class Config: from_attributes = True
class DisciplineIn(BaseModel):
    name: str; workload: int|None=None; professor_id: int|None=None
class DisciplineOut(DisciplineIn):
    id: int
    class Config: from_attributes = True
