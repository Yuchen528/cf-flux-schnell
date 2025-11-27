import { z } from 'zod';

// 1. 定义请求参数规则（校验提示词、生成步数）
const GenerateImageSchema = z.object({
  prompt: z.string().min(1, '提示词不能为空').max(2048, '提示词最多2048字符'),
  steps: z.number().int().min(1).max(8).default(4).optional(), // FLUX最快4步，质量足够
});

// 2. 声明环境变量类型（Cloudflare AI绑定的类型）
export interface Env {
  AI: Ai; // 对应wrangler.jsonc中的"AI"绑定
}

// 3. 核心请求处理逻辑
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 只允许POST请求（模型调用需要传参数，POST更安全）
    if (request.method !== 'POST') {
      return new Response('仅支持POST请求', { status: 405 });
    }

    try {
      // 解析并校验请求参数（避免非法输入导致报错）
      const requestBody = await request.json();
      const validParams = GenerateImageSchema.parse(requestBody);

      // 调用Cloudflare Workers AI的FLUX.1-schnell模型
      const aiResponse = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', validParams);

      // 返回结果（Base64格式，n8n/Postman可直接使用）
      return Response.json({
        success: true,
        prompt: validParams.prompt,
        imageBase64: aiResponse.image, // 图片的Base64编码（关键返回值）
        steps: validParams.steps
      });
    } catch (error) {
      // 错误处理（返回具体报错信息，方便排查）
      return Response.json({
        success: false,
        error: (error as Error).message
      }, { status: 400 });
    }
  },
} satisfies ExportedHandler<Env>;