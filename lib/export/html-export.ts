import { Template } from "@/lib/templates";

export interface HTMLExportOptions {
  title: string;
  author?: string;
  template: Template;
  includeStyles?: boolean;
  standalone?: boolean;
}

export function exportToHTML(
  sections: Array<{ title: string; content: string; type: string }>,
  options: HTMLExportOptions
): string {
  const theme = options.template.colorScheme;

  const styles = options.includeStyles
    ? `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: ${options.template.fonts.secondary}, sans-serif;
        color: ${theme.text};
        background-color: ${theme.background};
        line-height: 1.6;
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      
      .document-header {
        text-align: center;
        padding: 60px 20px;
        background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%);
        color: white;
        border-radius: 12px;
        margin-bottom: 40px;
      }
      
      .document-title {
        font-family: ${options.template.fonts.primary}, sans-serif;
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 16px;
      }
      
      .document-subtitle {
        font-size: 20px;
        opacity: 0.9;
      }
      
      .section {
        background: white;
        padding: 40px;
        margin-bottom: 30px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      .section-title {
        font-family: ${options.template.fonts.primary}, sans-serif;
        font-size: 32px;
        font-weight: bold;
        color: ${theme.primary};
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 3px solid ${theme.accent};
      }
      
      .section-type {
        display: inline-block;
        background: ${theme.accent}15;
        color: ${theme.accent};
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 16px;
      }
      
      .content h1 {
        font-size: 28px;
        font-weight: bold;
        color: ${theme.primary};
        margin: 24px 0 16px;
      }
      
      .content h2 {
        font-size: 24px;
        font-weight: bold;
        color: ${theme.primary};
        margin: 20px 0 12px;
      }
      
      .content h3 {
        font-size: 20px;
        font-weight: 600;
        color: ${theme.primary};
        margin: 16px 0 8px;
      }
      
      .content p {
        margin-bottom: 16px;
        line-height: 1.8;
      }
      
      .content ul, .content ol {
        margin: 16px 0;
        padding-left: 32px;
      }
      
      .content li {
        margin-bottom: 8px;
      }
      
      .content strong {
        font-weight: 600;
        color: ${theme.primary};
      }
      
      .content em {
        font-style: italic;
        color: ${theme.secondary};
      }
      
      .content table {
        width: 100%;
        border-collapse: collapse;
        margin: 24px 0;
      }
      
      .content th {
        background: ${theme.primary};
        color: white;
        padding: 12px;
        text-align: left;
        font-weight: 600;
      }
      
      .content td {
        padding: 12px;
        border-bottom: 1px solid ${theme.border};
      }
      
      .content tr:hover {
        background: ${theme.background};
      }
      
      .footer {
        text-align: center;
        padding: 40px 20px;
        color: ${theme.secondary};
        font-size: 14px;
        margin-top: 60px;
        border-top: 2px solid ${theme.border};
      }
      
      @media print {
        body {
          background: white;
        }
        
        .section {
          page-break-inside: avoid;
          box-shadow: none;
          border: 1px solid ${theme.border};
        }
      }
    </style>
  `
    : "";

  const convertMarkdownToHTML = (content: string): string => {
    let html = content;

    // Headers
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Lists
    html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

    // Paragraphs
    html = html
      .split("\n\n")
      .map((para) => {
        if (
          !para.startsWith("<h") &&
          !para.startsWith("<ul") &&
          !para.startsWith("<li") &&
          para.trim()
        ) {
          return `<p>${para}</p>`;
        }
        return para;
      })
      .join("\n");

    return html;
  };

  const sectionsHTML = sections
    .map(
      (section) => `
    <div class="section">
      <div class="section-type">${section.type}</div>
      <h2 class="section-title">${section.title}</h2>
      <div class="content">
        ${convertMarkdownToHTML(section.content)}
      </div>
    </div>
  `
    )
    .join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="${options.author || "Elite Doc Generator"}">
  <title>${options.title}</title>
  ${styles}
</head>
<body>
  <div class="document-header">
    <h1 class="document-title">${options.title}</h1>
    <p class="document-subtitle">${options.template.name} Template</p>
  </div>
  
  ${sectionsHTML}
  
  <div class="footer">
    <p>Generated by Elite Doc Generator</p>
    <p>${new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>
  `.trim();

  return html;
}

export function downloadHTML(
  sections: Array<{ title: string; content: string; type: string }>,
  filename: string,
  options: HTMLExportOptions
): void {
  const html = exportToHTML(sections, options);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".html") ? filename : `${filename}.html`;
  link.click();
  URL.revokeObjectURL(url);
}