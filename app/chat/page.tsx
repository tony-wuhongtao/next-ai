'use client';

import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
    PromptInput,
    PromptInputTextarea,
    PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { Loader } from '@/components/ai-elements/loader';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Response } from '@/components/ai-elements/response';

const ConversationDemo = () => {
    const [input, setInput] = useState('');
    const { messages, sendMessage, status } = useChat();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
            <h1 className='text-center text-2xl font-bold mb-4'>这是使用阿里云Dashscope的Deepseek构建的聊天机器人Demo</h1>
            <div className="flex flex-col h-[calc(100%-4rem)]">
                <Conversation>
                    <ConversationContent>
                        {messages.map((message) => (
                            <Message from={message.role} key={message.id}>
                                <MessageContent>
                                    {message.parts.map((part, i) => {
                                        switch (part.type) {
                                            case 'text': // we don't use any reasoning or tool calls in this example
                                                return (
                                                    <Response key={`${message.id}-${i}`}>
                                                        {part.text}
                                                    </Response>
                                                );
                                            default:
                                                return null;
                                        }
                                    })}
                                </MessageContent>
                            </Message>
                        ))}
                        {status === 'submitted' && <Loader />}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>

                <PromptInput
                    onSubmit={handleSubmit}
                    className="mt-4 w-full max-w-2xl mx-auto relative"
                >
                    <PromptInputTextarea
                        value={input}
                        placeholder="Say something..."
                        onChange={(e) => setInput(e.currentTarget.value)}
                        className="pr-12"
                    />
                    <PromptInputSubmit
                        status={status === 'streaming' ? 'streaming' : 'ready'}
                        disabled={!input.trim()}
                        className="absolute bottom-1 right-1"
                    />
                </PromptInput>
            </div>
        </div>
    );
};

export default ConversationDemo;