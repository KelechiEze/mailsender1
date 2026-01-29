
import React from 'react';
import { Search, Filter, ArrowUpRight, CheckCircle2, XCircle, Clock } from 'lucide-react';

const logs = [
  { id: '1', recipient: 'sarah.jones@example.com', status: 'sent', smtp: 'Marketing Pro', date: 'Oct 28, 2024 14:22', opened: true },
  { id: '2', recipient: 'mike.ross@pearson.com', status: 'sent', smtp: 'Marketing Pro', date: 'Oct 28, 2024 14:21', opened: false },
  { id: '3', recipient: 'jane.doe@startup.io', status: 'failed', smtp: 'Help Center', date: 'Oct 28, 2024 14:20', opened: false, error: 'Recipient address rejected' },
  { id: '4', recipient: 'alex.hales@cricket.uk', status: 'sent', smtp: 'Marketing Pro', date: 'Oct 28, 2024 14:18', opened: true },
  { id: '5', recipient: 'robert.deniro@actors.com', status: 'pending', smtp: 'Outreach', date: 'Oct 28, 2024 14:15', opened: false },
  { id: '6', recipient: 'elizabeth.olsen@marvel.com', status: 'sent', smtp: 'Marketing Pro', date: 'Oct 28, 2024 14:12', opened: true },
  { id: '7', recipient: 'steve.jobs@apple.com', status: 'failed', smtp: 'Marketing Pro', date: 'Oct 28, 2024 14:10', opened: false, error: 'Connection timeout' },
  { id: '8', recipient: 'bill.gates@microsoft.com', status: 'sent', smtp: 'Help Center', date: 'Oct 28, 2024 14:05', opened: false },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'sent':
      return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest bg-green-50 text-green-700"><CheckCircle2 size={10} /> Sent</span>;
    case 'failed':
      return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest bg-red-50 text-red-700"><XCircle size={10} /> Failed</span>;
    default:
      return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest bg-amber-50 text-amber-700"><Clock size={10} /> Pending</span>;
  }
};

export const EmailLogs: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-400 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Delivery Logs</h1>
          <p className="text-gray-500 text-sm">Real-time status tracking for dispatched emails.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search recipients..."
              className="bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all w-full md:w-64 font-medium"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 shrink-0">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recipient</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">SMTP Route</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Open Event</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-black text-gray-900 truncate max-w-[200px] tracking-tight">{log.recipient}</span>
                      {log.error && <span className="text-[9px] text-red-500 font-bold uppercase tracking-wide">{log.error}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={log.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{log.smtp}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400">
                    {log.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      {log.opened ? (
                        <span className="flex items-center gap-1 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                          <ArrowUpRight size={14} className="animate-pulse" /> Read
                        </span>
                      ) : (
                        <span className="text-gray-300 font-black text-[10px] uppercase tracking-widest">Unread</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Audit Trail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Showing 8 results in this window</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-300 cursor-not-allowed">Back</button>
            <button className="px-4 py-1.5 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 transition-all active:scale-95 shadow-sm">Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
};
