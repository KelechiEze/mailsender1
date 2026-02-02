
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Type, 
  ChevronDown, 
  Eye, 
  X, 
  Save, 
  Zap, 
  CheckCircle,
  Code,
  Smartphone,
  Monitor,
  Mail,
  Database,
  FileText,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SMTPConfig, DatabaseConnection } from '../types';

interface ComposeProps {
  smtpProfiles: SMTPConfig[];
  databases: DatabaseConnection[];
}

export const Compose: React.FC<ComposeProps> = ({ smtpProfiles, databases }) => {
  const [subject, setSubject] = useState("Exclusive: Your Q4 Strategy is Inside 📈");
  const [content, setContent] = useState(`<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f4f7ff;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7ff; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 50px 40px; text-align: center; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">MAILPRO</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px; font-weight: 600; letter-spacing: 2px;">ENTERPRISE DELIVERY</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 50px 40px;">
              <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Hi {{first_name}}! 👋</h2>
              <p style="color: #4b5563; font-size: 17px; line-height: 28px; margin: 0 0 35px 0;">
                Welcome to the premium tier of <strong>{{company}}</strong>. Our advanced algorithms have processed your recent campaign data and generated this exclusive Q4 strategy report.
              </p>
              
              <div style="background-color: #f9fafb; border-radius: 16px; padding: 30px; margin-bottom: 35px; border: 1px solid #f3f4f6;">
                <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Key Metric</h3>
                <p style="margin: 0; font-size: 36px; font-weight: 900; color: #2563EB;">+245% <span style="font-size: 16px; color: #10b981; font-weight: 700;">Engagement Boost</span></p>
              </div>

              <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 40px;">
                <tr>
                  <td align="center" bgcolor="#2563EB" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
                    <a href="#" style="font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none; padding: 16px 35px; display: inline-block;">Unlock Strategy Portal</a>
                  </td>
                </tr>
              </table>
              <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 40px 0;">
              <p style="color: #9ca3af; font-size: 13px; line-height: 20px; text-align: center;">
                You're receiving this because you are a valued partner of {{company}}.<br>
                123 Enterprise Way, Tech City, CA 94103<br><br>
                <a href="#" style="color: #2563EB; text-decoration: none; font-weight: 600;">Unsubscribe</a> • <a href="#" style="color: #2563EB; text-decoration: none; font-weight: 600;">Preferences</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`);
  
  const [isHtmlMode, setIsHtmlMode] = useState(true);
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [selectedSmtp, setSelectedSmtp] = useState(smtpProfiles[0]?.id || "");
  const [selectedDb, setSelectedDb] = useState(databases[0]?.id || "");
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Sync selection if smtpProfiles change (newly added SMTP)
  useEffect(() => {
    if (!selectedSmtp && smtpProfiles.length > 0) {
      setSelectedSmtp(smtpProfiles[smtpProfiles.length - 1].id);
    }
  }, [smtpProfiles]);

  const handleInsertTag = (tag: string) => {
    const tagText = `{{${tag}}}`;
    if (textAreaRef.current) {
      const start = textAreaRef.current.selectionStart;
      const end = textAreaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + tagText + content.substring(end);
      setContent(newContent);
    }
  };

  const handleSend = () => {
    setShowProgress(true);
    let curr = 0;
    const interval = setInterval(() => {
      curr += 4;
      if (curr >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowProgress(false);
          setProgress(0);
          alert('Campaign Successfully Broadcasted!');
        }, 800);
      } else {
        setProgress(curr);
      }
    }, 100);
  };

  const renderIframe = (html: string) => {
    const processed = html
      .replace(/{{first_name}}/g, 'Alex')
      .replace(/{{company}}/g, 'MailPro Corp');
    return (
      <iframe
        title="Template Preview"
        className="w-full h-full min-h-[1200px] border-none bg-white"
        srcDoc={processed}
      />
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-20 px-2 sm:px-4">
      {/* Top Header Controls */}
      <div className="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-xl py-4">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">Campaign Builder</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
                Synced to Cloud
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1000); }}
              className="flex-1 md:flex-none px-6 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
              Draft
            </button>
            <button 
              onClick={handleSend}
              className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white text-sm font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95"
            >
              <Send size={18} /> Launch
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left: Settings & Editor */}
        <div className="xl:col-span-3 space-y-6">
          {/* Metadata Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Mail size={12} className="text-blue-500" /> Sending Gateway
                </label>
                <div className="relative group">
                  <select 
                    value={selectedSmtp}
                    onChange={(e) => setSelectedSmtp(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-100 group-hover:border-blue-200 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 outline-none appearance-none transition-all focus:ring-4 focus:ring-blue-500/5"
                  >
                    {smtpProfiles.map(p => <option key={p.id} value={p.id}>{p.name} ({p.email})</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Database size={12} className="text-blue-500" /> Recipient database
                </label>
                <div className="relative group">
                  <select 
                    value={selectedDb}
                    onChange={(e) => setSelectedDb(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-100 group-hover:border-blue-200 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 outline-none appearance-none transition-all focus:ring-4 focus:ring-blue-500/5"
                  >
                    {databases.map(db => <option key={db.id} value={db.id}>{db.name} ({db.recordCount.toLocaleString()} leads)</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <FileText size={12} className="text-blue-500" /> Subject Line
              </label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-5 text-lg font-bold text-gray-900 outline-none focus:ring-4 focus:ring-blue-500/5 placeholder:text-gray-300 transition-all"
                placeholder="Hook your audience with a subject..."
              />
            </div>
          </div>

          {/* Canvas Section */}
          <div className="flex flex-col lg:flex-row gap-8 min-h-[1200px]">
            {/* Split View Editor */}
            <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Code size={16} className="text-blue-600" />
                  </div>
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Template Source</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200">
                  <button onClick={() => setIsHtmlMode(true)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${isHtmlMode ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>HTML</button>
                  <button onClick={() => setIsHtmlMode(false)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${!isHtmlMode ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>Visual</button>
                </div>
              </div>
              <textarea 
                ref={textAreaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 p-8 text-sm leading-relaxed focus:outline-none resize-none font-mono text-blue-900 bg-white"
                spellCheck={false}
              />
            </div>

            {/* Split View Preview */}
            <div className="flex-1 bg-gray-900 rounded-[2.5rem] shadow-2xl flex flex-col border-[12px] border-gray-900 group relative">
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all">
                  <Maximize2 size={18} />
                </button>
              </div>
              <div className="h-14 bg-gray-800/50 flex items-center justify-between px-8 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/50" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                   <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-4">
                   <button onClick={() => setPreviewDevice('desktop')} className={`p-2 rounded-xl transition-all ${previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><Monitor size={16} /></button>
                   <button onClick={() => setPreviewDevice('mobile')} className={`p-2 rounded-xl transition-all ${previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><Smartphone size={16} /></button>
                </div>
              </div>
              <div className="flex-1 bg-gray-100 overflow-hidden">
                <div className={`h-full mx-auto transition-all duration-500 overflow-y-auto scrollbar-hide ${previewDevice === 'mobile' ? 'max-w-[375px] shadow-2xl' : 'max-w-full'}`}>
                   {renderIframe(content)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Utilities */}
        <div className="space-y-6">
          <div className="xl:sticky xl:top-32 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="font-black text-gray-900 text-[11px] uppercase tracking-widest mb-6 flex items-center gap-2">
                <Layers size={14} className="text-blue-500" /> Smart Tags
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {['first_name', 'last_name', 'email', 'company', 'order_id'].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => handleInsertTag(tag)}
                    className="group px-4 py-3 bg-gray-50 hover:bg-blue-600 rounded-2xl border border-gray-100 text-[10px] font-black text-gray-500 hover:text-white transition-all text-left flex items-center justify-between"
                  >
                    {tag.replace('_', ' ').toUpperCase()}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h3 className="font-black text-blue-400 text-[11px] uppercase tracking-widest mb-4">Diagnostics</h3>
              <div className="space-y-4">
                {[
                  { l: 'Spam Compliance', v: '98%' },
                  { l: 'Asset Weight', v: '14KB' },
                  { l: 'Link Health', v: 'OK' }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] text-gray-400 font-bold">{stat.l}</span>
                    <span className="text-[10px] font-black text-white">{stat.v}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                Full Scan report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Modal */}
      <AnimatePresence>
        {showProgress && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-xl p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl border border-white text-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 border-4 border-blue-600/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
                <Send className="text-blue-600 w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Broadcasting...</h3>
              <p className="text-gray-400 text-sm mb-10 font-medium leading-relaxed">Sending {databases.find(d => d.id === selectedDb)?.recordCount.toLocaleString()} high-priority messages through {smtpProfiles.find(s => s.id === selectedSmtp)?.name}.</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end px-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Success Rate</span>
                  <span className="text-xl font-black text-blue-600">{progress}%</span>
                </div>
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    className="h-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
