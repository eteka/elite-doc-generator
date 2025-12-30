import jsPDF from 'jspdf';
import { DocumentContent, ExportOptions } from '@/types';

const ELITE_NAVY = '#0f172a';
const ELITE_GOLD = '#d4af37';
const SLATE_600 = '#475569';
const SLATE_400 = '#94a3b8';

export async function exportToPDF(
  content: DocumentContent,
  options: ExportOptions
): Promise<Blob> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  // Title Page
  doc.setFillColor(ELITE_NAVY);
  doc.rect(0, 0, pageWidth, 60, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');

  const titleLines = doc.splitTextToSize(content.title, contentWidth);
  doc.text(titleLines, margin, 35);

  if (content.subtitle) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(content.subtitle, margin, 50);
  }

  // Gold accent line
  doc.setDrawColor(ELITE_GOLD);
  doc.setLineWidth(1);
  doc.line(margin, 65, pageWidth - margin, 65);

  // Metadata section
  yPosition = 80;
  doc.setTextColor(SLATE_600);
  doc.setFontSize(11);

  if (content.author) {
    doc.setFont('helvetica', 'bold');
    doc.text('Prepared by:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(content.author, margin + 35, yPosition);
    yPosition += 8;
  }

  if (content.organization) {
    doc.setFont('helvetica', 'bold');
    doc.text('Organization:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(content.organization, margin + 35, yPosition);
    yPosition += 8;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Date:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(content.date, margin + 35, yPosition);

  // Add new page for content
  doc.addPage();
  yPosition = margin;

  // Table of Contents
  doc.setTextColor(ELITE_NAVY);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Table of Contents', margin, yPosition);
  yPosition += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(SLATE_600);

  content.sections.forEach((section, index) => {
    const tocEntry = `${index + 1}. ${section.title}`;
    doc.text(tocEntry, margin, yPosition);
    yPosition += 8;
  });

  // Content sections
  content.sections.forEach((section, index) => {
    doc.addPage();
    yPosition = margin;

    // Section header with gold accent
    doc.setDrawColor(ELITE_GOLD);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition + 2, margin + 30, yPosition + 2);

    // Section number and title
    doc.setTextColor(ELITE_NAVY);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    yPosition += 12;
    doc.text(`${index + 1}. ${section.title}`, margin, yPosition);
    yPosition += 15;

    // Section content
    doc.setTextColor(SLATE_600);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const contentLines = doc.splitTextToSize(section.content, contentWidth);

    contentLines.forEach((line: string) => {
      if (yPosition > pageHeight - margin - 10) {
        doc.addPage();
        yPosition = margin;
      }

      // Handle markdown-like formatting
      if (line.startsWith('## ')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(ELITE_NAVY);
        doc.text(line.replace('## ', ''), margin, yPosition);
        yPosition += 10;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(SLATE_600);
      } else if (line.startsWith('### ')) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(line.replace('### ', ''), margin, yPosition);
        yPosition += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        doc.text('•  ' + line.substring(2), margin + 5, yPosition);
        yPosition += 7;
      } else if (line.trim() === '') {
        yPosition += 4;
      } else {
        doc.text(line, margin, yPosition);
        yPosition += 7;
      }
    });
  });

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    if (i > 1) {
      // Page number
      doc.setFontSize(9);
      doc.setTextColor(SLATE_400);
      doc.text(`Page ${i - 1} of ${totalPages - 1}`, pageWidth / 2, pageHeight - 10, {
        align: 'center',
      });

      // Document title in footer
      doc.setFontSize(8);
      doc.text(content.title, margin, pageHeight - 10);
    }

    // Watermark if specified
    if (options.watermark) {
      doc.setFontSize(60);
      doc.setTextColor(240, 240, 240);
      doc.text(options.watermark, pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 45,
      });
    }
  }

  return doc.output('blob');
}
