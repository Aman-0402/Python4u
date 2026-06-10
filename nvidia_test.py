import os
from dotenv import load_dotenv
from openai import OpenAI

# Load key from .env file
load_dotenv()

# Setup the client — NVIDIA uses OpenAI-compatible endpoint
client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API_KEY")
)

# Send a message to the model
response = client.chat.completions.create(
    model="meta/llama-3.1-70b-instruct",  # pick any model from build.nvidia.com
    messages=[
        {"role": "user", "content": "Explain Django ORM in 3 lines"}
    ],
    max_tokens=500
)

# Print the AI's reply
print(response.choices[0].message.content)
