import PptxGenJS from "pptxgenjs";
import { Template } from "@/lib/templates";

export interface PPTXExportOptions {
  title: string;
  author?: string;
  subject?: string;
  template: Template;
  includeCharts?: boolean;
  includeImages?: boolean;
}

export async function exportToPPTX(
  sections: Array<{ title: string; content: string; type: string }>,
  options: PPTXExportOptions
): Promise<Blob> {
  const pptx = new PptxGenJS();

  // Set presentation properties
  pptx.author = options.author || "Elite Doc Generator";
  pptx.company = "Elite Doc Generator";
  pptx.subject = options.subject || options.title;
  pptx.title = options.title;

  // Define master slide with template colors
  const theme = options.template.colorScheme;
  
  pptx.defineSlideMaster({
    title: "MASTER_SLIDE",
    background: { color: theme.background },
    objects: [
      {
        rect: {
          x: 0,
          y: 0,
          w: "100%",
          h: 0.5,
          fill: { color: theme.primary },
        },
      },
    ],
  });

  // Title slide
  const titleSlide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
  titleSlide.background = { color: theme.primary };
  
  titleSlide.addText(options.title, {
    x: 0.5,
    y: "40%",
    w: "90%",
    h: 1.5,
    fontSize: 44,
    bold: true,
    color: "FFFFFF",
    align: "center",
    fontFace: options.template.fonts.primary,
  });

  titleSlide.addText(options.template.name + " Template", {
    x: 0.5,
    y: "55%",
    w: "90%",
    h: 0.5,
    fontSize: 18,
    color: "FFFFFF",
    align: "center",
    fontFace: options.template.fonts.secondary,
  });

  // Content slides
  for (const section of sections) {
    const slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });

    // Section title
    slide.addText(section.title, {
      x: 0.5,
      y: 0.7,
      w: "90%",
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: theme.text,
      fontFace: options.template.fonts.primary,
    });

    // Section content
    const contentLines = section.content
      .split("\n")
      .filter((line) => line.trim())
      .slice(0, 10); // Limit to 10 lines per slide

    let yPosition = 1.8;
    for (const line of contentLines) {
      // Check if it's a heading
      if (line.startsWith("#")) {
        const headingText = line.replace(/^#+\s*/, "");
        slide.addText(headingText, {
          x: 0.5,
          y: yPosition,
          w: "90%",
          h: 0.4,
          fontSize: 20,
          bold: true,
          color: theme.primary,
          fontFace: options.template.fonts.primary,
        });
        yPosition += 0.5;
      }
      // Check if it's a bullet point
      else if (line.startsWith("-") || line.startsWith("*")) {
        const bulletText = line.replace(/^[-*]\s*/, "");
        slide.addText(bulletText, {
          x: 0.8,
          y: yPosition,
          w: "85%",
          h: 0.3,
          fontSize: 14,
          color: theme.text,
          bullet: { type: "bullet", code: "2022" },
          fontFace: options.template.fonts.secondary,
        });
        yPosition += 0.35;
      }
      // Regular text
      else {
        slide.addText(line, {
          x: 0.5,
          y: yPosition,
          w: "90%",
          h: 0.3,
          fontSize: 14,
          color: theme.text,
          fontFace: options.template.fonts.secondary,
        });
        yPosition += 0.35;
      }

      // Break if we're running out of space
      if (yPosition > 6.5) break;
    }

    // Add footer
    slide.addText(`${section.type}`, {
      x: 0.5,
      y: 7,
      w: "40%",
      h: 0.3,
      fontSize: 10,
      color: theme.secondary,
      fontFace: options.template.fonts.secondary,
    });
  }

  // Generate and return blob
  const blob = await pptx.write({ outputType: "blob" });
  return blob as Blob;
}

export async function downloadPPTX(
  sections: Array<{ title: string; content: string; type: string }>,
  filename: string,
  options: PPTXExportOptions
): Promise<void> {
  const blob = await exportToPPTX(sections, options);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".pptx") ? filename : `${filename}.pptx`;
  link.click();
  URL.revokeObjectURL(url);
}