import {G4F} from "g4f";

const g4f = new G4F();

const options = {
    provider: g4f.providers.GPT,
    model: "gpt-3.5-turbo",
    debug: true  // Enable debug mode to see what's happening
};

export async function handleChatRequest(message) {
    try {
        if (!message || typeof message !== 'string') {
            new Error('Invalid message format');
        }
        console.log('Sending message to G4F:', message);

        // Create a context-aware prompt
        const messages = [{
            role: "system",
            content: `You are a helpful AI assistant for a portfolio website. 
            You should provide concise, helpful responses about the portfolio owner's 
            skills, projects, and experience. Keep responses friendly and professional.`
        }, {
            role: "user",
            content: message
        }];

        console.log('Using provider:', options.provider);

        // Generate response using g4f
        const response = await g4f.chatCompletion(messages, options);
        console.log('G4F response:', response);

        if (!response) {
            new Error('No response from G4F');
        }

        return {
            success: true,
            response: response
        };
    } catch (error) {
        console.error('G4F Chat Error:', error);
        return {
            success: false,
            error: error.message || 'Failed to generate response. Please try again later.'
        };
    }
}
