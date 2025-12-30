'use client';

import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartData } from '@/types';
import { ChartWrapper } from './ChartWrapper';

interface PieChartProps {
  data: ChartData;
  className?: string;
}

const COLORS = ['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626', '#84cc16'];

export function PieChart({ data, className }: PieChartProps) {
  const config = data.config || {};
  const colors = config.colors || COLORS;
  const isDonut = data.type === 'donut';

  return (
    <ChartWrapper title={data.title} className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data.data}
            cx="50%"
            cy="50%"
            innerRadius={isDonut ? 60 : 0}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
          >
            {data.data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => [value, 'Value']}
          />
          {config.showLegend && (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
