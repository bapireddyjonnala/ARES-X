from app.llms.gemini import generate_response

def calculate_novelty(topic: str):

    prompt = f"""
    Analyze the novelty of this research idea:

    {topic}

    Give:
    1. Novelty Score (1-10)
    2. Feasibility
    3. Research Impact
    4. Publication Potential
    """

    result = generate_response(prompt)

    return {
        "topic": topic,
        "novelty_analysis": result
    }