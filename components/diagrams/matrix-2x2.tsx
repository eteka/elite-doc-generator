"use client";

import { getChartTheme } from "@/lib/chart-themes";

interface MatrixItem {
  label: string;
  description?: string;
}

interface Matrix2x2Props {
  templateId?: string;
  title?: string;
  xAxisLabel: string;
  yAxisLabel: string;
  quadrants: {
    topLeft: MatrixItem;
    topRight: MatrixItem;
    bottomLeft: MatrixItem;
    bottomRight: MatrixItem;
  };
  height?: number;
}

export function Matrix2x2({
  templateId = "strategic-consulting",
  title,
  xAxisLabel,
  yAxisLabel,
  quadrants,
  height = 400
}: Matrix2x2Props) {
  const theme = getChartTheme(templateId);

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
      
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Y-axis label */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center"
          style={{ 
            color: theme.colors.text, 
            fontSize: "14px", 
            fontWeight: 600,
            width: `${height}px`,
            textAlign: "center"
          }}
        >
          {yAxisLabel}
        </div>

        {/* Matrix grid */}
        <div className="ml-12 h-full flex flex-col">
          <div className="flex-1 flex gap-2">
            {/* Top Left Quadrant */}
            <div 
              className="flex-1 border-2 rounded-lg p-6 flex flex-col justify-center items-center text-center transition-all hover:shadow-lg"
              style={{ 
                borderColor: theme.colors.primary[0],
                backgroundColor: theme.colors.primary[0] + '08'
              }}
            >
              <h4 
                className="font-bold text-base mb-2"
                style={{ color: theme.colors.primary[0] }}
              >
                {quadrants.topLeft.label}
              </h4>
              {quadrants.topLeft.description && (
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.text }}
                >
                  {quadrants.topLeft.description}
                </p>
              )}
            </div>

            {/* Top Right Quadrant */}
            <div 
              className="flex-1 border-2 rounded-lg p-6 flex flex-col justify-center items-center text-center transition-all hover:shadow-lg"
              style={{ 
                borderColor: theme.colors.accent,
                backgroundColor: theme.colors.accent + '08'
              }}
            >
              <h4 
                className="font-bold text-base mb-2"
                style={{ color: theme.colors.accent }}
              >
                {quadrants.topRight.label}
              </h4>
              {quadrants.topRight.description && (
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.text }}
                >
                  {quadrants.topRight.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 flex gap-2 mt-2">
            {/* Bottom Left Quadrant */}
            <div 
              className="flex-1 border-2 rounded-lg p-6 flex flex-col justify-center items-center text-center transition-all hover:shadow-lg"
              style={{ 
                borderColor: theme.colors.primary[2],
                backgroundColor: theme.colors.primary[2] + '08'
              }}
            >
              <h4 
                className="font-bold text-base mb-2"
                style={{ color: theme.colors.primary[2] }}
              >
                {quadrants.bottomLeft.label}
              </h4>
              {quadrants.bottomLeft.description && (
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.text }}
                >
                  {quadrants.bottomLeft.description}
                </p>
              )}
            </div>

            {/* Bottom Right Quadrant */}
            <div 
              className="flex-1 border-2 rounded-lg p-6 flex flex-col justify-center items-center text-center transition-all hover:shadow-lg"
              style={{ 
                borderColor: theme.colors.primary[1],
                backgroundColor: theme.colors.primary[1] + '08'
              }}
            >
              <h4 
                className="font-bold text-base mb-2"
                style={{ color: theme.colors.primary[1] }}
              >
                {quadrants.bottomRight.label}
              </h4>
              {quadrants.bottomRight.description && (
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.text }}
                >
                  {quadrants.bottomRight.description}
                </p>
              )}
            </div>
          </div>

          {/* X-axis label */}
          <div 
            className="text-center mt-4"
            style={{ 
              color: theme.colors.text, 
              fontSize: "14px", 
              fontWeight: 600 
            }}
          >
            {xAxisLabel}
          </div>
        </div>
      </div>
    </div>
  );
}