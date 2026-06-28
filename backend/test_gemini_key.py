import os
import requests
from dotenv import load_dotenv

load_dotenv(r"c:\Users\bapi0\Downloads\ARES-X\backend\.env")
key = os.environ.get("GEMINI_API_KEY")

print("Key starts with:", key[:10] if key else "None")

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
payload = {"contents": [{"parts": [{"text": "Say hello in one sentence"}]}]}

try:
    res = requests.post(url, json=payload)
    print("Status:", res.status_code)
    print("Response:", res.json())
except Exception as e:
    print("Error:", e)
