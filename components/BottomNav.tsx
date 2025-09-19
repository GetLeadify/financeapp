import React from 'react';
import { ICONS } from '../constants';
import type { View } from '../types';

interface BottomNavProps {
    currentView: View;
    setCurrentView: (view: View) => void;
    onSidekickClick: () => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200">
        <span className={`w-6 h-6 ${isActive ? 'text-origin-primary' : 'text-origin-text-secondary'}`}>{icon}</span>
        <span className={`text-xs font-medium ${isActive ? 'text-origin-primary' : 'text-origin-text-secondary'}`}>{label}</span>
    </button>
);

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView, onSidekickClick }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-origin-component-bg border-t border-origin-border flex items-center justify-around z-40">
            <NavItem 
                icon={ICONS.dashboard} 
                label="Dashboard" 
                isActive={currentView === 'dashboard'} 
                onClick={() => setCurrentView('dashboard')} 
            />
            <NavItem 
                icon={ICONS.spending} 
                label="Spending" 
                isActive={currentView === 'spending'} 
                onClick={() => setCurrentView('spending')} 
            />
             <NavItem 
                icon={ICONS.investments} 
                label="Investments" 
                isActive={currentView === 'investments'} 
                onClick={() => setCurrentView('investments')} 
            />
             <NavItem 
                icon={ICONS.goals} 
                label="Goals" 
                isActive={currentView === 'goals'} 
                onClick={() => setCurrentView('goals')} 
            />
            <NavItem 
                icon={ICONS.sidekick} 
                label="AI Advisor" 
                isActive={false} 
                onClick={onSidekickClick} 
            />
        </nav>
    );
};