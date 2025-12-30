"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { getChartTheme, premiumChartConfig } from "@/lib/chart-themes";

interface PremiumBarChartProps {
  data: Array<{ name: string; value: number; [key: string]: any }>;
  templateId?: string;
  title?: string;
  dataKey?: string;
  height?: number;
  showLegend?: boolean;
  horizontal?: boolean;
}

export function PremiumBarChart({
  data,
  templateId = "strategic-consulting",
  title,
  dataKey = "value",
  height = 300,
  showLegend = false,
  horizontal = false
}: PremiumBarChartProps) {
  const theme = getChartTheme(templateId);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={premiumChartConfig.tooltip.contentStyle}>
          <p style={{ ...premiumChartConfig.tooltip.labelStyle, color: theme.colors.text }}>
            {label}
          </p>
          <p style={{ color: theme.colors.primary[0], fontSize: "14px", fontWeight: 600 }}>
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const ChartComponent = horizontal ? BarChart : BarChart;
  const layout = horizontal ? "horizontal" : "vertical";

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
        <ChartComponent
          data={data}
          layout={layout}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="0" 
            stroke="transparent"
            vertical={false}
          />
          {horizontal ? (
            <>
              <XAxis 
                type="number"
                stroke={premiumChartConfig.axis.stroke}
                tick={{ fill: theme.colors.text, fontSize: theme.fonts.size.label }}
              />
              <YAxis 
                type="category"
                dataKey="name"
                stroke={premiumChartConfig.axis.stroke}
                tick={{ fill: theme.colors.text, fontSize: theme.fonts.size.label }}
              />
            </>
          ) : (
            <>
              <XAxis 
                dataKey="name"
                stroke={premiumChartConfig.axis.stroke}
                tick={{ fill: theme.colors.text, fontSize: theme.fonts.size.label }}
              />
              <YAxis 
                stroke={premiumChartConfig.axis.stroke}
                tick={{ fill: theme.colors.text, fontSize: theme.fonts.size.label }}
              />
            </>
          )}
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend {...premiumChartConfig.legend} />}
          <Bar 
            dataKey={dataKey} 
            radius={[4, 4, 0, 0]}
            animationDuration={premiumChartConfig.animation.duration}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={theme.colors.primary[index % theme.colors.primary.length]} 
              />
            ))}
          </Bar>
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}