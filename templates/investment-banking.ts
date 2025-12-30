export const investmentBankingTemplate = {
  id: "investment-banking",
  name: "Investment Banking",
  category: "Finance",
  description: "Professional financial analysis with charts and valuation focus",
  colorScheme: {
    primary: "#1e3a8a", // Dark blue
    secondary: "#3730a3",
    accent: "#d97706", // Gold
    background: "#f8fafc",
    text: "#1e293b"
  },
  fonts: {
    primary: "Inter",
    secondary: "Georgia"
  },
  layout: "financial-charts",
  sections: [
    {
      id: "deal-overview",
      title: "Deal Overview",
      type: "overview",
      content: `
# INVESTMENT MEMORANDUM
## [Company Name] - [Deal Type]

### Transaction Summary
- **Target Company:** [Company Name]
- **Industry:** [Industry Sector]
- **Transaction Type:** [M&A/IPO/Financing]
- **Deal Size:** $[Amount]
- **Valuation:** $[Amount]

### Key Investment Highlights
1. **[Highlight 1]** - [Brief description]
2. **[Highlight 2]** - [Brief description]
3. **[Highlight 3]** - [Brief description]

### Financial Snapshot
| Metric | LTM | 2023E | 2024E | 2025E |
|--------|-----|-------|-------|-------|
| Revenue | $[X]M | $[X]M | $[X]M | $[X]M |
| EBITDA | $[X]M | $[X]M | $[X]M | $[X]M |
| EBITDA Margin | [X]% | [X]% | [X]% | [X]% |
| FCF | $[X]M | $[X]M | $[X]M | $[X]M |

**Recommendation:** [BUY/HOLD/SELL] with [X]% upside potential
      `,
      styling: {
        layout: "executive-summary",
        components: ["financial-snapshot", "recommendation-box"]
      }
    },
    {
      id: "market-analysis",
      title: "Market Analysis",
      type: "market",
      content: `
# Market Analysis

## Industry Overview
- **Market Size:** $[X]B (2024E)
- **Growth Rate:** [X]% CAGR (2024-2028E)
- **Key Drivers:** [List primary growth drivers]

### Market Segmentation
| Segment | Market Share | Growth Rate | Key Players |
|---------|--------------|-------------|-------------|
| [Segment 1] | [X]% | [X]% | [Companies] |
| [Segment 2] | [X]% | [X]% | [Companies] |
| [Segment 3] | [X]% | [X]% | [Companies] |

## Competitive Landscape

### Peer Comparison
| Company | Revenue (LTM) | EV/Revenue | EV/EBITDA | Market Cap |
|---------|---------------|------------|-----------|------------|
| [Peer 1] | $[X]M | [X]x | [X]x | $[X]M |
| [Peer 2] | $[X]M | [X]x | [X]x | $[X]M |
| [Peer 3] | $[X]M | [X]x | [X]x | $[X]M |
| **[Target]** | $[X]M | [X]x | [X]x | $[X]M |

### Competitive Positioning
- **Market Position:** [Description]
- **Competitive Advantages:** [List key differentiators]
- **Market Share:** [X]% of addressable market

## Market Trends & Catalysts
1. **[Trend 1]:** [Impact on industry]
2. **[Trend 2]:** [Impact on industry]
3. **[Trend 3]:** [Impact on industry]
      `,
      styling: {
        layout: "comparative-analysis",
        components: ["peer-comparison-table", "market-share-chart"]
      }
    },
    {
      id: "valuation",
      title: "Valuation Analysis",
      type: "valuation",
      content: `
# Valuation Analysis

## Valuation Summary
| Method | Low | Base | High | Weight |
|--------|-----|------|------|--------|
| DCF Analysis | $[X] | $[X] | $[X] | 40% |
| Trading Comps | $[X] | $[X] | $[X] | 35% |
| Transaction Comps | $[X] | $[X] | $[X] | 25% |
| **Weighted Average** | **$[X]** | **$[X]** | **$[X]** | **100%** |

## Discounted Cash Flow (DCF)

### Key Assumptions
- **Revenue Growth:** [X]% (2024E-2028E)
- **EBITDA Margin:** [X]% (Terminal)
- **WACC:** [X]%
- **Terminal Growth:** [X]%
- **Tax Rate:** [X]%

### DCF Waterfall Analysis
| Component | Value |
|-----------|-------|
| PV of FCF (2024E-2028E) | $[X]M |
| PV of Terminal Value | $[X]M |
| **Enterprise Value** | **$[X]M** |
| Less: Net Debt | ($[X]M) |
| **Equity Value** | **$[X]M** |

## Trading Multiples Analysis
| Multiple | Target | Peer Median | Premium/(Discount) |
|----------|--------|-------------|-------------------|
| EV/Revenue (NTM) | [X]x | [X]x | [X]% |
| EV/EBITDA (NTM) | [X]x | [X]x | [X]% |
| P/E (NTM) | [X]x | [X]x | [X]% |

## Sensitivity Analysis
*Base Case Valuation: $[X] per share*

| WACC → | 8.0% | 8.5% | 9.0% | 9.5% | 10.0% |
|--------|------|------|------|------|-------|
| **1.0%** | $[X] | $[X] | $[X] | $[X] | $[X] |
| **1.5%** | $[X] | $[X] | $[X] | $[X] | $[X] |
| **2.0%** | $[X] | $[X] | $[X] | $[X] | $[X] |
| **2.5%** | $[X] | $[X] | $[X] | $[X] | $[X] |
| **3.0%** | $[X] | $[X] | $[X] | $[X] | $[X] |
      `,
      styling: {
        layout: "valuation-focused",
        components: ["dcf-waterfall", "sensitivity-table", "valuation-bridge"]
      }
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment",
      type: "risk",
      content: `
# Risk Assessment

## Investment Risks

### High Priority Risks
1. **[Risk Category 1]**
   - **Description:** [Detailed risk description]
   - **Impact:** [High/Medium/Low]
   - **Probability:** [High/Medium/Low]
   - **Mitigation:** [Risk mitigation strategies]

2. **[Risk Category 2]**
   - **Description:** [Detailed risk description]
   - **Impact:** [High/Medium/Low]
   - **Probability:** [High/Medium/Low]
   - **Mitigation:** [Risk mitigation strategies]

### Medium Priority Risks
- **[Risk 1]:** [Brief description and impact]
- **[Risk 2]:** [Brief description and impact]
- **[Risk 3]:** [Brief description and impact]

## Scenario Analysis
| Scenario | Probability | Revenue Impact | EBITDA Impact | Valuation Impact |
|----------|-------------|----------------|---------------|------------------|
| **Bull Case** | 25% | +[X]% | +[X]% | $[X] (+[X]%) |
| **Base Case** | 50% | [X]% | [X]% | $[X] |
| **Bear Case** | 25% | -[X]% | -[X]% | $[X] (-[X]%) |

## ESG Considerations
- **Environmental:** [Environmental risks and opportunities]
- **Social:** [Social impact and stakeholder considerations]
- **Governance:** [Corporate governance assessment]

## Regulatory & Legal Risks
- **Regulatory Environment:** [Current and pending regulations]
- **Legal Proceedings:** [Outstanding legal matters]
- **Compliance Requirements:** [Key compliance considerations]
      `,
      styling: {
        layout: "risk-matrix",
        components: ["risk-heat-map", "scenario-chart"]
      }
    },
    {
      id: "terms",
      title: "Transaction Terms",
      type: "terms",
      content: `
# Transaction Terms & Structure

## Proposed Transaction Structure
- **Transaction Type:** [Stock/Asset Purchase/Merger]
- **Purchase Price:** $[Amount]
- **Payment Structure:** [Cash/Stock/Mixed]
- **Closing Conditions:** [Key conditions precedent]

### Sources & Uses of Funds
| **Sources** | **Amount** | **Uses** | **Amount** |
|-------------|------------|----------|------------|
| Cash | $[X]M | Purchase Price | $[X]M |
| Debt Financing | $[X]M | Transaction Fees | $[X]M |
| Equity Financing | $[X]M | Other Costs | $[X]M |
| **Total Sources** | **$[X]M** | **Total Uses** | **$[X]M** |

## Key Terms & Conditions
- **Closing Date:** [Expected date]
- **Due Diligence Period:** [Duration]
- **Financing Contingency:** [Yes/No - Details]
- **Material Adverse Change:** [Standard/Modified provisions]
- **Termination Fee:** $[Amount] ([X]% of deal value)

## Post-Transaction Structure
- **Ownership Distribution:** [Breakdown by investor type]
- **Board Composition:** [Number of seats by stakeholder]
- **Management Incentives:** [Equity participation/retention]
- **Governance Rights:** [Key investor protections]

## Timeline to Close
| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Sign Definitive Agreement | [Date] | [Pending/Complete] |
| Complete Due Diligence | [Date] | [Pending/Complete] |
| Obtain Regulatory Approvals | [Date] | [Pending/Complete] |
| Secure Financing | [Date] | [Pending/Complete] |
| **Expected Closing** | **[Date]** | **[Status]** |

---
**Next Steps:** [Immediate actions required to proceed]
      `,
      styling: {
        layout: "terms-focused",
        components: ["sources-uses-chart", "timeline-gantt"]
      }
    }
  ]
};