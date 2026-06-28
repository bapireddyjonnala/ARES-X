from app.llms.gemini import generate_response
from app.agents.gap_detector.prompt import gap_analysis_prompt
from app.agents.literature.arxiv_search import search_papers


def detect_gaps(topic: str):

    papers = search_papers(topic)

    literature_text = ""

    for paper in papers:
        literature_text += f"""
Title: {paper['title']}
Summary: {paper['summary']}
"""

    prompt = gap_analysis_prompt(
        topic,
        literature_text
    )

    result = generate_response(prompt)

    return {
        "topic": topic,
        "gap_analysis": result
    }