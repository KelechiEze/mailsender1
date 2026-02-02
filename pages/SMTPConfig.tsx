
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plus, 
  CheckCircle2, 
  Globe, 
  Mail, 
  Lock, 
  Server, 
  Cpu, 
  Zap, 
  Info, 
  Eye, 
  EyeOff, 
  Search, 
  ChevronDown,
  Edit2,
  X,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SMTPConfig } from '../types';

interface SMTPConfigPageProps {
  profiles: SMTPConfig[];
  onAdd: (profile: Omit<SMTPConfig, 'id'>) => void;
  onUpdate: (profile: SMTPConfig) => void;
  searchQuery?: string;
}

export const SMTPConfigPage: React.FC<SMTPConfigPageProps> = ({ profiles, onAdd, onUpdate, searchQuery = "" }) => {
  const [provider, setProvider] = useState<'gmail' | 'hostinger' | 'custom'>('gmail');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [host, setHost] = useState("smtp.gmail.com");
  const [port, setPort] = useState(587);
  const [encryption, setEncryption] = useState<'SSL' | 'TLS' | 'None'>('TLS');
  const [showPassword, setShowPassword] = useState(false);
  
  const [editingProfile, setEditingProfile] = useState<SMTPConfig | null>(null);

  // Auto-fill based on provider
  useEffect(() => {
    if (provider === 'gmail') {
      setHost("smtp.gmail.com");
      setPort(587);
      setEncryption('TLS');
    } else if (provider === 'hostinger') {
      setHost("smtp.hostinger.com");
      setPort(465);
      setEncryption('SSL');
    }
  }, [provider]);

  const handleSave = () => {
    if (!name || !email || !host || !username) {
      alert("Please fill in all required fields.");
      return;
    }
    onAdd({ name, provider, email, username, password, host, port, encryption, isDefault: profiles.length === 0 });
    setName(""); setEmail(""); setUsername(""); setPassword("");
    alert("Profile integrated successfully.");
  };

  const handleUpdate = () => {
    if (editingProfile) {
      onUpdate(editingProfile);
      setEditingProfile(null);
      alert("Profile updated successfully.");
    }
  };

  const filteredProfiles = profiles.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Delivery Infrastructure</h1>
          <p className="text-gray-500 text-sm mt-1">Configure your outgoing SMTP gateways.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden">
            <div className="p-8 md:p-12 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Plus size={24} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">New Gateway</h3>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <Globe size={12} className="text-blue-500" /> Choose Provider
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['gmail', 'hostinger', 'custom'].map((id) => (
                    <button
                      key={id}
                      onClick={() => setProvider(id as any)}
                      className={`p-6 rounded-3xl border-2 text-left transition-all ${
                        provider === id ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 bg-white'
                      }`}
                    >
                      <p className={`text-sm font-black capitalize ${provider === id ? 'text-blue-600' : 'text-gray-800'}`}>{id}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nickname</label>
                  <input 
                    value={name} onChange={(e) => setName(e.target.value)}
                    type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-blue-500/5" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                  <input 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    type="email" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-blue-500/5" 
                  />
                </div>
              </div>

              <div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8 space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">SMTP Host</label>
                    <input value={host} onChange={(e) => setHost(e.target.value)} type="text" className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold text-gray-900 outline-none" />
                  </div>
                  <div className="md:col-span-4 space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Port</label>
                    <input value={port} onChange={(e) => setPort(Number(e.target.value))} type="number" className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold text-gray-900 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold text-gray-900 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Password</label>
                    <div className="relative">
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 pr-12 text-sm font-bold text-gray-900 outline-none" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={handleSave} className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                Activate Route
              </button>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col max-h-[800px]">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-black text-[11px] uppercase tracking-widest text-gray-400">Deployed Hubs</h3>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black">{filteredProfiles.length} Found</span>
            </div>
            <div className="divide-y divide-gray-50 overflow-y-auto scrollbar-hide">
              {filteredProfiles.map((p) => (
                <div key={p.id} onClick={() => setEditingProfile(p)} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Server size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-gray-900 tracking-tight">{p.name}</p>
                        {p.isDefault && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[120px]">{p.email}</p>
                    </div>
                  </div>
                  <Edit2 size={16} className="text-gray-300 group-hover:text-blue-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <AnimatePresence>
        {editingProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-xl font-black text-gray-900">Modify SMTP Gateway</h2>
                <button onClick={() => setEditingProfile(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={20} /></button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nickname</label>
                    <input value={editingProfile.name} onChange={(e) => setEditingProfile({...editingProfile, name: e.target.value})} className="w-full bg-gray-50 rounded-xl p-3 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                    <input value={editingProfile.email} onChange={(e) => setEditingProfile({...editingProfile, email: e.target.value})} className="w-full bg-gray-50 rounded-xl p-3 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Host URL</label>
                    <input value={editingProfile.host} onChange={(e) => setEditingProfile({...editingProfile, host: e.target.value})} className="w-full bg-gray-50 rounded-xl p-3 text-sm font-bold text-gray-900 outline-none" />
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button onClick={() => setEditingProfile(null)} className="flex-1 py-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 rounded-2xl">Cancel</button>
                  <button onClick={handleUpdate} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-200 flex items-center justify-center gap-2"><Save size={18} /> Update Route</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
