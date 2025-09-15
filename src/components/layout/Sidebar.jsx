import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiFileText, FiBarChart2, FiTrendingUp, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const navLinkClasses = (isActive) =>
    `flex items-center px-4 py-3 text-slate-300 hover:bg-slate-700 transition-colors ${
      isActive ? 'bg-slate-700 text-white' : ''
    }`;

  return (
    <div className="flex flex-col w-64 bg-slate-800">
      <div className="flex items-center justify-center h-20 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">Contracts</h1>
      </div>
      <nav className="flex-1 mt-6">
        <NavLink to="/dashboard" className={({ isActive }) => navLinkClasses(isActive)}>
          <FiFileText className="mr-3" />
          Contracts
        </NavLink>
        <NavLink to="/insights" className={({ isActive }) => navLinkClasses(isActive)}>
          <FiBarChart2 className="mr-3" />
          Insights
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => navLinkClasses(isActive)}>
          <FiTrendingUp className="mr-3" />
          Reports
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => navLinkClasses(isActive)}>
          <FiSettings className="mr-3" />
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
