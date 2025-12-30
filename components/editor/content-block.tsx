"use client";

import { useState } from "react";
import { Sparkles, MoreVertical, Copy, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContentBlockProps {
  content: string;
  onContentChange: (content: string) => void;
  onGenerateAI: () => void;
  isGenerating?: boolean;
  placeholder?: string;
}

export function ContentBlock({ 
  content, 
  onContentChange, 
  onGenerateAI,
  isGenerating = false,
  placeholder = "Click to start writing or use AI to generate content..."
}: ContentBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const showAIButton = (isHovered || isFocused || !content) && !isGenerating;

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full min-h-[120px] p-4 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 
                     focus:border-accent focus:bg-white focus:outline-none resize-y
                     placeholder:text-muted-foreground transition-all"
        />
        
        {/* AI Generate Button - Floating */}
        {showAIButton && (
          <Button
            size="sm"
            variant="outline"
            onClick={onGenerateAI}
            className="absolute top-2 right-2 gap-2 bg-white shadow-md hover:shadow-lg transition-all"
          >
            <Sparkles className="h-4 w-4 text-purple-500" />
            Generate with AI
          </Button>
        )}

        {/* Block Actions Menu */}
        {content && !isGenerating && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-7 w-7 p-0 bg-white shadow-sm"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onGenerateAI}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate with AI
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(content)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Content
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onContentChange("")}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Content
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Generating Indicator */}
        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 text-purple-600">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-medium">AI is generating content...</span>
            </div>
          </div>
        )}
      </div>

      {/* Character Count */}
      {content && (
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
        </div>
      )}
    </div>
  );
}