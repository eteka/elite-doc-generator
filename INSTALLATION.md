# Installation Guide

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher (or yarn/pnpm)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:

**Core Dependencies:**
- Next.js 14.2.5
- React 18.3.1
- TypeScript 5.5.3

**UI Components:**
- Radix UI primitives (Dialog, Dropdown, Select, etc.)
- Lucide React (icons)
- Tailwind CSS with animations

**Rich Text Editing:**
- TipTap editor with extensions
- @hello-pangea/dnd for drag-and-drop

**Data Visualization:**
- Recharts for charts
- HTML2Canvas for image export
- PapaParse for CSV parsing

**Export Functionality:**
- jsPDF for PDF generation
- pptxgenjs for PowerPoint export
- docx for Word document export
- @react-pdf/renderer for advanced PDF

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Missing Dependencies

If you see import errors, ensure all dependencies are installed:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

If you see TypeScript errors, try:

```bash
npm run build
```

This will generate type definitions and check for errors.

### Module Resolution Issues

Ensure your `tsconfig.json` has the correct path mappings:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Radix UI Issues

If Radix UI components aren't working:

```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-slot
```

### Chart Library Issues

If Recharts isn't working:

```bash
npm install recharts
```

### Export Library Issues

If export functionality isn't working:

```bash
npm install jspdf jspdf-autotable html2canvas pptxgenjs docx @react-pdf/renderer
```

## Environment Variables

Create a `.env.local` file for API keys (optional):

```env
# AI Integration (optional)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Email Delivery (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

## Verifying Installation

After installation, verify everything works:

1. **Home Page**: Visit `/` - should show landing page
2. **Templates**: Visit `/templates` - should show 6 templates
3. **Visualizations**: Visit `/visualizations` - should show charts
4. **Editor**: Visit `/editor` - should show basic editor
5. **AI Editor**: Visit `/editor-ai` - should show AI-powered editor
6. **Dashboard**: Visit `/dashboard` - should show dashboard

## Common Issues

### Port Already in Use

If port 3000 is in use:

```bash
npm run dev -- -p 3001
```

### Build Errors

If build fails:

1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Try building again: `npm run build`

### Type Errors

If you see TypeScript errors:

1. Ensure all `@types/*` packages are installed
2. Run `npm run build` to generate types
3. Restart your IDE/editor

## Package Versions

Current stable versions:

- Next.js: 14.2.5
- React: 18.3.1
- TypeScript: 5.5.3
- Tailwind CSS: 3.4.4
- Recharts: 2.10.3
- TipTap: 2.1.13

## Development Tools

Recommended VS Code extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Getting Help

If you encounter issues:

1. Check the [README.md](./README.md) for overview
2. Review specific guides:
   - [AI_FEATURES.md](./AI_FEATURES.md) for AI functionality
   - [VISUALIZATIONS.md](./VISUALIZATIONS.md) for charts
   - [EXPORT_GUIDE.md](./EXPORT_GUIDE.md) for exports
3. Check browser console for errors
4. Verify all dependencies are installed

## Next Steps

After successful installation:

1. Explore the templates at `/templates`
2. Try creating a document at `/editor`
3. Test AI features at `/editor-ai`
4. View visualizations at `/visualizations`
5. Customize templates in `/templates` folder
6. Add your own AI prompts in `/lib/prompts.ts`
