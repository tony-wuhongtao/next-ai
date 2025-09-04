'use client';

import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Page() {
    const [generation, setGeneration] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isContextMenuLoading, setIsContextMenuLoading] = useState(false); // 新增状态用于跟踪右键菜单的加载状态
    const [prompt, setPrompt] = useState('');
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, selectedText: '' });
    const [selectedTextForAnalysis, setSelectedTextForAnalysis] = useState(''); // 新增状态用于存储发送给AI的文本
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // 处理文本选择
    const handleTextSelect = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = (textarea as HTMLTextAreaElement).selectionStart;
        const end = (textarea as HTMLTextAreaElement).selectionEnd;

        if (start !== end) {
            const selectedText = (textarea as HTMLTextAreaElement).value.substring(start, end);
            setContextMenu(prev => ({
                ...prev,
                selectedText: selectedText
            }));
        }
    };

    // 处理鼠标释放事件
    const handleMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        // 简单实现：总是检查是否有文本选择
        setTimeout(handleTextSelect, 10);
    };

    // 处理右键菜单
    const handleContextMenu = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        handleTextSelect();

        if (contextMenu.selectedText && textareaRef.current) {
            // 获取文本区域的位置信息
            const textarea = textareaRef.current;
            const rect = textarea.getBoundingClientRect();

            // 计算菜单位置（相对于文本区域）
            const menuX = e.clientX - rect.left + 10;
            const menuY = e.clientY - rect.top - 10;

            setContextMenu(prev => ({
                ...prev,
                visible: true,
                x: menuX,
                y: menuY
            }));
        }
    };

    // 隐藏上下文菜单
    const hideContextMenu = () => {
        setContextMenu(prev => ({ ...prev, visible: false }));
    };

    // 发送选中文本给AI分析
    const analyzeSelectedText = async () => {
        if (!contextMenu.selectedText) return;

        hideContextMenu();
        setGeneration('');
        setSelectedTextForAnalysis(contextMenu.selectedText); // 保存选中的文本
        setIsLoading(true);
        setIsContextMenuLoading(true); // 设置右键菜单加载状态

        try {
            const response = await fetch('/api/extractCMPCompletion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: '请提取服化道,不需要解释，直接提取服装，化妆，道具元素，剧本如下：' + contextMenu.selectedText,
                }),
            });

            const json = await response.json();
            setGeneration(json.text);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
            setIsContextMenuLoading(false); // 重置右键菜单加载状态
        }
    };

    // 点击其他地方隐藏菜单
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // 如果点击的不是菜单本身，则隐藏菜单
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                hideContextMenu();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    placeholder='请输入剧本内容'
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    onSelect={handleTextSelect}
                    onMouseUp={handleMouseUp}
                    onContextMenu={handleContextMenu}
                    className="w-full h-288 p-4 border border-gray-300 rounded-md resize-none"
                />

                {/* 右键菜单 */}
                {contextMenu.visible && (
                    <div
                        ref={menuRef}
                        className="absolute bg-white border border-gray-300 rounded-md shadow-lg z-10 cursor-pointer"
                        style={{ left: contextMenu.x, top: contextMenu.y }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button
                            className="primary w-full px-4 py-2 text-sm hover:bg-blue-500 cursor-pointer flex items-center"
                            onClick={analyzeSelectedText}
                            disabled={isContextMenuLoading}
                        >
                            {isContextMenuLoading ? (
                                <>
                                    <span>分析中...</span>
                                    <svg className="animate-spin ml-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </>
                            ) : "发送给AI分析"}
                        </Button>
                    </div>
                )}
            </div>

            {/* 显示发送给AI的选中文本 */}
            {selectedTextForAnalysis && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">发送给AI的内容：</h3>
                    <textarea
                        value={selectedTextForAnalysis}
                        readOnly
                        className="w-full h-66 p-4 border border-gray-300 rounded-md resize-none bg-gray-50"
                    />
                </div>
            )}

            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer flex items-center"
                onClick={async () => {
                    if (!prompt) {
                        return;
                    }
                    setGeneration('');
                    setSelectedTextForAnalysis(''); // 清空之前选中的文本
                    setIsLoading(true);

                    await fetch('/api/extractCMPCompletion', {
                        method: 'POST',
                        body: JSON.stringify({
                            prompt: '请提取服化道,不需要解释，直接提取服装，化妆，道具元素，剧本如下：' + prompt,
                        }),
                    }).then(response => {
                        response.json().then(json => {
                            setGeneration(json.text);
                            setIsLoading(false);
                        });
                    });
                }}
            >
                {isLoading ? (
                    <>
                        <span>分析中...</span>
                        <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </>
                ) : "提取服化道"}
            </button>

            <div className='mt-4 w-full h-200 p-4 rounded-md resize-none border border-gray-300 overflow-auto'>
                <article className='prose prose-slate max-w-none'>
                    <ReactMarkdown>{generation}</ReactMarkdown>
                </article>
            </div>
        </div>
    );
}