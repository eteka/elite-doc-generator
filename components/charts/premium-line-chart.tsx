"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getChartTheme, premiumChartConfig } from "@/lib/chart-themes";

interface PremiumLineChartProps {
  data: Array<{ name: string; [key: string]: any }>;
  templateId?: string;
  title?: string;
  dataKeys: string[];
  height?: number;
  showLegend?: boolean;
  smooth?: boolean;
}

export function PremiumLineChart({
  data,
  templateId = "strategic-consulting",
  title,
  dataKeys,
  height = 300,
  showLegend = true,
  smooth = true
}: PremiumLineChartProps) {
  const theme = getChartTheme(templateId);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={premiumChartConfig.tooltip.contentStyle}>
          <p style={{ ...premiumChartConfig.tooltip.labelStyle, color: theme.colors.text }}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color, fontSize: "13px", marginTop: "4px" }}>
              <span style={{ fontWeight: 600 }}>{entry.name}:</span> {entry.value.toLocaleString()}
            </p>
          ))}
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
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
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
          />
          <YAxis 
            stroke={premiumChartConfig.axis.stroke}
            tick={{ fill: theme.colors.text, fontSize: theme.fonts.size.label }}
          />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend {...premiumChartConfig.legend} />}
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type={smooth ? "monotone" : "linear"}
              dataKey={key}
              stroke={theme.colors.primary[index % theme.colors.primary.length]}
              strokeWidth={2.5}
              dot={{ fill: theme.colors.primary[index % theme.colors.primary.length], r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={premiumChartConfig.animation.duration}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}