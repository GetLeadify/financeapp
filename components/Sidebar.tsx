import React from 'react';
import type { View } from '../types';
import { ICONS } from '../constants';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-colors duration-200 text-base ${
      isActive
        ? 'bg-origin-primary text-white'
        : 'text-origin-text-secondary hover:bg-origin-component-bg hover:text-origin-text-primary'
    }`}
  >
    <span className="mr-4 w-6 h-6">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-64 bg-origin-bg p-6 flex-shrink-0 flex-col border-r border-origin-border hidden md:flex">
      <div>
        <div className="flex items-center mb-12">
            <div className="bg-origin-component-bg p-2 rounded-lg border border-origin-border">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <h1 className="text-2xl font-bold text-white ml-3">Origin</h1>
        </div>
        <nav className="space-y-3">
          <NavItem icon={ICONS.dashboard} label="Dashboard" isActive={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <NavItem icon={ICONS.spending} label="Spending" isActive={currentView === 'spending'} onClick={() => setCurrentView('spending')} />
          <NavItem icon={ICONS.investments} label="Investments" isActive={currentView === 'investments'} onClick={() => setCurrentView('investments')} />
          <NavItem icon={ICONS.goals} label="Goals" isActive={currentView === 'goals'} onClick={() => setCurrentView('goals')} />
        </nav>
      </div>
    </aside>
  );
};