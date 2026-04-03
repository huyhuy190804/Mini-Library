import React from 'react';
import { Search, Bell, Settings, Menu } from 'lucide-react';

const Header = ({ onMenuToggle }) => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white w-full font-sans border-b border-gray-100/50">
      <div className="flex items-center gap-4 w-full">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-6 h-6" strokeWidth={2} />
        </button>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-[#f4f7fb] rounded-full px-4 sm:px-5 py-2.5 w-full max-w-[480px]">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Search archives..." 
            className="bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm w-full font-medium"
          />
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-2 sm:gap-5 ml-4 flex-shrink-0">
        <button className="text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 p-2 hidden sm:block">
          <Bell className="w-5 h-5" strokeWidth={2} />
        </button>
        <button className="text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 p-2">
          <Settings className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};

export default Header;