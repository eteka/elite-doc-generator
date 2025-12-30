'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ChartWrapperProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export function ChartWrapper({ title, subtitle, className, children }: ChartWrapperProps) {
  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white p-6', className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h4 className="text-sm font-semibold text-slate-900">{title}</h4>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
}
