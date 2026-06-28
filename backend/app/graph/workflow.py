from langgraph.graph import StateGraph, END

from app.graph.state import ResearchState

from app.agents.planner.agent import create_research_plan
from app.agents.literature.agent import get_literature_review
from app.agents.gap_detector.agent import detect_gaps
from app.agents.hypothesis.agent import generate_hypotheses


def planner_node(state: ResearchState):

    state["research_plan"] = create_research_plan(
        state["topic"]
    )

    return state


def literature_node(state: ResearchState):

    state["literature"] = get_literature_review(
        state["topic"]
    )

    return state


def gap_node(state: ResearchState):

    gap_result = detect_gaps(
        state["topic"]
    )

    state["gap_analysis"] = gap_result["gap_analysis"]

    return state


def hypothesis_node(state: ResearchState):

    result = generate_hypotheses(
        state["topic"]
    )

    state["hypotheses"] = result["hypotheses"]

    return state


graph = StateGraph(ResearchState)

graph.add_node("planner", planner_node)
graph.add_node("literature", literature_node)
graph.add_node("gap_detector", gap_node)
graph.add_node("hypothesis", hypothesis_node)

graph.set_entry_point("planner")

graph.add_edge("planner", "literature")
graph.add_edge("literature", "gap_detector")
graph.add_edge("gap_detector", "hypothesis")
graph.add_edge("hypothesis", END)

workflow = graph.compile()