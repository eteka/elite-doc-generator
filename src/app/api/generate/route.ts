import { NextRequest, NextResponse } from 'next/server';
import { generateContent, generateSectionContent, improveContent } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, apiKey, ...params } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    let result: string;

    switch (action) {
      case 'generate':
        const generateResponse = await generateContent(
          {
            prompt: params.prompt,
            context: params.context,
            maxTokens: params.maxTokens,
            temperature: params.temperature,
          },
          apiKey
        );
        result = generateResponse.content;
        break;

      case 'generateSection':
        result = await generateSectionContent(
          params.sectionPrompt,
          params.topic,
          params.documentContext,
          apiKey
        );
        break;

      case 'improve':
        result = await improveContent(params.content, params.instruction, apiKey);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ content: result });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
