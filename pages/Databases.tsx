
import React, { useState } from 'react';
import { Database, Plus, Search, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { DatabaseConnection } from '../types';

interface DatabasesProps {
  databases: DatabaseConnection[];
  onAdd: (db: Omit<DatabaseConnection, 'id'>) => void;
  searchQuery: string;
}

export const Databases: React.FC<DatabasesProps> = ({ databases, onAdd, searchQuery }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<DatabaseConnection['type']>('postgres');
  const [count, setCount] = useState("1000");

  const handleAdd = () => {
    if (!name) return alert("Enter database name");
    onAdd({ name, type, status: 'connected', recordCount: parseInt(count) || 0 });
    alert("Database connection established.");
    setName("");
  };

  const filteredDbs = databases.filter(db => 
    db.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    db.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lead Infrastructure</h1>
          <p className="text-gray-500 text-sm">Centralized database routing for high-scale campaigns.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Register External Hub</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Protocol Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm font-bold focus:ring-4 focus:ring-blue-500/5 transition-all outline-none">
                  <option value="postgres">PostgreSQL</option>
                  <option value="mysql">MySQL</option>
                  <option value="firebase">Firebase Pro</option>
                  <option value="csv">CSV Engine</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alias Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g., Q4 Leads Main" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm font-bold focus:ring-4 focus:ring-blue-500/5 transition-all outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Row Count</label>
              <input value={count} onChange={(e) => setCount(e.target.value)} type="number" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm font-bold focus:ring-4 focus:ring-blue-500/5 transition-all outline-none" />
            </div>
            <button onClick={handleAdd} className="w-full sm:w-auto px-10 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
              <Plus size={20} /> Deploy Source
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredDbs.map((db) => (
              <div key={db.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 hover:shadow-2xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"><Database size={24} /></div>
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest">Connected</span>
                </div>
                <h4 className="font-black text-gray-900 text-lg tracking-tight truncate">{db.name}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">{db.type} Architecture</p>
                <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                  <div>
                    <p className="text-2xl font-black text-gray-900">{db.recordCount.toLocaleString()}</p>
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Active Records</p>
                  </div>
                  <button className="p-3 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><ExternalLink size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden h-fit lg:sticky lg:top-8">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16"></div>
           <div>
             <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2"><ShieldCheck size={16} /> Data Security</h4>
             <p className="text-xs text-gray-400 leading-relaxed font-medium mb-10">
               Connections are encrypted using TLS 1.3 and credentials are never stored in plaintext on our servers.
             </p>
           </div>
           <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
             Audit logs
           </button>
        </div>
      </div>
    </div>
  );
};
