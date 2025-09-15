import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import ContractsView from '../components/ContractsView'; // This will be the main content

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <ContractsView />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
