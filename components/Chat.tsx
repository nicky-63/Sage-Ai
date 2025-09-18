import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from '../types';
import { sendMessageToAI } from '../services/geminiService';
import { SendIcon, UserIcon, SparklesIcon } from './icons/ChatIcons';

const ChatBubble: React.FC<{ message: Message; isLastMessage: boolean }> = ({ message, isLastMessage }) => {
    const isUser = message.sender === 'user';
    // Only animate the last message in the chat if it's from the AI.
    const animationClass = !isUser && isLastMessage ? 'animate-fade-in-up' : '';

    return (
        <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'} ${animationClass}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-9 h-9 bg-brand-green rounded-full flex items-center justify-center shadow-md">
                    <SparklesIcon />
                </div>
            )}
            <div className={`p-4 rounded-2xl max-w-sm md:max-w-md shadow-lg ${isUser ? 'bg-brand-green text-brand-dark rounded-br-none' : 'bg-brand-secondary text-brand-text rounded-bl-none'}`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
             {isUser && (
                <div className="flex-shrink-0 w-9 h-9 bg-brand-secondary rounded-full flex items-center justify-center shadow-md">
                   <UserIcon />
                </div>
            )}
        </div>
    );
};

interface ChatProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Chat: React.FC<ChatProps> = ({ messages, setMessages }) => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const handleSend = useCallback(async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponseText = await sendMessageToAI(input);
            const aiMessage: Message = { id: (Date.now() + 1).toString(), text: aiResponseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I'm having trouble connecting. Please try again.", sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, setMessages]);
    
    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-150px)]">
            <div className="flex-grow overflow-y-auto pr-2">
                {messages.map((msg, index) => (
                    <ChatBubble key={msg.id} message={msg} isLastMessage={index === messages.length - 1} />
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3 my-4 justify-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                            <SparklesIcon />
                        </div>
                        <div className="p-3 rounded-2xl bg-brand-secondary rounded-bl-none">
                            <div className="flex items-center justify-center space-x-1">
                                <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Tell me what's on your mind..."
                    className="flex-grow bg-brand-secondary border border-slate-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-green text-brand-text"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || input.trim() === ''}
                    className="bg-brand-green text-brand-dark rounded-full p-3 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default Chat;