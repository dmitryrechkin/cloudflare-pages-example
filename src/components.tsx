import { useState } from 'hono/jsx';

interface AnswerResponse {
	answer: string;
	message?: string;
}

export const Counter = () => {
	const [count, setCount] = useState(0);

	console.log("Counter component rendered with count:", count);

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
};

export const Form = () => {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [alerts, setAlerts] = useState('');

	console.log("Form component rendered ");

	const handleGenerateAnswer = async () => {
		console.log("handleGenerateAnswer called with question:", question);

		const response = await fetch('/api/v1/questions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ question })
		});

		const data = await response.json() as AnswerResponse;

		setAnswer(data.answer);
	};

	const handleImproveAnswer = async () => {
		console.log("handleImproveAnswer called with answer:", answer);

		const response = await fetch('/api/v1/answers/improve', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ answer })
		});

		const data = await response.json() as AnswerResponse;

		setAnswer(data.answer);
	};

	const handleSaveAnswer = async () => {
		console.log("handleSaveAnswer called with answer:", answer);

		const response = await fetch('/api/v1/answers', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ answer })
		});

		const data = await response.json() as AnswerResponse;

		setAlerts(data.message ?? 'Saved!');
	};

	return (
		<div>
			<h1>Example JSX Form with Hono for CloudFlare Page</h1>
			<dialog id="alerts" style={{ display: alerts ? 'block' : 'none' }}>{alerts}</dialog>
			<form onSubmit={(e) => e.preventDefault()}>
				<div>
					<label htmlFor="question">Question</label>
					<textarea id="question" name="question" rows={10} value={question} onClick={() => setAlerts('')} onChange={(e) => setQuestion((e.target as HTMLTextAreaElement)?.value ?? '')}></textarea>
				</div>
				<div>
					<label htmlFor="answer">Answer</label>
					<textarea id="answer" name="answer" rows={10} value={answer} onClick={() => setAlerts('')} onChange={(e) => setAnswer((e.target as HTMLTextAreaElement)?.value ?? '')}></textarea>
				</div>
				<div>
					<button type="button" onClick={handleGenerateAnswer}>Find Answer</button>
					<button type="button" onClick={handleImproveAnswer}>Improve Answer</button>
					<button type="button" onClick={handleSaveAnswer}>Save Answer</button>
				</div>
			</form>
		</div>
	);
};
