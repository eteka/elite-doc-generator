"use client";

import { History, Undo2, Redo2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GenerationHistoryItem {
  content: string;
  timestamp: number;
  mode: string;
}

interface GenerationHistoryProps {
  history: GenerationHistoryItem[];
  currentIndex: number;
  onUndo: () => void;
  onRedo: () => void;
  onSelectVersion: (index: number) => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function GenerationHistory({
  history,
  currentIndex,
  onUndo,
  onRedo,
  onSelectVersion,
  canUndo,
  canRedo,
}: GenerationHistoryProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getModeLabel = (mode: string) => {
    const labels: Record<string, string> = {
      executive_summary: "Executive Summary",
      data_analysis: "Data Analysis",
      recommendations: "Recommendations",
      policy_language: "Policy Language",
      consulting_tone: "Consulting Tone",
      make_professional: "Professional",
      make_concise: "Concise",
      add_data: "Add Data",
      executive_tone: "Executive Tone",
    };
    return labels[mode] || mode;
  };

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">Generation History</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onUndo}
              disabled={!canUndo}
              className="h-7 w-7 p-0"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRedo}
              disabled={!canRedo}
              className="h-7 w-7 p-0"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription className="text-xs">
          {history.length} generations • Version {currentIndex + 1}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-2 p-4 pt-0">
            {history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No generation history yet</p>
                <p className="text-xs mt-1">Use AI to generate content</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div
                  key={index}
                  onClick={() => onSelectVersion(index)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    index === currentIndex
                      ? "border-accent bg-accent/5 shadow-sm"
                      : "border-slate-200 hover:border-accent/50 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-accent">
                      {getModeLabel(item.mode)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {item.content}
                  </p>
                  {index === currentIndex && (
                    <div className="mt-2 text-xs font-medium text-accent">
                      ← Current version
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}