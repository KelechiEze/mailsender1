
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Eye, 
  X, 
  Save, 
  Zap, 
  Smartphone,
  Monitor,
  Mail,
  Database,
  FileText,
  Layers,
  ChevronRight,
  Maximize2,
  Minimize2,
  ChevronDown,
  Code,
  Loader2,
  CheckCircle2,
  Filter,
  Plus,
  Trash2,
  Terminal,
  Settings2,
  Database as DatabaseIcon,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SMTPConfig, DatabaseConnection, EmailLog, FilterCondition } from '../types';

const OPERATORS = {
  firebase: ['==', '!=', '<', '<=', '>', '>=', 'array-contains', 'in', 'not-in'],
  sql: ['=', '!=', '<', '<=', '>', '>=', 'LIKE', 'IN'],
  mongodb: ['$eq', '$ne', '$gt', '$lt', '$gte', '$lte', '$in', '$regex'],
  supabase: ['eq', 'neq', 'gt', 'lt', 'gte', 'lte', 'like', 'ilike', 'is', 'in'],
  csv: ['Equals', 'Contains', 'Starts With', 'Ends With']
};

interface ComposeProps {
  smtpProfiles: SMTPConfig[];
  databases: DatabaseConnection[];
  onAddLogs: (logs: EmailLog[]) => void;
  initialHtml?: string;
}

