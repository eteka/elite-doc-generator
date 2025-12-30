# AI-Powered Content Generation Features

## Overview
Elite Doc Generator includes comprehensive AI-powered content generation capabilities that help users create professional documents faster and with higher quality.

## Features

### 1. Generate with AI Button
Every content block includes a "Generate with AI" button that offers multiple generation modes:

- **Executive Summary**: Creates concise executive summaries focused on key decisions
- **Data Analysis**: Generates data-driven insights with metrics and trends
- **Recommendations**: Creates actionable, specific recommendations

### 2. Improve Writing Options
Transform existing content with AI-powered enhancements:

- **Make Professional**: Enhances professionalism and polish
- **More Concise**: Reduces word count while preserving key information
- **Add Data**: Suggests relevant data points and metrics (with placeholders)
- **Executive Tone**: Rewrites for C-suite audience with extreme conciseness

### 3. Change Style
Adapt content to different professional contexts:

- **Policy Language**: Formal institutional style with evidence-based framing
- **Consulting Tone**: Strategic consulting vocabulary and frameworks

### 4. Smart Suggestions Panel
Context-aware suggestions based on:
- Current template type
- Section being edited
- Content already written

Suggestion types:
- **Content**: What to write about
- **Structure**: How to organize information
- **Data**: What metrics to include
- **Style**: How to enhance writing

### 5. Streaming Responses
- Real-time text generation (word-by-word)
- Visual loading indicators
- Ability to stop generation mid-stream
- Smooth user experience

### 6. Generation History & Undo/Redo
- All generations saved automatically
- Undo/redo through generation history
- Up to 50 previous generations stored
- Timestamp tracking for each generation

## AI Prompt Templates

### Template-Specific Prompts
Each document template has customized AI prompts:

#### Strategic Consulting
- **Tone**: Professional, analytical, solution-oriented
- **Vocabulary**: Value drivers, strategic imperatives, competitive advantage
- **Style**: McKinsey/BCG-style language, framework-driven

#### Global Policy
- **Tone**: Evidence-based, authoritative, balanced
- **Vocabulary**: Empirical evidence, policy implications, stakeholder engagement
- **Style**: Institutional language with research citations

#### Investment Banking
- **Tone**: Analytical, precise, financially focused
- **Vocabulary**: Enterprise value, EBITDA multiple, DCF analysis
- **Style**: Quantitative focus with financial metrics

#### Executive Briefing
- **Tone**: Concise, direct, action-oriented
- **Vocabulary**: Bottom line, key takeaway, action required
- **Style**: Ultra-concise, one-page format

#### Research Report
- **Tone**: Academic, objective, thorough
- **Vocabulary**: Literature suggests, empirical findings, methodology
- **Style**: Formal academic structure with citations

#### International Development
- **Tone**: Empowering, impact-focused, inclusive
- **Vocabulary**: Beneficiary-centered, sustainable impact, community ownership
- **Style**: Optimistic but realistic, partnership-focused

## API Endpoints

### POST /api/ai/generate
Generates content based on mode and template.

**Request Body:**
```json
{
  "mode": "executive_summary",
  "content": "Current content or context",
  "templateId": "strategic-consulting",
  "sectionTitle": "Executive Summary"
}
```

**Response:**
Server-Sent Events (SSE) stream with format:
```
data: {"content": "Generated "}
data: {"content": "text "}
data: {"content": "appears "}
data: {"content": "word-by-word"}
data: [DONE]
```

**Available Modes:**
- `executive_summary`
- `data_analysis`
- `recommendations`
- `policy_language`
- `consulting_tone`
- `make_professional`
- `make_concise`
- `add_data`
- `executive_tone`

## Components

### AIToolbar
Main toolbar with AI generation options.

**Props:**
- `onGenerate: (mode: string) => void` - Callback when generation mode selected
- `isGenerating: boolean` - Whether AI is currently generating
- `onStop?: () => void` - Optional callback to stop generation

### SmartSuggestions
Side panel showing contextual suggestions.

**Props:**
- `templateId: string` - Current template ID
- `sectionType: string` - Type of section being edited
- `onApplySuggestion: (suggestion) => void` - Callback when suggestion applied
- `isVisible: boolean` - Panel visibility
- `onClose: () => void` - Close panel callback

### ContentBlock
Individual content editing block with AI integration.

**Props:**
- `content: string` - Current content
- `onContentChange: (content: string) => void` - Content update callback
- `onGenerateAI: () => void` - Generate AI content callback
- `isGenerating?: boolean` - Generation state
- `placeholder?: string` - Placeholder text

## Custom Hooks

### useAIGeneration
Manages AI generation with history and undo/redo.

**Usage:**
```typescript
const {
  generate,
  stop,
  undo,
  redo,
  isGenerating,
  canUndo,
  canRedo,
  history,
} = useAIGeneration({
  onContentUpdate: (content) => setContent(content),
  maxHistorySize: 50
});
```

**Methods:**
- `generate(mode, content, templateId, sectionTitle)` - Start generation
- `stop()` - Cancel ongoing generation
- `undo()` - Revert to previous generation
- `redo()` - Move forward in history

## Integration with Real AI Services

The current implementation uses mock responses. To integrate with real AI services:

### OpenAI Integration
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

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || "";
  // Send to client via SSE
}
```

### Anthropic Claude Integration
```typescript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const stream = await anthropic.messages.create({
  model: "claude-3-opus-20240229",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }],
  stream: true,
});

for await (const chunk of stream) {
  if (chunk.type === "content_block_delta") {
    // Send to client via SSE
  }
}
```

## Environment Variables

Add to `.env.local`:
```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## Usage Examples

### Basic Generation
```typescript
// In your component
const handleGenerate = async (mode: string) => {
  await generate(
    mode,
    currentContent,
    "strategic-consulting",
    "Executive Summary"
  );
};
```

### With Undo/Redo
```typescript
<Button onClick={undo} disabled={!canUndo}>
  Undo
</Button>
<Button onClick={redo} disabled={!canRedo}>
  Redo
</Button>
```

### Stopping Generation
```typescript
<Button onClick={stop} disabled={!isGenerating}>
  Stop Generating
</Button>
```

## Best Practices

1. **Always provide context**: Include relevant content when generating
2. **Use appropriate modes**: Match generation mode to content type
3. **Template-specific prompts**: Leverage template-specific vocabulary
4. **Stream for UX**: Always use streaming for better user experience
5. **Save history**: Enable undo/redo for user confidence
6. **Handle errors**: Gracefully handle API failures
7. **Rate limiting**: Implement rate limits for production use

## Future Enhancements

- [ ] Multi-language support
- [ ] Custom prompt templates
- [ ] Fine-tuned models per template
- [ ] Collaborative AI editing
- [ ] AI-powered document review
- [ ] Automated fact-checking
- [ ] Citation generation
- [ ] Image/chart generation
- [ ] Voice-to-text with AI enhancement
- [ ] Real-time collaboration with AI suggestions