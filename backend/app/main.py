from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, students, disciplines, professors, bulletin

app = FastAPI(title="App Scholar API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(students.router, prefix="/students", tags=["students"])
app.include_router(disciplines.router, prefix="/disciplines", tags=["disciplines"])
app.include_router(professors.router, prefix="/professors", tags=["professors"])
app.include_router(bulletin.router, prefix="/bulletin", tags=["bulletin"])
