"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FileText, Save, Download, Eye, Settings, Palette, Layout, Lightbulb, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { getTemplateById, templates } from "@/lib/templates"
import { AIToolbar } from "@/components/editor/ai-toolbar"
import { SmartSuggestions } from "@/components/editor/smart-suggestions"
import { ContentBlock } from "@/components/editor/content-block"
import { useDocument } from "@/lib/hooks/use-document"
import { DocumentContent } from "@/lib/services/document-service"

export default function EditorAI() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const documentId = searchParams.get("id")
  
  const {
    document,
    isLoading,
    isSaving,
    hasUnsavedChanges,
    saveDocument,
    createDocument,
    updateContent,
    updateTitle,
  } = useDocument(documentId || undefined)

  const [templateId, setTemplateId] = useState("strategic-consulting")
  const selectedTemplate = getTemplateById(templateId) || templates[0]
  
  const [activeSectionId, setActiveSectionId] = useState(selectedTemplate.sections[0].id)
  const [sectionContents, setSectionContents] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [documentTitle, setDocumentTitle] = useState("Untitled Document")
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)

  // Load document content when document is fetched
  useEffect(() => {
    if (document) {
      setDocumentTitle(document.title)
      setTemplateId(document.templateId)
      const content = document.content as DocumentContent
      if (content?.sections) {
        const contents: Record<string, string> = {}
        content.sections.forEach(section => {
          contents[section.id] = section.content
        })
        setSectionContents(contents)
      }
    }
  }, [document])

  // Update template sections when template changes
  useEffect(() => {
    if (!document) {
      setActiveSectionId(selectedTemplate.sections[0].id)
    }
  }, [selectedTemplate, document])


  const activeSection = selectedTemplate.sections.find(s => s.id === activeSectionId)
  const currentContent = sectionContents[activeSectionId] || activeSection?.content || ""

  // Build document content for saving
  const buildDocumentContent = useCallback((): DocumentContent => {
    return {
      sections: selectedTemplate.sections.map((section, index) => ({
        id: section.id,
        title: section.title,
        content: sectionContents[section.id] || section.content || "",
        type: "text" as const,
        order: index,
      })),
      metadata: {
        version: 1,
      },
    }
  }, [selectedTemplate.sections, sectionContents])

  // Save handler
  const handleSave = useCallback(async () => {
    const content = buildDocumentContent()
    
    if (document) {
      updateContent(content)
      updateTitle(documentTitle)
      await saveDocument()
    } else {
      const newDoc = await createDocument(documentTitle, templateId, content)
      if (newDoc) {
        router.replace(`/editor-ai?id=${newDoc.id}`)
      }
    }
    
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 2000)
  }, [document, documentTitle, templateId, buildDocumentContent, updateContent, updateTitle, saveDocument, createDocument, router])

  const handleGenerateAI = useCallback(async (mode: string) => {
    if (!activeSection) return

    setIsGenerating(true)
    
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
      })

      if (!response.ok) throw new Error("Failed to generate content")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let generatedContent = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") break
              
              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  generatedContent += parsed.content
                  setSectionContents(prev => ({
                    ...prev,
                    [activeSectionId]: generatedContent
                  }))
                }
              } catch {
                // Ignore parse errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("AI generation error:", error)
    } finally {
      setIsGenerating(false)
    }
  }, [activeSection, activeSectionId, currentContent, selectedTemplate.id])

  const handleStopGeneration = useCallback(() => {
    setIsGenerating(false)
  }, [])

  const handleContentChange = useCallback((content: string) => {
    setSectionContents(prev => ({
      ...prev,
      [activeSectionId]: content
    }))
  }, [activeSectionId])

  const handleApplySuggestion = useCallback((suggestion: { id: string; title: string; description: string; type: string }) => {
    // Apply suggestion - could generate content based on suggestion type
    console.log("Applying suggestion:", suggestion)
  }, [])

  if (isLoading && documentId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-xl font-bold text-primary bg-transparent border-none outline-none w-full focus:ring-0"
              placeholder="Document Title"
            />
            <p className="text-sm text-muted-foreground">{selectedTemplate.name} Template</p>
            {hasUnsavedChanges && (
              <p className="text-xs text-amber-600 mt-1">Unsaved changes</p>
            )}
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
          <div className="bg-white border-b border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg font-semibold text-primary">{documentTitle}</h1>
                {isSaving && (
                  <span className="text-sm text-slate-500 flex items-center">
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    Saving...
                  </span>
                )}
                {showSaveSuccess && (
                  <span className="text-sm text-green-600 flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Saved
                  </span>
                )}
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save
                </Button>
                <Button variant="accent" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <AIToolbar 
              onGenerate={handleGenerateAI}
              isGenerating={isGenerating}
              onStop={handleStopGeneration}
            />
          </div>


          <div className="flex flex-1 overflow-hidden">
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
  )
}
