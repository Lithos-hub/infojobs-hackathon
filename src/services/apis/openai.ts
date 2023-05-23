import { Configuration, OpenAIApi } from 'openai';
import { jobAssistantPrompt, searchAssistantPrompt } from './utils';

interface GPTQuery {
	type:
		| 'search-assistant'
		| 'job-assistant'
		| 'generator-assistant'
		| 'evaluator-assistant'
		| 'generic';
	message: string;
}

const configuration = new Configuration({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const systemPrompts = {
	'search-assistant': searchAssistantPrompt,
	'job-assistant': jobAssistantPrompt,
	'generator-assistant': ``,
	'evaluator-assistant': ``,
	generic: `Responderás a las preguntas que se te formulen con la mayor precisión posible.`,
};

export const useChatGPT = async ({ type, message }: GPTQuery) => {
	const openai = new OpenAIApi(configuration);

	const options = {
		model: 'gpt-3.5-turbo',
		temperature: 0,
		max_tokens: 1000,
		top_p: 1,
	};

	const systemPrompt = systemPrompts[type];

	const userPrompt = message;

	try {
		const response = await openai.createChatCompletion({
			...options,
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt },
			],
		});
		return response.data.choices[0].message?.content;
	} catch (error) {
		console.error('GPT ERROR: ', error);
	}
};
