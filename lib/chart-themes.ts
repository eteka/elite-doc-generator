// Premium chart color themes matching document templates

export interface ChartTheme {
  id: string;
  name: string;
  colors: {
    primary: string[];
    secondary: string[];
    accent: string;
    background: string;
    text: string;
    grid: string;
  };
  fonts: {
    family: string;
    size: {
      title: number;
      label: number;
      legend: number;
    };
  };
}

export const chartThemes: Record<string, ChartTheme> = {
  "strategic-consulting": {
    id: "strategic-consulting",
    name: "Strategic Consulting",
    colors: {
      primary: ["#475569", "#64748b", "#94a3b8", "#cbd5e1"],
      secondary: ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd"],
      accent: "#0ea5e9",
      background: "#ffffff",
      text: "#1e293b",
      grid: "#f1f5f9"
    },
    fonts: {
      family: "Inter, sans-serif",
      size: {
        title: 16,
        label: 12,
        legend: 11
      }
    }
  },
  
  "global-policy": {
    id: "global-policy",
    name: "Global Policy",
    colors: {
      primary: ["#0d9488", "#14b8a6", "#2dd4bf", "#5eead4"],
      secondary: ["#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc"],
      accent: "#0d9488",
      background: "#ffffff",
      text: "#134e4a",
      grid: "#f0fdfa"
    },
    fonts: {
      family: "Inter, sans-serif",
      size: {
        title: 16,
        label: 12,
        legend: 11
      }
    }
  },
  
  "investment-banking": {
    id: "investment-banking",
    name: "Investment Banking",
    colors: {
      primary: ["#1e3a8a", "#3730a3", "#4f46e5", "#6366f1"],
      secondary: ["#d97706", "#f59e0b", "#fbbf24", "#fcd34d"],
      accent: "#d97706",
      background: "#ffffff",
      text: "#1e293b",
      grid: "#f8fafc"
    },
    fonts: {
      family: "Inter, sans-serif",
      size: {
        title: 16,
        label: 12,
        legend: 11
      }
    }
  },
  
  "executive-briefing": {
    id: "executive-briefing",
    name: "Executive Briefing",
    colors: {
      primary: ["#0f172a", "#334155", "#475569", "#64748b"],
      secondary: ["#dc2626", "#ef4444", "#f87171", "#fca5a5"],
      accent: "#dc2626",
      background: "#ffffff",
      text: "#0f172a",
      grid: "#f8fafc"
    },
    fonts: {
      family: "Inter, sans-serif",
      size: {
        title: 16,
        label: 12,
        legend: 11
      }
    }
  },
  
  "research-report": {
    id: "research-report",
    name: "Research Report",
    colors: {
      primary: ["#1f2937", "#4b5563", "#6b7280", "#9ca3af"],
      secondary: ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd"],
      accent: "#7c3aed",
      background: "#ffffff",
      text: "#111827",
      grid: "#f9fafb"
    },
    fonts: {
      family: "Georgia, serif",
      size: {
        title: 16,
        label: 12,
        legend: 11
      }
    }
  },
  
  "international-development": {
    id: "international-development",
    name: "International Development",
    colors: {
      primary: ["#059669", "#10b981", "#34d399", "#6ee7b7"],
      secondary: ["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"],
      accent: "#f59e0b",
      background: "#ffffff",
      text: "#064e3b",
      grid: "#f0fdf4"
    },
    fonts: {
      family: "Inter, sans-serif",
      size: {
        title: 16,
        label: 12,
        legend: 11
      }
    }
  }
};

export function getChartTheme(templateId: string): ChartTheme {
  return chartThemes[templateId] || chartThemes["strategic-consulting"];
}

// Premium chart styling configuration
export const premiumChartConfig = {
  // No gridlines for clean look
  grid: {
    strokeDasharray: "0",
    stroke: "transparent"
  },
  
  // Subtle axis styling
  axis: {
    stroke: "#e2e8f0",
    strokeWidth: 1
  },
  
  // Clean tick styling
  tick: {
    fontSize: 12,
    fill: "#64748b"
  },
  
  // Elegant tooltip
  tooltip: {
    contentStyle: {
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      padding: "12px"
    },
    labelStyle: {
      fontWeight: 600,
      marginBottom: "4px"
    }
  },
  
  // Legend styling
  legend: {
    iconType: "circle" as const,
    iconSize: 8,
    wrapperStyle: {
      paddingTop: "20px"
    }
  },
  
  // Animation
  animation: {
    duration: 800,
    easing: "ease-out" as const
  }
};