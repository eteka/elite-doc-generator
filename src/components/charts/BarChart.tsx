'use client';

import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartData, ChartConfig } from '@/types';
import { ChartWrapper } from './ChartWrapper';

interface BarChartProps {
  data: ChartData;
  className?: string;
}

const COLORS = ['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706'];

export function BarChart({ data, className }: BarChartProps) {
  const config = data.config || {};
  const colors = config.colors || COLORS;

  return (
    <ChartWrapper title={data.title} className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
          <Bar
            dataKey={config.yAxisKey || 'value'}
            fill={colors[0]}
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
