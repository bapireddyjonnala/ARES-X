from app.llms.gemini import generate_response
from app.agents.gap_detector.agent import detect_gaps
from app.agents.hypothesis.prompt import hypothesis_prompt


def generate_hypotheses(topic: str):

    gap_result = detect_gaps(topic)

    prompt = hypothesis_prompt(
        topic,
        gap_result["gap_analysis"]
    )

    result = generate_response(prompt)

    return {
        "topic": topic,
        "hypotheses": result
    }