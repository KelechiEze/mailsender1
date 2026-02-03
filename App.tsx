
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ProfileModal } from './components/ProfileModal';
import { Dashboard } from './pages/Dashboard';
import { Compose } from './pages/Compose';
import { SMTPConfigPage } from './pages/SMTPConfig';
import { Databases } from './pages/Databases';
import { Analytics } from './pages/Analytics';
import { EmailLogs } from './pages/EmailLogs';
import { Templates } from './pages/Templates';
import { Login } from './pages/Login';
import { Page, SMTPConfig, DatabaseConnection, User, EmailLog } from './types';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTemplateHtml, setActiveTemplateHtml] = useState<string | null>(null);

  const [user, setUser] = useState<User>({
    id: 'user_1',
    name: 'Alex Thompson',
    email: 'alex.t@acme.com'
  });
  
  const [smtpProfiles, setSmtpProfiles] = useState<SMTPConfig[]>([
    { id: '1', name: 'Acme Marketing', provider: 'gmail', email: 'news@acme.com', username: 'news@acme.com', host: 'smtp.gmail.com', port: 587, encryption: 'TLS', isDefault: true },
    { id: '2', name: 'Support Desk', provider: 'hostinger', email: 'help@acme.com', username: 'help@acme.com', host: 'smtp.hostinger.com', port: 465, encryption: 'SSL', isDefault: false },
  ]);

  const [databases, setDatabases] = useState<DatabaseConnection[]>([
    { id: '1', name: 'Main Newsletter', type: 'postgres', status: 'connected', recordCount: 12430 },
    { id: '2', name: 'Purchased Customers', type: 'mysql', status: 'connected', recordCount: 2100 },
  ]);

  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('is_auth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('is_auth');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const addSmtpProfile = (profile: Omit<SMTPConfig, 'id'>) => {
    const newProfile = { ...profile, id: Date.now().toString() };
    setSmtpProfiles([...smtpProfiles, newProfile]);
  };

  const updateSmtpProfile = (profile: SMTPConfig) => {
    setSmtpProfiles(smtpProfiles.map(p => p.id === profile.id ? profile : p));
  };

  const handleUseTemplate = (html: string) => {
    setActiveTemplateHtml(html);
    navigate('/compose');
  };

  const addDatabase = (db: Omit<DatabaseConnection, 'id'>) => {
    const newDb = { ...db, id: Date.now().toString() };
    setDatabases([...databases, newDb]);
  };

  const handleAddLogs = (newLogs: EmailLog[]) => {
    setEmailLogs(prev => [...newLogs, ...prev]);
  };

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === '/login') {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdate={setUser}
      />

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar 
        user={user}
        isCollapsed={isSidebarCollapsed} 
        isMobileMenuOpen={isMobileMenuOpen}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar 
          user={user}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          isSidebarCollapsed={isSidebarCollapsed}
          onOpenMobile={() => setIsMobileMenuOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard searchQuery={searchQuery} />} />
            <Route path="/compose" element={<Compose smtpProfiles={smtpProfiles} databases={databases} onAddLogs={handleAddLogs} initialHtml={activeTemplateHtml || undefined} />} />
            <Route path="/templates" element={<Templates searchQuery={searchQuery} onUseTemplate={handleUseTemplate} />} />
            <Route path="/smtp" element={<SMTPConfigPage profiles={smtpProfiles} onAdd={addSmtpProfile} onUpdate={updateSmtpProfile} searchQuery={searchQuery} />} />
            <Route path="/databases" element={<Databases databases={databases} onAdd={addDatabase} searchQuery={searchQuery} />} />
            <Route path="/logs" element={<EmailLogs searchQuery={searchQuery} logs={emailLogs} />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
