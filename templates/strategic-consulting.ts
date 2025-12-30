export const strategicConsultingTemplate = {
  id: "strategic-consulting",
  name: "Strategic Consulting",
  category: "Consulting",
  description: "Clean minimalist design for strategic consulting presentations",
  colorScheme: {
    primary: "#475569", // Blue-gray
    secondary: "#64748b",
    accent: "#0ea5e9",
    background: "#f8fafc",
    text: "#1e293b"
  },
  fonts: {
    primary: "Inter",
    secondary: "Inter"
  },
  layout: "minimalist",
  sections: [
    {
      id: "cover",
      title: "Cover Page",
      type: "cover",
      content: `
# [PROJECT TITLE]
## Strategic Consulting Engagement

**Prepared for:** [Client Name]  
**Prepared by:** [Consultant Name]  
**Date:** [Date]

---

*Confidential & Proprietary*
      `,
      styling: {
        layout: "center-aligned",
        background: "gradient-blue-gray"
      }
    },
    {
      id: "executive-summary",
      title: "Executive Summary",
      type: "summary",
      content: `
# Executive Summary

## Key Insights
- **Strategic Challenge:** [Primary challenge identified]
- **Recommended Approach:** [High-level solution]
- **Expected Impact:** [Quantified outcomes]

## Critical Success Factors
1. [Factor 1]
2. [Factor 2]
3. [Factor 3]

## Investment Required
**Total Engagement:** $[Amount]  
**Timeline:** [Duration]  
**ROI Projection:** [Percentage]
      `,
      styling: {
        layout: "two-column",
        components: ["key-metrics-box"]
      }
    },
    {
      id: "problem-analysis",
      title: "Problem Analysis",
      type: "analysis",
      content: `
# Problem Analysis

## Current State Assessment

### 2x2 Analysis Matrix
|  | **High Impact** | **Low Impact** |
|--|--|--|
| **High Effort** | [Quadrant 1] | [Quadrant 2] |
| **Low Effort** | [Quadrant 3] | [Quadrant 4] |

## Root Cause Analysis
- **Primary Causes**
  - [Cause 1]
  - [Cause 2]
- **Contributing Factors**
  - [Factor 1]
  - [Factor 2]

## Impact Assessment
- **Financial Impact:** $[Amount]
- **Operational Impact:** [Description]
- **Strategic Impact:** [Description]
      `,
      styling: {
        layout: "matrix-focus",
        components: ["2x2-matrix", "impact-cards"]
      }
    },
    {
      id: "solution-framework",
      title: "Solution Framework",
      type: "framework",
      content: `
# Solution Framework

## Strategic Approach

### Chevron Process Flow
**Phase 1** → **Phase 2** → **Phase 3** → **Phase 4**
*Analysis* → *Design* → *Implementation* → *Optimization*

## Core Components
1. **[Component 1]**
   - Objective: [Description]
   - Key Activities: [List]
   
2. **[Component 2]**
   - Objective: [Description]
   - Key Activities: [List]

3. **[Component 3]**
   - Objective: [Description]
   - Key Activities: [List]

## Success Metrics
- **Metric 1:** [Target]
- **Metric 2:** [Target]
- **Metric 3:** [Target]
      `,
      styling: {
        layout: "process-flow",
        components: ["chevron-flow", "metric-cards"]
      }
    },
    {
      id: "implementation-roadmap",
      title: "Implementation Roadmap",
      type: "roadmap",
      content: `
# Implementation Roadmap

## Timeline Overview
**Total Duration:** [X] months

### Phase 1: Foundation (Months 1-2)
- [ ] [Milestone 1]
- [ ] [Milestone 2]
- [ ] [Milestone 3]

### Phase 2: Development (Months 3-4)
- [ ] [Milestone 1]
- [ ] [Milestone 2]
- [ ] [Milestone 3]

### Phase 3: Deployment (Months 5-6)
- [ ] [Milestone 1]
- [ ] [Milestone 2]
- [ ] [Milestone 3]

## Resource Requirements
| Phase | Team Size | Key Roles | Budget |
|-------|-----------|-----------|--------|
| Phase 1 | [Number] | [Roles] | $[Amount] |
| Phase 2 | [Number] | [Roles] | $[Amount] |
| Phase 3 | [Number] | [Roles] | $[Amount] |
      `,
      styling: {
        layout: "timeline",
        components: ["gantt-chart", "resource-table"]
      }
    },
    {
      id: "next-steps",
      title: "Next Steps",
      type: "action",
      content: `
# Next Steps

## Immediate Actions (Next 30 Days)
1. **[Action 1]**
   - Owner: [Name]
   - Due Date: [Date]
   
2. **[Action 2]**
   - Owner: [Name]
   - Due Date: [Date]

## Decision Points
- **[Decision 1]:** [Description] - *Due: [Date]*
- **[Decision 2]:** [Description] - *Due: [Date]*

## Engagement Proposal
**Recommended Engagement Model:** [Type]  
**Proposed Start Date:** [Date]  
**Key Stakeholders:** [List]

---

*Ready to proceed? Contact [Name] at [Email]*
      `,
      styling: {
        layout: "action-focused",
        components: ["action-cards", "contact-cta"]
      }
    }
  ]
};