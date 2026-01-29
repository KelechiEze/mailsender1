
import React, { useState } from 'react';
import { Shield, Plus, MoreVertical, CheckCircle2, Globe, Mail, Lock } from 'lucide-react';
import { SMTPConfig } from '../types';

interface SMTPConfigPageProps {
  profiles: SMTPConfig[];
  onAdd: (profile: Omit<SMTPConfig, 'id'>) => void;
}

export const SMTPConfigPage: React.FC<SMTPConfigPageProps> = ({ profiles, onAdd }) => {
  const [provider, setProvider] = useState<'gmail' | 'hostinger' | 'custom'>('gmail');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    if (!name || !email) {
      alert("Please enter a name and email.");
      return;
    }
    onAdd({
      name,
      provider,
      email,
      host: provider === 'gmail' ? 'smtp.gmail.com' : 'smtp.hostinger.com',
      port: 587,
      isDefault: false
    });
    alert("New SMTP Profile added!");
    setName("");
    setEmail("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SMTP Hub</h1>
          <p className="text-gray-500">Your delivery engine configuration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-gray-800">New SMTP Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Provider</label>
                <select value={provider} onChange={(e) => setProvider(e.target.value as any)} className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none">
                  <option value="gmail">Google / Gmail</option>
                  <option value="hostinger">Hostinger</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Profile Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g. Sales Team" className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Sender Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="sender@domain.com" className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none" />
            </div>
            <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
              Save Profile
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 font-bold text-gray-800">Active Profiles</div>
            <div className="divide-y divide-gray-50">
              {profiles.map((p) => (
                <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Mail size={18} /></div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{p.name}</p>
                      <p className="text-[10px] text-gray-500">{p.email}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="text-green-500 w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
