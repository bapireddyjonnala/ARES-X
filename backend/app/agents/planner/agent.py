from app.llms.gemini import generate_response


def create_research_plan(topic: str):

    prompt = f"""
    You are an expert AI Research Planner.

    Create a detailed research plan for:

    {topic}

    Include:

    1. Research Problem
    2. Objectives
    3. Methodology
    4. Datasets Required
    5. Expected Outcomes
    6. Future Scope
    """

    return generate_response(prompt)