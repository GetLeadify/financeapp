import React from 'react';
import { PortfolioChart } from './charts/PortfolioChart';
import { ICONS } from '../constants';
import type { Investment, FinancialData } from '../types';

interface InvestmentsProps {
    data: Pick<FinancialData, 'investments' | 'portfolioHistory'>;
}

const InvestmentRow: React.FC<{ investment: Investment }> = ({ investment }) => (
    <tr className="border-b border-origin-border hover:bg-origin-border/20">
        <td className="py-4 px-6">
            <p className="font-bold text-white">{investment.ticker}</p>
            <p className="text-sm text-origin-text-secondary">{investment.name}</p>
        </td>
        <td className="py-4 px-6 font-semibold text-white">${investment.value.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
        <td className={`py-4 px-6 font-semibold ${investment.change >= 0 ? 'text-origin-secondary' : 'text-red-400'}`}>
            <div className="flex items-center">
                {investment.change >= 0 ? ICONS.up : ICONS.down}
                <span className="ml-2">${Math.abs(investment.change).toFixed(2)} ({investment.changePercent.toFixed(2)}%)</span>
            </div>
        </td>
        <td className="py-4 px-6 text-white">{investment.shares.toFixed(4)}</td>
        <td className="py-4 px-6 text-right">
            <button className="bg-origin-primary/80 text-white font-bold py-1 px-3 rounded text-sm hover:bg-origin-primary">Trade</button>
        </td>
    </tr>
);

const InvestmentCard: React.FC<{ investment: Investment }> = ({ investment }) => (
    <div className="bg-origin-component-bg rounded-lg border border-origin-border p-4">
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="font-bold text-lg text-white">{investment.ticker}</p>
                <p className="text-sm text-origin-text-secondary">{investment.name}</p>
            </div>
            <button className="bg-origin-primary/80 text-white font-bold py-1 px-3 rounded text-sm hover:bg-origin-primary">Trade</button>
        </div>
        <div className="space-y-2 mt-4 text-sm">
            <div className="flex justify-between">
                <span className="text-origin-text-secondary">Market Value</span>
                <span className="font-semibold text-white">${investment.value.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-origin-text-secondary">Today's Change</span>
                 <span className={`font-semibold flex items-center ${investment.change >= 0 ? 'text-origin-secondary' : 'text-red-400'}`}>
                    {investment.change >= 0 ? ICONS.up : ICONS.down}
                    <span className="ml-1">${Math.abs(investment.change).toFixed(2)} ({investment.changePercent.toFixed(2)}%)</span>
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-origin-text-secondary">Shares</span>
                <span className="text-white">{investment.shares.toFixed(4)}</span>
            </div>
        </div>
    </div>
);

export const Investments: React.FC<InvestmentsProps> = ({ data }) => {
    const { investments, portfolioHistory } = data;
    const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
    const totalChange = investments.reduce((sum, inv) => sum + inv.change, 0);

  return (
    <div className="p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Investments</h1>
                <p className="text-origin-text-secondary mt-1">Portfolio performance and holdings.</p>
            </div>
            <div className="w-full md:w-auto text-left md:text-right">
                <p className="text-origin-text-secondary text-sm">Total Value</p>
                <p className="text-3xl font-bold text-white">${totalValue.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                <div className={`flex items-center md:justify-end mt-1 font-semibold ${totalChange >= 0 ? 'text-origin-secondary' : 'text-red-400'}`}>
                   {totalChange >= 0 ? ICONS.up : ICONS.down}
                   <span className="ml-1">${Math.abs(totalChange).toFixed(2)} Today</span>
                </div>
            </div>
        </div>

        <div className="bg-origin-component-bg p-4 sm:p-6 rounded-xl border border-origin-border">
             <h2 className="text-xl font-semibold text-white mb-4">Portfolio History</h2>
             <div className="h-64 sm:h-80 -mx-4 sm:-mx-6">
                <PortfolioChart data={portfolioHistory} />
             </div>
        </div>

        <div className="bg-origin-component-bg rounded-xl border border-origin-border overflow-hidden">
            <h2 className="text-xl md:text-2xl font-semibold text-white p-6">Your Holdings</h2>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left">
                    <thead className="bg-black/30">
                        <tr>
                            <th className="py-3 px-6 font-semibold text-origin-text-secondary">Asset</th>
                            <th className="py-3 px-6 font-semibold text-origin-text-secondary">Market Value</th>
                            <th className="py-3 px-6 font-semibold text-origin-text-secondary">Today's Change</th>
                            <th className="py-3 px-6 font-semibold text-origin-text-secondary">Shares</th>
                            <th className="py-3 px-6 font-semibold text-origin-text-secondary text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investments.map(i => <InvestmentRow key={i.id} investment={i} />)}
                    </tbody>
                </table>
            </div>
            {/* Mobile Card List */}
            <div className="md:hidden px-4 pb-4 space-y-4">
                {investments.map(i => <InvestmentCard key={i.id} investment={i} />)}
            </div>
        </div>
    </div>
  );
};