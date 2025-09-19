import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import type { BudgetItem } from '../../types';

const COLORS = ['#0A84FF', '#30D158', '#FFD700', '#FF6347', '#9370DB'];

interface SpendingChartProps {
    budgetItems: BudgetItem[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({ budgetItems }) => {
    const data = budgetItems.map(item => ({ name: item.category, value: item.spent }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                 <Tooltip
                    contentStyle={{
                        backgroundColor: '#1C1C1E',
                        borderColor: '#2D2D2F',
                        borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: '#F8FAFC' }}
                    formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
                />
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${(Number(percent) * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend iconType="circle" formatter={(value) => <span className="capitalize text-origin-text-secondary">{value}</span>}/>
            </PieChart>
        </ResponsiveContainer>
    );
};
