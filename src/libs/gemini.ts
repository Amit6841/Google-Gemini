import {
	GoogleGenerativeAI,
	HarmBlockThreshold,
	HarmCategory,
} from '@google/generative-ai';

const MODEL_NAME ="gemini-1.5-flash";
const API_KEY = "AIzaSyCBOTWdx99i7aHhNzyc4giyUL-A9rNzuEk";

export async function runChat(prompt: string) {
	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 2048,
	};

	const safetySettings = [
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
	];

	const chat = model.startChat({
		generationConfig,
		safetySettings,
		history: [],
	});

	try {
		const result = await chat.sendMessage(prompt);
		const response = result.response;

		return { data: response.text() };
	} catch (error) {
		return {
			error: (error as Error).message.split(':').reverse()[0],
		};
	}
}