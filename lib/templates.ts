import { businessProposalTemplate } from "@/templates/business-proposal";
import { strategicConsultingTemplate } from "@/templates/strategic-consulting";
import { globalPolicyTemplate } from "@/templates/global-policy";
import { investmentBankingTemplate } from "@/templates/investment-banking";
import { executiveBriefingTemplate } from "@/templates/executive-briefing";
import { researchReportTemplate } from "@/templates/research-report";
import { internationalDevelopmentTemplate } from "@/templates/international-development";

export interface TemplateSection {
  id: string;
  title: string;
  type: string;
  content: string;
  styling?: {
    layout: string;
    components?: string[];
    background?: string;
  };
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  layout: string;
  sections: TemplateSection[];
}

export const templates: Template[] = [
  businessProposalTemplate,
  strategicConsultingTemplate,
  globalPolicyTemplate,
  investmentBankingTemplate,
  executiveBriefingTemplate,
  researchReportTemplate,
  internationalDevelopmentTemplate,
];

export const templateCategories = [
  {
    id: "business",
    name: "Business",
    description: "Professional business documents",
    icon: "briefcase",
    templates: templates.filter(t => t.category === "Business" || t.category === "Consulting")
  },
  {
    id: "finance",
    name: "Finance",
    description: "Financial analysis and investment documents",
    icon: "trending-up",
    templates: templates.filter(t => t.category === "Finance")
  },
  {
    id: "policy",
    name: "Policy & Government",
    description: "Policy analysis and government documents",
    icon: "scale",
    templates: templates.filter(t => t.category === "Policy")
  },
  {
    id: "academic",
    name: "Research & Academic",
    description: "Academic research and scholarly documents",
    icon: "book-open",
    templates: templates.filter(t => t.category === "Academic")
  },
  {
    id: "executive",
    name: "Executive Communications",
    description: "High-level executive briefings and summaries",
    icon: "users",
    templates: templates.filter(t => t.category === "Executive")
  },
  {
    id: "development",
    name: "International Development",
    description: "Development projects and impact reports",
    icon: "globe",
    templates: templates.filter(t => t.category === "Development")
  }
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find(template => template.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(template => template.category === category);
}

export function getAllCategories() {
  return templateCategories;
}