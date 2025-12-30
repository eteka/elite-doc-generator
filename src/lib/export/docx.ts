import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  TableOfContents,
  PageBreak,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
} from 'docx';
import { DocumentContent, ExportOptions } from '@/types';

export async function exportToDocx(
  content: DocumentContent,
  options: ExportOptions
): Promise<Blob> {
  const children: Paragraph[] = [];

  // Title
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: content.title,
          bold: true,
          size: 56,
          color: '0f172a',
        }),
      ],
      spacing: { after: 200 },
      alignment: AlignmentType.CENTER,
    })
  );

  // Subtitle
  if (content.subtitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: content.subtitle,
            size: 28,
            color: '475569',
            italics: true,
          }),
        ],
        spacing: { after: 400 },
        alignment: AlignmentType.CENTER,
      })
    );
  }

  // Gold divider line representation
  children.push(
    new Paragraph({
      border: {
        bottom: {
          color: 'd4af37',
          style: BorderStyle.SINGLE,
          size: 12,
        },
      },
      spacing: { after: 400 },
    })
  );

  // Metadata
  if (content.author) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Prepared by: ', bold: true, size: 24 }),
          new TextRun({ text: content.author, size: 24 }),
        ],
        spacing: { after: 100 },
      })
    );
  }

  if (content.organization) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Organization: ', bold: true, size: 24 }),
          new TextRun({ text: content.organization, size: 24 }),
        ],
        spacing: { after: 100 },
      })
    );
  }

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Date: ', bold: true, size: 24 }),
        new TextRun({ text: content.date, size: 24 }),
      ],
      spacing: { after: 600 },
    })
  );

  // Page break before TOC
  children.push(
    new Paragraph({
      children: [new PageBreak()],
    })
  );

  // Table of Contents heading
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Table of Contents',
          bold: true,
          size: 36,
          color: '0f172a',
        }),
      ],
      spacing: { after: 300 },
    })
  );

  // Manual TOC entries
  content.sections.forEach((section, index) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${index + 1}. ${section.title}`,
            size: 24,
            color: '475569',
          }),
        ],
        spacing: { after: 100 },
      })
    );
  });

  // Content sections
  content.sections.forEach((section, index) => {
    // Page break before each section
    children.push(
      new Paragraph({
        children: [new PageBreak()],
      })
    );

    // Section heading
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${index + 1}. ${section.title}`,
            bold: true,
            size: 32,
            color: '0f172a',
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        border: {
          bottom: {
            color: 'd4af37',
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      })
    );

    // Parse content and convert to paragraphs
    const lines = section.content.split('\n');

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine === '') {
        children.push(
          new Paragraph({
            spacing: { after: 100 },
          })
        );
      } else if (trimmedLine.startsWith('## ')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedLine.replace('## ', ''),
                bold: true,
                size: 28,
                color: '0f172a',
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 150 },
          })
        );
      } else if (trimmedLine.startsWith('### ')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedLine.replace('### ', ''),
                bold: true,
                size: 26,
                color: '1e293b',
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 },
          })
        );
      } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedLine.substring(2),
                size: 24,
                color: '475569',
              }),
            ],
            bullet: { level: 0 },
            spacing: { after: 80 },
          })
        );
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedLine.slice(2, -2),
                bold: true,
                size: 24,
                color: '0f172a',
              }),
            ],
            spacing: { after: 100 },
          })
        );
      } else {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmedLine,
                size: 24,
                color: '475569',
              }),
            ],
            spacing: { after: 100 },
          })
        );
      }
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: content.title,
                    size: 18,
                    color: '94a3b8',
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 20,
                    color: '94a3b8',
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
