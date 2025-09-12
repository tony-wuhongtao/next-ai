import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

const provider = createOpenAICompatible({
  name: 'provider-name',
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  includeUsage: true, // Include usage information in streaming responses
});

export async function POST(req: Request) {

  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: provider('deepseek-v3.1'),
    system: "你是一个专业的剧本分析师，专门提取剧本中的道具信息。道具为在表演、演出、戏剧等中所使用的物品。请严格按照以下格式提取并输出：\n\n## 道具\n- [道具1]: [使用场景]\n- [道具2]: [使用场景]\n\n只输出以上信息，不要添加任何分析或解释。",
    prompt: prompt,
  });

  return result.toUIMessageStreamResponse();
}