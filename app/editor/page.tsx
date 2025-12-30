import Link from "next/link";
import { Sidebar, FileText, Save, Download, Eye, Settings, Palette, Layout, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { getTemplateById, templates } from "@/lib/templates";

export default function Editor({ searchParams }: { searchParams: { template?: string } }) {
  // Get template from URL parameter or default to business proposal
  const templateId = searchParams.template || "business-proposal";
  const selectedTemplate = getTemplateById(templateId) || templates[0];
  
  const sections = selectedTemplate.sections.map((section, index) => ({
    id: section.id,
    title: section.title,
    active: index === 0,
    content: section.content,
    type: section.type
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
          {/* Sidebar Header */}
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
          
          {/* Sections List */}
          <div className="flex-1 p-4 space-y-2">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  section.active 
                    ? 'text-white' 
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
                style={section.active ? { backgroundColor: selectedTemplate.colorScheme.primary } : {}}
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
          
          {/* Sidebar Footer */}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg font-semibold text-primary">{selectedTemplate.name} Draft</h1>
                <span className="text-sm text-muted-foreground">Last saved 2 minutes ago</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/editor-ai">
                    <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                    AI Editor
                  </Link>
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
          </div>

          {/* Editor Canvas */}
          <div 
            className="flex-1 p-8 overflow-auto"
            style={{ backgroundColor: selectedTemplate.colorScheme.background }}
          >
            <Card className="max-w-4xl mx-auto min-h-full shadow-lg">
              <CardHeader 
                className="border-b"
                style={{ borderColor: selectedTemplate.colorScheme.primary + '20' }}
              >
                <CardTitle 
                  className="text-2xl text-center"
                  style={{ 
                    color: selectedTemplate.colorScheme.primary,
                    fontFamily: selectedTemplate.fonts.primary 
                  }}
                >
                  {sections.find(s => s.active)?.title || "Document Section"}
                </CardTitle>
                <p className="text-center text-sm text-muted-foreground">
                  {selectedTemplate.description}
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div 
                  className="prose max-w-none"
                  style={{ 
                    color: selectedTemplate.colorScheme.text,
                    fontFamily: selectedTemplate.fonts.secondary 
                  }}
                >
                  <div className="whitespace-pre-wrap">
                    {sections.find(s => s.active)?.content || "Select a section to start editing..."}
                  </div>
                  
                  {/* Template-specific styling hints */}
                  <div className="mt-8 p-4 rounded-lg border-2 border-dashed opacity-50">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>{selectedTemplate.name}</strong> template features:
                    </p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• {selectedTemplate.layout} layout optimized for {selectedTemplate.category.toLowerCase()}</li>
                      <li>• {selectedTemplate.sections.length} pre-structured sections</li>
                      <li>• Professional {selectedTemplate.colorScheme.primary} color scheme</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}