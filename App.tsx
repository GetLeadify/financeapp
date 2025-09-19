import React, { useState } from 'react';

import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { Spending } from './components/Spending';
import { Investments } from './components/Investments';
import { Goals } from './components/Goals';
import { Sidekick } from './components/Sidekick';
import type { View } from './types';
import { financialData } from './data/mockData';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidekickOpen, setSidekickOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard data={financialData} />;
      case 'spending':
        return <Spending data={financialData} />;
      case 'investments':
        return <Investments data={financialData} />;
      case 'goals':
        return <Goals data={financialData} />;
      default:
        return <Dashboard data={financialData} />;
    }
  };

  return (
    <div className="flex h-screen bg-origin-bg font-sans text-origin-text-primary">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <main className="flex-1 overflow-x-hidden overflow-y-auto pb-20 md:pb-0">
          {renderView()}
      </main>
      <Sidekick
        financialData={financialData}
        isMobileOpen={isSidekickOpen}
        setMobileOpen={setSidekickOpen}
      />
      <BottomNav
        currentView={currentView}
        setCurrentView={setCurrentView}
        onSidekickClick={() => setSidekickOpen(true)}
      />
    </div>
  );
};

export default App;