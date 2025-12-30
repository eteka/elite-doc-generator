'use client';

import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartData } from '@/types';
import { ChartWrapper } from './ChartWrapper';

interface AreaChartProps {
  data: ChartData;
  className?: string;
}

const COLORS = ['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706'];

export function AreaChart({ data, className }: AreaChartProps) {
  const config = data.config || {};
  const colors = config.colors || COLORS;

  return (
    <ChartWrapper title={data.title} className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsAreaChart data={data.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[0]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          {config.showGrid !== false && (
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          )}
          <XAxis
            dataKey={config.xAxisKey || 'name'}
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={{ stroke: '#e2e8f0' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            labelStyle={{ fontWeight: 600, color: '#0f172a' }}
          />
          {config.showLegend && <Legend />}
          <Area
            type="monotone"
            dataKey={config.yAxisKey || 'value'}
            stroke={colors[0]}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
