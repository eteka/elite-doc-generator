export const researchReportTemplate = {
  id: "research-report",
  name: "Research Report",
  category: "Academic",
  description: "Academic styling with numbered sections and literature review format",
  colorScheme: {
    primary: "#1f2937", // Dark gray
    secondary: "#4b5563",
    accent: "#7c3aed", // Purple
    background: "#ffffff",
    text: "#111827"
  },
  fonts: {
    primary: "Georgia",
    secondary: "Inter"
  },
  layout: "academic",
  sections: [
    {
      id: "title-abstract",
      title: "Title & Abstract",
      type: "academic-header",
      content: `
# [Research Title]
## [Subtitle if applicable]

**Authors:** [Author Names and Affiliations]  
**Date:** [Date]  
**Keywords:** [5-7 relevant keywords]

---

## Abstract

[150-250 word summary covering:]
- **Background:** [Research context and problem statement]
- **Objective:** [Primary research question or hypothesis]  
- **Methods:** [Research methodology employed]
- **Results:** [Key findings]
- **Conclusions:** [Main conclusions and implications]

**Word Count:** [Number] words

---

## Table of Contents
1. Introduction
2. Literature Review  
3. Methodology
4. Results and Analysis
5. Discussion
6. Conclusions and Recommendations
7. References
8. Appendices
      `,
      styling: {
        layout: "academic-title",
        components: ["abstract-box", "table-of-contents"]
      }
    },
    {
      id: "introduction",
      title: "1. Introduction",
      type: "academic-section",
      content: `
# 1. Introduction

## 1.1 Background and Context
[Provide background information on the research topic, establishing the broader context and significance of the study]

## 1.2 Problem Statement
[Clearly articulate the specific problem or gap in knowledge that this research addresses]

## 1.3 Research Questions
The primary research questions guiding this study are:

1. **Primary Question:** [Main research question]
2. **Secondary Questions:**
   - [Supporting question 1]
   - [Supporting question 2]
   - [Supporting question 3]

## 1.4 Research Objectives
- **Primary Objective:** [Main goal of the research]
- **Secondary Objectives:**
  - [Objective 1]
  - [Objective 2]
  - [Objective 3]

## 1.5 Significance of the Study
[Explain why this research is important and how it contributes to the field]

## 1.6 Scope and Limitations
- **Scope:** [What the study covers]
- **Limitations:** [Acknowledged constraints and boundaries]

## 1.7 Structure of the Report
[Brief overview of how the report is organized]
      `,
      styling: {
        layout: "numbered-sections",
        components: ["research-questions-box", "objectives-list"]
      }
    },
    {
      id: "literature-review",
      title: "2. Literature Review",
      type: "academic-section",
      content: `
# 2. Literature Review

## 2.1 Theoretical Framework
[Establish the theoretical foundation for the research]

### 2.1.1 Core Theories
- **[Theory 1]:** [Brief explanation and relevance]
- **[Theory 2]:** [Brief explanation and relevance]
- **[Theory 3]:** [Brief explanation and relevance]

### 2.1.2 Conceptual Model
[Description of the conceptual framework guiding the research]

## 2.2 Previous Research

### 2.2.1 Foundational Studies
[Review of seminal works in the field]

**[Author, Year]** conducted [study description]. Key findings include:
- [Finding 1]
- [Finding 2]
- [Finding 3]

**[Author, Year]** examined [study focus]. The research demonstrated:
- [Finding 1]
- [Finding 2]
- [Finding 3]

### 2.2.2 Recent Developments
[Review of recent research and emerging trends]

### 2.2.3 Methodological Approaches
[Analysis of different research methods used in the field]

## 2.3 Research Gaps
Based on the literature review, the following gaps have been identified:

1. **Gap 1:** [Description of knowledge gap]
2. **Gap 2:** [Description of methodological gap]
3. **Gap 3:** [Description of empirical gap]

## 2.4 Synthesis and Positioning
[How this research builds on and extends existing knowledge]
      `,
      styling: {
        layout: "literature-focused",
        components: ["citation-sidebar", "gap-analysis-box"]
      }
    },
    {
      id: "methodology",
      title: "3. Methodology",
      type: "academic-section",
      content: `
# 3. Methodology

## 3.1 Research Design
- **Research Approach:** [Quantitative/Qualitative/Mixed Methods]
- **Research Strategy:** [Case Study/Survey/Experiment/etc.]
- **Time Horizon:** [Cross-sectional/Longitudinal]

## 3.2 Data Collection

### 3.2.1 Primary Data
- **Method:** [Interviews/Surveys/Observations/etc.]
- **Sample Size:** [Number of participants/responses]
- **Sampling Method:** [Random/Purposive/Convenience/etc.]
- **Data Collection Period:** [Start date] to [End date]

### 3.2.2 Secondary Data
- **Sources:** [Databases, reports, publications used]
- **Selection Criteria:** [How sources were chosen]
- **Time Period Covered:** [Date range of data]

## 3.3 Sample Description
| Characteristic | Category | Count | Percentage |
|----------------|----------|-------|------------|
| [Demographic 1] | [Category 1] | [N] | [%] |
|                | [Category 2] | [N] | [%] |
| [Demographic 2] | [Category 1] | [N] | [%] |
|                | [Category 2] | [N] | [%] |

## 3.4 Data Analysis
- **Quantitative Analysis:** [Statistical methods used]
- **Qualitative Analysis:** [Coding/thematic analysis approach]
- **Software Used:** [SPSS/R/NVivo/etc.]

## 3.5 Validity and Reliability
- **Internal Validity:** [Measures taken to ensure validity]
- **External Validity:** [Generalizability considerations]
- **Reliability:** [Consistency measures]

## 3.6 Ethical Considerations
- **Ethics Approval:** [IRB approval details]
- **Informed Consent:** [Consent procedures]
- **Confidentiality:** [Data protection measures]
      `,
      styling: {
        layout: "methodology-detailed",
        components: ["sample-demographics", "analysis-flowchart"]
      }
    },
    {
      id: "results",
      title: "4. Results and Analysis",
      type: "academic-section",
      content: `
# 4. Results and Analysis

## 4.1 Descriptive Statistics
[Overview of basic descriptive findings]

### 4.1.1 Sample Characteristics
[Detailed description of the sample]

### 4.1.2 Variable Distributions
| Variable | Mean | SD | Min | Max | N |
|----------|------|----|----|-----|---|
| [Variable 1] | [X.XX] | [X.XX] | [X] | [X] | [N] |
| [Variable 2] | [X.XX] | [X.XX] | [X] | [X] | [N] |
| [Variable 3] | [X.XX] | [X.XX] | [X] | [X] | [N] |

## 4.2 Primary Analysis

### 4.2.1 Research Question 1: [Question]
[Detailed analysis and findings for the first research question]

**Key Findings:**
- [Finding 1 with statistical support]
- [Finding 2 with statistical support]
- [Finding 3 with statistical support]

### 4.2.2 Research Question 2: [Question]
[Detailed analysis and findings for the second research question]

**Key Findings:**
- [Finding 1 with statistical support]
- [Finding 2 with statistical support]
- [Finding 3 with statistical support]

## 4.3 Secondary Analysis
[Additional analyses, correlations, subgroup analyses]

## 4.4 Qualitative Findings
[If applicable, thematic analysis results]

### 4.4.1 Major Themes
1. **Theme 1:** [Description and supporting quotes]
2. **Theme 2:** [Description and supporting quotes]
3. **Theme 3:** [Description and supporting quotes]

## 4.5 Unexpected Findings
[Any surprising or unexpected results]

## 4.6 Summary of Results
[Concise summary of all major findings]
      `,
      styling: {
        layout: "results-heavy",
        components: ["statistical-tables", "findings-highlights"]
      }
    },
    {
      id: "discussion",
      title: "5. Discussion",
      type: "academic-section",
      content: `
# 5. Discussion

## 5.1 Interpretation of Findings

### 5.1.1 Primary Findings
[Interpretation of main results in context of research questions]

### 5.1.2 Relationship to Existing Literature
[How findings compare to previous research]

**Consistent with Previous Research:**
- [Finding that confirms existing knowledge]
- [Finding that supports established theory]

**Contradictory to Previous Research:**
- [Finding that challenges existing knowledge]
- [Possible explanations for discrepancies]

**Novel Contributions:**
- [New insights not previously reported]
- [Extensions of existing knowledge]

## 5.2 Theoretical Implications
[What the findings mean for theory development]

## 5.3 Practical Implications
[Real-world applications and recommendations]

### 5.3.1 For Practitioners
- [Implication 1]
- [Implication 2]
- [Implication 3]

### 5.3.2 For Policymakers
- [Policy recommendation 1]
- [Policy recommendation 2]
- [Policy recommendation 3]

## 5.4 Limitations
[Honest assessment of study limitations]

1. **Methodological Limitations:** [Description]
2. **Sample Limitations:** [Description]
3. **Measurement Limitations:** [Description]

## 5.5 Future Research Directions
[Suggestions for future studies]

- **Short-term Research:** [Immediate follow-up studies]
- **Long-term Research:** [Broader research agenda]
      `,
      styling: {
        layout: "discussion-focused",
        components: ["implications-boxes", "limitations-callout"]
      }
    },
    {
      id: "conclusions",
      title: "6. Conclusions and Recommendations",
      type: "academic-section",
      content: `
# 6. Conclusions and Recommendations

## 6.1 Summary of Key Findings
[Concise restatement of the most important results]

1. **[Key Finding 1]:** [Brief description]
2. **[Key Finding 2]:** [Brief description]
3. **[Key Finding 3]:** [Brief description]

## 6.2 Answers to Research Questions
- **Research Question 1:** [Direct answer based on findings]
- **Research Question 2:** [Direct answer based on findings]
- **Research Question 3:** [Direct answer based on findings]

## 6.3 Contribution to Knowledge
[How this research advances the field]

## 6.4 Recommendations

### 6.4.1 For Practice
1. **[Recommendation 1]:** [Specific actionable recommendation]
2. **[Recommendation 2]:** [Specific actionable recommendation]
3. **[Recommendation 3]:** [Specific actionable recommendation]

### 6.4.2 For Policy
1. **[Policy Recommendation 1]:** [Specific policy suggestion]
2. **[Policy Recommendation 2]:** [Specific policy suggestion]

### 6.4.3 For Future Research
1. **[Research Direction 1]:** [Specific research suggestion]
2. **[Research Direction 2]:** [Specific research suggestion]

## 6.5 Final Thoughts
[Concluding remarks on the significance and impact of the research]

---

**Word Count:** [Total words]  
**Completion Date:** [Date]
      `,
      styling: {
        layout: "conclusions-summary",
        components: ["key-findings-box", "recommendations-grid"]
      }
    }
  ]
};