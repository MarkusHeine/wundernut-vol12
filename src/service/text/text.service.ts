import { Configuration, OpenAIApi } from 'openai'

export default class TextService {
    private openAi: OpenAIApi
    
    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPEN_AI_API_KEY,
        });
        this.openAi = new OpenAIApi(configuration);
    }

    async processText(text: string): Promise<string> {
        const response = await this.openAi.createCompletion({
            model: "text-davinci-002",
            prompt: `Correct the following text and return it with line breaks: ${text}`,
            temperature: 0.53,
            max_tokens: 300,
        });

        const choices = response.data.choices ?? []

        if (choices.length === 0) throw new Error('No choice recived from open Ai');

        const processedText = choices[0].text as string;
        return processedText;
        
    }
}