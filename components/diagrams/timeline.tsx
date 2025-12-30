"use client";

import { Calendar, CheckCircle2, Circle } from "lucide-react";
import { getChartTheme } from "@/lib/chart-themes";

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  status?: "completed" | "current" | "upcoming";
}

interface TimelineProps {
  templateId?: string;
  title?: string;
  events: TimelineEvent[];
  variant?: "vertical" | "horizontal";
}

export function Timeline({
  templateId = "strategic-consulting",
  title,
  events,
  variant = "vertical"
}: TimelineProps) {
  const theme = getChartTheme(templateId);

  if (variant === "horizontal") {
    return (
      <div className="w-full">
        {title && (
          <h3 
            className="text-lg font-semibold mb-8"
            style={{ color: theme.colors.text, fontFamily: theme.fonts.family }}
          >
            {title}
          </h3>
        )}
        
        <div className="relative">
          {/* Timeline line */}
          <div 
            className="absolute top-8 left-0 right-0 h-1"
            style={{ backgroundColor: theme.colors.primary[2] }}
          />
          
          <div className="flex justify-between">
            {events.map((event, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* Dot */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
                  style={{
                    backgroundColor: event.status === "completed" 
                      ? theme.colors.accent 
                      : event.status === "current"
                        ? theme.colors.primary[0]
                        : theme.colors.primary[2]
                  }}
                >
                  {event.status === "completed" ? (
                    <CheckCircle2 className="text-white" size={28} />
                  ) : (
                    <Circle className="text-white" size={28} />
                  )}
                </div>
                
                {/* Content */}
                <div className="mt-6 text-center max-w-[200px]">
                  <div 
                    className="text-xs font-semibold mb-2"
                    style={{ color: theme.colors.primary[0] }}
                  >
                    {event.date}
                  </div>
                  <h4 
                    className="font-bold text-sm mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    {event.title}
                  </h4>
                  {event.description && (
                    <p 
                      className="text-xs"
                      style={{ color: theme.colors.text, opacity: 0.7 }}
                    >
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vertical variant
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
      
      <div className="relative pl-8">
        {/* Timeline line */}
        <div 
          className="absolute left-4 top-0 bottom-0 w-0.5"
          style={{ backgroundColor: theme.colors.primary[2] }}
        />
        
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="relative">
              {/* Dot */}
              <div 
                className="absolute -left-[26px] w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: event.status === "completed" 
                    ? theme.colors.accent 
                    : event.status === "current"
                      ? theme.colors.primary[0]
                      : theme.colors.primary[2]
                }}
              >
                {event.status === "completed" ? (
                  <CheckCircle2 className="text-white" size={20} />
                ) : (
                  <Circle className="text-white" size={20} />
                )}
              </div>
              
              {/* Content */}
              <div 
                className="ml-6 p-4 rounded-lg border-l-4 transition-all hover:shadow-md"
                style={{
                  borderColor: event.status === "completed" 
                    ? theme.colors.accent 
                    : event.status === "current"
                      ? theme.colors.primary[0]
                      : theme.colors.primary[2],
                  backgroundColor: theme.colors.background
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} style={{ color: theme.colors.primary[0] }} />
                  <span 
                    className="text-xs font-semibold"
                    style={{ color: theme.colors.primary[0] }}
                  >
                    {event.date}
                  </span>
                </div>
                <h4 
                  className="font-bold text-base mb-1"
                  style={{ color: theme.colors.text }}
                >
                  {event.title}
                </h4>
                {event.description && (
                  <p 
                    className="text-sm"
                    style={{ color: theme.colors.text, opacity: 0.8 }}
                  >
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}