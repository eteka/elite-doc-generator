import { useState, useCallback, useRef } from "react";

interface GenerationHistoryItem {
  content: string;
  timestamp: number;
  mode: string;
}

interface UseAIGenerationOptions {
  onContentUpdate: (content: string) => void;
  maxHistorySize?: number;
}

export function useAIGeneration({ onContentUpdate, maxHistorySize = 50 }: UseAIGenerationOptions) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generate = useCallback(async (
    mode: string,
    content: string,
    templateId: string,
    sectionTitle: string
  ) => {
    // Cancel any ongoing generation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsGenerating(true);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          content,
          templateId,
          sectionTitle,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error("Failed to generate content");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let generatedContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                // Add to history
                const newHistoryItem: GenerationHistoryItem = {
                  content: generatedContent,
                  timestamp: Date.now(),
                  mode,
                };

                setHistory(prev => {
                  const newHistory = [...prev.slice(0, historyIndex + 1), newHistoryItem];
                  return newHistory.slice(-maxHistorySize);
                });
                setHistoryIndex(prev => Math.min(prev + 1, maxHistorySize - 1));
                break;
              }

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  generatedContent += parsed.content;
                  onContentUpdate(generatedContent);
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      }

      return generatedContent;
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Generation cancelled");
      } else {
        console.error("AI generation error:", error);
        throw error;
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  }, [historyIndex, maxHistorySize, onContentUpdate]);

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
  }, []);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onContentUpdate(history[newIndex].content);
    }
  }, [history, historyIndex, onContentUpdate]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onContentUpdate(history[newIndex].content);
    }
  }, [history, historyIndex, onContentUpdate]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    generate,
    stop,
    undo,
    redo,
    isGenerating,
    canUndo,
    canRedo,
    history,
    historyIndex,
  };
}