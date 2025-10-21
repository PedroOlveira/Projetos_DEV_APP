from sqlalchemy.orm import Session
from app.core.db import SessionLocal, Base, engine
from app.core.security import hash_password
from app.models.user import User
from app.models.student import Student
from app.models.professor import Professor
from app.models.discipline import Discipline
from app.models.grade import Grade
def run():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    if not db.query(User).filter(User.email=="admin@scholar.com").first():
        db.add(User(name="Administrador", email="admin@scholar.com", password=hash_password("123456"), role="admin"))
    if not db.query(Student).first():
        s1 = Student(name="João Silva", code="2025001", course="DSM", email="joao@fatec.com")
        s2 = Student(name="Maria Souza", code="2025002", course="DSM", email="maria@fatec.com")
        db.add_all([s1, s2]); db.flush()
        p1 = Professor(name="Prof. André", degree="MsC", tenure=5, email="andre@fatec.com")
        db.add(p1); db.flush()
        d1 = Discipline(name="PDM I", workload=80, professor_id=p1.id)
        d2 = Discipline(name="Banco de Dados", workload=80, professor_id=p1.id)
        db.add_all([d1, d2]); db.flush()
        db.add_all([Grade(student_id=s1.id, discipline_id=d1.id, grade1=8.0, grade2=7.0),
                    Grade(student_id=s1.id, discipline_id=d2.id, grade1=6.0, grade2=9.0)])
    db.commit(); db.close()
if __name__ == "__main__": run()
