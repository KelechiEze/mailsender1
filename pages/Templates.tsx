
import React from 'react';
import { Trash2, Copy, Rocket, FileText, Zap, ShoppingBag, Mail, Bell, Eye, Search, Code } from 'lucide-react';

interface TemplatesProps {
  searchQuery: string;
  onUseTemplate: (html: string) => void;
}

const templates = [
  { 
    id: '1', 
    name: 'SaaS Pulse Welcome', 
    type: 'Transactional', 
    image: 'https://picsum.photos/seed/pulse/400/300',
    desc: 'Deep blue modern onboarding flow with centered call-to-actions and high-fidelity typography.',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0F172A; }
    .wrap { width: 100%; max-width: 600px; margin: 0 auto; padding: 60px 20px; box-sizing: border-box; }
    .card { background: #1E293B; border-radius: 32px; padding: 50px; border: 1px solid #334155; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    h1 { font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 16px; letter-spacing: -1px; }
    p { color: #94A3B8; font-size: 17px; line-height: 1.6; margin-bottom: 32px; }
    .btn { display: inline-block; background: #3B82F6; color: #ffffff; padding: 18px 40px; border-radius: 16px; text-decoration: none; font-weight: 700; font-size: 16px; transition: all 0.3s ease; }
    @media only screen and (max-width: 480px) {
      .card { padding: 30px; }
      h1 { font-size: 24px; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div style="width: 64px; height: 64px; background: #3B82F6; border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; color: white; font-size: 30px;">P</div>
      <h1>Welcome to Pulse</h1>
      <p>Your high-frequency delivery node is now active. We've synchronized your local cluster for global delivery.</p>
      <a href="#" class="btn">Access Dashboard</a>
    </div>
  </div>
</body>
</html>`
  },
  { 
    id: '2', 
    name: 'Ghost Editorial', 
    type: 'Newsletter', 
    image: 'https://picsum.photos/seed/ghost/400/300',
    desc: 'Clean, serif-driven minimalist grid for content-heavy newsletters and thought leadership.',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background: #ffffff; color: #111111; font-family: 'Georgia', serif; }
    .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 40px 20px; box-sizing: border-box; }
    .header { border-bottom: 2px solid #111; padding-bottom: 20px; margin-bottom: 40px; }
    .masthead { font-size: 48px; font-weight: 900; letter-spacing: -2px; margin: 0; }
    .meta { font-family: sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #666; margin-top: 10px; }
    .article-title { font-size: 32px; font-weight: 800; line-height: 1.1; margin: 0 0 15px 0; }
    .article-body { font-size: 18px; line-height: 1.8; color: #333; }
    .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-family: sans-serif; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="masthead">GHOST</h1>
      <div class="meta">ISSUE #42 • NOVEMBER 2024</div>
    </div>
    <div class="content">
      <h2 class="article-title">The High-Frequency Strategy Protocol</h2>
      <p class="article-body">Email is no longer just text; it is infrastructure. In this issue, we dive deep into the mechanics of high-volume delivery nodes and why strategy always precedes execution in a high-scale environment.</p>
      <p class="article-body">We've interviewed the lead architects at MailPro to understand how they maintain 99.9% delivery fidelity across global clusters.</p>
    </div>
    <div class="footer">
      Sent via MailPro Enterprise • <a href="#" style="color:#111; text-decoration:none; font-weight:bold;">Unsubscribe</a>
    </div>
  </div>
</body>
</html>`
  },
  { 
    id: '3', 
    name: 'Quantum Store Receipt', 
    type: 'Receipt', 
    image: 'https://picsum.photos/seed/store/400/300',
    desc: 'Functional transactional receipt with product tables and glassmorphism accents.',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, sans-serif; background: #F8FAFC; }
    .wrap { width: 100%; max-width: 500px; margin: 40px auto; padding: 0 20px; box-sizing: border-box; }
    .receipt { background: #ffffff; border-radius: 24px; padding: 40px; border: 1px solid #E2E8F0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
    h4 { color: #64748B; margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
    h1 { font-size: 24px; font-weight: 800; color: #1E293B; margin: 0 0 30px 0; }
    .item-row { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #F1F5F9; }
    .total-row { display: flex; justify-content: space-between; padding: 20px 0 0 0; margin-top: 20px; font-weight: 800; font-size: 18px; }
    .label { color: #64748B; font-weight: 500; font-size: 14px; }
    .value { color: #1E293B; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="receipt">
      <h4>Order #8921-X</h4>
      <h1>Thanks for your order!</h1>
      <div class="item-row">
        <span class="label">MailPro Enterprise Sub</span>
        <span class="value">$199.00</span>
      </div>
      <div class="item-row">
        <span class="label">Priority Routing Add-on</span>
        <span class="value">$29.00</span>
      </div>
      <div class="total-row">
        <span>Total Paid</span>
        <span>$228.00</span>
      </div>
      <div style="margin-top: 30px; text-align: center;">
        <p style="font-size: 12px; color: #94A3B8;">A PDF receipt has been attached for your records.</p>
      </div>
    </div>
  </div>
</body>
</html>`
  }
];

export const Templates: React.FC<TemplatesProps> = ({ searchQuery, onUseTemplate }) => {
  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Design Studio</h1>
          <p className="text-gray-500 text-sm">Professional communique assets for your brand.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((t) => (
          <div key={t.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="relative h-56 overflow-hidden bg-gray-50 border-b border-gray-50">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-md">
                <button 
                  onClick={() => onUseTemplate(t.html)}
                  className="px-6 py-3 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Rocket size={16} /> Deploy Design
                </button>
              </div>
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-xl">{t.type}</span>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="font-black text-gray-900 text-lg tracking-tight mb-2">{t.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-1">{t.desc}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Copy size={18} /></button>
                  <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                </div>
                <button 
                  onClick={() => onUseTemplate(t.html)}
                  className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                >
                  Edit Layout <Code size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
