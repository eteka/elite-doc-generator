# Premium Data Visualization System

## Overview
Elite Doc Generator includes a comprehensive visualization system with professional charts and diagrams designed to look like they came from a $10,000 consulting report.

## Features

### 📊 Premium Charts
All charts feature:
- **No gridlines** for clean, modern look
- **Subtle colors** matching document templates
- **Clean labels** with professional typography
- **Animated entrances** with smooth transitions
- **Interactive tooltips** with elegant styling
- **Export capabilities** (PNG, SVG)

### Chart Types

#### 1. Bar Chart
Professional bar charts with template-specific colors.

**Features:**
- Vertical or horizontal orientation
- Rounded corners for modern look
- Template-matched color schemes
- Hover effects and tooltips
- Customizable height and data keys

**Usage:**
```tsx
import { PremiumBarChart } from "@/components/charts/premium-bar-chart";

<PremiumBarChart
  data={[
    { name: "Product A", value: 4000 },
    { name: "Product B", value: 3000 },
  ]}
  templateId="strategic-consulting"
  title="Product Performance"
  height={300}
/>
```

#### 2. Line Chart
Multi-series line charts for trend analysis.

**Features:**
- Multiple data series support
- Smooth or linear interpolation
- Active dot highlighting
- Legend with custom styling
- Responsive design

**Usage:**
```tsx
import { PremiumLineChart } from "@/components/charts/premium-line-chart";

<PremiumLineChart
  data={lineData}
  templateId="investment-banking"
  title="Revenue & Profit Trends"
  dataKeys={["revenue", "profit"]}
  height={300}
  smooth={true}
/>
```

#### 3. Pie/Donut Chart
Elegant pie and donut charts with percentage labels.

**Features:**
- Pie or donut variants
- Percentage labels inside slices
- Automatic color distribution
- Legend with icons
- Hover tooltips with percentages

**Usage:**
```tsx
import { PremiumPieChart } from "@/components/charts/premium-pie-chart";

<PremiumPieChart
  data={pieData}
  templateId="global-policy"
  title="Market Distribution"
  donut={true}
  innerRadius={60}
  height={300}
/>
```

#### 4. Waterfall Chart
Financial waterfall charts for bridge analysis.

**Features:**
- Positive/negative value differentiation
- Total markers
- Cumulative calculations
- Color-coded bars
- Reference line at zero

**Usage:**
```tsx
import { WaterfallChart } from "@/components/charts/waterfall-chart";

<WaterfallChart
  data={[
    { name: "Starting Revenue", value: 10000, isTotal: true },
    { name: "New Sales", value: 3000 },
    { name: "Churn", value: -2000 },
    { name: "Ending Revenue", value: 11000, isTotal: true },
  ]}
  templateId="investment-banking"
  title="Revenue Bridge"
  height={350}
/>
```

### 🎨 Smart Diagrams

#### 1. 2x2 Matrix
Strategic framework matrices for prioritization.

**Features:**
- Four quadrants with custom labels
- Hover effects
- Template-matched colors
- Axis labels
- Responsive layout

**Usage:**
```tsx
import { Matrix2x2 } from "@/components/diagrams/matrix-2x2";

<Matrix2x2
  templateId="strategic-consulting"
  title="Priority Matrix"
  xAxisLabel="Effort Required"
  yAxisLabel="Business Impact"
  quadrants={{
    topLeft: { label: "Quick Wins", description: "High impact, low effort" },
    topRight: { label: "Major Projects", description: "High impact, high effort" },
    bottomLeft: { label: "Fill-ins", description: "Low impact, low effort" },
    bottomRight: { label: "Time Sinks", description: "Low impact, high effort" }
  }}
/>
```

#### 2. Process Flow
Multiple variants for process visualization.

**Variants:**
- **Chevron**: Interlocking chevron shapes
- **Arrow**: Boxes with arrow connectors
- **Boxes**: Numbered grid layout

**Usage:**
```tsx
import { ProcessFlow } from "@/components/diagrams/process-flow";

<ProcessFlow
  templateId="strategic-consulting"
  title="Implementation Roadmap"
  steps={[
    { title: "Analysis", description: "Assess current state" },
    { title: "Design", description: "Create solution" },
    { title: "Implementation", description: "Execute plan" },
    { title: "Optimization", description: "Refine & improve" }
  ]}
  variant="chevron"
/>
```

#### 3. Timeline
Vertical or horizontal timeline visualizations.

**Features:**
- Status indicators (completed, current, upcoming)
- Date labels
- Descriptions
- Icon support
- Responsive design

**Usage:**
```tsx
import { Timeline } from "@/components/diagrams/timeline";

<Timeline
  templateId="executive-briefing"
  title="Project Timeline"
  events={[
    { 
      date: "Q1 2024", 
      title: "Kickoff", 
      description: "Initial planning",
      status: "completed" 
    },
    { 
      date: "Q2 2024", 
      title: "Development", 
      status: "current" 
    }
  ]}
  variant="vertical"
/>
```

#### 4. Icon-Based Statistics
KPI cards with icons and trends.

**Features:**
- Lucide icon support
- Trend indicators
- Responsive grid
- Hover effects
- Template-matched colors

**Usage:**
```tsx
import { IconStats } from "@/components/diagrams/icon-stats";
import { TrendingUp, Users } from "lucide-react";

<IconStats
  templateId="strategic-consulting"
  title="Key Metrics"
  stats={[
    { 
      icon: TrendingUp, 
      value: "$2.4M", 
      label: "Revenue",
      trend: { value: "+23%", isPositive: true }
    },
    { 
      icon: Users, 
      value: "15.2K", 
      label: "Users",
      trend: { value: "+12%", isPositive: true }
    }
  ]}
  columns={4}
/>
```

