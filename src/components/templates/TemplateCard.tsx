'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Globe,
  Briefcase,
  Presentation,
  BarChart,
  FileText,
} from 'lucide-react';
import { DocumentTemplate } from '@/types';
import { Card, CardContent, Badge } from '@/components/ui';

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  Presentation: <Presentation className="h-6 w-6" />,
  BarChart: <BarChart className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
};

const typeColors: Record<string, 'primary' | 'success' | 'warning'> = {
  report: 'primary',
  policy: 'success',
  proposal: 'warning',
  presentation: 'primary',
};

interface TemplateCardProps {
  template: DocumentTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link href={`/create?template=${template.id}`}>
      <Card hover className="h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              {iconMap[template.icon] || <FileText className="h-6 w-6" />}
            </div>
            <Badge variant={typeColors[template.type] || 'default'}>
              {template.type}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {template.name}
          </h3>

          <p className="text-sm text-slate-500 mb-4 line-clamp-2">
            {template.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FileText className="h-3.5 w-3.5" />
            <span>{template.structure.length} sections</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
