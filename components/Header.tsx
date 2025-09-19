import React from 'react';
import { ICONS } from '../constants';
import type { User } from '../types';

interface HeaderProps {
    user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="flex-shrink-0 bg-slate-900/70 backdrop-blur-sm border-b border-origin-border px-8 py-4 flex items-center justify-between">
      <div className="relative w-full max-w-md">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-origin-text-light">{ICONS.search}</span>
        <input
          type="text"
          placeholder="Search transactions, investments..."
          className="w-full bg-origin-bg-dark border border-origin-border rounded-lg py-2 pl-12 pr-4 text-white placeholder-origin-text-light focus:outline-none focus:ring-2 focus:ring-origin-secondary"
        />
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-origin-text-light hover:text-white transition-colors">
          {ICONS.bell}
        </button>
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-origin-primary flex items-center justify-center font-bold text-white">
                {user.initials}
            </div>
          <div>
            <p className="font-semibold text-white">{user.name}</p>
            <p className="text-sm text-origin-text-light">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};