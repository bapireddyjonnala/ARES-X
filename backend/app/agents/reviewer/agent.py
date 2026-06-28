from app.llms.gemini import generate_response
from app.agents.paper_writer.agent import generate_research_paper


def review_research_paper(topic: str):

    paper = generate_research_paper(topic)["paper"]

    prompt = f"""
    You are an IEEE conference reviewer.

    Review the following research paper.

    PAPER:
    {paper}

    Provide:

    Novelty Score (0-10)
    Technical Quality Score (0-10)
    Clarity Score (0-10)

    Strengths:
    - point 1
    - point 2

    Weaknesses:
    - point 1
    - point 2

    Recommendation:
    Accept / Minor Revision / Reject

    Return in a clean structured format.
    """

    review = generate_response(prompt)

    return {
        "topic": topic,
        "review": review
    }