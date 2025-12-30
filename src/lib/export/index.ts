import { DocumentContent, ExportFormat, ExportOptions } from '@/types';
import { exportToPDF } from './pdf';
import { exportToDocx } from './docx';
import { exportToPptx } from './pptx';

export async function exportDocument(
  content: DocumentContent,
  options: ExportOptions
): Promise<Blob> {
  switch (options.format) {
    case 'pdf':
      return exportToPDF(content, options);
    case 'docx':
      return exportToDocx(content, options);
    case 'pptx':
      return exportToPptx(content, options);
    default:
      throw new Error(`Unsupported export format: ${options.format}`);
  }
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getFileExtension(format: ExportFormat): string {
  return format;
}

export function getMimeType(format: ExportFormat): string {
  switch (format) {
    case 'pdf':
      return 'application/pdf';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    default:
      return 'application/octet-stream';
  }
}

export { exportToPDF } from './pdf';
export { exportToDocx } from './docx';
export { exportToPptx } from './pptx';
