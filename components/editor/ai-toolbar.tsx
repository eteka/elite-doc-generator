"use client";

import { useState } from "react";
import { Sparkles, Wand2, TrendingUp, FileText, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AIToolbarProps {
  onGenerate: (mode: string) => void;
  isGenerating: boolean;
  onStop?: () => void;
}

export function AIToolbar({ onGenerate, isGenerating, onStop }: AIToolbarProps) {
  return (
    <div className="flex items-center gap-2 p-2 border-b bg-slate-50">
      {/* Generate with AI */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={isGenerating}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4 text-purple-500" />
            Generate with AI
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Generate Content</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onGenerate("executive_summary")}>
            <FileText className="h-4 w-4 mr-2" />
            Executive Summary
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenerate("data_analysis")}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Data Analysis
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenerate("recommendations")}>
            <Sparkles className="h-4 w-4 mr-2" />
            Recommendations
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Improve Writing */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={isGenerating}
            className="gap-2"
          >
            <Wand2 className="h-4 w-4 text-blue-500" />
            Improve Writing
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Enhance Content</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onGenerate("make_professional")}>
            Make Professional
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenerate("make_concise")}>
            More Concise
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenerate("add_data")}>
            Add Data Points
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenerate("executive_tone")}>
            Executive Tone
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Style Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={isGenerating}
            className="gap-2"
          >
            <FileText className="h-4 w-4 text-green-500" />
            Change Style
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Writing Style</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onGenerate("policy_language")}>
            Policy Language
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onGenerate("consulting_tone")}>
            Consulting Tone
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Loading/Stop indicator */}
      {isGenerating && (
        <div className="flex items-center gap-2 ml-auto">
          <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
          <span className="text-sm text-muted-foreground">Generating...</span>
          {onStop && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onStop}
              className="h-7 w-7 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}