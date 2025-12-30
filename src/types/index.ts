export type DocumentType = 'report' | 'presentation' | 'policy' | 'proposal';

export type ExportFormat = 'pdf' | 'docx' | 'pptx';

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: DocumentType;
  icon: string;
  structure: DocumentSection[];
  defaultContent?: Partial<DocumentContent>;
}

export interface DocumentSection {
  id: string;
  title: string;
  description: string;
  required: boolean;
  placeholder?: string;
  aiPrompt?: string;
}

export interface DocumentContent {
  title: string;
  subtitle?: string;
  author?: string;
  organization?: string;
  date: string;
  sections: SectionContent[];
  metadata?: Record<string, unknown>;
}

export interface SectionContent {
  sectionId: string;
  title: string;
  content: string;
  charts?: ChartData[];
}

export interface ChartData {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'area' | 'donut';
  title: string;
  data: ChartDataPoint[];
  config?: ChartConfig;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface ChartConfig {
  xAxisKey?: string;
  yAxisKey?: string;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
}

export interface Document {
  id: string;
  templateId: string;
  content: DocumentContent;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'complete';
}

export interface AIGenerationRequest {
  prompt: string;
  context?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIGenerationResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ExportOptions {
  format: ExportFormat;
  includeCharts: boolean;
  includeMetadata: boolean;
  watermark?: string;
}
