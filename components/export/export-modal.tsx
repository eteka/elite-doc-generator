"use client";

import { useState } from "react";
import { X, FileText, Download, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Template } from "@/lib/templates";
import { downloadPDF } from "@/lib/export/pdf-export";
import { downloadPPTX } from "@/lib/export/pptx-export";
import { downloadDOCX } from "@/lib/export/docx-export";
import { downloadHTML } from "@/lib/export/html-export";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  template: Template;
  sections: Array<{ title: string; content: string; type: string }>;
}

type ExportFormat = "pdf" | "pptx" | "docx" | "html";
type ExportQuality = "web" | "print";

export function ExportModal({
  isOpen,
  onClose,
  documentTitle,
  template,
  sections,
}: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("pdf");
  const [quality, setQuality] = useState<ExportQuality>("web");
  const [includePageNumbers, setIncludePageNumbers] = useState(true);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [includeTOC, setIncludeTOC] = useState(true);
  const [pageRange, setPageRange] = useState({ start: 1, end: sections.length });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  if (!isOpen) return null;

  const formats = [
    {
      id: "pdf" as ExportFormat,
      name: "PDF",
      description: "Perfect formatting preservation",
      icon: FileText,
    },
    {
      id: "pptx" as ExportFormat,
      name: "PowerPoint",
      description: "Editable presentation slides",
      icon: FileText,
    },
    {
      id: "docx" as ExportFormat,
      name: "Word",
      description: "Editable document with styles",
      icon: FileText,
    },
    {
      id: "html" as ExportFormat,
      name: "HTML",
      description: "Web viewing and sharing",
      icon: FileText,
    },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportComplete(false);

    try {
      const filename = documentTitle.replace(/\s+/g, "-").toLowerCase();

      // Simulate progress
      const progressInterval = setInterval(() => {
        setExportProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      switch (selectedFormat) {
        case "pdf":
          await downloadPDF("document-content", filename, {
            title: documentTitle,
            author: "Elite Doc Generator",
            includePageNumbers,
            includeHeaders,
            quality,
            pageRange,
          });
          break;

        case "pptx":
          await downloadPPTX(sections, filename, {
            title: documentTitle,
            author: "Elite Doc Generator",
            template,
            includeCharts: true,
          });
          break;

        case "docx":
          await downloadDOCX(sections, filename, {
            title: documentTitle,
            author: "Elite Doc Generator",
            template,
            includeTableOfContents: includeTOC,
          });
          break;

        case "html":
          downloadHTML(sections, filename, {
            title: documentTitle,
            author: "Elite Doc Generator",
            template,
            includeStyles: true,
            standalone: true,
          });
          break;
      }

      clearInterval(progressInterval);
      setExportProgress(100);
      setExportComplete(true);

      // Auto-close after success
      setTimeout(() => {
        onClose();
        setIsExporting(false);
        setExportComplete(false);
        setExportProgress(0);
      }, 2000);
    } catch (error) {
      console.error("Export error:", error);
      setIsExporting(false);
      alert("Export failed. Please try again.");
    }
  };

  const handleEmailDelivery = async () => {
    if (!emailAddress) {
      alert("Please enter an email address");
      return;
    }

    alert(`Email delivery to ${emailAddress} - Feature coming soon!`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Export Document</CardTitle>
              <CardDescription className="mt-2">
                Choose format and options for exporting "{documentTitle}"
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="text-sm font-semibold mb-3 block">Export Format</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedFormat === format.id
                      ? "border-accent bg-accent/5"
                      : "border-slate-200 hover:border-accent/50"
                  }`}
                >
                  <format.icon
                    className={`h-6 w-6 mb-2 ${
                      selectedFormat === format.id ? "text-accent" : "text-slate-400"
                    }`}
                  />
                  <div className="font-semibold text-sm">{format.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {format.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quality Settings */}
          {selectedFormat === "pdf" && (
            <div>
              <label className="text-sm font-semibold mb-3 block">Quality</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setQuality("web")}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    quality === "web"
                      ? "border-accent bg-accent/5"
                      : "border-slate-200"
                  }`}
                >
                  <div className="font-medium">Web (Faster)</div>
                  <div className="text-xs text-muted-foreground">
                    Optimized for screen viewing
                  </div>
                </button>
                <button
                  onClick={() => setQuality("print")}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    quality === "print"
                      ? "border-accent bg-accent/5"
                      : "border-slate-200"
                  }`}
                >
                  <div className="font-medium">Print (Higher Quality)</div>
                  <div className="text-xs text-muted-foreground">
                    Best for printing
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Page Range */}
          <div>
            <label className="text-sm font-semibold mb-3 block">Page Range</label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">From</label>
                <input
                  type="number"
                  min="1"
                  max={sections.length}
                  value={pageRange.start}
                  onChange={(e) =>
                    setPageRange({ ...pageRange, start: parseInt(e.target.value) })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">To</label>
                <input
                  type="number"
                  min="1"
                  max={sections.length}
                  value={pageRange.end}
                  onChange={(e) =>
                    setPageRange({ ...pageRange, end: parseInt(e.target.value) })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
              <div className="pt-5">
                <span className="text-sm text-muted-foreground">
                  of {sections.length} sections
                </span>
              </div>
            </div>
          </div>

          {/* Include Options */}
          <div>
            <label className="text-sm font-semibold mb-3 block">Include</label>
            <div className="space-y-2">
              {selectedFormat === "pdf" && (
                <>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePageNumbers}
                      onChange={(e) => setIncludePageNumbers(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Page numbers</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeHeaders}
                      onChange={(e) => setIncludeHeaders(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Headers with document title</span>
                  </label>
                </>
              )}
              {selectedFormat === "docx" && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTOC}
                    onChange={(e) => setIncludeTOC(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Table of contents</span>
                </label>
              )}
            </div>
          </div>

          {/* Email Delivery */}
          <div>
            <label className="text-sm font-semibold mb-3 block">
              Email Delivery (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <Button variant="outline" onClick={handleEmailDelivery}>
                <Mail className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {exportComplete ? "Export Complete!" : "Exporting..."}
                </span>
                <span className="text-muted-foreground">{exportProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              {exportComplete && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Document exported successfully!</span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isExporting}>
              Cancel
            </Button>
            <Button
              variant="accent"
              onClick={handleExport}
              disabled={isExporting}
              className="min-w-[120px]"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}