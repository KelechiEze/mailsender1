
import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Type, 
  Paperclip, 
  ChevronDown, 
  Eye, 
  HelpCircle, 
  X, 
  Save, 
  Zap, 
  CheckCircle,
  Code,
  Smartphone,
  Monitor,
  Mail,
  Database,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SMTPConfig, DatabaseConnection } from '../types';

interface ComposeProps {
  smtpProfiles: SMTPConfig[];
  databases: DatabaseConnection[];
}

export const Compose: React.FC<ComposeProps> = ({ smtpProfiles, databases }) => {
  const [subject, setSubject] = useState("Your weekly tech digest is here! 🚀");
  const [content, setContent] = useState(`<div style="font-family: sans-serif; padding: 20px; color: #333;">
  <h1 style="color: #2563EB;">Hi {{first_name}}!</h1>
  <p>We've got some exciting news to share from the <strong>{{company}}</strong> team!</p>
  <p>Over the last few weeks, we've been working hard on some major updates that we know you're going to love.</p>
  <div style="margin: 30px 0;">
    <a href="#" style="background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Updates Now</a>
  </div>
  <p>Best regards,<br>The {{company}} Team</p>
</div>`);
  
  const [isHtmlMode, setIsHtmlMode] = useState(true);
  const [selectedSmtp, setSelectedSmtp] = useState(smtpProfiles[0]?.id || "");
  const [selectedDb, setSelectedDb] = useState(databases[0]?.id || "");
  
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [checklist, setChecklist] = useState([
    { label: 'Subject line set', checked: true },
    { label: 'Unsubscribe link included', checked: true },
    { label: 'Database connected', checked: true },
    { label: 'SMTP configured', checked: true },
    { label: 'Preview text optimized', checked: false },
  ]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsertTag = (tag: string) => {
    const tagText = `{{${tag}}}`;
    if (textAreaRef.current) {
      const start = textAreaRef.current.selectionStart;
      const end = textAreaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + tagText + content.substring(end);
      setContent(newContent);
      setTimeout(() => {
        textAreaRef.current?.focus();
        textAreaRef.current?.setSelectionRange(start + tagText.length, start + tagText.length);
      }, 0);
    } else {
      setContent(content + " " + tagText);
    }
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Draft saved successfully at ' + new Date().toLocaleTimeString());
    }, 1000);
  };

  const handleSend = () => {
    if (!selectedSmtp || !selectedDb) {
      alert("Please select an SMTP profile and a Target Audience before sending.");
      return;
    }
    setShowProgress(true);
    setIsSending(true);
    let curr = 0;
    const interval = setInterval(() => {
      curr += Math.random() * 15;
      if (curr >= 100) {
        curr = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsSending(false);
          setShowProgress(false);
          setProgress(0);
          alert('Campaign successfully launched to the selected database!');
        }, 800);
      } else {
        setProgress(curr);
      }
    }, 300);
  };

  const toggleChecklist = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index].checked = !newChecklist[index].checked;
    setChecklist(newChecklist);
  };

  const renderLivePreview = (text: string) => {
    const processed = text
      .replace(/{{first_name}}/g, 'Alex')
      .replace(/{{company}}/g, 'MailPro Corp')
      .replace(/{{last_name}}/g, 'Thompson')
      .replace(/{{email}}/g, 'alex.t@example.com');
      
    return <div className="p-4 sm:p-8" dangerouslySetInnerHTML={{ __html: processed }} />;
  };

  return (
    <div className="h-full flex flex-col space-y-4 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Zap className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight truncate">Campaign Studio</h1>
            <p className="text-gray-400 text-[10px] md:text-xs font-medium uppercase tracking-wider">Enterprise Sender • v3.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <button onClick={handleSaveDraft} className="whitespace-nowrap px-3 py-2 text-xs md:text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-all flex items-center gap-2 border border-transparent hover:border-gray-200">
            {isSaving ? <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> : <Save size={16} />}
            <span className="hidden xs:inline">Save Draft</span>
          </button>
          <button onClick={() => setShowPreviewModal(true)} className="whitespace-nowrap px-3 py-2 bg-white border border-gray-200 text-xs md:text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl shadow-sm flex items-center gap-2 transition-transform active:scale-95">
            <Eye size={16} /> <span className="hidden xs:inline">Preview</span>
          </button>
          <button onClick={handleSend} disabled={isSending} className="whitespace-nowrap px-4 py-2 bg-blue-600 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 disabled:opacity-50 active:scale-95">
            <Send size={16} /> Launch
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-50 space-y-4 bg-gray-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> Sending Profile
                </label>
                <div className="relative">
                  <select 
                    value={selectedSmtp}
                    onChange={(e) => setSelectedSmtp(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer truncate"
                  >
                    {smtpProfiles.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.email})</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Database className="w-3 h-3" /> Recipient Source
                </label>
                <div className="relative">
                  <select 
                    value={selectedDb}
                    onChange={(e) => setSelectedDb(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer truncate"
                  >
                    {databases.map(db => (
                      <option key={db.id} value={db.id}>{db.name} ({db.recordCount.toLocaleString()})</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-3 h-3" /> Subject
              </label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs md:text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[400px]">
            <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-50 overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-100 bg-white flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                  <button onClick={() => {}} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Type size={16} className="font-bold" /></button>
                  <button onClick={() => {}} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg italic font-serif">I</button>
                  <div className="w-px h-4 bg-gray-200 mx-1"></div>
                  <button onClick={() => {}} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><ImageIcon size={16} /></button>
                  <button onClick={() => {}} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><LinkIcon size={16} /></button>
                </div>
                <button 
                  onClick={() => setIsHtmlMode(!isHtmlMode)} 
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${isHtmlMode ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  <Code size={12} /> HTML Mode
                </button>
              </div>
              <textarea 
                ref={textAreaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`flex-1 p-4 md:p-8 text-sm md:text-base leading-relaxed focus:outline-none resize-none bg-white font-medium ${isHtmlMode ? 'font-mono bg-gray-900 text-[11px] md:text-xs text-blue-300' : 'text-gray-900'}`}
                placeholder={isHtmlMode ? "Enter raw HTML code here..." : "Start writing your campaign message here..."}
              />
            </div>

            <div className="flex-1 bg-gray-50/50 flex flex-col overflow-hidden">
              <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Real-time Preview</span>
                <span className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1 shrink-0"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div> Active</span>
              </div>
              <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-full">
                   {renderLivePreview(content)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-72 space-y-4 md:space-y-6 flex flex-col shrink-0 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 md:gap-6">
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm shrink-0">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Smart Placeholders</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-2">
                {['first_name', 'last_name', 'email', 'company', 'order_id', 'city'].map(tag => (
                  <button key={tag} onClick={() => handleInsertTag(tag)} className="px-2 py-2 bg-gray-50 hover:bg-blue-600 hover:text-white border border-gray-100 rounded-xl text-[9px] md:text-[10px] font-black tracking-wider text-gray-500 transition-all uppercase active:scale-95 truncate">
                    {tag.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm shrink-0">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Campaign Checklist</h3>
              <div className="space-y-3">
                {checklist.map((item, i) => (
                  <button key={i} onClick={() => toggleChecklist(i)} className="flex items-center gap-3 w-full group">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all shrink-0 ${item.checked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 group-hover:border-blue-400'}`}>
                      {item.checked && <CheckCircle size={14} />}
                    </div>
                    <span className={`text-xs text-left transition-all truncate ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700 font-bold'}`}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPreviewModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4 md:p-6">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-5xl h-[90vh] md:h-[85vh] rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden">
              <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-4">
                  <h2 className="text-base md:text-xl font-black text-gray-900 uppercase tracking-tight truncate">Full Canvas Preview</h2>
                  <div className="flex bg-gray-100 p-1 rounded-xl shrink-0">
                    <button onClick={() => setPreviewDevice('desktop')} className={`p-1.5 md:p-2 rounded-lg transition-all ${previewDevice === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}><Monitor size={16} /></button>
                    <button onClick={() => setPreviewDevice('mobile')} className={`p-1.5 md:p-2 rounded-lg transition-all ${previewDevice === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}><Smartphone size={16} /></button>
                  </div>
                </div>
                <button onClick={() => setShowPreviewModal(false)} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-gray-100 rounded-full text-gray-400 transition-colors shrink-0"><X size={20} /></button>
              </div>
              <div className="flex-1 bg-gray-50 overflow-y-auto p-4 md:p-10 flex justify-center">
                <div className={`transition-all duration-500 bg-white shadow-sm border border-gray-100 ${previewDevice === 'desktop' ? 'w-full max-w-3xl rounded-2xl md:p-12' : 'w-full max-w-[375px] rounded-[2.5rem] p-4 md:p-6 border-[8px] border-gray-800 h-fit'}`}>
                   {renderLivePreview(content)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProgress && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-gray-900/40 backdrop-blur-xl p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-md rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl border border-white">
              <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight mb-2">Sending Batch...</h3>
              <p className="text-gray-500 text-xs md:text-sm mb-6">Distributing across optimized SMTP routes.</p>
              <div className="w-full h-3 md:h-4 bg-gray-100 rounded-full overflow-hidden mb-6">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]" />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Progress</p>
                <p className="font-black text-blue-600 text-lg">{Math.round(progress)}%</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
