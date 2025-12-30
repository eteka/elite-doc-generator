export const executiveBriefingTemplate = {
  id: "executive-briefing",
  name: "Executive Briefing",
  category: "Executive",
  description: "Ultra-concise format for executive-level communications",
  colorScheme: {
    primary: "#0f172a", // Rich black
    secondary: "#334155",
    accent: "#dc2626", // Bold red
    background: "#ffffff",
    text: "#0f172a"
  },
  fonts: {
    primary: "Inter",
    secondary: "Inter"
  },
  layout: "ultra-concise",
  sections: [
    {
      id: "executive-summary",
      title: "Executive Summary",
      type: "single-page",
      content: `
# EXECUTIVE BRIEFING
## [Topic/Project Name]

### THE SITUATION
[One sentence describing the current situation or challenge]

### THE RECOMMENDATION  
[One sentence with the primary recommendation or decision needed]

### THE IMPACT
[One sentence quantifying the expected impact or outcome]

---

## KEY METRICS
| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| **[Metric 1]** | [Value] | [Value] | [Date] |
| **[Metric 2]** | [Value] | [Value] | [Date] |
| **[Metric 3]** | [Value] | [Value] | [Date] |

## CRITICAL DECISIONS NEEDED
1. **[Decision 1]** - *Due: [Date]*
2. **[Decision 2]** - *Due: [Date]*
3. **[Decision 3]** - *Due: [Date]*

## NEXT STEPS
- [ ] **[Action 1]** - Owner: [Name] - Due: [Date]
- [ ] **[Action 2]** - Owner: [Name] - Due: [Date]
- [ ] **[Action 3]** - Owner: [Name] - Due: [Date]
      `,
      styling: {
        layout: "single-page-dense",
        components: ["metrics-dashboard", "decision-alerts"]
      }
    },
    {
      id: "situation-analysis",
      title: "Situation Analysis",
      type: "single-page",
      content: `
# SITUATION ANALYSIS

## CURRENT STATE
**Challenge:** [Primary challenge in one sentence]  
**Root Cause:** [Core issue driving the challenge]  
**Urgency Level:** [High/Medium/Low] - [Reason]

## KEY STAKEHOLDERS
| Stakeholder | Position | Impact | Influence |
|-------------|----------|--------|-----------|
| [Name/Role] | [For/Against/Neutral] | [High/Med/Low] | [High/Med/Low] |
| [Name/Role] | [For/Against/Neutral] | [High/Med/Low] | [High/Med/Low] |
| [Name/Role] | [For/Against/Neutral] | [High/Med/Low] | [High/Med/Low] |

## CRITICAL SUCCESS FACTORS
1. **[Factor 1]** - [Why it's critical]
2. **[Factor 2]** - [Why it's critical]  
3. **[Factor 3]** - [Why it's critical]

## RISKS & MITIGATION
- **High Risk:** [Risk] → [Mitigation]
- **Medium Risk:** [Risk] → [Mitigation]
- **Low Risk:** [Risk] → [Mitigation]

## COMPETITIVE LANDSCAPE
**Our Position:** [Market position in one sentence]  
**Key Competitors:** [Top 3 competitors and their advantages]  
**Competitive Advantage:** [Our unique differentiator]
      `,
      styling: {
        layout: "stakeholder-matrix",
        components: ["stakeholder-grid", "risk-indicators"]
      }
    },
    {
      id: "financial-impact",
      title: "Financial Impact",
      type: "single-page",
      content: `
# FINANCIAL IMPACT

## INVESTMENT REQUIRED
**Total Investment:** $[Amount]  
**Payback Period:** [Months/Years]  
**ROI:** [Percentage] over [Time Period]

## COST BREAKDOWN
| Category | Amount | % of Total | Timing |
|----------|--------|------------|--------|
| [Category 1] | $[Amount] | [X]% | [When] |
| [Category 2] | $[Amount] | [X]% | [When] |
| [Category 3] | $[Amount] | [X]% | [When] |
| **TOTAL** | **$[Amount]** | **100%** | |

## REVENUE IMPACT
- **Year 1:** $[Amount] ([X]% increase)
- **Year 2:** $[Amount] ([X]% increase)  
- **Year 3:** $[Amount] ([X]% increase)

## COST SAVINGS
- **Operational Savings:** $[Amount]/year
- **Efficiency Gains:** $[Amount]/year
- **Risk Reduction:** $[Amount]/year

## FUNDING SOURCE
**Recommended:** [Budget line item or funding source]  
**Approval Required:** [Who needs to approve]  
**Budget Impact:** [Impact on current budget]

## FINANCIAL SCENARIOS
| Scenario | Probability | NPV | IRR |
|----------|-------------|-----|-----|
| **Best Case** | [X]% | $[Amount] | [X]% |
| **Base Case** | [X]% | $[Amount] | [X]% |
| **Worst Case** | [X]% | $[Amount] | [X]% |
      `,
      styling: {
        layout: "financial-dashboard",
        components: ["investment-summary", "scenario-comparison"]
      }
    },
    {
      id: "implementation-plan",
      title: "Implementation Plan",
      type: "single-page",
      content: `
# IMPLEMENTATION PLAN

## TIMELINE OVERVIEW
**Start Date:** [Date]  
**Go-Live Date:** [Date]  
**Total Duration:** [X] weeks

## PHASE BREAKDOWN
### Phase 1: [Name] ([Duration])
- **Objective:** [One sentence objective]
- **Key Deliverables:** [Bullet list]
- **Success Criteria:** [How to measure success]

### Phase 2: [Name] ([Duration])  
- **Objective:** [One sentence objective]
- **Key Deliverables:** [Bullet list]
- **Success Criteria:** [How to measure success]

### Phase 3: [Name] ([Duration])
- **Objective:** [One sentence objective]  
- **Key Deliverables:** [Bullet list]
- **Success Criteria:** [How to measure success]

## RESOURCE REQUIREMENTS
| Role | FTE | Duration | Cost |
|------|-----|----------|------|
| [Role 1] | [X] | [Duration] | $[Amount] |
| [Role 2] | [X] | [Duration] | $[Amount] |
| [Role 3] | [X] | [Duration] | $[Amount] |

## CRITICAL MILESTONES
- **[Milestone 1]** - [Date] - [Owner]
- **[Milestone 2]** - [Date] - [Owner]  
- **[Milestone 3]** - [Date] - [Owner]

## SUCCESS METRICS
- **[Metric 1]:** [Target] by [Date]
- **[Metric 2]:** [Target] by [Date]
- **[Metric 3]:** [Target] by [Date]
      `,
      styling: {
        layout: "implementation-timeline",
        components: ["milestone-tracker", "resource-allocation"]
      }
    }
  ]
};