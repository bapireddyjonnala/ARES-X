from fastapi import APIRouter

from app.database.models import ResearchRequest
from app.agents.paper_writer.agent import generate_research_paper

router = APIRouter(
    prefix="/research",
    tags=["Paper Writer"]
)

@router.post("/write-paper")
def write_paper(request: ResearchRequest):

    return generate_research_paper(
        request.topic
    )