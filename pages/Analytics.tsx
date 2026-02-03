
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { Download, Calendar, Filter, Share2, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const conversionData = [
  { name: 'Mon', rate: 2.5 },
  { name: 'Tue', rate: 3.8 },
  { name: 'Wed', rate: 3.2 },
  { name: 'Thu', rate: 4.5 },
  { name: 'Fri', rate: 5.1 },
  { name: 'Sat', rate: 2.1 },
  { name: 'Sun', rate: 1.8 },
];

const deviceData = [
  { name: 'Mobile', value: 65, color: '#2563EB' },
  { name: 'Desktop', value: 30, color: '#10B981' },
  { name: 'Tablet', value: 5, color: '#F59E0B' },
];

export const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState("Oct 1 - Oct 31");
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['All Traffic']);

  const dateOptions = ["Last 7 Days", "Last 30 Days", "This Month", "Last Quarter"];
  const filterOptions = ["All Traffic", "SMTP Cluster A", "Direct Sends", "Automations"];

  const toggleFilter = (f: string) => {
    if (activeFilters.includes(f)) {
      setActiveFilters(activeFilters.filter(item => item !== f));
    } else {
      setActiveFilters([...activeFilters, f]);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Advanced Analytics</h1>
          <p className="text-gray-500 text-sm">Real-time performance metrics and delivery audits.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date Picker Button */}
          <div className="relative">
            <button 
              onClick={() => { setShowDateMenu(!showDateMenu); setShowFilterMenu(false); }}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${showDateMenu ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'}`}
            >
              <Calendar size={14} /> {dateRange} <ChevronDown size={14} className={`transition-transform ${showDateMenu ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showDateMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 10 }} 
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50"
                >
                  {dateOptions.map(opt => (
                    <button 
                      key={opt} 
                      onClick={() => { setDateRange(opt); setShowDateMenu(false); }} 
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button 
              onClick={() => { setShowFilterMenu(!showFilterMenu); setShowDateMenu(false); }}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${showFilterMenu ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'}`}
            >
              <Filter size={14} /> Filter <span className="bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]">{activeFilters.length}</span>
            </button>
            <AnimatePresence>
              {showFilterMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 10 }} 
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50"
                >
                  {filterOptions.map(opt => (
                    <button 
                      key={opt} 
                      onClick={() => toggleFilter(opt)} 
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                    >
                      {opt} {activeFilters.includes(opt) && <CheckCircle2 size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-8 bg-gray-200 mx-2"></div>
          <button className="flex items-center gap-3 px-6 py-3 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest text-white hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Open Rate</p>
          <div className="flex items-end gap-3"><h2 className="text-4xl font-black text-gray-900 tracking-tight">42.8%</h2><span className="text-green-500 text-xs font-black pb-1">+5.2%</span></div>
          <div className="mt-6 w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 w-[42.8%] shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div></div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Click-Through</p>
          <div className="flex items-end gap-3"><h2 className="text-4xl font-black text-gray-900 tracking-tight">12.4%</h2><span className="text-red-500 text-xs font-black pb-1">-1.1%</span></div>
          <div className="mt-6 w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[12.4%] shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div></div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bounce Rate</p>
          <div className="flex items-end gap-3"><h2 className="text-4xl font-black text-gray-900 tracking-tight">0.2%</h2><span className="text-green-500 text-xs font-black pb-1">-0.05%</span></div>
          <div className="mt-6 w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[2%] shadow-[0_0_10px_rgba(245,158,11,0.4)]"></div></div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Attributed ROI</p>
          <div className="flex items-end gap-3"><h2 className="text-4xl font-black text-gray-900 tracking-tight">$12.8k</h2><span className="text-green-500 text-xs font-black pb-1">+18%</span></div>
          <div className="mt-6 w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 w-[60%] shadow-[0_0_10px_rgba(79,70,229,0.4)]"></div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10"><h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">Packet Transmission Pulse</h3></div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 900}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 900}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', 
                    fontWeight: 900,
                    backgroundColor: '#ffffff',
                    color: '#111827'
                  }} 
                />
                <Line type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={5} dot={{r: 6, fill: '#2563EB', strokeWidth: 3, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-10"><h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">Endpoint Distribution</h3></div>
           <div className="flex items-center h-80">
             <div className="flex-1 h-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={deviceData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                     {deviceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{
                       borderRadius: '20px', 
                       border: 'none', 
                       boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', 
                       fontWeight: 900,
                       backgroundColor: '#ffffff',
                       color: '#111827'
                     }} 
                   />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="w-40 space-y-6">
               {deviceData.map((d, i) => (<div key={i} className="space-y-1"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div><span className="text-xs font-black text-gray-800 uppercase tracking-widest">{d.value}%</span></div><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{d.name}</p></div>))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
