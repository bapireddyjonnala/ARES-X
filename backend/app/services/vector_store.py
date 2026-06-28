from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from sentence_transformers import SentenceTransformer
import uuid

client = QdrantClient(":memory:")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

COLLECTION_NAME = "research_papers"


def create_collection():

    collections = client.get_collections()

    names = [
        c.name
        for c in collections.collections
    ]

    if COLLECTION_NAME not in names:

        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE
            )
        )


def store_papers(papers):

    create_collection()

    points = []

    for paper in papers:

        vector = model.encode(
            paper["summary"]
        ).tolist()

        points.append(
            PointStruct(
                id=str(uuid.uuid4()),
                vector=vector,
                payload=paper
            )
        )

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )


def search_papers(question):

    query_vector = model.encode(
        question
    ).tolist()

    results = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=3
    )

    return [
        hit.payload
        for hit in results
    ]   