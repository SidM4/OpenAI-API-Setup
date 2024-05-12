const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

const app = express();
const port = 3000;

// Replace 'your_api_key_key' with your actual OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/ask', (req, res) => {
    const user_input = req.body.user_input;
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // Update model as necessary
            prompt: user_input,
            temperature: 0.5,
            max_tokens: 100
        })
    })
    .then(response => response.json())
    .then(data => {
        const gpt_response = data.choices[0].text;
        res.send(gpt_response);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});