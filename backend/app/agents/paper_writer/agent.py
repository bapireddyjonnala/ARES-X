from app.llms.gemini import generate_response

def generate_research_paper(topic: str):

    prompt = f"""
    Write a complete research paper on:

    {topic}

    Include:

    1. Abstract
    2. Introduction
    3. Literature Review
    4. Methodology
    5. Results and Discussion
    6. Conclusion
    7. Future Work
    8. References

    Return in professional research paper format.
    """

    paper = generate_response(prompt)

    return {
        "topic": topic,
        "paper": paper
    }