import { Hono } from 'hono'
import { renderer } from './renderer'
import { App } from './app'

const app = new Hono()

app.use(renderer);

app.get('/', (c) => {
  return c.render(<App/>, { title: 'Example JSX Form with Hono for CloudFlare Page' })
});

// API endpoints
app.post('/api/v1/questions', async (c) => {
  const data = await c.req.json();
  const answer = `Generated answer for: ${data.question}`; // Stub for generating an answer

  return c.json({ answer });
});

app.put('/api/v1/answers/improve', async (c) => {
  const data = await c.req.json();
  const improvedAnswer = `Improved answer for: ${data.answer}`; // Stub for improving an answer

  return c.json({ answer: improvedAnswer });
});

app.post('/api/v1/answers', async (c) => {
  const data = await c.req.json();

  // Stub for saving an answer
  return c.json({ message: 'Saved!', answer: data.answer });
});

export default app
