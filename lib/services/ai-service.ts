import OpenAI from "openai"
import { getPromptForMode } from "@/lib/prompts"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export type GenerationMode =
  | "executive_summary"
  | "data_analysis"
  | "recommendations"
  | "policy_language"
  | "consulting_tone"
  | "make_professional"
  | "more_concise"
  | "add_data"
  | "executive_tone"

export interface GenerateRequest {
  mode: GenerationMode
  content: string
  templateId: string
  sectionTitle?: string
  context?: string
}

export interface UsageStats {
  generationsToday: number
  generationsThisMonth: number
  documentsCount: number
  limit: number
}

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT = {
  requestsPerMinute: 10,
  requestsPerDay: 100,
}

export const aiService = {
  async checkRateLimit(userId: string): Promise<boolean> {
    const now = Date.now()
    const userLimit = rateLimitStore.get(userId)

    if (!userLimit || userLimit.resetAt < now) {
      rateLimitStore.set(userId, {
        count: 1,
        resetAt: now + 60000, // Reset after 1 minute
      })
      return true
    }

    if (userLimit.count >= RATE_LIMIT.requestsPerMinute) {
      return false
    }

    userLimit.count++
    return true
  },

  async generate(request: GenerateRequest): Promise<ReadableStream> {
    const { mode, content, templateId, sectionTitle } = request

    // Get the appropriate prompt based on mode and template
    const systemPrompt = getPromptForMode(mode, templateId)
    
    const userPrompt = sectionTitle
      ? `Section: ${sectionTitle}\n\nContent to work with:\n${content}`
      : content


    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Return mock stream for development
      return createMockStream(mode, content, templateId)
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
        max_tokens: 2000,
        temperature: 0.7,
      })

      // Convert OpenAI stream to ReadableStream
      const encoder = new TextEncoder()
      
      return new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of response) {
              const content = chunk.choices[0]?.delta?.content || ""
              if (content) {
                const data = JSON.stringify({ content })
                controller.enqueue(encoder.encode(`data: ${data}\n\n`))
              }
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"))
            controller.close()
          } catch (error) {
            controller.error(error)
          }
        },
      })
    } catch (error) {
      console.error("OpenAI API error:", error)
      throw new Error(transformError(error))
    }
  },
}

// Transform OpenAI errors to user-friendly messages
function transformError(error: unknown): string {
  if (error instanceof OpenAI.APIError) {
    switch (error.status) {
      case 401:
        return "AI service authentication failed. Please check your API key."
      case 429:
        return "Too many requests. Please wait a moment and try again."
      case 500:
      case 502:
      case 503:
        return "AI service is temporarily unavailable. Please try again later."
      default:
        return "An error occurred with the AI service. Please try again."
    }
  }
  return "An unexpected error occurred. Please try again."
}

// Mock stream for development without API key
function createMockStream(mode: string, content: string, templateId: string): ReadableStream {
  const mockResponses: Record<string, string> = {
    executive_summary: `Based on the analysis, this document presents a comprehensive overview of the key strategic initiatives and their expected outcomes. The primary recommendations focus on three critical areas: operational efficiency, market expansion, and digital transformation.

Key findings indicate a 23% improvement opportunity in current processes, with projected ROI of 2.4x within 18 months. Stakeholder alignment remains strong, with 87% executive support for the proposed changes.

Immediate next steps include: (1) Finalizing the implementation roadmap, (2) Securing budget allocation, and (3) Establishing governance framework.`,
    
    data_analysis: `The quantitative analysis reveals several significant trends:

• Revenue Growth: 15.3% YoY increase, outpacing industry average of 8.7%
• Market Share: Expanded from 12.4% to 14.8% in target segments
• Customer Retention: Improved to 94.2%, up from 89.1% baseline
• Operational Costs: Reduced by $2.3M through process optimization

Statistical significance (p < 0.05) confirmed for all primary metrics. Correlation analysis shows strong relationship (r = 0.82) between customer satisfaction scores and retention rates.`,
    
    recommendations: `Strategic Recommendations:

1. **Accelerate Digital Transformation** (High Priority)
   - Timeline: Q1-Q2 2024
   - Investment: $1.2M
   - Expected Impact: 18% efficiency gain

2. **Expand Market Presence** (Medium Priority)
   - Focus on emerging markets in Southeast Asia
   - Partnership-led growth strategy
   - Target: 3 new markets by end of year

3. **Enhance Customer Experience** (High Priority)
   - Implement AI-powered support
   - Reduce response time by 40%
   - NPS target: 72 (from current 58)`,
    
    make_professional: content.length > 0 
      ? `${content.split('.')[0]}. This analysis demonstrates the strategic importance of the initiative, supported by comprehensive data and stakeholder input. The findings align with organizational objectives and industry best practices.`
      : "Please provide content to enhance.",
    
    more_concise: content.length > 50
      ? content.substring(0, Math.floor(content.length * 0.6)) + "..."
      : content,
  }

  const responseText = mockResponses[mode] || mockResponses.executive_summary
  const words = responseText.split(" ")
  const encoder = new TextEncoder()

  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i++) {
        const word = words[i] + (i < words.length - 1 ? " " : "")
        const data = JSON.stringify({ content: word })
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        await new Promise(resolve => setTimeout(resolve, 30))
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"))
      controller.close()
    },
  })
}
