from google import genai
from openai import OpenAI
from app.config import settings

# Initialize native Gemini client
native_client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)

# Initialize OpenRouter client
openrouter_client = OpenAI(
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

def generate_response(prompt):
    # Phase 1: Try native Gemini API first (completely free tier)
    native_models = [
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-flash-latest"
    ]
    
    for model_name in native_models:
        try:
            response = native_client.models.generate_content(
                model=model_name,
                contents=prompt,
            )
            if response.text:
                return response.text
        except Exception as e:
            print(f"Native Gemini model {model_name} failed: {e}")
            continue

    # Phase 2: Fall back to OpenRouter (using credit balance)
    print("Falling back to OpenRouter...")
    openrouter_models = [
        "google/gemini-2.5-flash",
        "meta-llama/llama-3.3-70b-instruct",
        "google/gemini-2.0-flash"
    ]
    
    for model_name in openrouter_models:
        try:
            response = openrouter_client.chat.completions.create(
                model=model_name,
                max_tokens=1000,  # Explicit limit to stay within OpenRouter token balance checks
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            content = response.choices[0].message.content
            if content:
                return content
        except Exception as e:
            print(f"OpenRouter model {model_name} failed: {e}")
            continue
            
    raise RuntimeError("All LLM generation paths (native Gemini and OpenRouter) have failed.")