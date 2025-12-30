"use client";

import { useState } from "react";
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Download, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumBarChart } from "./premium-bar-chart";
import { PremiumLineChart } from "./premium-line-chart";
import { PremiumPieChart } from "./premium-pie-chart";
import { WaterfallChart } from "./waterfall-chart";

interface ChartBuilderProps {
  templateId?: string;
  onClose?: () => void;
}

export function ChartBuilder({ templateId = "strategic-consulting", onClose }: ChartBuilderProps) {
  const [chartType, setChartType] = useState<"bar" | "line" | "pie" | "waterfall">("bar");
  const [chartData, setChartData] = useState([
    { name: "Q1", value: 400, revenue: 240 },
    { name: "Q2", value: 300, revenue: 380 },
    { name: "Q3", value: 600, revenue: 500 },
    { name: "Q4", value: 800, revenue: 650 }
  ]);
  const [chartTitle, setChartTitle] = useState("Quarterly Performance");

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        // Simple CSV parsing (in production, use papaparse)
        const lines = text.split("\n");
        const headers = lines[0].split(",");
        const data = lines.slice(1).map(line => {
          const values = line.split(",");
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = isNaN(Number(values[index])) ? values[index] : Number(values[index]);
          });
          return obj;
        });
        setChartData(data);
      };
      reader.readAsText(file);
    }
  };

  const handleExportPNG = async () => {
    // In production, use html2canvas
    alert("Export to PNG functionality - integrate html2canvas");
  };

  const handleAISuggestChart = () => {
    // AI suggests best chart type based on data
    alert("AI Chart Suggestion - analyze data patterns and suggest optimal visualization");
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <PremiumBarChart
            data={chartData}
            templateId={templateId}
            title={chartTitle}
            dataKey="value"
            height={350}
          />
        );
      case "line":
        return (
          <PremiumLineChart
            data={chartData}
            templateId={templateId}
            title={chartTitle}
            dataKeys={["value", "revenue"]}
            height={350}
          />
        );
      case "pie":
        return (
          <PremiumPieChart
            data={chartData}
            templateId={templateId}
            title={chartTitle}
            height={350}
          />
        );
      case "waterfall":
        return (
          <WaterfallChart
            data={chartData}
            templateId={templateId}
            title={chartTitle}
            height={350}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Chart Builder</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAISuggestChart}>
              <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
              AI Suggest
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPNG}>
              <Download className="h-4 w-4 mr-2" />
              Export PNG
            </Button>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Chart Type Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Chart Type</label>
          <div className="flex gap-2">
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Bar
            </Button>
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
            >
              <LineChartIcon className="h-4 w-4 mr-2" />
              Line
            </Button>
            <Button
              variant={chartType === "pie" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("pie")}
            >
              <PieChartIcon className="h-4 w-4 mr-2" />
              Pie
            </Button>
            <Button
              variant={chartType === "waterfall" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("waterfall")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Waterfall
            </Button>
          </div>
        </div>

        {/* Chart Title */}
        <div>
          <label className="text-sm font-medium mb-2 block">Chart Title</label>
          <input
            type="text"
            value={chartTitle}
            onChange={(e) => setChartTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter chart title"
          />
        </div>

        {/* Data Input */}
        <div>
          <label className="text-sm font-medium mb-2 block">Data</label>
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" asChild>
              <label>
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                />
              </label>
            </Button>
            <Button variant="outline" size="sm">
              Paste Data
            </Button>
          </div>
          
          <div className="border rounded-md p-4 bg-slate-50 max-h-40 overflow-auto">
            <pre className="text-xs">
              {JSON.stringify(chartData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Chart Preview */}
        <div className="border rounded-lg p-6 bg-white">
          {renderChart()}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            Save as Template
          </Button>
          <Button variant="accent">
            Insert into Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}