export const internationalDevelopmentTemplate = {
  id: "international-development",
  name: "International Development",
  category: "Development",
  description: "Colorful, icon-heavy design focused on impact metrics and beneficiary-centered language",
  colorScheme: {
    primary: "#059669", // Emerald green
    secondary: "#0d9488", // Teal
    accent: "#f59e0b", // Amber
    background: "#f0fdf4",
    text: "#064e3b"
  },
  fonts: {
    primary: "Inter",
    secondary: "Inter"
  },
  layout: "impact-focused",
  sections: [
    {
      id: "project-overview",
      title: "Project Overview",
      type: "impact-summary",
      content: `
# 🌍 [PROJECT NAME]
## Empowering Communities, Creating Lasting Change

### 📍 Project Location
**Country/Region:** [Location]  
**Communities Served:** [Number] communities  
**Target Beneficiaries:** [Number] people

### 🎯 Our Mission
[One powerful sentence describing the project's core mission and impact]

### 📊 Impact at a Glance
| 🏠 **Households Reached** | 👥 **Direct Beneficiaries** | 💰 **Lives Improved** | ⏱️ **Project Duration** |
|---------------------------|------------------------------|------------------------|--------------------------|
| [Number] | [Number] | [Number] | [Duration] |

### 🌟 Key Outcomes
- **🎓 Education:** [Number] children gained access to quality education
- **💧 Water & Sanitation:** [Number] people gained access to clean water
- **🏥 Healthcare:** [Number] individuals received essential health services
- **💼 Livelihoods:** [Number] families increased their income by [%]

### 🤝 Partnership Approach
**Lead Organization:** [Organization Name]  
**Local Partners:** [Partner Organizations]  
**Community Leaders:** [Number] community champions trained  
**Government Collaboration:** [Ministry/Department partnerships]

---

*"[Powerful quote from a beneficiary or community leader about the project's impact]"*  
— [Name, Title/Role, Community]
      `,
      styling: {
        layout: "impact-dashboard",
        components: ["impact-metrics", "beneficiary-quote", "partnership-icons"]
      }
    },
    {
      id: "community-needs",
      title: "Community Needs Assessment",
      type: "needs-analysis",
      content: `
# 🔍 Community Needs Assessment

## 📋 Baseline Situation
### Current Challenges Faced by Communities

#### 🏠 **Housing & Infrastructure**
- **Challenge:** [Description of housing/infrastructure issues]
- **Impact:** [Number] families affected
- **Severity:** [High/Medium/Low]

#### 💧 **Water, Sanitation & Hygiene (WASH)**
- **Challenge:** [Description of WASH issues]
- **Impact:** [Number] people without access
- **Health Consequences:** [Description]

#### 🎓 **Education**
- **Challenge:** [Description of education barriers]
- **Impact:** [Number] children out of school
- **Gender Disparities:** [Statistics on gender gaps]

#### 🏥 **Healthcare**
- **Challenge:** [Description of health system gaps]
- **Impact:** [Number] people without access
- **Key Health Indicators:** [Relevant statistics]

#### 💼 **Economic Opportunities**
- **Challenge:** [Description of livelihood constraints]
- **Impact:** [Unemployment/poverty rates]
- **Vulnerable Groups:** [Most affected populations]

## 👥 Vulnerable Populations
| Group | Population Size | Primary Needs | Specific Vulnerabilities |
|-------|-----------------|---------------|-------------------------|
| 👩 **Women** | [Number] | [Needs] | [Vulnerabilities] |
| 👶 **Children (0-5)** | [Number] | [Needs] | [Vulnerabilities] |
| 🧒 **School-age (6-17)** | [Number] | [Needs] | [Vulnerabilities] |
| 👴 **Elderly (65+)** | [Number] | [Needs] | [Vulnerabilities] |
| ♿ **Persons with Disabilities** | [Number] | [Needs] | [Vulnerabilities] |

## 🗣️ Community Voice
### What Community Members Tell Us

*"[Quote about primary need/challenge]"*  
— [Name, Community Member]

*"[Quote about hopes/aspirations]"*  
— [Name, Community Leader]

*"[Quote about barriers to progress]"*  
— [Name, Vulnerable Group Representative]

## 🎯 Priority Needs Ranking
1. **🥇 Highest Priority:** [Need] - [Justification]
2. **🥈 High Priority:** [Need] - [Justification]
3. **🥉 Medium Priority:** [Need] - [Justification]
      `,
      styling: {
        layout: "needs-focused",
        components: ["vulnerability-matrix", "community-voices", "priority-ranking"]
      }
    },
    {
      id: "theory-of-change",
      title: "Theory of Change",
      type: "logic-model",
      content: `
# 🎯 Theory of Change
## Our Pathway to Sustainable Impact

### 🌱 **INPUTS** → 🔄 **ACTIVITIES** → 📈 **OUTPUTS** → 🎉 **OUTCOMES** → 🌟 **IMPACT**

## 🌱 Inputs (What We Invest)
- **💰 Financial Resources:** $[Amount] over [Duration]
- **👥 Human Resources:** [Number] staff, [Number] volunteers
- **🤝 Partnerships:** [Number] local organizations
- **📚 Technical Expertise:** [Areas of specialization]
- **🏢 Infrastructure:** [Facilities, equipment, technology]

## 🔄 Activities (What We Do)
### 🎓 Education & Capacity Building
- Train [Number] teachers in modern pedagogy
- Establish [Number] community learning centers
- Provide scholarships for [Number] vulnerable children

### 💧 WASH Infrastructure
- Construct [Number] water points
- Build [Number] sanitation facilities
- Train [Number] hygiene promoters

### 🏥 Health Services
- Establish [Number] health clinics
- Train [Number] community health workers
- Conduct [Number] health awareness campaigns

### 💼 Economic Empowerment
- Form [Number] savings groups
- Provide skills training for [Number] youth
- Support [Number] small businesses

## 📈 Outputs (What We Produce)
- **🎓 [Number]** teachers trained and certified
- **💧 [Number]** people with improved water access
- **🏥 [Number]** health workers providing services
- **💼 [Number]** individuals with new income-generating skills

## 🎉 Outcomes (Changes We Create)
### Short-term (Year 1)
- [X]% increase in school enrollment
- [X]% reduction in waterborne diseases
- [X]% of trained individuals applying new skills

### Medium-term (Years 2-3)
- [X]% improvement in learning outcomes
- [X]% increase in household income
- [X]% reduction in child malnutrition

## 🌟 Long-term Impact (Years 4-5+)
- **🎓 Education:** Improved literacy rates and educational attainment
- **💪 Health:** Reduced morbidity and mortality rates
- **💰 Economic:** Increased household resilience and prosperity
- **⚖️ Equity:** Reduced inequalities and improved social cohesion

## 🔄 Assumptions & Risk Mitigation
| Assumption | Risk Level | Mitigation Strategy |
|------------|------------|-------------------|
| [Assumption 1] | [High/Med/Low] | [Strategy] |
| [Assumption 2] | [High/Med/Low] | [Strategy] |
| [Assumption 3] | [High/Med/Low] | [Strategy] |
      `,
      styling: {
        layout: "logic-model",
        components: ["theory-chain", "assumptions-matrix"]
      }
    },
    {
      id: "implementation-plan",
      title: "Implementation Strategy",
      type: "implementation",
      content: `
# 🚀 Implementation Strategy
## Turning Vision into Reality

## 📅 Project Timeline
### Phase 1: Foundation Building (Months 1-6)
- **🏗️ Setup & Mobilization**
  - Establish project offices
  - Recruit and train staff
  - Conduct community entry meetings

- **🤝 Partnership Development**
  - Sign MOUs with local partners
  - Form community committees
  - Establish governance structures

### Phase 2: Service Delivery (Months 7-30)
- **📚 Program Implementation**
  - Launch education programs
  - Begin infrastructure construction
  - Start health service delivery

- **💪 Capacity Building**
  - Train community volunteers
  - Strengthen local organizations
  - Build technical skills

### Phase 3: Sustainability & Handover (Months 31-36)
- **🔄 Transition Planning**
  - Transfer ownership to communities
  - Ensure government buy-in
  - Establish maintenance systems

## 👥 Staffing Structure
| Role | Number | Responsibilities | Location |
|------|--------|------------------|----------|
| 🎯 **Project Director** | 1 | Overall leadership | [Location] |
| 📊 **Program Managers** | [X] | Component oversight | [Locations] |
| 🏥 **Health Coordinator** | 1 | Health programming | [Location] |
| 🎓 **Education Specialist** | 1 | Education activities | [Location] |
| 👥 **Community Mobilizers** | [X] | Community engagement | [Communities] |

## 🤝 Community Engagement Approach
### Participation Strategy
- **👂 Listening:** Regular community consultations
- **🗳️ Decision-making:** Community-led planning processes
- **🔧 Implementation:** Community volunteer involvement
- **📊 Monitoring:** Participatory evaluation methods

### Inclusion Measures
- **♀️ Gender:** [X]% women in leadership roles
- **👶 Youth:** Dedicated youth engagement activities
- **♿ Disability:** Accessibility accommodations
- **🏘️ Marginalized Groups:** Targeted outreach efforts

## 📊 Monitoring & Evaluation Framework
### Key Performance Indicators (KPIs)
| Indicator | Baseline | Target | Frequency |
|-----------|----------|--------|-----------|
| 🎓 **School enrollment rate** | [X]% | [X]% | Quarterly |
| 💧 **Access to clean water** | [X]% | [X]% | Bi-annually |
| 🏥 **Immunization coverage** | [X]% | [X]% | Annually |
| 💰 **Household income** | $[X] | $[X] | Annually |

### Data Collection Methods
- **📱 Digital surveys** using mobile technology
- **👥 Focus group discussions** with beneficiaries
- **🏠 Household surveys** for impact measurement
- **📊 Administrative data** from partners

## 🛡️ Risk Management
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| 🌧️ **Weather/Climate** | Medium | High | [Strategy] |
| 🏛️ **Political instability** | Low | High | [Strategy] |
| 💰 **Funding shortfalls** | Medium | Medium | [Strategy] |
| 👥 **Staff turnover** | Medium | Medium | [Strategy] |
      `,
      styling: {
        layout: "implementation-timeline",
        components: ["phase-timeline", "staffing-chart", "risk-matrix"]
      }
    },
    {
      id: "budget-sustainability",
      title: "Budget & Sustainability",
      type: "financial-sustainability",
      content: `
# 💰 Budget & Sustainability Plan
## Investing in Lasting Change

## 📊 Total Project Budget: $[Total Amount]

### Budget Breakdown by Component
| Component | Amount | % of Total | Beneficiaries | Cost per Beneficiary |
|-----------|--------|------------|---------------|---------------------|
| 🎓 **Education** | $[Amount] | [X]% | [Number] | $[Amount] |
| 💧 **WASH** | $[Amount] | [X]% | [Number] | $[Amount] |
| 🏥 **Health** | $[Amount] | [X]% | [Number] | $[Amount] |
| 💼 **Livelihoods** | $[Amount] | [X]% | [Number] | $[Amount] |
| 🏗️ **Infrastructure** | $[Amount] | [X]% | [Number] | $[Amount] |
| 📊 **M&E** | $[Amount] | [X]% | - | - |
| 🏢 **Operations** | $[Amount] | [X]% | - | - |

### Annual Budget Distribution
| Year | Amount | % of Total | Key Activities |
|------|--------|------------|----------------|
| **Year 1** | $[Amount] | [X]% | Setup, baseline, initial activities |
| **Year 2** | $[Amount] | [X]% | Full implementation |
| **Year 3** | $[Amount] | [X]% | Sustainability, handover |

## 💡 Funding Sources
- **🏛️ Government:** $[Amount] ([X]%)
- **🌍 International Donors:** $[Amount] ([X]%)
- **🏢 Private Sector:** $[Amount] ([X]%)
- **👥 Community Contributions:** $[Amount] ([X]%)
- **🤝 Partner Organizations:** $[Amount] ([X]%)

## 🔄 Sustainability Strategy

### 💪 Financial Sustainability
- **🏛️ Government Integration:** Advocate for budget allocation
- **💰 Revenue Generation:** Develop fee-for-service models
- **🤝 Local Fundraising:** Build community fundraising capacity
- **📈 Cost Recovery:** Implement sustainable financing mechanisms

### 🏢 Institutional Sustainability
- **👥 Local Ownership:** Transfer management to communities
- **🎓 Capacity Building:** Train local organizations
- **📋 Systems Strengthening:** Integrate with existing structures
- **🔧 Technical Support:** Establish ongoing support mechanisms

### 🌱 Environmental Sustainability
- **♻️ Green Technologies:** Use environmentally friendly solutions
- **🌿 Natural Resources:** Promote sustainable resource management
- **🌍 Climate Resilience:** Build adaptation measures
- **📚 Environmental Education:** Raise awareness on conservation

## 📈 Value for Money Analysis
### Cost-Effectiveness Metrics
- **Cost per beneficiary:** $[Amount]
- **Cost per outcome achieved:** $[Amount]
- **Return on investment:** [X]:1 ratio
- **Leverage ratio:** $[X] mobilized per $1 invested

### Efficiency Measures
- **Administrative costs:** [X]% of total budget
- **Direct program costs:** [X]% of total budget
- **Overhead ratio:** [X]% (below [X]% benchmark)

## 🎯 Exit Strategy
### Handover Timeline (Final 12 Months)
- **Months 1-3:** Transition planning with stakeholders
- **Months 4-6:** Gradual responsibility transfer
- **Months 7-9:** Reduced external support
- **Months 10-12:** Full community/government ownership

### Success Indicators for Exit
- [ ] Community committees fully functional
- [ ] Government systems integrated
- [ ] Local funding mechanisms established
- [ ] Technical capacity transferred
- [ ] Monitoring systems operational

---

*💡 "Sustainability isn't just about continuing activities—it's about communities having the power and resources to drive their own development."*
      `,
      styling: {
        layout: "budget-sustainability",
        components: ["budget-pie-chart", "sustainability-roadmap", "value-metrics"]
      }
    },
    {
      id: "impact-measurement",
      title: "Impact Measurement & Learning",
      type: "impact-evaluation",
      content: `
# 📊 Impact Measurement & Learning
## Proving and Improving Our Work

## 🎯 Results Framework

### Impact Level Indicators
| Impact Indicator | Baseline | Target | Current | Data Source |
|------------------|----------|--------|---------|-------------|
| 📈 **Poverty reduction** | [X]% below poverty line | [X]% | [X]% | Household surveys |
| 🎓 **Education outcomes** | [X]% completion rate | [X]% | [X]% | School records |
| 🏥 **Health improvements** | [X] per 1000 | [X] per 1000 | [X] per 1000 | Health facilities |
| ⚖️ **Gender equity** | [X] gender parity index | [X] | [X] | Multiple sources |

### Outcome Level Indicators
| Outcome | Indicator | Target | Progress | Status |
|---------|-----------|--------|----------|--------|
| 🎓 **Improved learning** | Test scores increase | +[X] points | +[X] points | 🟢 On track |
| 💧 **Better health** | Disease incidence | -[X]% | -[X]% | 🟡 Needs attention |
| 💰 **Increased income** | Household earnings | +[X]% | +[X]% | 🟢 Exceeding |
| 👥 **Social cohesion** | Community participation | [X]% | [X]% | 🟢 On track |

## 📋 Data Collection & Analysis

### Mixed Methods Approach
- **📊 Quantitative Data**
  - Household surveys (n=[X])
  - Administrative records
  - Mobile data collection
  - GPS mapping

- **🗣️ Qualitative Data**
  - In-depth interviews (n=[X])
  - Focus group discussions (n=[X])
  - Participatory evaluations
  - Story collection

### Data Quality Assurance
- **✅ Validation:** Multiple source triangulation
- **🔄 Verification:** Independent spot checks
- **📱 Technology:** Real-time data quality monitoring
- **👥 Training:** Enumerator capacity building

## 🌟 Success Stories & Case Studies

### 👩 **Maria's Story - Education Champion**
*"Before the project, I couldn't read or write. Now I help other women in my community learn. My daughter is the first in our family to finish secondary school."*

**Impact Metrics:**
- Literacy rate in Maria's community: 45% → 78%
- Girls' secondary completion: 12% → 67%

### 👨 **Joseph's Story - Water Entrepreneur**
*"The new water system changed everything. I started a small business selling clean water, and now I can send all my children to school."*

**Impact Metrics:**
- Water access in Joseph's village: 23% → 89%
- Waterborne disease cases: -73%

### 👵 **Grace's Story - Health Advocate**
*"As a community health worker, I've helped deliver 47 babies safely. Mothers trust me because I'm from their community."*

**Impact Metrics:**
- Skilled birth attendance: 34% → 82%
- Maternal mortality: -60%

## 📈 Learning & Adaptation

### Key Learnings
1. **🤝 Community Ownership is Critical**
   - Projects succeed when communities lead
   - External support should complement, not replace

2. **👩 Gender Integration Multiplies Impact**
   - Women's participation improves all outcomes
   - Gender-specific barriers need targeted solutions

3. **🔄 Flexibility Enables Success**
   - Adaptive management responds to changing contexts
   - Regular feedback loops improve implementation

### Adaptive Management Actions
| Learning | Adaptation Made | Result |
|----------|-----------------|--------|
| [Learning 1] | [Action taken] | [Outcome] |
| [Learning 2] | [Action taken] | [Outcome] |
| [Learning 3] | [Action taken] | [Outcome] |

## 🔍 External Evaluation Findings

### Independent Evaluation Results
- **Overall Rating:** [Excellent/Good/Satisfactory]
- **Relevance:** [Score/Rating]
- **Effectiveness:** [Score/Rating]
- **Efficiency:** [Score/Rating]
- **Impact:** [Score/Rating]
- **Sustainability:** [Score/Rating]

### Key Recommendations
1. **[Recommendation 1]:** [Description]
2. **[Recommendation 2]:** [Description]
3. **[Recommendation 3]:** [Description]

## 📚 Knowledge Products & Dissemination
- **📖 Research Papers:** [Number] published
- **📊 Policy Briefs:** [Number] developed
- **🎥 Documentary Films:** [Number] produced
- **🌐 Website Visits:** [Number] annual visitors
- **📱 Social Media Reach:** [Number] followers

---

*📊 "Data tells us what happened. Stories tell us why it matters. Together, they drive better development."*
      `,
      styling: {
        layout: "impact-dashboard",
        components: ["results-framework", "success-stories", "learning-cycle"]
      }
    }
  ]
};