"use client";

import React from "react";

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  return (
    <div className="border rounded-lg p-4 min-h-[300px]">
      <textarea
        className="w-full h-full min-h-[250px] outline-none resize-none"
        value={content}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Start writing your document..."
      />
    </div>
  );
}
