'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Plus, Trash2, Edit, Calendar, Clock } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { useDocumentStore } from '@/store/documentStore';
import { getTemplateById } from '@/lib/templates';
import { formatDate } from '@/lib/utils';

export default function DocumentsPage() {
  const router = useRouter();
  const { documents, deleteDocument } = useDocumentStore();

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id);
    }
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Documents</h1>
              <p className="text-slate-600 mt-1">
                Manage and edit your created documents
              </p>
            </div>
            <Link href="/create">
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                New Document
              </Button>
            </Link>
          </div>

          {documents.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mx-auto mb-4">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No documents yet
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Get started by creating your first professional document using
                  one of our premium templates.
                </p>
                <Link href="/create">
                  <Button leftIcon={<Plus className="h-4 w-4" />}>
                    Create Your First Document
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => {
                const template = getTemplateById(doc.templateId);
                const completedSections = doc.content.sections.filter(
                  (s) => s.content
                ).length;
                const totalSections = doc.content.sections.length;

                return (
                  <Link key={doc.id} href={`/editor/${doc.id}`}>
                    <Card hover className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                doc.status === 'complete' ? 'success' : 'default'
                              }
                            >
                              {doc.status}
                            </Badge>
                            <button
                              onClick={(e) => handleDelete(doc.id, e)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">
                          {doc.content.title}
                        </h3>

                        {doc.content.subtitle && (
                          <p className="text-sm text-slate-500 mb-3 line-clamp-1">
                            {doc.content.subtitle}
                          </p>
                        )}

                        <p className="text-xs text-slate-400 mb-4">
                          {template?.name || 'Custom Template'}
                        </p>

                        {/* Progress bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                            <span>Progress</span>
                            <span>
                              {completedSections}/{totalSections} sections
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-500 rounded-full transition-all"
                              style={{
                                width: `${(completedSections / totalSections) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(doc.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Updated {formatDate(doc.updatedAt)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
