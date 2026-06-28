def hypothesis_prompt(topic: str, gap_analysis: str):
    return f"""
You are an expert research scientist.

Research Topic:
{topic}

Research Gap Analysis:
{gap_analysis}

Generate:

1. 5 Novel Research Hypotheses
2. 5 Research Questions
3. Most Promising Hypothesis

Return in a structured format.
"""