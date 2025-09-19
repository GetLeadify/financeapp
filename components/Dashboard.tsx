import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Cell } from 'recharts';
import { NetWorthChart } from './charts/NetWorthChart';
import { ICONS } from '../constants';
import type { Transaction, FinancialData } from '../types';

const Spent7DaysChart: React.FC = () => {
    const data = [
        { day: '11', spent: 250 }, { day: '12', spent: 80 },
        { day: '13', spent: 150 }, { day: '14', spent: 1300 },
        { day: '15', spent: 64 }, { day: '16', spent: 102 },
        { day: '17', spent: 32 },
    ];
    const today = '14';

    return (
        <div className="h-20 w-full">
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#8E8E93" fontSize={12} />
                    <Bar dataKey="spent" radius={[4, 4, 4, 4]}>
                        {data.map((entry, index) => (
                            <Cell cursor="pointer" fill={entry.day === today ? '#0A84FF' : '#2D2D2F'} key={`cell-${index}`} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <div className="flex items-center justify-between py-3">
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-origin-bg flex items-center justify-center mr-4 border border-origin-border">
                {ICONS[transaction.category] || ICONS['other']}
            </div>
            <div>
                <p className="font-semibold text-origin-text-primary">{transaction.merchant}</p>
                {/* FIX: Corrected typo from `toLocaleDate oncologist` to `toLocaleDateString` for proper date formatting. */}
                <p className="text-sm text-origin-text-secondary">{new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
        </div>
        <p className="font-semibold text-origin-text-primary">-${transaction.amount.toFixed(2)}</p>
    </div>
);

export const Dashboard: React.FC<{data: FinancialData}> = ({ data }) => {
    const { netWorthHistory, transactions } = data;
    const currentNetWorth = netWorthHistory[netWorthHistory.length - 1].netWorth;

  return (
    <div className="p-4 md:p-8 space-y-6">
        <div className="flex justify-between items-center">
            <div className="flex items-center text-2xl md:text-3xl font-bold text-origin-text-primary">
                <span>NET WORTH</span>
                <span className="text-origin-text-secondary ml-2 cursor-pointer">{ICONS.down}</span>
            </div>
            <div className="flex items-center space-x-2">
                <button className="w-8 h-8 flex items-center justify-center bg-origin-component-bg rounded-full border border-origin-border text-origin-text-primary">{ICONS.plus}</button>
                <button className="bg-origin-component-bg border border-origin-border rounded-full px-4 py-1.5 text-sm font-semibold text-origin-text-primary">Forecast &gt;</button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-origin-component-bg rounded-2xl p-4 md:p-6 border border-origin-border">
                    <p className="text-3xl lg:text-4xl font-bold text-origin-text-primary">${currentNetWorth.toLocaleString('en-US')}</p>
                    <p className="text-origin-secondary font-semibold mt-1">+5.5%</p>
                    <div className="h-64 md:h-80 mt-4 -mx-4 md:-mx-6">
                        <NetWorthChart data={netWorthHistory} />
                    </div>
                    <div className="flex items-center justify-center space-x-1 md:space-x-4 mt-4">
                        {['1W', '1M', '3M', 'YTD', 'ALL'].map(period => (
                            <button key={period} className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${period === 'YTD' ? 'bg-origin-primary text-white' : 'text-origin-text-secondary hover:bg-origin-border'}`}>
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-origin-component-bg rounded-2xl p-6 border border-origin-border">
                     <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-origin-text-primary">SPENT LAST 7D &gt;</h2>
                        <button className="w-8 h-8 flex items-center justify-center bg-origin-bg rounded-full border border-origin-border text-origin-text-primary">{ICONS.plus}</button>
                    </div>
                    <p className="text-2xl font-bold text-origin-text-primary mt-2">$1,711</p>
                    <Spent7DaysChart />
                </div>
            </div>

            <div className="lg:col-span-4 bg-origin-component-bg rounded-2xl p-6 border border-origin-border">
                <h2 className="font-semibold text-origin-text-primary mb-4">RECENT TRANSACTIONS &gt;</h2>
                 <div className="divide-y divide-origin-border">
                    {transactions.slice(0, 5).map(t => <TransactionItem key={t.id} transaction={t} />)}
                </div>
            </div>
        </div>
    </div>
  );
};