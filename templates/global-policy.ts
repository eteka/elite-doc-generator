export const globalPolicyTemplate = {
  id: "global-policy",
  name: "Global Policy",
  category: "Policy",
  description: "Evidence-based structure for policy analysis and recommendations",
  colorScheme: {
    primary: "#0d9488", // Teal
    secondary: "#14b8a6",
    accent: "#06b6d4",
    background: "#f0fdfa",
    text: "#134e4a"
  },
  fonts: {
    primary: "Inter",
    secondary: "Georgia"
  },
  layout: "evidence-based",
  sections: [
    {
      id: "policy-brief-header",
      title: "Policy Brief Header",
      type: "header",
      content: `
# POLICY BRIEF
## [Policy Title]

**Issue Area:** [Policy Domain]  
**Geographic Scope:** [Region/Country]  
**Date:** [Date]  
**Authors:** [Names and Affiliations]

### Key Messages
- **Primary Recommendation:** [Main policy recommendation]
- **Evidence Base:** [Type of evidence supporting recommendation]
- **Target Audience:** [Policymakers, stakeholders]

### Executive Summary
[2-3 sentence summary of the policy issue, evidence, and recommended action]
      `,
      styling: {
        layout: "header-focused",
        components: ["policy-header", "key-messages-box"]
      }
    },
    {
      id: "context",
      title: "Context & Background",
      type: "context",
      content: `
# Context & Background

## Policy Challenge
[Detailed description of the policy problem or opportunity]

## Current Policy Landscape
- **Existing Policies:** [List current relevant policies]
- **Policy Gaps:** [Identify gaps in current approach]
- **Stakeholder Positions:** [Key stakeholder views]

## International Context
| Country/Region | Policy Approach | Outcomes | Lessons Learned |
|----------------|-----------------|----------|-----------------|
| [Country 1] | [Approach] | [Results] | [Insights] |
| [Country 2] | [Approach] | [Results] | [Insights] |
| [Country 3] | [Approach] | [Results] | [Insights] |

> **Key Finding:** [Highlight most important contextual insight]
      `,
      styling: {
        layout: "comparative-table",
        components: ["comparison-table", "callout-boxes"]
      }
    },
    {
      id: "evidence-analysis",
      title: "Evidence Analysis",
      type: "analysis",
      content: `
# Evidence Analysis

## Research Methodology
- **Data Sources:** [Primary and secondary sources]
- **Analysis Period:** [Time frame]
- **Sample Size:** [If applicable]
- **Limitations:** [Methodological constraints]

## Key Findings

### Statistical Evidence
| Indicator | Baseline | Current | Target | Source |
|-----------|----------|---------|--------|--------|
| [Metric 1] | [Value] | [Value] | [Value] | [Source] |
| [Metric 2] | [Value] | [Value] | [Value] | [Source] |
| [Metric 3] | [Value] | [Value] | [Value] | [Source] |

### Qualitative Insights
- **Stakeholder Feedback:** [Summary of interviews/surveys]
- **Case Study Results:** [Key findings from case studies]
- **Expert Opinions:** [Academic/practitioner perspectives]

> **Critical Evidence:** [Highlight most compelling evidence point]

## Evidence Quality Assessment
- **Strength of Evidence:** [High/Medium/Low]
- **Confidence Level:** [Percentage]
- **Peer Review Status:** [Yes/No/Pending]
      `,
      styling: {
        layout: "data-heavy",
        components: ["statistical-sidebar", "evidence-quality-meter"]
      }
    },
    {
      id: "recommendations",
      title: "Policy Recommendations",
      type: "recommendations",
      content: `
# Policy Recommendations

## Primary Recommendation
**[Main Policy Recommendation]**

### Implementation Details
- **Mechanism:** [How the policy would work]
- **Timeline:** [Implementation schedule]
- **Responsible Agencies:** [Who would implement]
- **Budget Requirements:** [Cost estimates]

## Supporting Recommendations

### Recommendation 1: [Title]
- **Rationale:** [Why this is needed]
- **Implementation:** [How to execute]
- **Success Metrics:** [How to measure success]

### Recommendation 2: [Title]
- **Rationale:** [Why this is needed]
- **Implementation:** [How to execute]
- **Success Metrics:** [How to measure success]

### Recommendation 3: [Title]
- **Rationale:** [Why this is needed]
- **Implementation:** [How to execute]
- **Success Metrics:** [How to measure success]

## Implementation Priorities
1. **Immediate (0-6 months):** [Actions]
2. **Short-term (6-18 months):** [Actions]
3. **Long-term (18+ months):** [Actions]
      `,
      styling: {
        layout: "recommendation-focused",
        components: ["priority-timeline", "implementation-cards"]
      }
    },
    {
      id: "impact-assessment",
      title: "Impact Assessment",
      type: "impact",
      content: `
# Impact Assessment

## Projected Outcomes

### Quantitative Impacts
| Impact Category | Baseline | 1 Year | 3 Years | 5 Years |
|-----------------|----------|--------|---------|---------|
| [Economic Impact] | [Value] | [Value] | [Value] | [Value] |
| [Social Impact] | [Value] | [Value] | [Value] | [Value] |
| [Environmental Impact] | [Value] | [Value] | [Value] | [Value] |

### Qualitative Benefits
- **[Benefit Category 1]:** [Description of expected improvements]
- **[Benefit Category 2]:** [Description of expected improvements]
- **[Benefit Category 3]:** [Description of expected improvements]

## Risk Analysis
| Risk Factor | Probability | Impact | Mitigation Strategy |
|-------------|-------------|--------|-------------------|
| [Risk 1] | [High/Med/Low] | [High/Med/Low] | [Strategy] |
| [Risk 2] | [High/Med/Low] | [High/Med/Low] | [Strategy] |
| [Risk 3] | [High/Med/Low] | [High/Med/Low] | [Strategy] |

## Cost-Benefit Analysis
- **Total Implementation Cost:** $[Amount]
- **Annual Operating Cost:** $[Amount]
- **Projected Benefits (5-year):** $[Amount]
- **Net Present Value:** $[Amount]
- **Return on Investment:** [Percentage]

> **Bottom Line:** [Summary of cost-benefit conclusion]
      `,
      styling: {
        layout: "impact-metrics",
        components: ["impact-dashboard", "cost-benefit-chart"]
      }
    }
  ]
};