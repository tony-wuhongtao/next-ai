"use client"
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Response } from '@/components/ai-elements/response';

import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from '@/components/ai-elements/conversation';

import {
    PromptInput,
    PromptInputTextarea,
    PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';


import {
    Reasoning,
    ReasoningContent,
    ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';
import { Message, MessageContent, MessageAvatar } from '@/components/ai-elements/message';

export default function Chat() {
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

            <div className="flex flex-col h-full">
                <Conversation>
                    <ConversationContent>
                        {messages.map((message) => (
                            <div key={message.id}>

                                <Message from={message.role} key={message.id}>

                                    <MessageContent>

                                        {message.parts.map((part, i) => {
                                            switch (part.type) {
                                                case 'text':
                                                    return (
                                                        <Response key={`${message.id}-${i}`}>
                                                            {part.text}
                                                        </Response>
                                                        // Respone可以渲染markdown
                                                    );
                                                case 'reasoning':
                                                    return (
                                                        <Reasoning
                                                            key={`${message.id}-${i}`}
                                                            className="w-full"
                                                            isStreaming={status === 'streaming'}
                                                        >
                                                            <ReasoningTrigger />

                                                            <ReasoningContent className='text-stone-500 my-4'>

                                                                {part.text}

                                                            </ReasoningContent>
                                                        </Reasoning>
                                                    );
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </MessageContent>
                                    {message.role === 'user' ? (
                                        <MessageAvatar src="/user.png" name="User" />
                                    ) : (
                                        <MessageAvatar src="/ai.png" name="Assistant" />)
                                    }
                                </Message>
                            </div>
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
                        status={status}
                        disabled={!input.trim()}
                        className="absolute bottom-1 right-1"
                    />
                </PromptInput>
            </div>
        </div>
    );
}