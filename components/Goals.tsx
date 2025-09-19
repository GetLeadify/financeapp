import React from 'react';
import type { Goal, FinancialData } from '../types';

interface GoalsProps {
    data: Pick<FinancialData, 'goals'>;
}

const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const remaining = goal.targetAmount - goal.currentAmount;

    return (
        <div className="bg-origin-component-bg p-6 rounded-2xl border border-origin-border flex flex-col">
            <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{goal.emoji}</span>
                <div>
                    <h3 className="text-xl font-bold text-white">{goal.name}</h3>
                    <p className="text-origin-primary font-semibold">{progress.toFixed(1)}% complete</p>
                </div>
            </div>
            <div className="w-full bg-origin-border rounded-full h-3 mb-2">
                <div className="bg-origin-primary h-3 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-sm text-origin-text-secondary mb-4">
                <span>${goal.currentAmount.toLocaleString()}</span>
                <span>${goal.targetAmount.toLocaleString()}</span>
            </div>
            <p className="text-center text-origin-text-secondary text-sm mb-4">
                ${remaining > 0 ? remaining.toLocaleString() : '0'} more to go!
            </p>
            <button className="mt-auto w-full bg-origin-border/50 hover:bg-origin-border text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Contribute
            </button>
        </div>
    );
};

export const Goals: React.FC<GoalsProps> = ({ data }) => {
  const { goals } = data;
  return (
    <div className="p-4 md:p-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Financial Goals</h1>
      <p className="text-lg text-origin-text-secondary">
        Track your progress towards your biggest life milestones.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
         <div className="bg-origin-component-bg p-6 rounded-2xl border-2 border-dashed border-origin-border flex flex-col items-center justify-center text-center hover:border-origin-primary hover:bg-origin-border/20 transition-all cursor-pointer min-h-[200px]">
            <div className="text-4xl mb-4 text-origin-text-secondary">+</div>
            <h3 className="text-xl font-bold text-white">Create New Goal</h3>
            <p className="text-origin-text-secondary mt-1">Start planning for your next big achievement.</p>
        </div>
      </div>
    </div>
  );
};