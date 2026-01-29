
import React from 'react';
import { Search, Bell, HelpCircle, Menu } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
  onOpenMobile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, onOpenMobile }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-10 shrink-0">
      <div className="flex items-center flex-1 min-w-0">
        <button 
          onClick={onOpenMobile}
          className="p-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="max-w-xl w-full relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative hidden sm:block">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
          <HelpCircle size={20} />
        </button>
        <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-2 md:gap-3 pl-1">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight truncate max-w-[100px]">Alex Thompson</p>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Premium</p>
          </div>
          <img
            src="https://picsum.photos/seed/user123/40/40"
            alt="User avatar"
            className="h-9 w-9 rounded-full border border-gray-200 shrink-0 object-cover"
          />
        </div>
      </div>
    </header>
  );
};
