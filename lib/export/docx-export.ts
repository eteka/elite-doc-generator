import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from "docx";
import { Template } from "@/lib/templates";

export interface DOCXExportOptions {
  title: string;
  author?: string;
  subject?: string;
  template: Template;
  includeTableOfContents?: boolean;
}

export async function exportToDOCX(
  sections: Array<{ title: string; content: string; type: string }>,
  options: DOCXExportOptions
): Promise<Blob> {
  const theme = options.template.colorScheme;

  // Parse hex color to RGB for docx
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const primaryColor = hexToRgb(theme.primary);
  const textColor = hexToRgb(theme.text);

  const documentChildren: any[] = [];

  // Title page
  documentChildren.push(
    new Paragraph({
      text: options.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      text: options.template.name + " Template",
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      text: "",
      pageBreakBefore: true,
    })
  );

  // Table of contents (if requested)
  if (options.includeTableOfContents) {
    documentChildren.push(
      new Paragraph({
        text: "Table of Contents",
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 },
      })
    );

    sections.forEach((section, index) => {
      documentChildren.push(
        new Paragraph({
          text: `${index + 1}. ${section.title}`,
          spacing: { after: 100 },
        })
      );
    });

    documentChildren.push(
      new Paragraph({
        text: "",
        pageBreakBefore: true,
      })
    );
  }

  // Content sections
  for (const section of sections) {
    // Section title
    documentChildren.push(
      new Paragraph({
        text: section.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    // Parse and add content
    const lines = section.content.split("\n").filter((line) => line.trim());

    for (const line of lines) {
      // Heading
      if (line.startsWith("###")) {
        documentChildren.push(
          new Paragraph({
            text: line.replace(/^###\s*/, ""),
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 },
          })
        );
      } else if (line.startsWith("##")) {
        documentChildren.push(
          new Paragraph({
            text: line.replace(/^##\s*/, ""),
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 150 },
          })
        );
      } else if (line.startsWith("#")) {
        documentChildren.push(
          new Paragraph({
            text: line.replace(/^#\s*/, ""),
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
      }
      // Bullet point
      else if (line.startsWith("-") || line.startsWith("*")) {
        documentChildren.push(
          new Paragraph({
            text: line.replace(/^[-*]\s*/, ""),
            bullet: { level: 0 },
            spacing: { after: 100 },
          })
        );
      }
      // Bold text
      else if (line.includes("**")) {
        const parts = line.split("**");
        const runs: TextRun[] = [];
        parts.forEach((part, index) => {
          runs.push(
            new TextRun({
              text: part,
              bold: index % 2 === 1,
            })
          );
        });
        documentChildren.push(
          new Paragraph({
            children: runs,
            spacing: { after: 100 },
          })
        );
      }
      // Regular paragraph
      else {
        documentChildren.push(
          new Paragraph({
            text: line,
            spacing: { after: 100 },
          })
        );
      }
    }

    // Add page break after section (except last)
    if (section !== sections[sections.length - 1]) {
      documentChildren.push(
        new Paragraph({
          text: "",
          pageBreakBefore: true,
        })
      );
    }
  }

  // Create document
  const doc = new Document({
    creator: "Elite Doc Generator",
    title: options.title,
    description: options.subject || options.title,
    sections: [
      {
        properties: {},
        children: documentChildren,
      },
    ],
  });

  // Generate and return blob
  const blob = await Packer.toBlob(doc);
  return blob;
}

export async function downloadDOCX(
  sections: Array<{ title: string; content: string; type: string }>,
  filename: string,
  options: DOCXExportOptions
): Promise<void> {
  const blob = await exportToDOCX(sections, options);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".docx") ? filename : `${filename}.docx`;
  link.click();
  URL.revokeObjectURL(url);
}