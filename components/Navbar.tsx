
import React from 'react';
import { Search, Bell, HelpCircle, Menu, PanelLeftClose, PanelLeft } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleSidebar: () => void;
  onOpenMobile: () => void;
  onOpenProfile: () => void;
  isSidebarCollapsed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  searchQuery, 
  onSearchChange, 
  onToggleSidebar, 
  onOpenMobile, 
  onOpenProfile,
  isSidebarCollapsed
}) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-10 shrink-0">
      <div className="flex items-center flex-1 min-w-0 gap-4">
        {/* Mobile Menu Trigger */}
        <button 
          onClick={onOpenMobile}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Sidebar Toggle */}
        <button 
          onClick={onToggleSidebar}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg hidden lg:flex transition-all"
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>

        <div className="max-w-xl w-full relative group hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-100 rounded-xl leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 text-sm font-bold text-gray-900 transition-all"
            placeholder="Search campaigns, logs, or tags..."
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
        <div 
          onClick={onOpenProfile}
          className="flex items-center gap-2 md:gap-3 pl-1 cursor-pointer hover:bg-gray-50 p-1.5 rounded-xl transition-all"
        >
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900 leading-tight truncate max-w-[120px]">{user.name}</p>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Enterprise Tier</p>
          </div>
          <img
            src={user.avatar || `https://picsum.photos/seed/${user.id}/40/40`}
            alt="User avatar"
            className="h-9 w-9 rounded-full border border-gray-200 shrink-0 object-cover shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};
