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
    system: "你是一个专业的剧本分析师，专门提取剧本中的服化道信息。请严格按照以下格式提取并输出：\n\n## 服装\n- 角色A: [服装描述]\n- 角色B: [服装描述]\n\n## 化妆\n- 角色A: [化妆描述]\n- 角色B: [化妆描述]\n\n## 道具\n- [道具1]: [使用场景]\n- [道具2]: [使用场景]\n\n只输出以上信息，不要添加任何分析或解释。",
    prompt: prompt,
  });

  return result.toUIMessageStreamResponse();
}