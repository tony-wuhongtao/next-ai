'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    MessageCircle,
    Bot,
    User,
    Scissors,
    Zap
} from 'lucide-react';

export default function HomePage() {
    const features = [
        {
            id: 'chat',
            title: 'AI机器人',
            description: '使用阿里云Dashscope的Deepseek-R1构建的AI聊天机器人',
            icon: <MessageCircle className="h-6 w-6" />,
            path: '/chat'
        },
        {
            id: 'chatbot',
            title: 'Vercel AI Gateway聊天',
            description: '使用Vercel AI Gateway快速构建的聊天机器人，可选工具和模型',
            icon: <Bot className="h-6 w-6" />,
            path: '/chatbot'
        },
        {
            id: 'mychat',
            title: '自定义AI聊天机器人',
            description: '基于Dashscope的Deepseek-R1，带有用户头像和推理展示的聊天界面',
            icon: <User className="h-6 w-6" />,
            path: '/mychat'
        },
        {
            id: 'extractCMP',
            title: '服化道提取',
            description: '利用阿里云Dashscope的Deepseek-V3.1，从剧本中提取服装、化妆、道具元素',
            icon: <Scissors className="h-6 w-6" />,
            path: '/extractCMP'
        },
        {
            id: 'extractCMPstream',
            title: '服化道流式提取',
            description: '利用阿里云Dashscope的Deepseek-V3.1，流式响应的服装、化妆、道具元素提取功能',
            icon: <Zap className="h-6 w-6" />,
            path: '/extractCMPstream'
        },
        {
            id: 'extractCMPObject',
            title: '服化道元素Object提取',
            description: '利用阿里云Dashscope的qwen-plus，从剧本中提取服装、化妆、道具元素json',
            icon: <Zap className="h-6 w-6" />,
            path: '/extractCMPObject'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        AI 功能演示平台
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        探索多种AI应用场景，从智能聊天到专业内容分析
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-4">
                                        {feature.icon}
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {feature.title}
                                    </h2>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {feature.description}
                                </p>
                                <Link href={feature.path} passHref>
                                    <Button variant="outline" className=" w-full cursor-pointer">
                                        立即体验
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        平台特色
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Vercel AI SDK集成</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                基于Vercel AI SDK构建，展示完整的AI应用开发流程和最佳实践
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">多样化功能演示</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                涵盖聊天机器人、内容分析等不同场景，提供可复用的代码示例
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">学习参考</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                专为开发者设计的功能演示平台，便于学习和参考AI应用开发技术
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}