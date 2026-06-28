from typing import TypedDict


class ResearchState(TypedDict):
    topic: str

    research_plan: str

    literature: dict

    gap_analysis: str

    hypotheses: str