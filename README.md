# Elite Doc Generator

Professional document creation platform that produces consulting-grade reports and presentations with AI-powered content generation.

## Features

- **Strategic Templates** - McKinsey-style strategic reports, World Bank policy documents, business proposals, and executive presentations
- **AI-Powered Generation** - GPT-4 integration for professional content generation with tailored prompts for each section
- **Premium Data Visualizations** - Interactive charts including bar, line, pie, area, and donut charts
- **Multi-Format Export** - Export to PDF, DOCX, and PPTX with consistent premium styling
- **Live Document Preview** - Real-time preview with Markdown rendering
- **Local Storage** - Documents are saved locally in your browser

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **AI Integration**: OpenAI GPT-4
- **Export Libraries**: jsPDF, docx, pptxgenjs
- **Charts**: Recharts
- **Markdown**: react-markdown with remark-gfm

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- OpenAI API key (for AI content generation)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/eteka/elite-doc-generator.git
cd elite-doc-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Add your OpenAI API key (optional - can also be set in the app):
```env
OPENAI_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Templates

| Template | Type | Description |
|----------|------|-------------|
| Strategic Analysis Report | Report | McKinsey-style consulting report with executive summary, analysis, and recommendations |
| Policy Framework Document | Policy | World Bank/UN-style policy document with context, analysis, and policy recommendations |
| Business Proposal | Proposal | Professional business proposal with problem definition, solution, and commercial terms |
| Executive Presentation | Presentation | High-impact presentation deck for C-suite audiences |
| Market Research Report | Report | Comprehensive market analysis with trends, competitive landscape, and opportunities |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── create/            # Document creation page
│   ├── documents/         # Documents listing page
│   ├── editor/[id]/       # Document editor page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── charts/            # Data visualization components
│   ├── editor/            # Document editor components
│   ├── layout/            # Header and Footer
│   ├── templates/         # Template selection components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── export/            # PDF, DOCX, PPTX export logic
│   ├── ai.ts              # OpenAI integration
│   ├── templates.ts       # Document templates
│   └── utils.ts           # Utility functions
├── store/
│   └── documentStore.ts   # Zustand state management
└── types/
    └── index.ts           # TypeScript types
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Usage

1. **Select a Template**: Choose from 5 professionally designed templates on the home page
2. **Fill Document Details**: Enter title, author, organization, and other metadata
3. **Add Content**: Write or generate content for each section
4. **Use AI Generation**: Click "Generate with AI" to auto-generate professional content
5. **Preview**: Toggle between Edit and Preview modes
6. **Export**: Download your document as PDF, Word, or PowerPoint

## API Key Security

Your OpenAI API key is:
- Stored locally in your browser (localStorage)
- Never sent to our servers
- Only used for direct API calls to OpenAI

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by [eteka](https://github.com/eteka)