## 🎨 Chart Themes

Each document template has a matching chart theme:

### Strategic Consulting
- **Colors**: Blue-gray palette (#475569, #64748b, #94a3b8)
- **Accent**: Sky blue (#0ea5e9)
- **Style**: Clean, minimalist, framework-focused

### Global Policy
- **Colors**: Teal palette (#0d9488, #14b8a6, #2dd4bf)
- **Accent**: Cyan (#06b6d4)
- **Style**: Evidence-based, data-heavy

### Investment Banking
- **Colors**: Dark blue (#1e3a8a, #3730a3, #4f46e5)
- **Accent**: Gold (#d97706)
- **Style**: Financial, precise, quantitative

### Executive Briefing
- **Colors**: Rich black (#0f172a, #334155, #475569)
- **Accent**: Red (#dc2626)
- **Style**: Bold, concise, high-contrast

### Research Report
- **Colors**: Gray palette (#1f2937, #4b5563, #6b7280)
- **Accent**: Purple (#7c3aed)
- **Style**: Academic, formal, structured

### International Development
- **Colors**: Green palette (#059669, #10b981, #34d399)
- **Accent**: Amber (#f59e0b)
- **Style**: Optimistic, impact-focused, colorful

## 🛠️ Chart Builder

Interactive chart builder for creating custom visualizations.

**Features:**
- Chart type selection (Bar, Line, Pie, Waterfall)
- CSV import
- Manual data entry
- AI-suggested chart types
- Export to PNG/SVG
- Save as template
- Insert into document

**Usage:**
```tsx
import { ChartBuilder } from "@/components/charts/chart-builder";

<ChartBuilder 
  templateId="strategic-consulting"
  onClose={() => setShowBuilder(false)}
/>
```

## 📥 Data Import

### CSV Import
```typescript
const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      // Parse CSV using papaparse
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setChartData(results.data);
        }
      });
    };
    reader.readAsText(file);
  }
};
```

### Manual Data Entry
```typescript
const data = [
  { name: "Category 1", value: 100 },
  { name: "Category 2", value: 200 },
  { name: "Category 3", value: 150 }
];
```

## 📤 Export Functionality

### Export as PNG
```typescript
import html2canvas from "html2canvas";

const handleExportPNG = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2 // Higher quality
    });
    
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = canvas.toDataURL();
    link.click();
  }
};
```

### Export as SVG
```typescript
// Recharts supports SVG export natively
const handleExportSVG = () => {
  const svgElement = document.querySelector("svg");
  if (svgElement) {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.download = "chart.svg";
    link.href = url;
    link.click();
  }
};
```

## 🤖 AI Chart Suggestions

AI analyzes your data and suggests the best chart type:

```typescript
const suggestChartType = (data: any[]) => {
  // Analyze data structure
  const hasTimeSeries = data.some(d => 
    d.name?.match(/\d{4}|Q\d|Jan|Feb|Mar/)
  );
  
  const hasCategories = data.length <= 10;
  const hasMultipleSeries = Object.keys(data[0]).length > 2;
  
  // Suggest chart type
  if (hasTimeSeries && hasMultipleSeries) return "line";
  if (hasCategories && data.length <= 6) return "pie";
  if (data.some(d => d.isTotal)) return "waterfall";
  return "bar";
};
```

## 🎯 Best Practices

### 1. Choose the Right Chart
- **Bar**: Comparing categories
- **Line**: Showing trends over time
- **Pie**: Showing proportions (max 6 slices)
- **Waterfall**: Showing cumulative effect

### 2. Color Usage
- Use template-matched colors for consistency
- Limit to 4-5 colors per chart
- Use accent color for emphasis
- Ensure sufficient contrast

### 3. Labels & Titles
- Keep titles concise and descriptive
- Use clear axis labels
- Format numbers appropriately (K, M, B)
- Avoid label overlap

### 4. Data Density
- Don't overcrowd charts
- Group small categories into "Other"
- Use appropriate chart size
- Consider multiple charts for complex data

### 5. Accessibility
- Ensure color contrast meets WCAG standards
- Provide alternative text
- Use patterns in addition to colors
- Make interactive elements keyboard-accessible

## 🔧 Customization

### Custom Colors
```typescript
const customTheme = {
  colors: {
    primary: ["#custom1", "#custom2"],
    accent: "#custom3",
    // ...
  }
};
```

### Custom Tooltips
```typescript
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p>{payload[0].name}</p>
        <p>{payload[0].value}</p>
      </div>
    );
  }
  return null;
};
```

### Animation Control
```typescript
<PremiumBarChart
  data={data}
  animationDuration={1000}
  animationEasing="ease-in-out"
/>
```

## 📱 Responsive Design

All visualizations are responsive:
- Automatic width adjustment
- Configurable height
- Mobile-optimized tooltips
- Touch-friendly interactions

## 🚀 Performance

Optimizations included:
- Lazy loading for large datasets
- Debounced updates
- Memoized calculations
- Efficient re-renders

## 📚 Examples

Visit `/visualizations` to see all chart types and diagrams in action with live examples and code snippets.

## 🔮 Future Enhancements

- [ ] Sankey diagrams
- [ ] Funnel charts
- [ ] Heatmaps
- [ ] Network graphs
- [ ] Gantt charts
- [ ] Real-time data updates
- [ ] Collaborative editing
- [ ] Version history
- [ ] Template marketplace