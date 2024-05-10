from flask import Flask, request, render_template
import requests

app = Flask(__name__)

# Replace 'your_api_key_key' with your actual OpenAI API key
OPENAI_API_KEY = 'your_api_key'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.form['user_input']
    response = requests.post(
        "https://api.openai.com/v1/completions",
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}"
        },
        json={
            "model": "text-davinci-003",  # Update model as necessary
            "prompt": user_input,
            "temperature": 0.5,
            "max_tokens": 100
        }
    )
    gpt_response = response.json()['choices'][0]['text']
    return gpt_response

if __name__ == '__main__':
    app.run(debug=True)
