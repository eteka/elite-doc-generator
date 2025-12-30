import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PDFExportOptions {
  title: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  includePageNumbers?: boolean;
  includeHeaders?: boolean;
  includeFooters?: boolean;
  quality?: "web" | "print";
  pageRange?: { start: number; end: number };
}

export async function exportToPDF(
  elementId: string,
  options: PDFExportOptions
): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // Create PDF document
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  // Set document properties
  pdf.setProperties({
    title: options.title,
    author: options.author || "Elite Doc Generator",
    subject: options.subject || options.title,
    keywords: options.keywords?.join(", ") || "",
    creator: "Elite Doc Generator",
  });

  // Get all sections to export
  const sections = element.querySelectorAll("[data-section]");
  const quality = options.quality === "print" ? 2 : 1.5;

  let pageNumber = 1;
  const totalPages = sections.length;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i] as HTMLElement;

    // Check page range
    if (options.pageRange) {
      if (i + 1 < options.pageRange.start || i + 1 > options.pageRange.end) {
        continue;
      }
    }

    // Add new page for subsequent sections
    if (i > 0) {
      pdf.addPage();
    }

    // Convert section to canvas
    const canvas = await html2canvas(section, {
      scale: quality,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = 297; // A4 height in mm

    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Handle content that spans multiple pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      pageNumber++;
    }

    // Add page numbers
    if (options.includePageNumbers) {
      const pageCount = pdf.getNumberOfPages();
      for (let j = 1; j <= pageCount; j++) {
        pdf.setPage(j);
        pdf.setFontSize(10);
        pdf.setTextColor(100);
        pdf.text(
          `Page ${j} of ${totalPages}`,
          pdf.internal.pageSize.getWidth() / 2,
          pdf.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }
    }

    // Add headers
    if (options.includeHeaders) {
      const pageCount = pdf.getNumberOfPages();
      for (let j = 1; j <= pageCount; j++) {
        pdf.setPage(j);
        pdf.setFontSize(10);
        pdf.setTextColor(100);
        pdf.text(options.title, 10, 10);
      }
    }

    pageNumber++;
  }

  // Return as blob
  return pdf.output("blob");
}

export async function downloadPDF(
  elementId: string,
  filename: string,
  options: PDFExportOptions
): Promise<void> {
  const blob = await exportToPDF(elementId, options);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}