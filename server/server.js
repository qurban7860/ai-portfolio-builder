import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/generate-portfolio', async (req, res) => {
  const { summary, skills, experience, projects } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `Generate a professional HTML portfolio based on the following information:

  Summary: ${summary}

  Skills: ${skills}

  Experience:
  ${experience
    .split('\n')
    .map((exp) => `- ${exp}`)
    .join('\n')}

  Projects:
  ${projects
    .split('\n')
    .map((proj) => `- ${proj}`)
    .join('\n')}

  Include sections for "About Me" (using the summary), "Skills," "Experience," and "Projects." Use semantic HTML5 tags and basic styling for readability. **Only output the raw HTML code.**`; // Modified prompt

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }],
        }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error from Server (Status):", response.status);
      console.error("Gemini API Error from Server (Body):", errorData);
      return res.status(response.status).json({ error: errorData?.error?.message || 'Gemini API error' });
    }

    const data = await response.json();
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText) {
      const htmlStartIndex = generatedText.indexOf('<');
      const htmlEndIndex = generatedText.lastIndexOf('>');

      let extractedHTML = generatedText;
      if (htmlStartIndex !== -1 && htmlEndIndex > htmlStartIndex) {
        extractedHTML = generatedText.substring(htmlStartIndex, htmlEndIndex + 1);
      } else {
        console.warn("Could not reliably extract HTML. Sending the full response.");
      }

      res.json({ portfolio: extractedHTML });
    } else {
      console.error("Generated text is undefined in Gemini API response.");
      res.status(500).json({ error: 'Failed to extract portfolio content from Gemini API response.' });
    }
  } catch (error) {
    console.error("Server Error during Gemini API call:", error);
    res.status(500).json({ error: 'Failed to call Gemini API from server' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});