from semanticscholar import SemanticScholar

sch = SemanticScholar()

def get_paper_details(topic):

    papers = sch.search_paper(
        topic,
        limit=5
    )

    results = []

    for paper in papers:

        results.append({
            "title": paper.title,
            "year": paper.year,
            "citations": paper.citationCount
        })

    return results