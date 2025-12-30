'use client';

import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button, Textarea } from '@/components/ui';
import { DocumentSection } from '@/types';
import { cn } from '@/lib/utils';

interface SectionEditorProps {
  section: DocumentSection;
  content: string;
  topic: string;
  documentContext: string;
  onContentChange: (content: string) => void;
  onGenerate: (sectionId: string, prompt: string) => Promise<void>;
  isGenerating: boolean;
}

export function SectionEditor({
  section,
  content,
  topic,
  documentContext,
  onContentChange,
  onGenerate,
  isGenerating,
}: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleGenerate = async () => {
    if (section.aiPrompt) {
      await onGenerate(section.id, section.aiPrompt);
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-2 h-2 rounded-full',
              content ? 'bg-emerald-500' : 'bg-slate-300'
            )}
          />
          <div className="text-left">
            <h3 className="font-semibold text-slate-900">{section.title}</h3>
            <p className="text-sm text-slate-500">{section.description}</p>
          </div>
          {section.required && (
            <span className="text-xs font-medium text-red-500 ml-2">Required</span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-4">
          <Textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder={section.placeholder}
            className="min-h-[200px] font-mono text-sm"
          />

          {section.aiPrompt && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                AI can generate content for this section based on your topic
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGenerate}
                disabled={isGenerating || !topic}
                leftIcon={
                  isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )
                }
              >
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
