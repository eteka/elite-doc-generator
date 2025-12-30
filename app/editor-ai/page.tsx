"use client";

import { useState, useCallback } from "react";
import { FileText, Save, Download, Eye, Settings, Palette, Layout, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { getTemplateById, templates } from "@/lib/templates";
import { AIToolbar } from "@/components/editor/ai-toolbar";
import { SmartSuggestions } from "@/components/editor/smart-suggestions";
import { ContentBlock } from "@/components/editor/content-block";

export default function EditorAI() {
  const [templateId] = useState("strategic-consulting");
  const selectedTemplate = getTemplateById(templateId) || templates[0];
  
  const [activeSectionId, setActiveSectionId] = useState(selectedTemplate.sections[0].id);
  const [sectionContents, setSectionContents] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [generationHistory, setGenerationHistory] = useState<Array<{ content: string; timestamp: number }>>([]);

  const activeSection = selectedTemplate.sections.find(s => s.id === activeSectionId);
  const currentContent = sectionContents[activeSectionId] || activeSection?.content || "";

  const handleGenerateAI = useCallback(async (mode: string) => {
    if (!activeSection) return;

    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          content: currentContent || `Generate content for: ${activeSection.title}`,
          templateId: selectedTemplate.id,
          sectionTitle: activeSection.title,
        }),
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
                // Save to history
                setGenerationHistory(prev => [...prev, { 
                  content: generatedContent, 
                  timestamp: Date.now() 
                }]);
                break;
              }
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  generatedContent += parsed.content;
                  setSectionContents(prev => ({
                    ...prev,
                    [activeSectionId]: generatedContent
                  }));
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("AI generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [activeSection, activeSectionId, currentContent, selectedTemplate.id]);

  const handleStopGeneration = useCallback(() => {
    setIsGenerating(false);
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setSectionContents(prev => ({
      ...prev,
      [activeSectionId]: content
    }));
  }, [activeSectionId]);

  const handleApplySuggestion = useCallback((suggestion: any) => {
    // Apply suggestion logic here
    console.log("Applying suggestion:", suggestion);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-primary">Document Sections</h2>
              <div 
                className="w-4 h-4 rounded-full border-2"
                style={{ backgroundColor: selectedTemplate.colorScheme.primary }}
                title={selectedTemplate.name}
              />
            </div>
            <p className="text-sm text-muted-foreground">{selectedTemplate.name} Template</p>
            <p className="text-xs text-muted-foreground mt-1">{selectedTemplate.layout} layout</p>
          </div>
          
          <div className="flex-1 p-4 space-y-2 overflow-auto">
            {selectedTemplate.sections.map((section) => (
              <div
                key={section.id}
                onClick={() => setActiveSectionId(section.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  section.id === activeSectionId
                    ? 'text-white' 
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
                style={section.id === activeSectionId ? { backgroundColor: selectedTemplate.colorScheme.primary } : {}}
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-3" />
                  <div>
                    <span className="font-medium block">{section.title}</span>
                    <span className="text-xs opacity-75">{section.type}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              + Add Section
            </Button>
          </div>
          
          <div className="p-4 border-t border-slate-200 space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Palette className="h-4 w-4 mr-2" />
              Change Template
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Layout className="h-4 w-4 mr-2" />
              Layout Options
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Document Settings
            </Button>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Editor Toolbar */}
          <div className="bg-white border-b border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg font-semibold text-primary">{selectedTemplate.name} Draft</h1>
                <span className="text-sm text-muted-foreground">Last saved 2 minutes ago</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  {showSuggestions ? "Hide" : "Show"} Suggestions
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="accent" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* AI Toolbar */}
            <AIToolbar 
              onGenerate={handleGenerateAI}
              isGenerating={isGenerating}
              onStop={handleStopGeneration}
            />
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Editor Canvas */}
            <div 
              className="flex-1 p-8 overflow-auto"
              style={{ backgroundColor: selectedTemplate.colorScheme.background }}
            >
              <Card className="max-w-4xl mx-auto shadow-lg">
                <CardHeader 
                  className="border-b"
                  style={{ borderColor: selectedTemplate.colorScheme.primary + '20' }}
                >
                  <CardTitle 
                    className="text-2xl"
                    style={{ 
                      color: selectedTemplate.colorScheme.primary,
                      fontFamily: selectedTemplate.fonts.primary 
                    }}
                  >
                    {activeSection?.title || "Document Section"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {activeSection?.type}
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <ContentBlock
                    content={currentContent}
                    onContentChange={handleContentChange}
                    onGenerateAI={() => handleGenerateAI("executive_summary")}
                    isGenerating={isGenerating}
                    placeholder={`Start writing your ${activeSection?.title.toLowerCase()} or use AI to generate content...`}
                  />

                  {/* Template hints */}
                  <div className="mt-8 p-4 rounded-lg border-2 border-dashed bg-slate-50">
                    <p className="text-sm font-medium text-primary mb-2">
                      💡 {selectedTemplate.name} Template Tips
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• {selectedTemplate.layout} layout optimized for {selectedTemplate.category.toLowerCase()}</li>
                      <li>• Use AI to generate content in the appropriate style and tone</li>
                      <li>• Professional {selectedTemplate.colorScheme.primary} color scheme</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Smart Suggestions Panel */}
            <SmartSuggestions
              templateId={selectedTemplate.id}
              sectionType={activeSection?.type || ""}
              onApplySuggestion={handleApplySuggestion}
              isVisible={showSuggestions}
              onClose={() => setShowSuggestions(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}