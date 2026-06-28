from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.models import ResearchRequest

from app.agents.planner.agent import create_research_plan
from app.agents.literature.agent import get_literature_review
from app.agents.gap_detector.agent import detect_gaps
from app.agents.hypothesis.agent import generate_hypotheses
from app.agents.novelty.agent import calculate_novelty
from app.database.models import ChatRequest
from app.agents.chat.agent import research_chat

from app.graph.workflow import workflow
from app.utils.pdf_generator import create_pdf

router = APIRouter()


@router.post("/plan")
def research_plan(request: ResearchRequest):

    plan = create_research_plan(request.topic)

    return {
        "topic": request.topic,
        "research_plan": plan
    }


@router.post("/literature")
def get_literature(request: ResearchRequest):

    return get_literature_review(
        request.topic
    )


@router.post("/gap-analysis")
def gap_analysis(request: ResearchRequest):

    return detect_gaps(
        request.topic
    )


@router.post("/hypotheses")
def hypotheses(request: ResearchRequest):

    return generate_hypotheses(
        request.topic
    )


@router.post("/full-pipeline")
def full_pipeline(request: ResearchRequest):

    result = workflow.invoke(
        {
            "topic": request.topic
        }
    )

    return result


@router.post("/report")
def generate_report(request: ResearchRequest):

    result = workflow.invoke(
        {
            "topic": request.topic
        }
    )

    return result


@router.post("/export-pdf")
def export_pdf(request: ResearchRequest):

    result = workflow.invoke(
        {
            "topic": request.topic
        }
    )

    pdf_path = create_pdf(
        "research_report.pdf",
        result
    )

    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename="ARES-X_Report.pdf"
    )
@router.post("/novelty")
def novelty(request: ResearchRequest):

    return calculate_novelty(
        request.topic
    )
@router.post("/chat")
def chat(request: ChatRequest):

    return research_chat(
        request.question
    )