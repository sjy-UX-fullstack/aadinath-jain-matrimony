'use client';

import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import { 
  Search, MessageCircle, Send, Plus, 
  MoreVertical, Check, CheckCheck, Phone, Video,
  Info, Sparkles, LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// ─── Mock Data ────────────────────────────────────────────
const MOCK_CHATS = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'I think we should discuss this further with parents.',
    time: '14:20',
    unread: 2,
    online: true,
    status: 'sent'
  },
  {
    id: '2',
    name: 'Ananya Jain',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'Sure, Indore is a great city!',
    time: 'Yesterday',
    unread: 0,
    online: false,
    status: 'read'
  },
  {
    id: '3',
    name: 'Sneha Shah',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'Looking forward to meeting you next weekend.',
    time: '2 days ago',
    unread: 0,
    online: true,
    status: 'read'
  },
];

const MOCK_MESSAGES = [
  { id: 1, text: 'Hello! I saw your interest request and would love to connect.', time: '10:00 AM', sender: 'them' },
  { id: 2, text: 'Hi! Thank you for accepting. I really liked your profile, especially your involvement in community events.', time: '10:05 AM', sender: 'me' },
  { id: 3, text: 'Thank you! Yes, I try to stay active with the local Jain Sangha.', time: '10:07 AM', sender: 'them' },
  { id: 4, text: 'That is great. Where are you currently based?', time: '10:10 AM', sender: 'me' },
  { id: 5, text: 'I am currently in Indore, working with my family business. What about you?', time: '10:12 AM', sender: 'them' },
  { id: 6, text: 'I think we should discuss this further with parents.', time: '10:15 AM', sender: 'them' },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<any>(MOCK_CHATS[0]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="h-screen flex flex-col bg-stone-50">
      <AppNav isPremium={true} userName="Sanjay" />

      <main className="flex-1 max-w-7xl mx-auto w-full flex overflow-hidden lg:border-x lg:border-stone-200 bg-white">
        
        {/* ── Chat Sidebar (List of conversations) ───────────────── */}
        <div className={cn(
          "w-full lg:w-96 border-r border-stone-200 flex flex-col h-full",
          activeChat ? "hidden lg:flex" : "flex"
        )}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-stone-100">
            <h1 className="text-2xl font-display font-bold text-stone-900 mb-6">Messages</h1>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-copper-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500/20 transition-all"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-2">
            {MOCK_CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={cn(
                  "w-full px-6 py-4 flex items-center gap-4 transition-all hover:bg-stone-50 group border-l-4",
                  activeChat.id === chat.id ? "bg-stone-50 border-stone-900" : "border-transparent"
                )}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm">
                    <Image src={chat.avatar} alt={chat.name} fill className="object-cover" />
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-sage-500 border-2 border-white rounded-full shadow-sm" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-display font-bold text-stone-900 truncate">{chat.name}</h3>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{chat.time}</span>
                  </div>
                  <p className={cn(
                    "text-xs truncate",
                    chat.unread > 0 ? "text-stone-900 font-bold" : "text-stone-500 font-medium"
                  )}>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-lg bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                    {chat.unread}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 bg-stone-50/50 border-t border-stone-100 hidden lg:block">
             <div className="flex items-center gap-3 glass p-4 rounded-2xl border border-copper-100">
                <Sparkles className="w-5 h-5 text-copper-500" />
                <div>
                   <p className="text-[11px] font-bold uppercase tracking-wider text-stone-900">Premium Chat</p>
                   <p className="text-[10px] text-stone-500 font-medium">Verified connection secure</p>
                </div>
             </div>
          </div>
        </div>

        {/* ── Active Chat Window ─────────────────────────────────── */}
        <div className={cn(
          "flex-1 flex flex-col h-full bg-stone-50/30",
          !activeChat ? "hidden lg:flex" : "flex"
        )}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="h-20 px-6 sm:px-8 border-b border-stone-200 bg-white flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <button onClick={() => setActiveChat(null)} className="lg:hidden p-2 -ml-2 text-stone-400 hover:text-stone-900 transition-colors">
                    <Info className="w-5 h-5 rotate-180" />
                  </button>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                      <Image src={activeChat.avatar} alt={activeChat.name} fill className="object-cover" />
                    </div>
                    {activeChat.online && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-sage-500 border-2 border-white rounded-full" />}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-stone-900 leading-none mb-1">{activeChat.name}</h2>
                    <p className="text-[10px] font-bold text-sage-600 uppercase tracking-[0.1em]">
                      {activeChat.online ? 'Active Now' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-3 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                     <Phone className="w-5 h-5" />
                   </button>
                   <button className="p-3 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                     <Video className="w-5 h-5" />
                   </button>
                   <button className="p-3 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                     <MoreVertical className="w-5 h-5" />
                   </button>
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10 flex flex-col gap-6">
                <div className="flex justify-center mb-4">
                   <span className="px-4 py-1.5 bg-stone-200/50 rounded-full text-[10px] font-bold text-stone-500 uppercase tracking-widest uppercase">Encryption Active</span>
                </div>
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={cn(
                      "flex flex-col max-w-[80%] sm:max-w-[70%] group",
                      msg.sender === 'me' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "px-5 py-3.5 rounded-[1.75rem] text-sm font-medium shadow-sm transition-all",
                      msg.sender === 'me' 
                        ? "bg-stone-900 text-white rounded-tr-none hover:bg-stone-800" 
                        : "bg-white border border-stone-200 text-stone-900 rounded-tl-none hover:border-stone-300"
                    )}>
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 px-1">
                       <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{msg.time}</span>
                       {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-sage-500" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-6 sm:p-8 bg-white border-t border-stone-200 shrink-0">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                  <button className="p-3.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-2xl transition-all">
                    <Plus className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..." 
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-[1.75rem] text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500/20 transition-all placeholder:text-stone-300"
                    />
                  </div>
                  <button 
                    onClick={sendMessage}
                    className={cn(
                      "p-4 rounded-full transition-all shadow-lg active:scale-95",
                      input.trim() ? "bg-stone-900 text-white hover:bg-stone-800" : "bg-stone-100 text-stone-300"
                    )}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-1000">
               <div className="w-24 h-24 bg-white rounded-[2.5rem] border border-stone-100 shadow-2xl shadow-stone-900/5 flex items-center justify-center mb-8">
                  <MessageCircle className="w-10 h-10 text-stone-200" />
               </div>
               <h3 className="text-2xl font-display font-bold text-stone-900 mb-2">Select a conversation</h3>
               <p className="text-stone-500 max-w-xs text-sm leading-relaxed">Choose a match from the sidebar to start discussing values, family, and your future together.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
