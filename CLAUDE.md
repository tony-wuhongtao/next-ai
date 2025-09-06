# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js AI application platform built with:
- Next.js 15.5.2 (App Router)
- Vercel AI SDK
- Tailwind CSS with shadcn/ui components
- TypeScript
- AI providers: DashScope (Aliyun) and Vercel AI Gateway

## Key Features
1. Multiple AI chat implementations:
   - Basic chat with DashScope Deepseek-R1
   - Vercel AI Gateway chat with model selection
   - Custom chat with user avatar and reasoning display
2. Specialized AI functions:
   - Costume, Makeup, and Props (服化道) extraction from scripts
   - Stream-based response processing

## Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Project Structure
- `/app` - Next.js App Router pages and API routes
- `/components` - Reusable UI components
- `/components/ai-elements` - AI-specific UI components (conversation, message, etc.)
- `/app/api` - API routes for AI functionality
- `/lib` - Utility functions
- `/public` - Static assets

## AI Integration Details
- Uses `@ai-sdk/openai-compatible` for DashScope integration
- Uses Vercel AI Gateway for model abstraction
- Main models: Deepseek-R1 (chat), Deepseek-V3.1 (服化道 extraction)
- API keys configured in `.env.local`

## Code Architecture
1. **Frontend Components**: Built with React Server Components and Client Components
2. **AI Hooks**: Uses `useChat` and `useCompletion` from Vercel AI SDK
3. **API Routes**: Server-side API endpoints that interface with AI providers
4. **State Management**: React state hooks for UI interactions
5. **Styling**: Tailwind CSS with shadcn/ui component library

## Key Files
- `app/page.tsx` - Main landing page with feature navigation
- `app/api/chat/route.ts` - Basic chat API endpoint
- `app/api/chatbot/route.ts` - Vercel AI Gateway chat endpoint
- `app/api/extractCMPCompletion/route.ts` - 服化道 extraction endpoint
- `components/ai-elements/` - AI UI component library

## Environment Variables
- `DASHSCOPE_API_KEY` - API key for DashScope services
- `AI_GATEWAY_API_KEY` - API key for Vercel AI Gateway

## Testing
No specific test framework configured. Use standard Next.js development practices.
- 项目使用的事next.js v15.5.2 和tailwindcss v4