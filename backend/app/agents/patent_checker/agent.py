from app.llms.gemini import generate_response


def check_patentability(topic: str):

    prompt = f"""
    Act as a patent examiner.

    Analyze the following innovation:

    {topic}

    Provide:

    1. Novelty Score (0-10)
    2. Patentability (Low/Medium/High)
    3. Commercial Potential
    4. Market Opportunity
    5. Similar Existing Solutions
    6. Risks
    7. Recommendation

    Return in a structured format.
    """

    result = generate_response(prompt)

    return {
        "topic": topic,
        "patent_analysis": result
    }