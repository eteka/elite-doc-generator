# Quick Start: AI-Powered Editor

Get started with Elite Doc Generator's AI features in 5 minutes.

## Step 1: Access the AI Editor

Navigate to the AI-powered editor:
```
http://localhost:3000/editor-ai
```

Or click "AI Editor" button from the regular editor.

## Step 2: Choose Your Template

The editor loads with the **Strategic Consulting** template by default. Each template has AI prompts optimized for its style:

- **Strategic Consulting** → McKinsey-style language
- **Global Policy** → Evidence-based institutional writing
- **Investment Banking** → Financial analysis focus
- **Executive Briefing** → Ultra-concise executive communication
- **Research Report** → Academic scholarly style
- **International Development** → Impact-focused beneficiary language

## Step 3: Generate Content with AI

### Option A: Generate from Scratch
1. Click any section in the sidebar (e.g., "Executive Summary")
2. Click the **"Generate with AI"** button in the content area
3. Choose a generation mode:
   - **Executive Summary** - High-level overview
   - **Data Analysis** - Metrics and insights
   - **Recommendations** - Actionable next steps

### Option B: Improve Existing Content
1. Write or paste some content
2. Click **"Improve Writing"** in the toolbar
3. Select enhancement:
   - **Make Professional** - Polish the language
   - **More Concise** - Reduce word count
   - **Add Data** - Insert relevant metrics
   - **Executive Tone** - Rewrite for executives

### Option C: Change Writing Style
1. Select content you want to transform
2. Click **"Change Style"** in the toolbar
3. Choose:
   - **Policy Language** - Formal institutional style
   - **Consulting Tone** - Strategic consulting vocabulary

## Step 4: Use Smart Suggestions

1. Click **"Show Suggestions"** button (lightbulb icon)
2. View context-aware suggestions in the right panel
3. Click any suggestion to apply it
4. Suggestions adapt based on:
   - Current template
   - Section type
   - Content already written

## Step 5: Manage Generation History

### Undo/Redo
- **Undo**: Revert to previous AI generation
- **Redo**: Move forward in history
- Keyboard shortcuts: `Ctrl+Z` (undo), `Ctrl+Y` (redo)

### Stop Generation
- Click the **X** button next to "Generating..." to stop mid-stream
- Partial content is preserved

## Real-World Example

Let's create a Strategic Consulting document:

### 1. Generate Executive Summary
```
1. Select "Executive Summary" section
2. Click "Generate with AI"
3. Choose "Executive Summary" mode
4. Watch AI generate McKinsey-style content
```

Result:
> "This initiative represents a strategic opportunity to drive significant value creation through operational excellence and market expansion. Our analysis indicates a potential ROI of 25-30% over a 3-year period..."

### 2. Add Data Analysis
```
1. Select "Problem Analysis" section
2. Click "Generate with AI"
3. Choose "Data Analysis" mode
```

Result:
> "Analysis of the current data reveals three key trends: (1) Market growth rate of 15% CAGR over the past 3 years..."

### 3. Make it More Concise
```
1. Select generated content
2. Click "Improve Writing"
3. Choose "More Concise"
```

Result:
> "This initiative offers 25-30% ROI over 3 years through operational excellence and market expansion..."

## Tips for Best Results

### 1. Provide Context
The more context you provide, the better the AI output:
- Include relevant background information
- Mention specific metrics or data points
- Reference stakeholders or audiences

### 2. Iterate and Refine
- Generate initial content
- Use "Improve Writing" to refine
- Try different modes for variety
- Combine AI output with your expertise

### 3. Use Template-Specific Features
Each template has optimized prompts:
- **Consulting**: Use frameworks and strategic language
- **Policy**: Include evidence and citations
- **Banking**: Focus on financial metrics
- **Executive**: Keep it ultra-concise
- **Research**: Follow academic structure
- **Development**: Emphasize impact and beneficiaries

### 4. Leverage Suggestions
Smart suggestions are context-aware:
- Check suggestions panel regularly
- Apply structural improvements
- Add recommended data points
- Enhance writing style

### 5. Experiment with Modes
Try different generation modes for the same content:
- Start with "Executive Summary" for overview
- Use "Data Analysis" to add metrics
- Apply "Recommendations" for action items
- Finish with "Make Professional" for polish

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Undo | `Ctrl+Z` |
| Redo | `Ctrl+Y` |
| Save | `Ctrl+S` |
| Generate AI | `Ctrl+G` (coming soon) |

## Troubleshooting

### AI Not Generating?
- Check console for errors
- Verify API endpoint is running
- Ensure no network issues

### Content Not Appearing?
- Wait for "[DONE]" signal
- Check if generation was stopped
- Try regenerating

### Wrong Style/Tone?
- Verify correct template selected
- Try different generation mode
- Use "Change Style" to adjust

## Next Steps

1. **Explore All Templates**: Try each template to see different AI styles
2. **Combine Modes**: Use multiple generation modes in sequence
3. **Build Your Document**: Create a complete multi-section document
4. **Export**: Save your AI-generated content (export feature coming soon)

## Integration with Real AI (Production)

Currently using mock responses. To integrate real AI:

### OpenAI Setup
```bash
npm install openai
```

Add to `.env.local`:
```
OPENAI_API_KEY=sk-...
```

Update `/app/api/ai/generate/route.ts`:
```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const stream = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: prompt }],
  stream: true,
});
```

### Anthropic Claude Setup
```bash
npm install @anthropic-ai/sdk
```

Add to `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

See [AI_FEATURES.md](./AI_FEATURES.md) for complete integration guide.

## Support

- **Documentation**: See [AI_FEATURES.md](./AI_FEATURES.md)
- **Issues**: Check console for error messages
- **Questions**: Review template-specific prompts in `/lib/prompts.ts`

---

**Ready to create professional documents with AI? Start at `/editor-ai`!** 🚀