from fastapi import APIRouter

from app.database.models import ResearchRequest
from app.agents.reviewer.agent import review_research_paper

router = APIRouter(
    prefix="/research",
    tags=["Reviewer"]
)


@router.post("/review-paper")
def review_paper(request: ResearchRequest):

    return review_research_paper(
        request.topic
    )