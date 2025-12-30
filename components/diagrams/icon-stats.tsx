"use client";

import { LucideIcon } from "lucide-react";
import { getChartTheme } from "@/lib/chart-themes";

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface IconStatsProps {
  templateId?: string;
  title?: string;
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

export function IconStats({
  templateId = "strategic-consulting",
  title,
  stats,
  columns = 4
}: IconStatsProps) {
  const theme = getChartTheme(templateId);

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className="w-full">
      {title && (
        <h3 
          className="text-lg font-semibold mb-6"
          style={{ color: theme.colors.text, fontFamily: theme.fonts.family }}
        >
          {title}
        </h3>
      )}
      
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="rounded-lg p-6 border-2 transition-all hover:shadow-lg group"
              style={{
                borderColor: theme.colors.primary[index % theme.colors.primary.length],
                backgroundColor: theme.colors.background
              }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: theme.colors.primary[index % theme.colors.primary.length] + '15'
                }}
              >
                <Icon 
                  size={24} 
                  style={{ color: theme.colors.primary[index % theme.colors.primary.length] }}
                />
              </div>
              
              {/* Value */}
              <div 
                className="text-3xl font-bold mb-1"
                style={{ color: theme.colors.text }}
              >
                {stat.value}
              </div>
              
              {/* Label */}
              <div 
                className="text-sm font-medium mb-2"
                style={{ color: theme.colors.text, opacity: 0.7 }}
              >
                {stat.label}
              </div>
              
              {/* Trend */}
              {stat.trend && (
                <div 
                  className="text-xs font-semibold flex items-center gap-1"
                  style={{ 
                    color: stat.trend.isPositive 
                      ? theme.colors.accent 
                      : theme.colors.secondary[0] 
                  }}
                >
                  <span>{stat.trend.isPositive ? '↑' : '↓'}</span>
                  <span>{stat.trend.value}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}