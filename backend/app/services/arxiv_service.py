import arxiv

def search_papers(topic: str, max_results: int = 5):

    client = arxiv.Client()

    search = arxiv.Search(
        query=topic,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.Relevance
    )

    papers = []

    for result in client.results(search):
        papers.append({
            "title": result.title,
            "authors": [author.name for author in result.authors],
            "published": str(result.published.date()),
            "summary": result.summary,
            "pdf_url": result.pdf_url
        })

    return papers