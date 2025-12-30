"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { getChartTheme, premiumChartConfig } from "@/lib/chart-themes";

interface PremiumPieChartProps {
  data: Array<{ name: string; value: number }>;
  templateId?: string;
  title?: string;
  height?: number;
  showLegend?: boolean;
  donut?: boolean;
  innerRadius?: number;
}

export function PremiumPieChart({
  data,
  templateId = "strategic-consulting",
  title,
  height = 300,
  showLegend = true,
  donut = false,
  innerRadius = 60
}: PremiumPieChartProps) {
  const theme = getChartTheme(templateId);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      
      return (
        <div style={premiumChartConfig.tooltip.contentStyle}>
          <p style={{ ...premiumChartConfig.tooltip.labelStyle, color: theme.colors.text }}>
            {payload[0].name}
          </p>
          <p style={{ color: payload[0].payload.fill, fontSize: "14px", fontWeight: 600 }}>
            {payload[0].value.toLocaleString()} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={theme.fonts.size.label}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            innerRadius={donut ? innerRadius : 0}
            fill="#8884d8"
            dataKey="value"
            animationDuration={premiumChartConfig.animation.duration}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={theme.colors.primary[index % theme.colors.primary.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend 
              {...premiumChartConfig.legend}
              verticalAlign="bottom"
              height={36}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}