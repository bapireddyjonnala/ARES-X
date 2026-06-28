def generate_markdown_report(data):

    report = f"""
# ARES-X Research Report

## Topic
{data.get("topic", "")}

## Research Plan
{data.get("research_plan", "")}

## Literature Review
{str(data.get("literature", ""))}

## Gap Analysis
{data.get("gap_analysis", "")}

## Hypotheses
{data.get("hypotheses", "")}
"""

    return report