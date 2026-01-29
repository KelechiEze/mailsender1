
import React, { useState } from 'react';
import { Database, Plus, CheckCircle2, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { DatabaseConnection } from '../types';

interface DatabasesProps {
  databases: DatabaseConnection[];
  onAdd: (db: Omit<DatabaseConnection, 'id'>) => void;
}

export const Databases: React.FC<DatabasesProps> = ({ databases, onAdd }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<DatabaseConnection['type']>('postgres');
  const [count, setCount] = useState("1000");

  const handleAdd = () => {
    if (!name) return alert("Enter database name");
    onAdd({
      name,
      type,
      status: 'connected',
      recordCount: parseInt(count) || 0
    });
    alert("Database connected successfully!");
    setName("");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">External Sources</h1>
          <p className="text-gray-500">Connect your CRM or Database directly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-800">Connect New Source</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full bg-gray-50 border rounded-xl p-2.5">
                  <option value="postgres">PostgreSQL</option>
                  <option value="mysql">MySQL</option>
                  <option value="firebase">Firebase</option>
                  <option value="csv">CSV Upload</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Display Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Main Store DB" className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Estimated Record Count</label>
              <input value={count} onChange={(e) => setCount(e.target.value)} type="number" className="w-full bg-gray-50 border rounded-xl p-2.5 outline-none" />
            </div>
            <button onClick={handleAdd} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
              <Plus size={18} /> Connect Database
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {databases.map((db) => (
              <div key={db.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><Database size={20} /></div>
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
                </div>
                <h4 className="font-bold text-gray-900">{db.name}</h4>
                <p className="text-xs text-gray-400 mb-4 capitalize">{db.type} Server</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-black text-gray-900">{db.recordCount.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Contacts</p>
                  </div>
                  <button onClick={() => alert('Opening records view...')} className="p-2 text-gray-400 hover:text-blue-600"><ExternalLink size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
