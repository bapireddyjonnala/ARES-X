from app.services.arxiv_service import search_papers


def get_literature_review(topic: str):
    papers = search_papers(topic)
    
    return {
        "topic": topic,
        "papers_found": len(papers),
        "papers": papers
    }