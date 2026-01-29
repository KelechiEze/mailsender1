
import React from 'react';
import { FileText, Plus, Copy, Trash2, Edit3, Eye, Star, Zap, ShoppingBag, Bell, Mail } from 'lucide-react';

const templates = [
  { 
    id: '1', 
    name: 'SaaS Welcome Sequence', 
    type: 'Transactional', 
    lastEdited: '2h ago', 
    image: 'https://picsum.photos/seed/welcome/400/300',
    desc: 'High-converting welcome email with clean typography and primary action buttons.',
    icon: <Zap className="text-blue-500" size={16} />
  },
  { 
    id: '2', 
    name: 'Order Confirmed (E-comm)', 
    type: 'Newsletter', 
    lastEdited: '1d ago', 
    image: 'https://picsum.photos/seed/receipt/400/300',
    desc: 'Professional receipt layout with dynamic product tables and shipping info.',
    icon: <ShoppingBag className="text-green-500" size={16} />
  },
  { 
    id: '3', 
    name: 'Q4 Product Newsletter', 
    type: 'Newsletter', 
    lastEdited: '3d ago', 
    image: 'https://picsum.photos/seed/news/400/300',
    desc: 'Grid-based editorial style for product launches and monthly updates.',
    icon: <Mail className="text-purple-500" size={16} />
  },
  { 
    id: '4', 
    name: 'Critical Security Alert', 
    type: 'Security', 
    lastEdited: '1w ago', 
    image: 'https://picsum.photos/seed/security/400/300',
    desc: 'Urgently styled template for account alerts and MFA codes.',
    icon: <Bell className="text-red-500" size={16} />
  },
  { 
    id: '5', 
    name: 'Cart Recovery (Discount)', 
    type: 'Retention', 
    lastEdited: '2w ago', 
    image: 'https://picsum.photos/seed/cart/400/300',
    desc: 'Bold visuals with a large "Finish Checkout" button and voucher code area.',
    icon: <Star className="text-amber-500" size={16} />
  },
  { 
    id: '6', 
    name: 'Event Invitation (Modern)', 
    type: 'Engagement', 
    lastEdited: '1m ago', 
    image: 'https://picsum.photos/seed/event/400/300',
    desc: 'Full-bleed header image layout for webinars and live corporate events.',
    icon: <Eye className="text-indigo-500" size={16} />
  },
];

export const Templates: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Design Studio</h1>
          <p className="text-gray-500 text-sm">Create and manage your enterprise communication assets.</p>
        </div>
        <button onClick={() => alert('New Template Canvas loading...')} className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2">
          <Plus size={20} /> Create New Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((t) => (
          <div key={t.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="relative h-56 overflow-hidden bg-gray-50 border-b border-gray-50">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                <button onClick={() => alert(`Editing: ${t.name}`)} className="p-3 bg-white rounded-2xl text-blue-600 shadow-xl hover:scale-110 transition-transform"><Edit3 size={20} /></button>
                <button onClick={() => alert(`Full Preview: ${t.name}`)} className="p-3 bg-white rounded-2xl text-gray-700 shadow-xl hover:scale-110 transition-transform"><Eye size={20} /></button>
                <button onClick={() => alert(`Cloned: ${t.name}`)} className="p-3 bg-white rounded-2xl text-gray-700 shadow-xl hover:scale-110 transition-transform"><Copy size={20} /></button>
              </div>
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-xl flex items-center gap-2">
                  {t.icon} {t.type}
                </span>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-gray-900 text-lg group-hover:text-blue-600 transition-colors tracking-tight">{t.name}</h3>
                <button onClick={() => alert(`Deleted: ${t.name}`)} className="text-gray-300 hover:text-red-500 transition-colors p-1"><Trash2 size={18} /></button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">{t.desc}</p>
              <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Edited {t.lastEdited}</p>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${t.id}${i}/24/24`} className="w-6 h-6 rounded-full border-2 border-white" alt="Team member" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
