# Next AI 基于next.js + Vercel AI SDK开发AI应用的起始项目
## 项目介绍
Next AI 是一个基于next.js + Vercel AI SDK开发AI应用的起始项目，项目采用next.js的最新版本，同时集成了Vercel AI SDK，提供了开发AI应用的基础功能。
## 初始化项目
1. 确保nodejs版本情况下，安装并初始化带有shadcn的Next.js项目
```bash
npx shadcn@latest init
```
2. 安装ai-elements
```bash
npx ai-elements@latest
```
3. 安装ai-sdk
```bash
npm install ai @ai-sdk/react @ai-sdk/openai zod
```
4. 创建env.local填入key（以阿里云为例），用openai-compatible
```bash
npm install @ai-sdk/openai-compatible
```

5. 或 使用AI Gateway
6. 安装ai-elements组件
```bash
npx ai-elements@latest add conversation message prompt-input response
```
7. 把ai-elements组件放到独立的文件夹中
8. ==chat==实现app/chat/page.tsx
9. ==实现chatbot
```bash
npm install ai @ai-sdk/react zod
npx ai-elements@latest add sources reasoning loader

``` 
移到ai-elements目录下
10. 注意修改useChat的api路径为/api/chatbot