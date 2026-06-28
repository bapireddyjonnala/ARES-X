from app.llms.gemini import generate_response


def research_chat(question: str):

    answer = generate_response(
        f"Answer this research question:\n\n{question}"
    )

    return {
        "question": question,
        "answer": answer
    }