const DEFAULT_TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MailPro Responsive Template</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', Helvetica, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 20px 0;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" style="padding: 40px; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">MAILPRO HUB</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 22px; font-weight: 800; line-height: 1.2;">Deployment Protocol: {{first_name}}</h2>
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Your high-frequency delivery node for <strong>{{company}}</strong> has been synchronized. Our infrastructure has detected a significant uptick in edge-node delivery speed.
              </p>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; border-radius: 16px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="margin: 0; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Infrastructure Status</p>
                    <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: 900; color: #2563EB;">99.9% <span style="font-size: 14px; color: #10b981; font-weight: 700;">Operational</span></p>
                  </td>
                </tr>
              </table>
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 30px 0;">
                Extended analysis indicates that your target demographics are responding positively to the new latency optimizations. We recommend scaling your current cluster to handle the projected Q4 surge.
              </p>
              <div style="padding-top: 30px; text-align: center;">
                <a href="#" style="background-color: #2563EB; color: #ffffff; padding: 18px 32px; border-radius: 14px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block;">Deploy Dashboard</a>
              </div>
              <div style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #f1f5f9; text-align: center;">
                <p style="color: #94a3b8; font-size: 12px;">Sent by MailPro Enterprise Infrastructure<br/>123 Silicon Alley, Node 7, Cloud City</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const Compose: React.FC<ComposeProps> = ({ smtpProfiles, databases, onAddLogs, initialHtml }) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("Exclusive: Your Delivery Protocol is Ready ⚡");
  const [content, setContent] = useState(initialHtml || DEFAULT_TEMPLATE);
  const [selectedSmtp, setSelectedSmtp] = useState(smtpProfiles[0]?.id || "");
  const [selectedDb, setSelectedDb] = useState(databases[0]?.id || "");
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendStep, setSendStep] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialHtml) {
      setContent(initialHtml);
    }
  }, [initialHtml]);

  const handleInsertTag = (tag: string) => {
    const tagText = `{{${tag}}}`;
    if (textAreaRef.current) {
      const start = textAreaRef.current.selectionStart;
      const end = textAreaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + tagText + content.substring(end);
      setContent(newContent);
    }
  };

  const currentDb = databases.find(d => d.id === selectedDb);
  const dbType = currentDb?.type || 'postgres';

  const addCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: currentDb?.columnHeaders?.[0] || 'status',
      operator: dbType === 'mongodb' ? '$eq' : (dbType === 'firebase' ? '==' : '='),
      value: '',
      logic: filterConditions.length > 0 ? 'AND' : undefined
    };
    setFilterConditions([...filterConditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    setFilterConditions(filterConditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, updates: Partial<FilterCondition>) => {
    setFilterConditions(filterConditions.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const getSqlPreview = () => {
    if (filterConditions.length === 0) return "";
    const where = filterConditions.map((c, i) => {
      const logic = i > 0 ? ` ${c.logic || 'AND'} ` : "";
      const val = isNaN(Number(c.value)) ? `'${c.value}'` : c.value;
      return `${logic}${c.field} ${c.operator} ${val}`;
    }).join("");
    return `WHERE ${where}`;
  };

  const getMongoPreview = () => {
    if (filterConditions.length === 0) return "{}";
    const query: any = {};
    filterConditions.forEach(c => {
      query[c.field] = { [c.operator]: isNaN(Number(c.value)) ? c.value : Number(c.value) };
    });
    return JSON.stringify(query, null, 2);
  };

  const getSupabasePreview = () => {
    let code = `.supabase\n  .from('${selectedCollection || 'users'}')\n  .select('*')`;
    filterConditions.forEach(c => {
      const val = isNaN(Number(c.value)) ? `'${c.value}'` : c.value;
      code += `\n  .${c.operator}('${c.field}', ${val})`;
    });
    return code;
  };

  const getOperators = () => {
    if (dbType === 'mysql' || dbType === 'postgres') return OPERATORS.sql;
    if (dbType === 'mongodb') return OPERATORS.mongodb;
    if (dbType === 'firebase') return OPERATORS.firebase;
    if (dbType === 'supabase') return OPERATORS.supabase;
    return OPERATORS.csv;
  };

  const handleSend = async () => {
    if (isSending) return;
    
    setIsSending(true);
    setSendStep("Initializing Node...");
    
    // Simulate campaign sending process
    await new Promise(r => setTimeout(r, 600));
    
    if (filterConditions.length > 0) {
      setSendStep(`Applying ${dbType.toUpperCase()} Filters...`);
      await new Promise(r => setTimeout(r, 1000));
    }

    setSendStep("Validating SMTP Handshake...");
    await new Promise(r => setTimeout(r, 800));
    setSendStep("Broadcasting Packets...");
    await new Promise(r => setTimeout(r, 1200));
    setSendStep("Finalizing Batch Delivery...");
    await new Promise(r => setTimeout(r, 400));

    // Generate Dynamic Logs based on selection
    const smtpName = smtpProfiles.find(p => p.id === selectedSmtp)?.name || "Default Gateway";
    const dbName = databases.find(d => d.id === selectedDb)?.name || "General List";
    
    const recipients = [
      'sarah.jones@example.com',
      'mike.ross@pearson.com',
      'jane.doe@startup.io',
      'alex.hales@cricket.uk',
      'robert.deniro@actors.com'
    ];

    const newLogs: EmailLog[] = recipients.map((email, idx) => ({
      id: `${Date.now()}-${idx}`,
      recipient: email,
      status: idx === 2 ? 'failed' : 'sent',
      smtpUsed: smtpName,
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      opened: idx % 2 === 0,
      error: idx === 2 ? 'Recipient address rejected' : undefined
    }));
    
    onAddLogs(newLogs);
    setIsSending(false);
    navigate('/logs');
  };

  const renderIframe = (html: string) => {
    let processed = html
      .replace(/{{first_name}}/g, 'Alex')
      .replace(/{{company}}/g, 'MailPro Corp');
    
    const resetStyles = `
      <style>
        * { box-sizing: border-box; }
        html, body { 
          margin: 0 !important; 
          padding: 0 !important; 
          overflow-x: hidden !important; 
          width: 100% !important; 
          height: auto !important;
          min-height: 100%;
          -webkit-text-size-adjust: 100%; 
          -ms-text-size-adjust: 100%; 
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        img { 
          max-width: 100% !important; 
          height: auto !important; 
          display: block !important; 
        }
        table { 
          width: 100% !important; 
          max-width: 100% !important; 
          min-width: 0 !important;
          table-layout: fixed !important; 
          border-collapse: collapse !important; 
        }
        td { 
          word-wrap: break-word !important; 
          word-break: break-word !important;
        }
        .container { 
          width: 100% !important; 
          max-width: 600px !important; 
          margin: 0 auto !important; 
        }
        @media only screen and (max-width: 480px) {
          .content-padding { padding: 20px !important; }
        }
      </style>
    `;

    if (processed.includes('<head>')) {
      processed = processed.replace('<head>', `<head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">${resetStyles}`);
    } else {
      processed = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">${resetStyles}</head><body>${processed}</body></html>`;
    }
    
    return (
      <iframe
        title="Template Preview"
        className="w-full h-full border-none bg-white block"
        srcDoc={processed}
        style={{ overflowX: 'hidden', overflowY: 'auto' }}
      />
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-20 px-2 sm:px-4 relative">
      <AnimatePresence>
        {isFullscreenPreview && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-gray-950/98 backdrop-blur-2xl flex flex-col"
          >
            <div className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-white/5 shrink-0">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20"><Eye size={20} /></div>
                 <div>
                   <h3 className="text-white font-black text-sm uppercase tracking-widest">Full-Stack Preview</h3>
                   <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Validating Mobile & Desktop Layouts</p>
                 </div>
               </div>
               <div className="flex items-center gap-6">
                 <div className="bg-white/5 p-1.5 rounded-2xl flex items-center gap-1 border border-white/10">
                   <button onClick={() => setPreviewDevice('desktop')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${previewDevice === 'desktop' ? 'bg-white text-gray-900 shadow-xl' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Monitor size={14} /> Desktop</button>
                   <button onClick={() => setPreviewDevice('mobile')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${previewDevice === 'mobile' ? 'bg-white text-gray-900 shadow-xl' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Smartphone size={14} /> Mobile</button>
                 </div>
                 <button onClick={() => setIsFullscreenPreview(false)} className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-all hover:scale-105 shadow-xl shadow-red-500/20"><Minimize2 size={24} /></button>
               </div>
            </div>
            <div className="flex-1 bg-transparent overflow-hidden flex items-center justify-center p-4 md:p-12">
               <div className={`mx-auto transition-all duration-700 shadow-[0_80px_100px_-20px_rgba(0,0,0,0.8)] bg-white relative ${
                 previewDevice === 'mobile' 
                 ? 'w-[375px] h-[780px] border-[14px] border-gray-900 rounded-[3.5rem] overflow-hidden' 
                 : 'w-full max-w-[1200px] h-full rounded-[2.5rem] overflow-hidden'
               }`}>
                  <div className="w-full h-full">
                    {renderIframe(content)}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-xl py-4">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">Campaign Builder</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isSending ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></span> {isSending ? sendStep : 'Active Node: Q4-East'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              disabled={isSending}
              onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1000); }} 
              className="flex-1 md:flex-none px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin text-blue-600" /> : <Save size={18} />} Draft
            </button>
            <button 
              disabled={isSending}
              onClick={handleSend}
              className={`flex-1 md:flex-none px-8 py-3 text-white text-sm font-black rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:cursor-not-allowed ${isSending ? 'bg-blue-400 shadow-none' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}
            >
              {isSending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Broadcasting...
                </>
              ) : (
                <>
                  <Send size={18} /> Send Campaign
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Mail size={12} className="text-blue-500" /> SMTP Routing</label>
                <div className="relative"><select disabled={isSending} value={selectedSmtp} onChange={(e) => setSelectedSmtp(e.target.value)} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 outline-none appearance-none transition-all disabled:opacity-50">{smtpProfiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /></div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><Database size={12} className="text-blue-500" /> List Source</label>
                <div className="relative"><select disabled={isSending} value={selectedDb} onChange={(e) => { setSelectedDb(e.target.value); setFilterConditions([]); }} className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 outline-none appearance-none transition-all disabled:opacity-50">{databases.map(db => <option key={db.id} value={db.id}>{db.name}</option>)}</select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /></div>
              </div>
            </div>

            <div className="bg-gray-50/50 rounded-[2rem] border border-gray-100 p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                    <Filter size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                      {dbType === 'firebase' ? 'Firestore Query Builder' : 
                       dbType === 'mongodb' ? 'MongoDB Query Builder' :
                       dbType === 'supabase' ? 'Supabase Filter Builder' :
                       (dbType === 'mysql' || dbType === 'postgres') ? 'SQL WHERE Clause Builder' : 'CSV Keyword Filter'}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Construct dynamic recipient filters</p>
                  </div>
                </div>
                <button 
                  onClick={addCondition}
                  disabled={isSending}
                  className="px-4 py-2 bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm"
                >
                  <Plus size={14} /> Add Condition
                </button>
              </div>

              {(dbType === 'firebase' || dbType === 'mongodb' || dbType === 'mysql' || dbType === 'postgres' || dbType === 'supabase') && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Target {dbType === 'mongodb' || dbType === 'firebase' ? 'Collection' : 'Table'}</label>
                  <div className="relative">
                    <select 
                      value={selectedCollection} 
                      onChange={(e) => setSelectedCollection(e.target.value)}
                      className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold text-gray-800 outline-none appearance-none"
                    >
                      <option value="">Select {dbType === 'mongodb' || dbType === 'firebase' ? 'Collection' : 'Table'}...</option>
                      <option value="users">users</option>
                      <option value="customers">customers</option>
                      <option value="leads">leads</option>
                      <option value="subscribers">subscribers</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filterConditions.map((condition, index) => (
                    <motion.div 
                      key={condition.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col md:flex-row items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group"
                    >
                      {index > 0 && (
                        <div className="md:w-20 shrink-0">
                          <select 
                            value={condition.logic} 
                            onChange={(e) => updateCondition(condition.id, { logic: e.target.value as any })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-lg px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 outline-none"
                          >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                          </select>
                        </div>
                      )}
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                        <div className="relative">
                          <select 
                            value={condition.field} 
                            onChange={(e) => updateCondition(condition.id, { field: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-800 outline-none appearance-none"
                          >
                            {(currentDb?.columnHeaders || ['id', 'email', 'first_name', 'last_name', 'status', 'created_at']).map(f => (
                              <option key={f} value={f}>{f}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                        </div>

                        <div className="relative">
                          <select 
                            value={condition.operator} 
                            onChange={(e) => updateCondition(condition.id, { operator: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-800 outline-none appearance-none"
                          >
                            {getOperators().map(op => (
                              <option key={op} value={op}>{op}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                        </div>

                        <input 
                          type="text" 
                          value={condition.value} 
                          onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                          placeholder="Value..."
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/10"
                        />
                      </div>

                      <button 
                        onClick={() => removeCondition(condition.id)}
                        className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filterConditions.length === 0 && (
                  <div className="py-10 border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center text-gray-400">
                    <Filter size={32} className="mb-3 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-widest">No active filters</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest mt-1">Click "Add Condition" to filter recipients</p>
                  </div>
                )}
              </div>

              {filterConditions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-900 rounded-2xl p-6 space-y-3"
                >
                  <div className="flex items-center gap-2 text-blue-400">
                    <Terminal size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Query Preview</span>
                  </div>
                  <pre className="text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {dbType === 'mongodb' ? getMongoPreview() : 
                     dbType === 'supabase' ? getSupabasePreview() :
                     (dbType === 'mysql' || dbType === 'postgres') ? getSqlPreview() : 
                     `Filtering CSV by ${filterConditions.length} conditions...`}
                  </pre>
                </motion.div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1"><FileText size={12} className="text-blue-500" /> Subject Header</label>
              <input disabled={isSending} type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-lg font-bold text-gray-900 outline-none focus:ring-4 focus:ring-blue-500/5 placeholder:text-gray-300 transition-all disabled:opacity-50" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 min-h-[850px]">
            <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                <div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-xl"><Code size={16} className="text-blue-600" /></div><span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Source</span></div>
              </div>
              <textarea disabled={isSending} ref={textAreaRef} value={content} onChange={(e) => setContent(e.target.value)} className="flex-1 p-8 text-sm font-mono text-blue-900 focus:outline-none resize-none bg-white leading-relaxed disabled:opacity-50" spellCheck={false} />
            </div>

            <div className="flex-1 bg-gray-900 rounded-[2.5rem] shadow-2xl flex flex-col border-[12px] border-gray-900 group relative overflow-hidden">
              <div className="absolute top-4 right-4 z-20">
                <button onClick={() => setIsFullscreenPreview(true)} className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-blue-600 transition-all shadow-xl group/btn flex items-center gap-2 active:scale-95">
                  <Maximize2 size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity">Full Review</span>
                </button>
              </div>
              <div className="h-14 bg-gray-800/50 flex items-center justify-between px-8 border-b border-gray-700/50 shrink-0">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /><div className="w-2.5 h-2.5 rounded-full bg-green-500" /></div>
                <div className="flex items-center gap-4">
                   <button onClick={() => setPreviewDevice('desktop')} className={`p-2 rounded-xl transition-all ${previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><Monitor size={16} /></button>
                   <button onClick={() => setPreviewDevice('mobile')} className={`p-2 rounded-xl transition-all ${previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><Smartphone size={16} /></button>
                </div>
              </div>
              <div className="flex-1 bg-gray-100 overflow-hidden relative">
                <div className={`h-full mx-auto transition-all duration-500 overflow-x-hidden ${previewDevice === 'mobile' ? 'max-w-[320px] shadow-2xl' : 'max-w-full'}`}>
                   {renderIframe(content)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="xl:sticky xl:top-32 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 text-[11px] uppercase tracking-widest mb-6 flex items-center gap-2"><Layers size={14} className="text-blue-500" /> Merge Tags</h3>
              <div className="grid grid-cols-1 gap-2">
                {['first_name', 'last_name', 'email', 'company'].map(tag => (
                  <button disabled={isSending} key={tag} onClick={() => handleInsertTag(tag)} className="group px-4 py-3 bg-gray-50 hover:bg-blue-600 rounded-2xl border border-gray-100 text-[10px] font-black text-gray-500 hover:text-white transition-all text-left flex items-center justify-between disabled:opacity-50">
                    {tag.toUpperCase()}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
