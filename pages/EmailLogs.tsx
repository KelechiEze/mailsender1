
import React from 'react';
import { Search, Filter, ArrowUpRight, CheckCircle2, XCircle, Clock, Inbox } from 'lucide-react';
import { EmailLog } from '../types';

interface EmailLogsProps {
  searchQuery: string;
  logs: EmailLog[];
}

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

export const EmailLogs: React.FC<EmailLogsProps> = ({ searchQuery, logs }) => {
  const filteredLogs = logs.filter(l => 
    l.recipient.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (l.error && l.error.toLowerCase().includes(searchQuery.toLowerCase())) ||
    l.smtpUsed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-400 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Delivery Registry</h1>
          <p className="text-gray-500 text-sm">Real-time trace of all outgoing packets.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {filteredLogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recipient Identity</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Packet Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">SMTP Cluster</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Execution Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Engagement</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 tracking-tight">{log.recipient}</span>
                        {log.error && <span className="text-[9px] text-red-500 font-bold uppercase mt-0.5">{log.error}</span>}
                      </div>
                    </td>
                    <td className="px-8 py-5"><StatusBadge status={log.status} /></td>
                    <td className="px-8 py-5"><span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{log.smtpUsed}</span></td>
                    <td className="px-8 py-5 text-xs font-bold text-gray-400">{log.date}</td>
                    <td className="px-8 py-5 text-center">
                      {log.opened ? (
                        <span className="flex items-center justify-center gap-1.5 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                          <ArrowUpRight size={14} className="animate-pulse" /> Delivered & Read
                        </span>
                      ) : (
                        <span className="text-gray-300 font-black text-[10px] uppercase tracking-widest">Unopened</span>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Full Trace</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-32 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-300">
               <Inbox size={32} />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">No matching logs</h3>
              <p className="text-xs text-gray-400 font-medium tracking-tight">
                {logs.length === 0 ? "Dispatch your first campaign to see delivery traces here." : "Refine your search parameters."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
