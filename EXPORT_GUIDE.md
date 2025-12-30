# Export Functionality Guide

## Overview
Elite Doc Generator provides comprehensive export functionality supporting multiple formats with perfect formatting preservation and professional quality output.

## Supported Formats

### 1. PDF Export
Professional PDF generation with exact formatting preservation.

**Features:**
- Perfect formatting preservation
- Embedded fonts
- Vector graphics (crisp at any zoom level)
- Page numbers and headers
- Clickable table of contents
- Web and print quality options
- Page range selection

**Quality Options:**
- **Web Quality**: Optimized for screen viewing (1.5x scale)
- **Print Quality**: High resolution for printing (2x scale)

**Usage:**
```typescript
import { downloadPDF } from "@/lib/export/pdf-export";

await downloadPDF("document-content", "my-document", {
  title: "Strategic Analysis Report",
  author: "Elite Doc Generator",
  includePageNumbers: true,
  includeHeaders: true,
  quality: "print",
  pageRange: { start: 1, end: 10 }
});
```

**Technical Implementation:**
- Uses `jsPDF` for PDF generation
- `html2canvas` for HTML to canvas conversion
- Automatic page breaks for long content
- Maintains aspect ratios and layouts

### 2. PowerPoint (PPTX) Export
Editable presentation slides with template styling.

**Features:**
- Each section becomes a slide
- Template-matched colors and fonts
- Editable text and elements
- Professional slide layouts
- Title slide with branding
- Bullet points and formatting preserved

**Usage:**
```typescript
import { downloadPPTX } from "@/lib/export/pptx-export";

await downloadPPTX(sections, "presentation", {
  title: "Strategic Analysis",
  author: "Elite Doc Generator",
  template: selectedTemplate,
  includeCharts: true
});
```

**Slide Structure:**
- **Title Slide**: Document title with template branding
- **Content Slides**: One per section with formatted content
- **Master Slide**: Template-specific styling applied

**Technical Implementation:**
- Uses `pptxgenjs` library
- Converts markdown to PowerPoint elements
- Maintains template color schemes
- Supports multiple text styles

### 3. Word Document (DOCX) Export
Fully editable Word documents with styles.

**Features:**
- Maintains document structure
- Heading hierarchy (H1, H2, H3)
- Bullet points and numbered lists
- Bold and italic formatting
- Table of contents (optional)
- Page breaks between sections
- Template-matched styling

**Usage:**
```typescript
import { downloadDOCX } from "@/lib/export/docx-export";

await downloadDOCX(sections, "document", {
  title: "Strategic Analysis",
  author: "Elite Doc Generator",
  template: selectedTemplate,
  includeTableOfContents: true
});
```

**Document Structure:**
- Title page
- Table of contents (optional)
- Formatted sections with headings
- Preserved text formatting

**Technical Implementation:**
- Uses `docx` library
- Converts markdown to Word elements
- Maintains heading levels
- Supports rich text formatting

### 4. HTML Export
Standalone HTML for web viewing and sharing.

**Features:**
- Fully styled standalone HTML
- Responsive design
- Print-optimized CSS
- Template-matched colors
- Clean, semantic markup
- No external dependencies

**Usage:**
```typescript
import { downloadHTML } from "@/lib/export/html-export";

downloadHTML(sections, "document", {
  title: "Strategic Analysis",
  author: "Elite Doc Generator",
  template: selectedTemplate,
  includeStyles: true,
  standalone: true
});
```

**HTML Features:**
- Embedded CSS styles
- Responsive layout
- Print media queries
- Semantic HTML5 markup
- Accessible structure

**Technical Implementation:**
- Custom HTML generation
- Markdown to HTML conversion
- Template-specific styling
- Print-optimized CSS

### 5. Image Export (PNG/JPG)
Individual pages as high-quality images.

**Features:**
- High-resolution output
- Transparent or white background
- Perfect for sharing on social media
- Individual page export
- Batch export capability

**Usage:**
```typescript
import html2canvas from "html2canvas";

const canvas = await html2canvas(element, {
  scale: 2,
  backgroundColor: "#ffffff"
});

const link = document.createElement("a");
link.download = "page.png";
link.href = canvas.toDataURL();
link.click();
```

## Export Modal Component

Interactive modal for configuring and executing exports.

**Features:**
- Format selection (PDF, PPTX, DOCX, HTML)
- Quality settings (Web/Print)
- Page range selector
- Include/exclude options
- Email delivery option
- Progress bar with status
- Success confirmation

**Usage:**
```tsx
import { ExportModal } from "@/components/export/export-modal";

<ExportModal
  isOpen={showExportModal}
  onClose={() => setShowExportModal(false)}
  documentTitle="Strategic Analysis Report"
  template={selectedTemplate}
  sections={documentSections}
/>
```

**Modal Sections:**

1. **Format Selection**
   - Visual cards for each format
   - Format descriptions
   - Icon indicators

2. **Quality Settings** (PDF only)
   - Web quality (faster, smaller file)
   - Print quality (higher resolution)

3. **Page Range**
   - Start page selector
   - End page selector
   - Total page count display

4. **Include Options**
   - Page numbers (PDF)
   - Headers (PDF)
   - Table of contents (DOCX)

5. **Email Delivery**
   - Email address input
   - Send button
   - Delivery confirmation

