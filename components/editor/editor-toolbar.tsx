"use client";

import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EditorToolbar() {
  return (
    <div className="border-b p-2 flex gap-1">
      <Button variant="ghost" size="sm">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Underline className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button variant="ghost" size="sm">
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
