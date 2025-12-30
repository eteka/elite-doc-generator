"use client";

import { ChevronRight } from "lucide-react";
import { getChartTheme } from "@/lib/chart-themes";

interface ProcessStep {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface ProcessFlowProps {
  templateId?: string;
  title?: string;
  steps: ProcessStep[];
  variant?: "chevron" | "arrow" | "boxes";
}

export function ProcessFlow({
  templateId = "strategic-consulting",
  title,
  steps,
  variant = "chevron"
}: ProcessFlowProps) {
  const theme = getChartTheme(templateId);

  if (variant === "chevron") {
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
        
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              {/* Chevron Box */}
              <div 
                className="relative flex-1 py-6 px-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-lg group"
                style={{
                  backgroundColor: theme.colors.primary[index % theme.colors.primary.length],
                  clipPath: index === steps.length - 1 
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                    : 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)',
                  marginLeft: index === 0 ? '0' : '-20px'
                }}
              >
                {step.icon && (
                  <div className="mb-2 text-white opacity-90">
                    {step.icon}
                  </div>
                )}
                <h4 className="font-bold text-white text-sm mb-1">
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-xs text-white opacity-90">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "arrow") {
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
        
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div 
                className="flex-1 rounded-lg p-6 border-2 transition-all hover:shadow-lg"
                style={{
                  borderColor: theme.colors.primary[index % theme.colors.primary.length],
                  backgroundColor: theme.colors.primary[index % theme.colors.primary.length] + '08'
                }}
              >
                {step.icon && (
                  <div className="mb-3" style={{ color: theme.colors.primary[index % theme.colors.primary.length] }}>
                    {step.icon}
                  </div>
                )}
                <h4 
                  className="font-bold text-base mb-2"
                  style={{ color: theme.colors.primary[index % theme.colors.primary.length] }}
                >
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-sm" style={{ color: theme.colors.text }}>
                    {step.description}
                  </p>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <ChevronRight 
                  className="mx-2 flex-shrink-0" 
                  style={{ color: theme.colors.primary[0] }}
                  size={24}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Boxes variant
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="rounded-lg p-6 border-2 transition-all hover:shadow-lg"
            style={{
              borderColor: theme.colors.primary[index % theme.colors.primary.length],
              backgroundColor: theme.colors.primary[index % theme.colors.primary.length] + '08'
            }}
          >
            <div 
              className="text-2xl font-bold mb-2"
              style={{ color: theme.colors.primary[index % theme.colors.primary.length] }}
            >
              {index + 1}
            </div>
            {step.icon && (
              <div className="mb-3" style={{ color: theme.colors.primary[index % theme.colors.primary.length] }}>
                {step.icon}
              </div>
            )}
            <h4 
              className="font-bold text-base mb-2"
              style={{ color: theme.colors.primary[index % theme.colors.primary.length] }}
            >
              {step.title}
            </h4>
            {step.description && (
              <p className="text-sm" style={{ color: theme.colors.text }}>
                {step.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}