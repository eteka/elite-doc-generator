'use client';

import React, { useState } from 'react';
import { X, FileText, FileSpreadsheet, Presentation, Download, Loader2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { ExportFormat, ExportOptions, DocumentContent } from '@/types';
import { exportDocument, downloadBlob } from '@/lib/export';
import { slugify } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  content: DocumentContent;
}

const formatOptions: { format: ExportFormat; label: string; icon: React.ReactNode; description: string }[] = [
  {
    format: 'pdf',
    label: 'PDF Document',
    icon: <FileText className="h-6 w-6" />,
    description: 'Best for sharing and printing',
  },
  {
    format: 'docx',
    label: 'Word Document',
    icon: <FileSpreadsheet className="h-6 w-6" />,
    description: 'Editable Microsoft Word format',
  },
  {
    format: 'pptx',
    label: 'PowerPoint',
    icon: <Presentation className="h-6 w-6" />,
    description: 'Presentation slides format',
  },
];

export function ExportDialog({ isOpen, onClose, content }: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [watermark, setWatermark] = useState('');
  const [includeCharts, setIncludeCharts] = useState(true);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const options: ExportOptions = {
        format: selectedFormat,
        includeCharts,
        includeMetadata: true,
        watermark: watermark || undefined,
      };

      const blob = await exportDocument(content, options);
      const filename = `${slugify(content.title)}.${selectedFormat}`;
      downloadBlob(blob, filename);

      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Export Document</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="label">Export Format</label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {formatOptions.map((option) => (
                <button
                  key={option.format}
                  onClick={() => setSelectedFormat(option.format)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    selectedFormat === option.format
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  )}
                >
                  {option.icon}
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {formatOptions.find((o) => o.format === selectedFormat)?.description}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Input
              label="Watermark (optional)"
              placeholder="e.g., CONFIDENTIAL, DRAFT"
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
              hint="Text that appears diagonally across each page"
            />

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-slate-700">Include charts and visualizations</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            leftIcon={
              isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )
            }
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </div>
    </div>
  );
}
