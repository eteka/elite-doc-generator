"use client";

import { useState } from "react";
import { Lightbulb, ChevronRight, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: "content" | "structure" | "data" | "style";
}

interface SmartSuggestionsProps {
  templateId: string;
  sectionType: string;
  onApplySuggestion: (suggestion: Suggestion) => void;
  isVisible: boolean;
  onClose: () => void;
}

export function SmartSuggestions({ 
  templateId, 
  sectionType, 
  onApplySuggestion,
  isVisible,
  onClose 
}: SmartSuggestionsProps) {
  const [suggestions] = useState<Suggestion[]>(
    generateSuggestions(templateId, sectionType)
  );

  if (!isVisible) return null;

  return (
    <div className="w-80 border-l bg-white flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold text-primary">Smart Suggestions</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {suggestions.map((suggestion) => (
          <Card 
            key={suggestion.id} 
            className="cursor-pointer hover:shadow-md transition-shadow group"
            onClick={() => onApplySuggestion(suggestion)}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium group-hover:text-accent transition-colors">
                    {suggestion.title}
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {suggestion.description}
                  </CardDescription>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <span className={`text-xs px-2 py-1 rounded-full ${
                suggestion.type === "content" ? "bg-blue-100 text-blue-700" :
                suggestion.type === "structure" ? "bg-green-100 text-green-700" :
                suggestion.type === "data" ? "bg-purple-100 text-purple-700" :
                "bg-orange-100 text-orange-700"
              }`}>
                {suggestion.type}
              </span>
            </CardContent>
          </Card>
        ))}

        {suggestions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No suggestions available</p>
            <p className="text-xs mt-1">Start writing to get AI-powered suggestions</p>
          </div>
        )}
      </div>
    </div>
  );
}

function generateSuggestions(templateId: string, sectionType: string): Suggestion[] {
  const baseSuggestions: Record<string, Suggestion[]> = {
    "executive-summary": [
      {
        id: "1",
        title: "Add Key Metrics",
        description: "Include 3-5 quantifiable metrics that demonstrate impact",
        type: "data"
      },
      {
        id: "2",
        title: "Strengthen Opening",
        description: "Lead with the most compelling insight or recommendation",
        type: "structure"
      },
      {
        id: "3",
        title: "Add Call to Action",
        description: "Include clear next steps and decision points",
        type: "content"
      }
    ],
    "analysis": [
      {
        id: "4",
        title: "Add Comparative Data",
        description: "Include benchmarks or industry comparisons",
        type: "data"
      },
      {
        id: "5",
        title: "Use Framework",
        description: "Structure analysis using a 2x2 matrix or similar framework",
        type: "structure"
      },
      {
        id: "6",
        title: "Highlight Insights",
        description: "Call out 'So what?' implications of your analysis",
        type: "content"
      }
    ],
    "recommendations": [
      {
        id: "7",
        title: "Prioritize Actions",
        description: "Rank recommendations by impact and feasibility",
        type: "structure"
      },
      {
        id: "8",
        title: "Add Implementation Details",
        description: "Include timeline, resources, and ownership",
        type: "content"
      },
      {
        id: "9",
        title: "Quantify Impact",
        description: "Add expected outcomes and ROI for each recommendation",
        type: "data"
      }
    ]
  };

  // Template-specific suggestions
  const templateSuggestions: Record<string, Suggestion[]> = {
    "strategic-consulting": [
      {
        id: "10",
        title: "Use McKinsey Language",
        description: "Incorporate strategic consulting vocabulary and frameworks",
        type: "style"
      }
    ],
    "investment-banking": [
      {
        id: "11",
        title: "Add Financial Metrics",
        description: "Include valuation multiples and financial ratios",
        type: "data"
      }
    ],
    "global-policy": [
      {
        id: "12",
        title: "Cite Evidence",
        description: "Add references to research and empirical data",
        type: "content"
      }
    ]
  };

  const suggestions = [
    ...(baseSuggestions[sectionType] || []),
    ...(templateSuggestions[templateId] || [])
  ];

  return suggestions.slice(0, 5); // Return top 5 suggestions
}