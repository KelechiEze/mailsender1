
import React from 'react';
import { 
  Users, 
  Send, 
  MousePointer2, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ShieldCheck,
  Globe,
  Zap,
  Clock,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface DashboardProps {
  searchQuery: string;
}

const data = [
  { name: 'Mon', sent: 4000, opens: 2400 },
  { name: 'Tue', sent: 3000, opens: 1398 },
  { name: 'Wed', sent: 2000, opens: 9800 },
  { name: 'Thu', sent: 2780, opens: 3908 },
  { name: 'Fri', sent: 1890, opens: 4800 },
  { name: 'Sat', sent: 2390, opens: 3800 },
  { name: 'Sun', sent: 3490, opens: 4300 },
];

const activityLogs = [
  { id: 1, user: 'Alex T.', action: 'Broadcasted Q4 Newsletter', time: '2m ago', icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 2, user: 'Node Cluster', action: 'Handshake successful', time: '5m ago', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 3, user: 'System', action: 'Database sync complete', time: '12m ago', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 4, user: 'Admin', action: 'Updated SMTP Profile', time: '1h ago', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
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

export const Dashboard: React.FC<DashboardProps> = ({ searchQuery }) => {
  return (
    <div className="max-w-[1800px] mx-auto pb-8">
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6 md:space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">Enterprise Analytics</h1>
              <p className="text-gray-500 text-sm">Real-time pulse of your delivery network.</p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button className="px-3 md:px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs md:text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                Generate Audit
              </button>
              <button 
                onClick={() => window.location.hash = '/compose'}
                className="px-5 py-2.5 bg-blue-600 rounded-xl text-xs md:text-sm font-black text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 active:scale-95"
              >
                <Zap size={16} /> New Campaign
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard title="Sent Today" value="12,840" change="+12.5%" isPositive={true} icon={Send} />
            <StatCard title="Total Reach" value="45.2k" change="+8.2%" isPositive={true} icon={Users} />
            <StatCard title="Avg Open Rate" value="24.8%" change="-2.1%" isPositive={false} icon={MousePointer2} />
            <StatCard title="Bounce Rate" value="1.4%" change="-0.5%" isPositive={true} icon={AlertCircle} />
          </div>

          <div className="bg-white p-4 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
                    <TrendingUp size={20} />
                 </div>
                 <div>
                   <h3 className="font-black text-gray-900 uppercase tracking-widest text-[11px]">Traffic Flux Control</h3>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Node Performance Index</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Live View
                </span>
              </div>
            </div>
            <div className="h-64 md:h-96 w-full">
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
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 700}} />
                  <Area type="monotone" dataKey="sent" stroke="#2563EB" strokeWidth={4} fillOpacity={1} fill="url(#colorSent)" />
                  <Area type="monotone" dataKey="opens" stroke="#10B981" strokeWidth={4} fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Dashboard Right Utility Sidebar */}
        <div className="w-full xl:w-80 shrink-0 space-y-6">
          {/* Health Section */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity size={14} className="text-blue-500" /> Infrastructure Health
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  <span className="text-xs font-bold text-gray-700">SMTP Cluster A</span>
                </div>
                <span className="text-[10px] font-black text-green-600 uppercase">Stable</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  <span className="text-xs font-bold text-gray-700">Database Sync</span>
                </div>
                <span className="text-[10px] font-black text-green-600 uppercase">Synced</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                  <span className="text-xs font-bold text-gray-700">API Latency</span>
                </div>
                <span className="text-[10px] font-black text-blue-600 uppercase">24ms</span>
              </div>
            </div>
          </div>

          {/* Activity Stream */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} className="text-blue-500" /> Activity Stream
              </h3>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto pr-1">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex gap-4 group cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl ${log.bg} ${log.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                    <log.icon size={18} />
                  </div>
                  <div className="min-w-0 border-b border-gray-50 pb-4 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-[11px] font-black text-gray-900 leading-tight">{log.user}</p>
                      <span className="text-[9px] text-gray-400 font-bold uppercase shrink-0">{log.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed mt-1 truncate">{log.action}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.location.hash = '/logs'}
              className="mt-6 w-full py-3 bg-gray-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-dashed border-gray-200 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              View All Logs <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
