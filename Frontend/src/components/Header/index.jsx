import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white w-full font-sans">
      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-[#f4f7fb] rounded-full px-5 py-2.5 w-[480px]">
        <Search className="w-4 h-4 text-gray-400" strokeWidth={2} />
        <input 
          type="text" 
          placeholder="Search archives..." 
          className="bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm w-full font-medium"
        />
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 p-2">
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