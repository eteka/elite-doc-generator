'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Download,
  Eye,
  Edit3,
  Loader2,
  Settings,
  Sparkles,
} from 'lucide-react';
import { Header } from '@/components/layout';
import { Button, Input, Badge } from '@/components/ui';
import { SectionEditor, DocumentPreview, ExportDialog } from '@/components/editor';
import { useDocumentStore } from '@/store/documentStore';
import { getTemplateById } from '@/lib/templates';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditorPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { documents, loadDocument, updateDocumentContent, updateSection, apiKey } =
    useDocumentStore();

  const [document, setDocument] = useState(() =>
    documents.find((d) => d.id === resolvedParams.id)
  );
  const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [generatingSection, setGeneratingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const doc = loadDocument(resolvedParams.id);
    if (doc) {
      setDocument(doc);
    } else {
      router.push('/');
    }
  }, [resolvedParams.id, loadDocument, router]);

  // Sync document state with store
  useEffect(() => {
    const doc = documents.find((d) => d.id === resolvedParams.id);
    if (doc) {
      setDocument(doc);
    }
  }, [documents, resolvedParams.id]);

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const template = getTemplateById(document.templateId);

  const handleContentChange = (field: string, value: string) => {
    updateDocumentContent(document.id, { [field]: value });
  };

  const handleSectionChange = (sectionId: string, content: string) => {
    updateSection(document.id, sectionId, content);
  };

  const handleGenerateSection = async (sectionId: string, prompt: string) => {
    if (!apiKey) {
      alert('Please set your OpenAI API key in Settings');
      return;
    }

    setGeneratingSection(sectionId);

    try {
      const documentContext = `
Title: ${document.content.title}
${document.content.subtitle ? `Subtitle: ${document.content.subtitle}` : ''}
Author: ${document.content.author || 'Not specified'}
Organization: ${document.content.organization || 'Not specified'}

Existing sections:
${document.content.sections
  .filter((s) => s.content)
  .map((s) => `${s.title}: ${s.content.substring(0, 200)}...`)
  .join('\n')}
      `.trim();

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generateSection',
          apiKey,
          sectionPrompt: prompt,
          topic: document.content.title,
          documentContext,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Generation failed');
      }

      const { content } = await response.json();
      handleSectionChange(sectionId, content);
    } catch (error) {
      console.error('Generation error:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate content');
    } finally {
      setGeneratingSection(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay - in real app this would persist to backend
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const completedSections = document.content.sections.filter((s) => s.content).length;
  const totalSections = document.content.sections.length;

  return (
    <>
      <div className="min-h-screen flex flex-col bg-slate-100">
        {/* Editor Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-semibold text-slate-900 truncate max-w-[300px]">
                      {document.content.title}
                    </h1>
                    <Badge variant={document.status === 'complete' ? 'success' : 'default'}>
                      {document.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    {template?.name} • {completedSections}/{totalSections} sections
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center rounded-lg border border-slate-200 p-1">
                  <button
                    onClick={() => setActiveView('edit')}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                      activeView === 'edit'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    )}
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setActiveView('preview')}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                      activeView === 'preview'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    )}
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  leftIcon={
                    isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )
                  }
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>

                <Button
                  size="sm"
                  onClick={() => setIsExportOpen(true)}
                  leftIcon={<Download className="h-4 w-4" />}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Editor Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {activeView === 'edit' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Editor Panel */}
                <div className="space-y-6 overflow-y-auto pb-6 scrollbar-thin">
                  {/* Document Info */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                    <h2 className="font-semibold text-slate-900">Document Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Title"
                        value={document.content.title}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                      />
                      <Input
                        label="Subtitle"
                        value={document.content.subtitle || ''}
                        onChange={(e) => handleContentChange('subtitle', e.target.value)}
                      />
                      <Input
                        label="Author"
                        value={document.content.author || ''}
                        onChange={(e) => handleContentChange('author', e.target.value)}
                      />
                      <Input
                        label="Organization"
                        value={document.content.organization || ''}
                        onChange={(e) => handleContentChange('organization', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* AI Hint */}
                  {apiKey && (
                    <div className="flex items-center gap-3 bg-primary-50 border border-primary-200 rounded-xl px-4 py-3">
                      <Sparkles className="h-5 w-5 text-primary-600 shrink-0" />
                      <p className="text-sm text-primary-800">
                        AI generation is enabled. Click &quot;Generate with AI&quot; on any section
                        to auto-generate professional content.
                      </p>
                    </div>
                  )}

                  {/* Sections */}
                  <div className="space-y-4">
                    <h2 className="font-semibold text-slate-900">Sections</h2>
                    {template?.structure.map((section) => {
                      const sectionContent =
                        document.content.sections.find(
                          (s) => s.sectionId === section.id
                        )?.content || '';

                      return (
                        <SectionEditor
                          key={section.id}
                          section={section}
                          content={sectionContent}
                          topic={document.content.title}
                          documentContext=""
                          onContentChange={(content) =>
                            handleSectionChange(section.id, content)
                          }
                          onGenerate={handleGenerateSection}
                          isGenerating={generatingSection === section.id}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="hidden lg:block overflow-y-auto pb-6 scrollbar-thin">
                  <DocumentPreview content={document.content} />
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto overflow-y-auto pb-6">
                <DocumentPreview content={document.content} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Export Dialog */}
      <ExportDialog
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        content={document.content}
      />
    </>
  );
}
