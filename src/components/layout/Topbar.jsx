import React, { useState } from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-end h-20 px-6 bg-white border-b border-slate-200">
      <div className="relative">
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
          <FiUser className="w-6 h-6 text-slate-500" />
          <span className="text-slate-700">Swastik Shetty</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
