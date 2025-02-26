import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {FaPaperPlane, FaRobot, FaTimes} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {useTheme} from '../../context/ThemeContext';
import useOptimizedAnimation from '../../hooks/useOptimizedAnimation';
import styles from './ChatBot.module.css';

const ChatMessage = memo(({message, type}) => {
    const {isDark} = useTheme();

    return (
        <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
                type === 'user'
                    ? 'bg-primary dark:bg-primary-light text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}>
                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            a: ({node, ...props}) => <a
                                className="text-primary dark:text-primary-light hover:underline" {...props} />,
                            code: ({node, ...props}) => <code
                                className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />
                        }}
                    >
                        {message}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
});

const ChatHeader = memo(({onClose}) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Chat Assistant</h3>
        <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
            <FaTimes className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
        </button>
    </div>
));

const ChatMessages = memo(({messages, isLoading}) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    return (
        <div className={`flex-1 p-4 overflow-y-auto ${styles['chat-messages']}`}>
            {messages.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
                    Hi! How can I help you today?
                </div>
            )}
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message.content} type={message.type}/>
            ))}
            {isLoading && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <span className={styles['loading-dots']}>Thinking</span>
                </div>
            )}
            <div ref={messagesEndRef}/>
        </div>
    );
});

const ChatInput = memo(({input, setInput, handleSubmit, isLoading}) => (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading}
                className={`p-2 rounded-lg bg-primary dark:bg-primary-light text-white ${isLoading ? 'opacity-50' : 'hover:opacity-90'}`}
            >
                <FaPaperPlane className="w-5 h-5"/>
            </button>
        </div>
    </form>
));

const ChatWindow = memo(({isOpen, onClose, messages, isLoading, input, setInput, handleSubmit}) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 20}}
                className={`fixed bottom-24 right-8 z-[9999] w-96 h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col overflow-hidden ${styles['chat-window']}`}
            >
                <ChatHeader onClose={onClose}/>
                <ChatMessages messages={messages} isLoading={isLoading}/>
                <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} isLoading={isLoading}/>
            </motion.div>
        )}
    </AnimatePresence>
));

const ChatButton = memo(({ onClick, isOpen, settings }) => (
    <motion.button
        onClick={onClick}
        className={`fixed bottom-24 right-8 z-[9999] p-4 rounded-full bg-primary dark:bg-primary-light text-white shadow-lg hover:shadow-xl transition-shadow ${isOpen ? 'hidden' : ''} ${styles.pulse}`}
        initial={settings.shouldAnimate ? {scale: 0} : {}}
        animate={settings.shouldAnimate ? {scale: 1} : {}}
        whileHover={settings.shouldAnimate ? {scale: 1.1} : {}}
        whileTap={settings.shouldAnimate ? {scale: 0.9} : {}}
    >
        <FaRobot className="w-6 h-6"/>
    </motion.button>
));

const useChatState = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    return { isOpen, setIsOpen, messages, setMessages, input, setInput, isLoading, setIsLoading };
};

const useChatSubmit = (input, isLoading, setInput, setMessages, setIsLoading) => {
    return useCallback(async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, {type: 'user', content: userMessage}]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: userMessage}),
            });

            const data = await response.json();

            if (!data.success) {
                new Error(data.error || 'Failed to get response');
            }

            setMessages(prev => [...prev, {type: 'bot', content: data.response.trim()}]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                type: 'bot',
                content: `Error: ${error.message || 'Something went wrong. Please try again later.'}`
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, setInput, setMessages, setIsLoading]);
};

const ChatBot = () => {
    const { isDark } = useTheme();
    const { settings } = useOptimizedAnimation();
    const { isOpen, setIsOpen, messages, setMessages, input, setInput, isLoading, setIsLoading } = useChatState();
    const handleSubmit = useChatSubmit(input, isLoading, setInput, setMessages, setIsLoading);

    return (
        <>
            <ChatButton onClick={() => setIsOpen(true)} isOpen={isOpen} settings={settings} />
            <ChatWindow
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                messages={messages}
                isLoading={isLoading}
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default memo(ChatBot);
