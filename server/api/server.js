import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI Portfolio Builder Server is running.');
});

app.post('/api/generate-portfolio', async (req, res) => {
  const { name, phone, email, github, summary, skills, experience, education, awards, projects } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  const formatEntry = (entry) => {
    const parts = entry.split('\n').filter(part => part.trim() !== '');
    if (parts.length >= 2) {
      return `<li><strong>${parts[0].trim()}</strong><br/>${parts.slice(1).join('<br/>').trim()}</li>`;
    } else if (parts.length === 1) {
      return `<li><strong>${parts[0].trim()}</strong></li>`;
    }
    return '';
  };

  const prompt = `Generate a professional HTML portfolio using the following format:

  <div class="portfolio">
    <header class="contact-info" style="text-align: center; margin-bottom: 2rem;">
      <h1 class="name" style="font-size: 2rem; margin-bottom: 1rem;">${name}</h1>
      <div class="contact-bar" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; font-size: 1rem;">
        <span style="display: flex; align-items: center; gap: 0.4rem;">
          <strong>Phone:</strong> <a href="tel:${phone}" style="text-decoration: none; color: #0073b1;">${phone}</a>
        </span>
        <span style="display: flex; align-items: center; gap: 0.4rem;">
          <strong>Email:</strong> <a href="mailto:${email}" style="text-decoration: none; color: #0073b1;">${email}</a>
        </span>
        <span style="display: flex; align-items: center; gap: 0.4rem;">
          <strong>GitHub:</strong> <a href="${github}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #0073b1;">${github}</a>
        </span>
      </div>
    </header>

    <section class="summary">
      <h2>About Me</h2>
      <p>${summary}</p>
    </section>

    <section class="education">
      <h2>Education</h2>
      <ul>
        ${education.split('\n\n').map(formatEntry).join('')}
      </ul>
    </section>

    <section class="skills">
      <h2>Skills</h2>
      <p>${skills}</p>
    </section>

    <section class="experience">
      <h2>Experience</h2>
      <ul>
        ${experience.split('\n\n').map(formatEntry).join('')}
      </ul>
    </section>

    <section class="projects">
      <h2>Projects</h2>
      <ul>
        ${projects.split('\n\n').map(formatEntry).join('')}
      </ul>
    </section>

    <section class="awards">
      <h2>Awards and Recognition</h2>
      <ul>
        ${awards.split('\n\n').map(formatEntry).join('')}
      </ul>
    </section>
  </div>

  **Only output the raw HTML code within the 'portfolio' div.**`;

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

    if (generatedText && generatedText.includes('<div class="portfolio">') && generatedText.includes('</div>')) {
      const startIndex = generatedText.indexOf('<div class="portfolio">');
      const endIndex = generatedText.lastIndexOf('</div>') + '</div>'.length;
      const extractedHTML = generatedText.substring(startIndex, endIndex);
      res.json({ portfolio: extractedHTML });
    } else if (generatedText) {
      console.warn("Could not reliably extract the main portfolio div. Sending the full response.");
      res.json({ portfolio: generatedText });
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
