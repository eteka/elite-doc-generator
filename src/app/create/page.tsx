'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Key } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Button, Input, Card, CardContent } from '@/components/ui';
import { documentTemplates, getTemplateById } from '@/lib/templates';
import { useDocumentStore } from '@/store/documentStore';
import { formatDate } from '@/lib/utils';

function CreatePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get('template');

  const { apiKey, setApiKey, createDocument } = useDocumentStore();

  const [selectedTemplateId, setSelectedTemplateId] = useState(templateId || '');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [organization, setOrganization] = useState('');
  const [localApiKey, setLocalApiKey] = useState(apiKey);

  useEffect(() => {
    if (templateId) {
      setSelectedTemplateId(templateId);
      const template = getTemplateById(templateId);
      if (template) {
        setTitle(`New ${template.name}`);
      }
    }
  }, [templateId]);

  const selectedTemplate = getTemplateById(selectedTemplateId);

  const handleCreate = () => {
    if (!selectedTemplate) return;

    // Save API key
    if (localApiKey !== apiKey) {
      setApiKey(localApiKey);
    }

    const document = createDocument(selectedTemplate, {
      title: title || `New ${selectedTemplate.name}`,
      subtitle,
      author,
      organization,
      date: formatDate(new Date()),
    });

    router.push(`/editor/${document.id}`);
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back link */}
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to templates
          </button>

          <div className="space-y-8">
            {/* Step 1: Template Selection (if not pre-selected) */}
            {!templateId && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    1. Select Template
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documentTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => {
                          setSelectedTemplateId(template.id);
                          setTitle(`New ${template.name}`);
                        }}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          selectedTemplateId === template.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <h3 className="font-semibold text-slate-900">
                          {template.name}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {template.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Selected template info */}
            {selectedTemplate && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Selected Template</p>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {selectedTemplate.name}
                      </h2>
                      <p className="text-sm text-slate-600 mt-1">
                        {selectedTemplate.description}
                      </p>
                    </div>
                    {templateId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push('/create')}
                      >
                        Change
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Document Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  {templateId ? '1' : '2'}. Document Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label="Document Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter document title"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      label="Subtitle (optional)"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Enter subtitle or tagline"
                    />
                  </div>
                  <Input
                    label="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name"
                  />
                  <Input
                    label="Organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Company or organization"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Step 3: API Key */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 shrink-0">
                    <Key className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-slate-900 mb-1">
                      {templateId ? '2' : '3'}. OpenAI API Key
                    </h2>
                    <p className="text-sm text-slate-600 mb-4">
                      Required for AI content generation. Your key is stored locally
                      and never sent to our servers.
                    </p>
                    <Input
                      type="password"
                      value={localApiKey}
                      onChange={(e) => setLocalApiKey(e.target.value)}
                      placeholder="sk-..."
                      hint="Get your API key from platform.openai.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Create Button */}
            <div className="flex justify-end">
              <Button
                size="lg"
                onClick={handleCreate}
                disabled={!selectedTemplate || !title}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Create Document
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CreatePageContent />
    </Suspense>
  );
}
