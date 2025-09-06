import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateObject } from 'ai';
import { z } from 'zod';

const provider = createOpenAICompatible({
  name: 'provider-name',
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  includeUsage: true, // Include usage information in streaming responses
});

export async function POST(req: Request) {

  const { prompt }: { prompt: string } = await req.json();

  // 确保prompt中包含"json"关键词以满足DashScope API要求
  const modifiedPrompt = `你是一个专业的剧本分析师，专门提取剧本中的信息。请严格按照以下JSON格式提取剧本中人物对应的服装、化妆、道具信息：

输出格式要求：
{
  "characters": [
    {
      "name": "人物姓名",
      "costume": "服装描述",
      "makeup": "化妆描述",
      "props": "道具描述"
    }
  ]
}

重要：只输出有效的JSON，不要包含任何其他文本、解释或格式。

剧本内容：
${prompt}`;

  const result = await generateObject({
    model: provider('qwen-plus'),
    system:  '你是一个专业的剧本分析师，专门提取剧本中的信息。你必须严格按照指定的JSON Schema格式输出，不要添加任何额外的文本或解释。只输出有效的JSON数据。严格遵循以下格式：{"characters": [{"name": "人物姓名", "costume": "服装描述", "makeup": "化妆描述", "props": "道具描述"}]}',
    prompt: modifiedPrompt,
    schema: z.object({
      "characters": z.array(z.object({
        "name": z.string().describe('人物姓名'),
        "costume": z.string().describe('服装描述'),
        "makeup": z.string().describe('化妆描述'),
        "props": z.string().describe('道具描述'),
      })).describe('人物列表'),
    })
  });

  // console.log(result);
  return new Response(JSON.stringify(result.object), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}