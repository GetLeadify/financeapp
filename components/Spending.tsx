import React, { useState } from 'react';
import { ICONS } from '../constants';
import type { FinancialData, BudgetItem, Subscription } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

type SpendingView = 'overview' | 'breakdown' | 'recurring';

const MonthlySpendChart: React.FC = () => {
    const data = [
        { day: '01', spent: 200 }, { day: '07', spent: 800 }, { day: '14', spent: 2100 },
        { day: '21', spent: 3500 }, { day: '28', spent: 5070 }
    ];
    return (
        <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="day" stroke="#8E8E93" />
                    <YAxis stroke="#8E8E93" tickFormatter={(val) => `$${(val/1000)}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1C1C1E', border: '1px solid #2D2D2F', borderRadius: '0.5rem' }}/>
                    <Line type="monotone" dataKey="spent" stroke="#0A84FF" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const BudgetDonutChart: React.FC<{ spent: number, budget: number }> = ({ spent, budget }) => {
    const data = [{ name: 'Spent', value: spent }, { name: 'Remaining', value: Math.max(0, budget - spent) }];
    const COLORS = ['#0A84FF', '#2D2D2F'];
    const percent = ((spent/budget)*100).toFixed(1);
    return (
        <div className="h-64 w-64 relative mx-auto">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={80} outerRadius={100} startAngle={90} endAngle={450} paddingAngle={0} dataKey="value" stroke="none">
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-sm text-origin-text-secondary">{percent}%</p>
                <p className="text-3xl font-bold text-white">${spent.toLocaleString()}</p>
                <p className="text-sm text-origin-text-secondary">${budget.toLocaleString()} budget</p>
             </div>
        </div>
    );
};

const RecurringCalendar: React.FC<{ subscriptions: Subscription[] }> = ({ subscriptions }) => {
    // This is a simplified representation for August 2024
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const startDay = 4; // Aug 1, 2024 is a Thursday
    const blanks = Array.from({length: startDay}).map((_, i) => <div key={`blank-${i}`} />);
    const getSubsForDay = (day: number) => subscriptions.filter(s => new Date(s.dueDate).getUTCDate() === day);

    const today = new Date().getDate();

    return (
        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="font-bold text-origin-text-secondary p-1 sm:p-2">{d}</div>)}
            {blanks}
            {days.map(day => (
                 <div key={day} className={`h-16 sm:h-20 p-1 flex flex-col items-center rounded-md ${today === day ? 'bg-origin-primary' : ''}`}>
                    <span className="font-medium">{day}</span>
                    <div className="flex flex-wrap justify-center gap-1 mt-1">
                    {getSubsForDay(day).map(sub => (
                         <div key={sub.id} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400`} title={`${sub.name}: $${sub.amount}`}></div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const BudgetItemRow: React.FC<{ item: BudgetItem }> = ({ item }) => {
    const percentage = item.budget > 0 ? (item.spent / item.budget) * 100 : 0;
    const colorClass = item.category.startsWith('Travel') ? 'bg-blue-500' : item.category.startsWith('Food') ? 'bg-orange-500' : 'bg-red-500';
    return (
        <div className="py-3">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${colorClass} mr-3`}></div>
                    <p className="font-semibold text-origin-text-primary">{item.category}</p>
                </div>
                <div className="flex items-center">
                    <p className="font-semibold text-origin-text-primary">${item.spent.toFixed(0)}</p>
                    {item.budget > 0 && <span className="text-sm text-origin-text-secondary ml-2 sm:ml-4 w-12 text-right">{percentage.toFixed(0)}%</span>}
                    <span className="text-origin-text-secondary ml-2 cursor-pointer">{ICONS.down}</span>
                </div>
            </div>
            {item.budget > 0 && (
                <div className="w-full bg-origin-border rounded-full h-2 ml-6">
                    <div className={`${colorClass} h-2 rounded-full`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                </div>
            )}
        </div>
    );
};

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({label, isActive, onClick}) => (
    <button onClick={onClick} className={`py-3 px-2 md:px-4 text-sm sm:text-base font-semibold transition-colors ${isActive ? 'text-white border-b-2 border-white' : 'text-origin-text-secondary hover:text-white'}`}>
        {label}
    </button>
);

export const Spending: React.FC<{data: FinancialData}> = ({ data }) => {
  const [activeView, setActiveView] = useState<SpendingView>('breakdown');
  const totalSpent = 5070;
  const totalBudget = 10000;

  const renderContent = () => {
      switch (activeView) {
          case 'overview':
            return (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-origin-component-bg rounded-2xl p-4 md:p-6 border border-origin-border">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-origin-text-secondary">SPEND THIS MONTH</p>
                                <p className="text-3xl font-bold text-white">${totalSpent.toLocaleString()}</p>
                            </div>
                            <button className="text-origin-text-primary font-semibold">vs April {ICONS.down}</button>
                        </div>
                        <MonthlySpendChart />
                    </div>
                </div>
            );
          case 'breakdown':
              return (
                  <div className="bg-origin-component-bg rounded-2xl p-4 md:p-6 border border-origin-border animate-fade-in">
                      <h2 className="font-bold text-white text-lg mb-4">CATEGORY BREAKDOWN</h2>
                      <BudgetDonutChart spent={totalSpent} budget={totalBudget} />
                      <div className="mt-6 divide-y divide-origin-border">
                          {data.budgetItems.map(item => <BudgetItemRow key={item.category} item={item} />)}
                      </div>
                  </div>
              );
          case 'recurring':
              return (
                <div className="bg-origin-component-bg rounded-2xl p-4 md:p-6 border border-origin-border animate-fade-in">
                    <h2 className="font-bold text-white text-lg mb-4">UPCOMING TRANSACTIONS</h2>
                    <RecurringCalendar subscriptions={data.subscriptions} />
                </div>
              );
      }
  };

  return (
    <div className="p-4 md:p-8">
        <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">SPENDING</h1>
            <div className="flex items-center space-x-2">
                <button className="w-8 h-8 flex items-center justify-center bg-origin-component-bg rounded-full border border-origin-border text-origin-text-primary">{ICONS.plus}</button>
                <button className="w-8 h-8 flex items-center justify-center bg-origin-component-bg rounded-full border border-origin-border text-origin-text-primary">{ICONS.search}</button>
            </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 border-b border-origin-border mb-6">
            <TabButton label="Overview" isActive={activeView === 'overview'} onClick={() => setActiveView('overview')} />
            <TabButton label="Breakdown & budget" isActive={activeView === 'breakdown'} onClick={() => setActiveView('breakdown')} />
            <TabButton label="Recurring" isActive={activeView === 'recurring'} onClick={() => setActiveView('recurring')} />
        </div>
        {renderContent()}
    </div>
  );
};