from fastapi import APIRouter

from app.database.models import ResearchRequest
from app.agents.patent_checker.agent import check_patentability

router = APIRouter(
    prefix="/research",
    tags=["Patent Checker"]
)


@router.post("/patent-check")
def patent_check(request: ResearchRequest):

    return check_patentability(
        request.topic
    )