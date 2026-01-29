
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { Download, Calendar, Filter, Share2 } from 'lucide-react';

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
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-500">Deep dive into your campaign performance metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">
            <Calendar size={14} /> Oct 1 - Oct 31
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">
            <Filter size={14} /> Filter
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 rounded-xl text-xs font-bold text-white hover:bg-blue-700 shadow-sm">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase mb-2">Total Open Rate</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-black text-gray-900">42.8%</h2>
            <span className="text-green-500 text-xs font-bold pb-1">+5.2%</span>
          </div>
          <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-[42.8%]"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase mb-2">Click Through Rate</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-black text-gray-900">12.4%</h2>
            <span className="text-red-500 text-xs font-bold pb-1">-1.1%</span>
          </div>
          <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[12.4%]"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase mb-2">Unsubscribe Rate</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-black text-gray-900">0.2%</h2>
            <span className="text-green-500 text-xs font-bold pb-1">-0.05%</span>
          </div>
          <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 w-[2%]"></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase mb-2">Revenue Generated</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-black text-gray-900">$12,840</h2>
            <span className="text-green-500 text-xs font-bold pb-1">+18.5%</span>
          </div>
          <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 w-[60%]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-900">Click Frequency Over Time</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">View Breakdown</button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={4} dot={{r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-900">Device Distribution</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              <Share2 size={12} /> Share Insights
            </button>
          </div>
          <div className="flex items-center h-80">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-40 space-y-6">
              {deviceData.map((d, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                    <span className="text-sm font-bold text-gray-800">{d.value}%</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{d.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
