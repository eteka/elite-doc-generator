"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { getChartTheme, premiumChartConfig } from "@/lib/chart-themes";

interface WaterfallData {
  name: string;
  value: number;
  isTotal?: boolean;
}

interface WaterfallChartProps {
  data: WaterfallData[];
  templateId?: string;
  title?: string;
  height?: number;
}

export function WaterfallChart({
  data,
  templateId = "investment-banking",
  title,
  height = 350
}: WaterfallChartProps) {
  const theme = getChartTheme(templateId);

  // Calculate cumulative values for waterfall effect
  const processedData = data.map((item, index) => {
    let start = 0;
    let end = item.value;
    
    if (!item.isTotal && index > 0) {
      start = data.slice(0, index).reduce((sum, d) => sum + d.value, 0);
      end = start + item.value;
    }

    return {
      ...item,
      start,
      end,
      value: Math.abs(item.value),
      isPositive: item.value >= 0,
      displayValue: item.value
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={premiumChartConfig.tooltip.contentStyle}>
          <p style={{ ...premiumChartConfig.tooltip.labelStyle, color: theme.colors.text }}>
            {data.name}
          </p>
          <p style={{ 
            color: data.isTotal ? theme.colors.text : (data.isPositive ? theme.colors.primary[0] : theme.colors.secondary[0]), 
            fontSize: "14px", 
            fontWeight: 600 
          }}>
            {data.isPositive ? '+' : ''}{data.displayValue.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {title && (
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.text, fontFamily: theme.fonts.family }}
        >
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid 
            strokeDasharray="0" 
            stroke="transparent"
            vertical={false}
          />
          <XAxis 
            dataKey="name"
            stroke={premiumChartConfig.axis.stroke}
            tick={{ fill: theme.colors.text, fontSize: theme.fonts.size.label }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke={premiumChartConfig.axis.stroke}
            tick={{ fill: theme.colors.text, fontSize: theme.fonts.size.label }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke={theme.colors.text} strokeWidth={1} />
          
          {/* Invisible bar for positioning */}
          <Bar dataKey="start" stackId="a" fill="transparent" />
          
          {/* Visible bar */}
          <Bar 
            dataKey="value" 
            stackId="a"
            radius={[4, 4, 0, 0]}
            animationDuration={premiumChartConfig.animation.duration}
          >
            {processedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={
                  entry.isTotal 
                    ? theme.colors.accent 
                    : entry.isPositive 
                      ? theme.colors.primary[0] 
                      : theme.colors.secondary[0]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}