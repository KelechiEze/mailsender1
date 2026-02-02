
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PenSquare, 
  FileText, 
  Settings, 
  Database, 
  Send, 
  History, 
  BarChart3, 
  User as UserIcon, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
  onLogout: () => void;
  onOpenProfile: () => void;
}

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/compose', label: 'Compose Email', icon: PenSquare },
  { path: '/templates', label: 'Templates', icon: FileText },
  { path: '/smtp', label: 'SMTP Settings', icon: Settings },
  { path: '/databases', label: 'Databases', icon: Database },
  { path: '/logs', label: 'Email Logs', icon: History },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  user,
  isCollapsed, 
  isMobileMenuOpen, 
  onToggle, 
  onCloseMobile, 
  onLogout,
  onOpenProfile
}) => {
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full lg:relative lg:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${
        isCollapsed ? 'lg:w-20' : 'w-64 lg:w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-100 h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Send className="text-white w-5 h-5" />
          </div>
          {(!isCollapsed || isMobileMenuOpen) && (
            <span className="font-bold text-xl text-gray-800 tracking-tight">MailPro</span>
          )}
        </div>
        
        <button 
          onClick={onCloseMobile}
          className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors group ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className={`w-5 h-5 shrink-0 ${isCollapsed && !isMobileMenuOpen ? 'mx-auto' : 'mr-3'}`} />
            {(!isCollapsed || isMobileMenuOpen) && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="space-y-1">
          <button
            onClick={onOpenProfile}
            className="flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <UserIcon className={`w-5 h-5 shrink-0 ${isCollapsed && !isMobileMenuOpen ? 'mx-auto' : 'mr-3'}`} />
            {(!isCollapsed || isMobileMenuOpen) && <span className="font-medium">My Account</span>}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center w-full p-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className={`w-5 h-5 shrink-0 ${isCollapsed && !isMobileMenuOpen ? 'mx-auto' : 'mr-3'}`} />
            {(!isCollapsed || isMobileMenuOpen) && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
        
        <button 
          onClick={onToggle}
          className="hidden lg:flex mt-4 items-center justify-center w-full p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </div>
  );
};
