'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DocumentContent } from '@/types';
import { cn } from '@/lib/utils';

interface DocumentPreviewProps {
  content: DocumentContent;
  className?: string;
}

export function DocumentPreview({ content, className }: DocumentPreviewProps) {
  return (
    <div className={cn('bg-white rounded-xl shadow-elite border border-slate-200', className)}>
      {/* Document Header */}
      <div className="bg-elite-navy text-white px-8 py-8 rounded-t-xl">
        <h1 className="text-2xl font-bold mb-2">{content.title || 'Untitled Document'}</h1>
        {content.subtitle && (
          <p className="text-slate-300 text-lg">{content.subtitle}</p>
        )}
        <div className="w-24 h-0.5 bg-elite-gold mt-4" />
      </div>

      {/* Metadata */}
      <div className="px-8 py-4 border-b border-slate-100 bg-slate-50/50 text-sm text-slate-600">
        <div className="flex flex-wrap gap-6">
          {content.author && (
            <div>
              <span className="font-medium text-slate-700">Author:</span> {content.author}
            </div>
          )}
          {content.organization && (
            <div>
              <span className="font-medium text-slate-700">Organization:</span>{' '}
              {content.organization}
            </div>
          )}
          <div>
            <span className="font-medium text-slate-700">Date:</span> {content.date}
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      {content.sections.some((s) => s.content) && (
        <div className="px-8 py-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Table of Contents</h2>
          <nav className="space-y-2">
            {content.sections
              .filter((section) => section.content)
              .map((section, index) => (
                <a
                  key={section.sectionId}
                  href={`#section-${section.sectionId}`}
                  className="block text-sm text-slate-600 hover:text-primary-600 transition-colors"
                >
                  {index + 1}. {section.title}
                </a>
              ))}
          </nav>
        </div>
      )}

      {/* Sections */}
      <div className="px-8 py-6 space-y-8">
        {content.sections.map((section, index) => {
          if (!section.content) return null;

          return (
            <section key={section.sectionId} id={`section-${section.sectionId}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-elite-gold" />
                <h2 className="text-xl font-semibold text-slate-900">
                  {index + 1}. {section.title}
                </h2>
              </div>

              <div className="document-preview pl-11">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    h2: ({ children }) => (
                      <h4 className="text-base font-semibold text-slate-800 mt-5 mb-2">
                        {children}
                      </h4>
                    ),
                    h3: ({ children }) => (
                      <h5 className="text-sm font-semibold text-slate-700 mt-4 mb-2">
                        {children}
                      </h5>
                    ),
                    p: ({ children }) => (
                      <p className="text-slate-600 leading-relaxed mb-3">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-1.5 mb-4 text-slate-600">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-1.5 mb-4 text-slate-600">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-elite-gold bg-slate-50 py-3 px-4 my-4 italic text-slate-600">
                        {children}
                      </blockquote>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-slate-800">{children}</strong>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-slate-50">{children}</thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-2 text-sm text-slate-600 border-t border-slate-100">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            </section>
          );
        })}

        {content.sections.every((s) => !s.content) && (
          <div className="text-center py-12 text-slate-400">
            <p>No content yet. Start editing sections to see the preview.</p>
          </div>
        )}
      </div>
    </div>
  );
}
