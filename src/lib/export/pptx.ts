import PptxGenJS from 'pptxgenjs';
import { DocumentContent, ExportOptions } from '@/types';

const ELITE_NAVY = '0f172a';
const ELITE_GOLD = 'd4af37';
const SLATE_600 = '475569';
const WHITE = 'FFFFFF';

export async function exportToPptx(
  content: DocumentContent,
  options: ExportOptions
): Promise<Blob> {
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_16x9';
  pptx.title = content.title;
  pptx.author = content.author || 'Elite Doc Generator';
  pptx.company = content.organization || '';

  // Define master slide
  pptx.defineSlideMaster({
    title: 'ELITE_MASTER',
    background: { color: WHITE },
    objects: [
      // Gold accent line at bottom
      {
        rect: {
          x: 0,
          y: 5.2,
          w: '100%',
          h: 0.05,
          fill: { color: ELITE_GOLD },
        },
      },
      // Footer text
      {
        text: {
          text: content.title,
          options: {
            x: 0.5,
            y: 5.3,
            w: 8,
            h: 0.3,
            fontSize: 8,
            color: SLATE_600,
          },
        },
      },
    ],
    slideNumber: { x: 9.0, y: 5.3, fontSize: 8, color: SLATE_600 },
  });

  // Title slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: ELITE_NAVY };

  titleSlide.addText(content.title, {
    x: 0.5,
    y: 1.8,
    w: 9,
    h: 1.2,
    fontSize: 44,
    bold: true,
    color: WHITE,
    align: 'center',
    valign: 'middle',
  });

  if (content.subtitle) {
    titleSlide.addText(content.subtitle, {
      x: 0.5,
      y: 3.0,
      w: 9,
      h: 0.6,
      fontSize: 20,
      color: ELITE_GOLD,
      align: 'center',
    });
  }

  // Gold divider line
  titleSlide.addShape('rect', {
    x: 2.5,
    y: 3.7,
    w: 5,
    h: 0.03,
    fill: { color: ELITE_GOLD },
  });

  // Metadata
  const metaText = [
    content.author ? `Prepared by: ${content.author}` : '',
    content.organization || '',
    content.date,
  ]
    .filter(Boolean)
    .join(' | ');

  titleSlide.addText(metaText, {
    x: 0.5,
    y: 4.2,
    w: 9,
    h: 0.5,
    fontSize: 14,
    color: 'CCCCCC',
    align: 'center',
  });

  // Agenda slide
  const agendaSlide = pptx.addSlide({ masterName: 'ELITE_MASTER' });

  agendaSlide.addText('Agenda', {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: ELITE_NAVY,
  });

  agendaSlide.addShape('rect', {
    x: 0.5,
    y: 0.95,
    w: 1.5,
    h: 0.03,
    fill: { color: ELITE_GOLD },
  });

  const agendaItems = content.sections.map(
    (section, index) => `${index + 1}. ${section.title}`
  );

  agendaSlide.addText(agendaItems.join('\n'), {
    x: 0.5,
    y: 1.3,
    w: 9,
    h: 3.5,
    fontSize: 18,
    color: SLATE_600,
    bullet: false,
    lineSpacing: 36,
  });

  // Content slides
  content.sections.forEach((section, index) => {
    // Section title slide
    const sectionTitleSlide = pptx.addSlide();
    sectionTitleSlide.background = { color: ELITE_NAVY };

    sectionTitleSlide.addText(`${index + 1}`, {
      x: 0.5,
      y: 1.5,
      w: 1,
      h: 1,
      fontSize: 72,
      bold: true,
      color: ELITE_GOLD,
    });

    sectionTitleSlide.addText(section.title, {
      x: 1.8,
      y: 1.8,
      w: 7.5,
      h: 1,
      fontSize: 36,
      bold: true,
      color: WHITE,
      valign: 'middle',
    });

    // Content slide(s)
    const contentSlide = pptx.addSlide({ masterName: 'ELITE_MASTER' });

    contentSlide.addText(section.title, {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 0.6,
      fontSize: 28,
      bold: true,
      color: ELITE_NAVY,
    });

    contentSlide.addShape('rect', {
      x: 0.5,
      y: 0.95,
      w: 1.5,
      h: 0.03,
      fill: { color: ELITE_GOLD },
    });

    // Parse content for bullet points
    const lines = section.content.split('\n').filter((line) => line.trim());
    const bulletPoints: string[] = [];
    let currentText = '';

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (currentText) {
          bulletPoints.push(currentText);
          currentText = '';
        }
        bulletPoints.push(trimmed.substring(2));
      } else if (
        trimmed.startsWith('## ') ||
        trimmed.startsWith('### ') ||
        trimmed.startsWith('**')
      ) {
        if (currentText) {
          bulletPoints.push(currentText);
          currentText = '';
        }
        bulletPoints.push(
          trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '')
        );
      } else if (trimmed) {
        currentText += (currentText ? ' ' : '') + trimmed;
      }
    });

    if (currentText) {
      bulletPoints.push(currentText);
    }

    // Limit to 6 bullet points per slide for readability
    const displayPoints = bulletPoints.slice(0, 6);

    contentSlide.addText(
      displayPoints.map((point) => ({
        text: point,
        options: { bullet: true, fontSize: 16, color: SLATE_600 },
      })),
      {
        x: 0.5,
        y: 1.2,
        w: 9,
        h: 3.8,
        valign: 'top',
        lineSpacing: 28,
      }
    );

    // Add additional slides if more content
    if (bulletPoints.length > 6) {
      const additionalSlide = pptx.addSlide({ masterName: 'ELITE_MASTER' });

      additionalSlide.addText(`${section.title} (continued)`, {
        x: 0.5,
        y: 0.4,
        w: 9,
        h: 0.6,
        fontSize: 28,
        bold: true,
        color: ELITE_NAVY,
      });

      additionalSlide.addShape('rect', {
        x: 0.5,
        y: 0.95,
        w: 1.5,
        h: 0.03,
        fill: { color: ELITE_GOLD },
      });

      const remainingPoints = bulletPoints.slice(6, 12);

      additionalSlide.addText(
        remainingPoints.map((point) => ({
          text: point,
          options: { bullet: true, fontSize: 16, color: SLATE_600 },
        })),
        {
          x: 0.5,
          y: 1.2,
          w: 9,
          h: 3.8,
          valign: 'top',
          lineSpacing: 28,
        }
      );
    }
  });

  // Thank you slide
  const thankYouSlide = pptx.addSlide();
  thankYouSlide.background = { color: ELITE_NAVY };

  thankYouSlide.addText('Thank You', {
    x: 0.5,
    y: 2.0,
    w: 9,
    h: 1,
    fontSize: 48,
    bold: true,
    color: WHITE,
    align: 'center',
  });

  thankYouSlide.addShape('rect', {
    x: 3.5,
    y: 3.1,
    w: 3,
    h: 0.03,
    fill: { color: ELITE_GOLD },
  });

  if (content.author || content.organization) {
    thankYouSlide.addText(
      [content.author, content.organization].filter(Boolean).join(' | '),
      {
        x: 0.5,
        y: 3.5,
        w: 9,
        h: 0.5,
        fontSize: 16,
        color: 'CCCCCC',
        align: 'center',
      }
    );
  }

  const blob = await pptx.write({ outputType: 'blob' });
  return blob as Blob;
}
