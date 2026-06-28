def gap_analysis_prompt(topic: str, literature: str):
    return f"""
You are an expert research analyst.

Research Topic:
{topic}

Literature:
{literature}

Analyze the literature and identify:

1. Research Gaps
2. Current Limitations
3. Open Challenges
4. Novel Research Opportunities
5. Potential Future Directions

Return a structured report.
"""