6. **Progress Indicator**
   - Animated progress bar
   - Percentage display
   - Success message

## Export Options

### PDF Options
```typescript
interface PDFExportOptions {
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
```

### PPTX Options
```typescript
interface PPTXExportOptions {
  title: string;
  author?: string;
  subject?: string;
  template: Template;
  includeCharts?: boolean;
  includeImages?: boolean;
}
```

### DOCX Options
```typescript
interface DOCXExportOptions {
  title: string;
  author?: string;
  subject?: string;
  template: Template;
  includeTableOfContents?: boolean;
}
```

### HTML Options
```typescript
interface HTMLExportOptions {
  title: string;
  author?: string;
  template: Template;
  includeStyles?: boolean;
  standalone?: boolean;
}
```

## Best Practices

### 1. Preparing Documents for Export

**Before Exporting:**
- Review all content for completeness
- Check formatting and styling
- Verify charts and images
- Test page breaks
- Proofread text

**Optimization Tips:**
- Use appropriate image sizes
- Minimize complex layouts
- Test different quality settings
- Preview before final export

### 2. Choosing the Right Format

**Use PDF when:**
- Final, non-editable version needed
- Printing required
- Exact layout preservation critical
- Sharing with external parties

**Use PPTX when:**
- Presentation format needed
- Editable slides required
- Visual storytelling important
- Collaborative editing needed

**Use DOCX when:**
- Editable document needed
- Collaborative writing required
- Version tracking important
- Further editing expected

**Use HTML when:**
- Web publishing needed
- Responsive design required
- Easy sharing via link
- No software dependencies wanted

### 3. Quality Settings

**Web Quality:**
- Faster export
- Smaller file size
- Good for screen viewing
- Suitable for email

**Print Quality:**
- Slower export
- Larger file size
- Best for printing
- Professional presentations

### 4. Page Range Selection

**Full Document:**
- Export all sections
- Complete documentation
- Archival purposes

**Specific Sections:**
- Executive summary only
- Selected chapters
- Appendices excluded
- Custom combinations

## Advanced Features

### 1. Batch Export
Export multiple formats simultaneously:

```typescript
const formats: ExportFormat[] = ["pdf", "docx", "html"];

for (const format of formats) {
  await exportDocument(format, options);
}
```

### 2. Custom Styling
Override template styles for specific exports:

```typescript
const customOptions = {
  ...defaultOptions,
  template: {
    ...template,
    colorScheme: customColors
  }
};
```

### 3. Watermarks
Add watermarks to exported documents:

```typescript
// In PDF export
pdf.setTextColor(200, 200, 200);
pdf.setFontSize(60);
pdf.text("DRAFT", pageWidth / 2, pageHeight / 2, {
  angle: 45,
  align: "center"
});
```

### 4. Email Delivery
Send exported documents via email:

```typescript
const handleEmailDelivery = async (email: string, blob: Blob) => {
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("email", email);
  
  await fetch("/api/email/send", {
    method: "POST",
    body: formData
  });
};
```

## Troubleshooting

### Common Issues

**1. Export Fails**
- Check browser console for errors
- Verify all content is loaded
- Try smaller page range
- Reduce quality setting

**2. Formatting Issues**
- Review source HTML structure
- Check CSS conflicts
- Verify template compatibility
- Test with different browsers

**3. Large File Sizes**
- Use web quality instead of print
- Compress images before export
- Reduce page range
- Optimize content

**4. Slow Export**
- Reduce quality setting
- Export fewer pages
- Close other browser tabs
- Use modern browser

### Browser Compatibility

**Fully Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Limited Support:**
- IE 11 (basic functionality only)
- Older mobile browsers

## Performance Optimization

### 1. Lazy Loading
Load export libraries only when needed:

```typescript
const exportPDF = async () => {
  const { downloadPDF } = await import("@/lib/export/pdf-export");
  await downloadPDF(elementId, filename, options);
};
```

### 2. Web Workers
Process exports in background thread:

```typescript
const worker = new Worker("/export-worker.js");
worker.postMessage({ type: "pdf", data: documentData });
worker.onmessage = (e) => {
  const blob = e.data;
  downloadBlob(blob, filename);
};
```

### 3. Caching
Cache generated exports:

```typescript
const cacheKey = `export-${documentId}-${format}`;
const cached = localStorage.getItem(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const exported = await exportDocument();
localStorage.setItem(cacheKey, JSON.stringify(exported));
```

## API Reference

### downloadPDF
```typescript
async function downloadPDF(
  elementId: string,
  filename: string,
  options: PDFExportOptions
): Promise<void>
```

### downloadPPTX
```typescript
async function downloadPPTX(
  sections: Section[],
  filename: string,
  options: PPTXExportOptions
): Promise<void>
```

### downloadDOCX
```typescript
async function downloadDOCX(
  sections: Section[],
  filename: string,
  options: DOCXExportOptions
): Promise<void>
```

### downloadHTML
```typescript
function downloadHTML(
  sections: Section[],
  filename: string,
  options: HTMLExportOptions
): void
```

## Future Enhancements

- [ ] Cloud storage integration (Google Drive, Dropbox)
- [ ] Scheduled exports
- [ ] Export templates
- [ ] Batch processing
- [ ] Version comparison
- [ ] Digital signatures
- [ ] Password protection
- [ ] Compression options
- [ ] Custom page sizes
- [ ] Landscape orientation