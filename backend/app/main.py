from fastapi import FastAPI

from app.api.research import router as research_router
from app.api.paper import router as paper_router
from app.api.reviewer import router as reviewer_router
from app.api.patents import router as patent_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ARES-X",
    description="Autonomous Research Evolution System",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    research_router,
    prefix="/research",
    tags=["Research"]
)

app.include_router(paper_router)
app.include_router(reviewer_router)
app.include_router(patent_router)

@app.get("/")
def root():
    return {
        "project": "ARES-X",
        "status": "Running",
        "version": "1.0.0"
    }

@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }