'use client';

import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
    PromptInput,
    PromptInputButton,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Response } from '@/components/ai-elements/response';
import { GlobeIcon } from 'lucide-react';
import {
    Source,
    Sources,
    SourcesContent,
    SourcesTrigger,
} from '@/components/ai-elements/sources';
import {
    Reasoning,
    ReasoningContent,
    ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';

const models = [
    {
        name: 'GPT 4o',
        value: 'openai/gpt-4o',
    },
    {
        name: 'gpt-5',
        value: 'openai/gpt-5',
    },
    {
        name: 'gemini-2.5-flash',
        value: 'google/gemini-2.5-flash',
    }

];

const ChatBotDemo = () => {
    const [input, setInput] = useState('');
    const [model, setModel] = useState<string>(models[0].value);
    const [webSearch, setWebSearch] = useState(false);
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chatbot',
        }),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(
                { text: input },
                {
                    body: {
                        model: model,
                        webSearch: webSearch,
                    },
                },
            );
            setInput('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
            <h1 className='text-center text-2xl font-bold mb-4'>这是使用Vercel AI Gateway快速构建的聊天机器人Demo</h1>
            <div className="flex flex-col h-[calc(100%-4rem)]">
                <Conversation className="h-[calc(100%-4rem)]">
                    <ConversationContent>
                        {messages.map((message) => (
                            <div key={message.id}>
                                {message.role === 'assistant' && (
                                    <Sources>
                                        <SourcesTrigger
                                            count={
                                                message.parts.filter(
                                                    (part) => part.type === 'source-url',
                                                ).length
                                            }
                                        />
                                        {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                                            <SourcesContent key={`${message.id}-${i}`}>
                                                <Source
                                                    key={`${message.id}-${i}`}
                                                    href={part.url}
                                                    title={part.url}
                                                />
                                            </SourcesContent>
                                        ))}
                                    </Sources>
                                )}
                                <Message from={message.role} key={message.id}>
                                    <MessageContent>
                                        {message.parts.map((part, i) => {
                                            switch (part.type) {
                                                case 'text':
                                                    return (
                                                        <Response key={`${message.id}-${i}`}>
                                                            {part.text}
                                                        </Response>
                                                    );
                                                case 'reasoning':
                                                    return (
                                                        <Reasoning
                                                            key={`${message.id}-${i}`}
                                                            className="w-full"
                                                            isStreaming={status === 'streaming'}
                                                        >
                                                            <ReasoningTrigger />
                                                            <ReasoningContent>{part.text}</ReasoningContent>
                                                        </Reasoning>
                                                    );
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </MessageContent>
                                </Message>
                            </div>
                        ))}
                        {status === 'submitted' && <Loader />}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>

                <PromptInput onSubmit={handleSubmit} className="mt-4">
                    <PromptInputTextarea
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <PromptInputToolbar>
                        <PromptInputTools>
                            <PromptInputButton
                                variant={webSearch ? 'default' : 'ghost'}
                                onClick={() => setWebSearch(!webSearch)}
                            >
                                <GlobeIcon size={16} />
                                <span>Search</span>
                            </PromptInputButton>
                            <PromptInputModelSelect
                                onValueChange={(value) => {
                                    setModel(value);
                                }}
                                value={model}
                            >
                                <PromptInputModelSelectTrigger>
                                    <PromptInputModelSelectValue />
                                </PromptInputModelSelectTrigger>
                                <PromptInputModelSelectContent>
                                    {models.map((model) => (
                                        <PromptInputModelSelectItem key={model.value} value={model.value}>
                                            {model.name}
                                        </PromptInputModelSelectItem>
                                    ))}
                                </PromptInputModelSelectContent>
                            </PromptInputModelSelect>
                        </PromptInputTools>
                        <PromptInputSubmit disabled={!input} status={status} />
                    </PromptInputToolbar>
                </PromptInput>
            </div>
        </div>
    );
};

export default ChatBotDemo;