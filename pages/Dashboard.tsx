
import React from 'react';
import { 
  Users, 
  Send, 
  MousePointer2, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const data = [
  { name: 'Mon', sent: 4000, opens: 2400 },
  { name: 'Tue', sent: 3000, opens: 1398 },
  { name: 'Wed', sent: 2000, opens: 9800 },
  { name: 'Thu', sent: 2780, opens: 3908 },
  { name: 'Fri', sent: 1890, opens: 4800 },
  { name: 'Sat', sent: 2390, opens: 3800 },
  { name: 'Sun', sent: 3490, opens: 4300 },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}> = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2.5 bg-blue-50 rounded-xl shrink-0">
        <Icon className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div className={`flex items-center text-[10px] md:text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4 mr-0.5" />}
        {change}
      </div>
    </div>
    <h3 className="text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-widest">{title}</h3>
    <p className="text-xl md:text-2xl font-black text-gray-900 mt-1">{value}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Platform Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back, Alex. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button className="px-3 md:px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs md:text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-xl text-xs md:text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
            <Send size={16} /> <span className="hidden xs:inline">New Campaign</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Sent Today" 
          value="12,840" 
          change="+12.5%" 
          isPositive={true} 
          icon={Send} 
        />
        <StatCard 
          title="Total Reach" 
          value="45.2k" 
          change="+8.2%" 
          isPositive={true} 
          icon={Users} 
        />
        <StatCard 
          title="Avg Open Rate" 
          value="24.8%" 
          change="-2.1%" 
          isPositive={false} 
          icon={MousePointer2} 
        />
        <StatCard 
          title="Bounce Rate" 
          value="1.4%" 
          change="-0.5%" 
          isPositive={true} 
          icon={AlertCircle} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-4 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" />
              Delivery Engine Stats
            </h3>
            <select className="bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold px-3 py-1.5 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 md:h-80 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 700}}
                />
                <Area type="monotone" dataKey="sent" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorSent)" />
                <Area type="monotone" dataKey="opens" stroke="#10B981" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] md:text-xs mb-8 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-500" />
            Active Sources
          </h3>
          <div className="space-y-6 flex-1 overflow-y-auto pr-1">
            {[
              { name: 'Firebase Pro', type: 'NoSQL DB', count: '12.4k', color: 'bg-orange-500' },
              { name: 'Marketing CSV', type: 'Local File', count: '5.2k', color: 'bg-green-500' },
              { name: 'Shopify Store', type: 'REST API', count: '2.1k', color: 'bg-blue-500' },
              { name: 'PostgreSQL Main', type: 'Relational', count: '45k', color: 'bg-indigo-500' }
            ].map((source, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${source.color} flex items-center justify-center text-white font-black text-[10px] transition-transform group-hover:scale-110`}>
                    {source.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-gray-900 truncate tracking-tight">{source.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{source.type}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-gray-900">{source.count}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Rows</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.hash = '/databases'} className="w-full mt-8 py-3 bg-gray-50 text-blue-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-blue-100 transition-colors border border-dashed border-gray-200 active:scale-95">
            Manage Sources
          </button>
        </div>
      </div>
    </div>
  );
};
