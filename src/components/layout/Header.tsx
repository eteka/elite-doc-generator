'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Plus, FolderOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-sm">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-slate-900">Elite Doc</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                Templates
              </Link>
              <Link
                href="/documents"
                className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                My Documents
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" leftIcon={<FolderOpen className="h-4 w-4" />}>
              <span className="hidden sm:inline">Open</span>
            </Button>
            <Link href="/create">
              <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                New Document
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
