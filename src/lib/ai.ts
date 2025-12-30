import { AIGenerationRequest, AIGenerationResponse } from '@/types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const SYSTEM_PROMPT = `You are an elite professional document writer with expertise in strategic consulting, policy analysis, and business communications. Your writing style is:

1. PROFESSIONAL: Use precise, clear language appropriate for C-suite executives and senior stakeholders
2. STRUCTURED: Organize content with clear hierarchies, bullet points, and logical flow
3. EVIDENCE-BASED: Ground arguments in data, research, and concrete examples
4. ACTIONABLE: Focus on practical insights and clear recommendations
5. CONCISE: Deliver maximum value with minimum words - every sentence should earn its place

When writing:
- Use active voice and strong verbs
- Lead with insights, not descriptions
- Quantify impact wherever possible
- Avoid jargon unless industry-standard
- Structure content for easy scanning
- Include specific, actionable recommendations

Format your responses in clean Markdown with appropriate headers, bullet points, and emphasis.`;

export async function generateContent(
  request: AIGenerationRequest,
  apiKey: string
): Promise<AIGenerationResponse> {
  const messages: OpenAIMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
  ];

  if (request.context) {
    messages.push({
      role: 'user',
      content: `Context for the document:\n${request.context}`,
    });
  }

  messages.push({
    role: 'user',
    content: request.prompt,
  });

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages,
      max_tokens: request.maxTokens || 2000,
      temperature: request.temperature || 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API request failed: ${response.status}`);
  }

  const data: OpenAIResponse = await response.json();

  return {
    content: data.choices[0]?.message.content || '',
    usage: {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
    },
  };
}

export async function generateSectionContent(
  sectionPrompt: string,
  topic: string,
  documentContext: string,
  apiKey: string
): Promise<string> {
  const prompt = sectionPrompt.replace('{topic}', topic);

  const response = await generateContent(
    {
      prompt,
      context: documentContext,
      maxTokens: 1500,
      temperature: 0.7,
    },
    apiKey
  );

  return response.content;
}

export async function improveContent(
  content: string,
  instruction: string,
  apiKey: string
): Promise<string> {
  const response = await generateContent(
    {
      prompt: `Please improve the following content based on this instruction: "${instruction}"\n\nOriginal content:\n${content}`,
      maxTokens: 2000,
      temperature: 0.6,
    },
    apiKey
  );

  return response.content;
}

export async function generateChartData(
  description: string,
  apiKey: string
): Promise<string> {
  const response = await generateContent(
    {
      prompt: `Generate realistic sample data for a chart based on this description: "${description}"

Return the data as a JSON array with objects containing 'name' and 'value' properties. Include 5-8 data points.
Only return the JSON array, no additional text.

Example format:
[{"name": "Category A", "value": 45}, {"name": "Category B", "value": 62}]`,
      maxTokens: 500,
      temperature: 0.5,
    },
    apiKey
  );

  return response.content;
}
