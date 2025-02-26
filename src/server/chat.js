import {handleChatRequest} from '../api/chat';

export async function handler(req, res) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({error: 'Method not allowed'}), {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const body = await req.json();
        const {message} = body;

        if (!message) {
            return new Response(JSON.stringify({error: 'Message is required'}), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const result = await handleChatRequest(message);

        return new Response(JSON.stringify(result), {
            status: result.success ? 200 : 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Chat handler error:', error);
        return new Response(JSON.stringify({
            error: 'Internal server error'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
