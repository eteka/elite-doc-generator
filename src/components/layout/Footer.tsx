import React from 'react';
import { FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-slate-900">Elite Doc Generator</span>
          </div>

          <p className="text-sm text-slate-500">
            Professional document creation platform
          </p>

          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
