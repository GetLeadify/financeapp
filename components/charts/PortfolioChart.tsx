import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import type { PortfolioDataPoint } from '../../types';

interface PortfolioChartProps {
    data: PortfolioDataPoint[];
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ data }) => {
    const formatYAxis = (tick: number) => `$${(tick / 1000)}k`;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0A84FF" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#8E8E93" tickLine={false} axisLine={false} />
                <YAxis stroke="#8E8E93" tickFormatter={formatYAxis} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1C1C1E',
                        borderColor: '#2D2D2F',
                        borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: '#F8FAFC' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                    cursor={{ stroke: '#2D2D2F', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="value" stroke="#0A84FF" fillOpacity={1} fill="url(#colorPortfolio)" strokeWidth={3} />
            </AreaChart>
        </ResponsiveContainer>
    );
};
