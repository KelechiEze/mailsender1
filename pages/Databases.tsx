
import React, { useState, useRef } from 'react';
import { Database, Plus, Search, AlertTriangle, ExternalLink, ShieldCheck, Upload, X, FileSpreadsheet, Table as TableIcon, Trash2 } from 'lucide-react';
import { DatabaseConnection, DatabaseType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface DatabasesProps {
  databases: DatabaseConnection[];
  onAdd: (db: Omit<DatabaseConnection, 'id'>) => void;
  searchQuery: string;
}

export const Databases: React.FC<DatabasesProps> = ({ databases, onAdd, searchQuery }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<DatabaseType>('postgres');
  const [count, setCount] = useState("1000");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!name) return alert("Enter database name");
    
    const dbData: Omit<DatabaseConnection, 'id'> = { 
      name, 
      type, 
      status: 'connected', 
      recordCount: uploadedFile ? previewData.length : (parseInt(count) || 0),
      spreadsheetData: uploadedFile ? previewData : undefined,
      columnHeaders: uploadedFile ? headers : undefined
    };

    onAdd(dbData);
    alert("Database connection established.");
    setName("");
    setUploadedFile(null);
    setPreviewData([]);
    setHeaders([]);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Simulate parsing spreadsheet data
    const mockHeaders = ['first_name', 'last_name', 'email', 'company', 'status'];
    const mockData = Array.from({ length: 10 }).map((_, i) => ({
      first_name: `User${i}`,
      last_name: `Test${i}`,
      email: `user${i}@example.com`,
      company: `Company ${i}`,
      status: i % 2 === 0 ? 'Active' : 'Inactive'
    }));
    setHeaders(mockHeaders);
    setPreviewData(mockData);
    if (!name) setName(file.name.split('.')[0]);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const filteredDbs = databases.filter(db => 
    db.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    db.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSpreadsheet = type === 'csv' || type === 'excel' || type === 'google_sheets';

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
                  <option value="supabase">Supabase</option>
                  <option value="mongodb">MongoDB</option>
                  <option value="csv">CSV Upload</option>
                  <option value="excel">Excel (.xlsx)</option>
                  <option value="google_sheets">Google Sheets</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alias Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g., Q4 Leads Main" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm font-bold focus:ring-4 focus:ring-blue-500/5 transition-all outline-none" />
              </div>
            </div>

            {isSpreadsheet ? (
              <div className="space-y-4">
                <div 
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-gray-50 hover:bg-gray-100/50'}`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    accept=".csv,.xlsx,.xls"
                  />
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600">
                    <Upload size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Drop spreadsheet here</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">or click to browse files</p>
                  </div>
                </div>

                <AnimatePresence>
                  {uploadedFile && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between bg-blue-50 p-4 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                            <FileSpreadsheet size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{uploadedFile.name}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{previewData.length} Rows Detected</p>
                          </div>
                        </div>
                        <button onClick={() => { setUploadedFile(null); setPreviewData([]); }} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                          <TableIcon size={14} className="text-gray-400" />
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Data Preview</span>
                        </div>
                        <div className="overflow-x-auto max-h-60">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-gray-50/30">
                                {headers.map(h => (
                                  <th key={h} className="px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {previewData.slice(0, 5).map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-all">
                                  {headers.map(h => (
                                    <td key={h} className="px-4 py-3 text-xs font-medium text-gray-600 border-b border-gray-50">{row[h]}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {previewData.length > 5 && (
                          <div className="px-4 py-2 bg-gray-50/30 text-center">
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Showing first 5 of {previewData.length} rows</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Row Count</label>
                <input value={count} onChange={(e) => setCount(e.target.value)} type="number" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm font-bold focus:ring-4 focus:ring-blue-500/5 transition-all outline-none" />
              </div>
            )}

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
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">{db.type.replace('_', ' ')} Architecture</p>
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
