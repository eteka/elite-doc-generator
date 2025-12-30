import { NextRequest, NextResponse } from "next/server";
import { getPromptForTemplate } from "@/lib/prompts";

export const runtime = "edge";

// This is a mock implementation. In production, you would integrate with OpenAI, Anthropic, or another LLM provider
export async function POST(request: NextRequest) {
  try {
    const { mode, content, templateId, sectionTitle } = await request.json();

    if (!mode || !content) {
      return NextResponse.json(
        { error: "Missing required fields: mode and content" },
        { status: 400 }
      );
    }

    // Generate the prompt based on template and mode
    const prompt = getPromptForTemplate(templateId || "business-proposal", mode, content);

    // In production, replace this with actual AI API call
    // Example with OpenAI:
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [{ role: "user", content: prompt }],
    //   stream: true,
    // });

    // For now, return a mock streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Mock AI-generated content based on mode
        const mockContent = generateMockContent(mode, content, sectionTitle);
        
        // Simulate streaming by sending chunks
        const words = mockContent.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? " " : "");
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

function generateMockContent(mode: string, content: string, sectionTitle?: string): string {
  // Mock content generation based on mode
  const mockResponses: Record<string, string> = {
    executive_summary: `This initiative represents a strategic opportunity to drive significant value creation through operational excellence and market expansion. Our analysis indicates a potential ROI of 25-30% over a 3-year period, with key value drivers including process optimization, technology enablement, and strategic partnerships. Critical success factors include executive sponsorship, cross-functional alignment, and phased implementation approach. Immediate action is required to capitalize on current market conditions and competitive positioning.`,
    
    data_analysis: `Analysis of the current data reveals three key trends: (1) Market growth rate of 15% CAGR over the past 3 years, significantly outpacing industry average of 8%, (2) Customer acquisition costs have decreased by 22% while lifetime value increased by 35%, indicating improved efficiency, and (3) Geographic expansion into emerging markets shows 40% higher margins compared to mature markets. These metrics suggest strong fundamentals and scalable growth potential.`,
    
    recommendations: `Based on our analysis, we recommend the following strategic actions:

1. **Accelerate Digital Transformation** - Invest $2M in cloud infrastructure and automation tools to reduce operational costs by 30% within 18 months. Priority: High. Timeline: Q1-Q2 2024.

2. **Expand Strategic Partnerships** - Establish 3-5 key partnerships in adjacent markets to access new customer segments. Expected revenue impact: $5M annually. Priority: High. Timeline: Q2-Q3 2024.

3. **Optimize Resource Allocation** - Reallocate 20% of budget from low-performing initiatives to high-growth areas. Expected efficiency gain: 25%. Priority: Medium. Timeline: Q3 2024.`,
    
    policy_language: `Empirical evidence suggests that the proposed policy framework would yield significant positive outcomes across multiple dimensions. International comparisons indicate that similar interventions have resulted in measurable improvements in key indicators, with effect sizes ranging from 15-25% depending on implementation context. The policy instruments outlined herein are designed to address identified gaps while maintaining coherence with existing regulatory mechanisms. Stakeholder consultation has revealed broad support, though implementation challenges related to resource constraints and institutional capacity must be carefully managed.`,
    
    consulting_tone: `Our strategic assessment reveals three critical imperatives for value creation: First, operational excellence through process optimization and technology enablement can unlock 20-30% efficiency gains. Second, market positioning must evolve to capture emerging opportunities in high-growth segments. Third, organizational capabilities require targeted investment to support scaled execution. The recommended approach leverages proven frameworks while adapting to your unique context. Key success factors include executive alignment, phased implementation, and rigorous performance management.`,
    
    make_professional: `The proposed initiative demonstrates significant strategic merit and aligns closely with organizational objectives. Our comprehensive analysis indicates substantial value creation potential through systematic implementation of best practices and targeted capability development. Key stakeholders have expressed strong support for the recommended approach, which balances ambition with pragmatic execution considerations. We recommend proceeding with the outlined strategy while maintaining flexibility to adapt based on emerging insights and market dynamics.`,
    
    make_concise: `This initiative offers 25-30% ROI over 3 years through operational excellence and market expansion. Key drivers: process optimization, technology enablement, strategic partnerships. Critical success factors: executive sponsorship, cross-functional alignment, phased implementation. Immediate action required to capitalize on market conditions.`,
    
    add_data: `This initiative demonstrates strong potential with projected revenue growth of [15-20%] annually and cost reduction of [$2-3M] over [3 years]. Market analysis shows [65%] of target customers express interest, with [40%] indicating immediate purchase intent. Competitive benchmarking reveals our solution offers [30%] better value proposition compared to alternatives. Implementation timeline of [12-18 months] aligns with industry standards, with expected payback period of [24 months].`,
    
    executive_tone: `**Bottom Line:** Approve $5M investment for 25-30% ROI over 3 years.

**Key Decision:** Proceed with phased implementation starting Q1 2024.

**Critical Risks:** Market timing (Medium), execution capacity (Low), competitive response (Medium).

**Action Required:** Executive sponsor assignment by [Date]. Budget approval by [Date]. Team mobilization by [Date].

**Next Steps:** Detailed planning (2 weeks), stakeholder alignment (1 week), launch (Q1 2024).`
  };

  return mockResponses[mode] || `Generated content for ${sectionTitle || "this section"} using ${mode} mode. ${content.substring(0, 100)}...`;
}