# Elite Doc Generator 🎯
Professional document creation platform with AI-powered content generation that produces consulting-grade reports and presentations.

## ✨ Key Features

### 🎨 6 Premium Document Templates
- **Strategic Consulting** - McKinsey-style with 2x2 matrices and chevron flows
- **Global Policy** - Evidence-based with data tables and statistical sidebars
- **Investment Banking** - Financial focus with waterfall charts and valuations
- **Executive Briefing** - Ultra-concise single-page format
- **Research Report** - Academic styling with literature review structure
- **International Development** - Impact-focused with beneficiary-centered language

### 🤖 AI-Powered Content Generation
- **Generate with AI** - Create entire sections instantly
- **Improve Writing** - Make professional, concise, add data, executive tone
- **Change Style** - Adapt to policy language or consulting tone
- **Smart Suggestions** - Context-aware content recommendations
- **Streaming Responses** - Real-time word-by-word generation
- **Undo/Redo** - Full generation history with 50-item buffer

### 📝 Professional Editor
- Template-specific styling and color schemes
- Section-based document organization
- Real-time content editing
- Comprehensive export functionality

### 📤 Export Capabilities
- **PDF**: Perfect formatting with web/print quality options
- **PowerPoint (PPTX)**: Editable slides with template styling
- **Word (DOCX)**: Fully editable documents with styles
- **HTML**: Standalone web pages for sharing
- **PNG/JPG**: High-resolution image export
- **Export Modal**: Interactive configuration with progress tracking

### 📊 Premium Data Visualizations
- **Charts**: Bar, Line, Pie/Donut, Waterfall with no gridlines and subtle colors
- **Diagrams**: 2x2 Matrix, Process Flows (Chevron/Arrow), Timelines, Icon Stats
- **Chart Builder**: Interactive builder with CSV import and AI suggestions
- **Export**: PNG and SVG export capabilities
- **Template Matching**: Colors automatically match document templates

## 🚀 Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom premium theme
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Charts**: Recharts with custom premium themes
- **AI Integration**: Ready for OpenAI, Anthropic, or custom LLMs
- **Icons**: Lucide React
- **Export**: HTML2Canvas for PNG export

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

See [INSTALLATION.md](./INSTALLATION.md) for detailed installation instructions and troubleshooting.

## 🎯 Quick Start

1. Visit `http://localhost:3000`
2. Browse templates at `/templates`
3. View visualizations at `/visualizations`
4. Start creating at `/editor` or `/editor-ai` (AI-powered)
5. Select a template and begin writing
6. Use AI features to generate and enhance content
7. Add premium charts and diagrams to your documents

## 🤖 AI Features

See [AI_FEATURES.md](./AI_FEATURES.md) for comprehensive documentation on:
- AI generation modes
- Template-specific prompts
- API endpoints
- Integration with LLM providers
- Custom hooks and components

## 📊 Data Visualizations

See [VISUALIZATIONS.md](./VISUALIZATIONS.md) for comprehensive documentation on:
- Premium chart types (Bar, Line, Pie, Waterfall)
- Smart diagrams (Matrix, Process Flow, Timeline, Icon Stats)
- Chart builder and customization
- Data import and export
- Template-specific themes

## 📤 Export System

See [EXPORT_GUIDE.md](./EXPORT_GUIDE.md) for comprehensive documentation on:
- Multiple format support (PDF, PPTX, DOCX, HTML, PNG)
- Quality settings and optimization
- Page range selection
- Email delivery
- Progress tracking

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### Integrating Real AI Services
The app includes mock AI responses. To integrate real AI:

1. Install AI SDK: `npm install openai` or `npm install @anthropic-ai/sdk`
2. Update `/app/api/ai/generate/route.ts` with your provider
3. Add API keys to environment variables

## 📚 Project Structure

```
elite-doc-generator/
├── app/
│   ├── api/ai/generate/     # AI generation endpoint
│   ├── editor/              # Basic editor
│   ├── editor-ai/           # AI-powered editor
│   ├── templates/           # Templates page
│   └── dashboard/           # Dashboard
├── components/
│   ├── editor/              # Editor components
│   │   ├── ai-toolbar.tsx
│   │   ├── content-block.tsx
│   │   └── smart-suggestions.tsx
│   └── ui/                  # UI components
├── lib/
│   ├── templates.ts         # Template registry
│   ├── prompts.ts           # AI prompt templates
│   └── hooks/               # Custom hooks
├── templates/               # Template definitions
│   ├── strategic-consulting.ts
│   ├── global-policy.ts
│   ├── investment-banking.ts
│   ├── executive-briefing.ts
│   ├── research-report.ts
│   └── international-development.ts
└── public/                  # Static assets
```

## 🎨 Templates

Each template includes:
- Custom color schemes and typography
- 4-6 pre-structured sections
- Template-specific AI prompts
- Professional styling and layouts
- Category-specific vocabulary

## 🤝 Contributing

Contributions welcome! Areas for enhancement:
- Additional document templates
- More AI generation modes
- Export functionality (PDF, DOCX)
- Collaborative editing
- Version control
- Template customization

## 📄 License

MIT License - feel free to use for personal or commercial projects


## 📖 Additional Documentation

- **[INSTALLATION.md](./INSTALLATION.md)** - Detailed setup and troubleshooting
- **[COMMANDS.md](./COMMANDS.md)** - All npm commands and utilities  
- **[STATUS.md](./STATUS.md)** - Complete project status
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Comprehensive overview
- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Quick start checklist

---

**Ready to start?** Run `npm install && npm run dev` and visit http://localhost:3000 🚀


## 🔒 Security

All dependencies updated to latest secure versions:
- **Next.js 15.0.3** - Latest stable with security fixes
- **0 vulnerabilities** - All npm audit issues resolved
- See [SECURITY.md](./SECURITY.md) for details
- See [MIGRATION_NEXT15.md](./MIGRATION_NEXT15.md) for upgrade notes
