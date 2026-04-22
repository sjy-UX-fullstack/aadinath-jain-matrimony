'use client';

import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import { 
  Heart, ArrowUpRight, ArrowDownLeft, Star, 
  MapPin, Briefcase, GraduationCap, Clock,
  Check, X, ChevronRight, LayoutGrid, HeartOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

// ─── Mock Data ────────────────────────────────────────────
const MOCK_INTERESTS = {
  received: [
    {
      id: '1',
      name: 'Sneha Shah',
      age: 26,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      location: 'Ahmedabad',
      occupation: 'Software Engineer',
      timestamp: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Riya Jain',
      age: 25,
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      location: 'Udaipur',
      occupation: 'Architect',
      timestamp: 'Yesterday',
      status: 'pending'
    }
  ],
  sent: [
    {
      id: '3',
      name: 'Ananya Jain',
      age: 27,
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      location: 'Indore',
      occupation: 'Interior Designer',
      timestamp: '1 day ago',
      status: 'accepted'
    },
    {
      id: '4',
      name: 'Pooja Kothari',
      age: 26,
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
      location: 'Mumbai',
      occupation: 'CA',
      timestamp: '3 days ago',
      status: 'pending'
    }
  ],
  shortlist: [
    {
      id: '5',
      name: 'Bhavna Jain',
      age: 24,
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      location: 'Pune',
      occupation: 'Doctor',
      timestamp: 'Added on May 12'
    }
  ]
};

type Tab = 'received' | 'sent' | 'shortlist';

export default function InterestPage() {
  const [activeTab, setActiveTab] = useState<Tab>('received');

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <AppNav isPremium={true} userName="Sanjay" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-stone-900 mb-3 tracking-tight">Interests & Activity</h1>
            <p className="text-stone-500 font-medium max-w-md">Track the connections you've initiated and the requests you've received from profiles matching your values.</p>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm self-start">
            {(['received', 'sent', 'shortlist'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all",
                  activeTab === tab ? "bg-stone-900 text-white shadow-xl" : "text-stone-400 hover:text-stone-600 hover:bg-stone-50"
                )}
              >
                {tab}
                <span className="ml-2 opacity-50 text-[10px] uppercase">{MOCK_INTERESTS[tab].length}</span>
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {MOCK_INTERESTS[activeTab].length > 0 ? (
            MOCK_INTERESTS[activeTab].map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] p-6 border border-stone-200 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-stone-900/5 transition-all">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-[1.75rem] overflow-hidden shadow-lg border border-white/50">
                    <Image src={item.photo} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-xl p-1.5 shadow-md border border-stone-100 flex items-center justify-center">
                    {activeTab === 'received' && <ArrowDownLeft className="w-4 h-4 text-emerald-500" />}
                    {activeTab === 'sent' && <ArrowUpRight className="w-4 h-4 text-copper-500" />}
                    {activeTab === 'shortlist' && <Star className="w-4 h-4 text-amber-500" fill="currentColor" />}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-display font-bold text-stone-900 leading-tight">
                        {item.name}, <span className="font-light text-stone-500">{item.age}</span>
                      </h3>
                      <div className="flex items-center gap-1.5 text-stone-500 text-xs mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-stone-400 text-[11px] font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {item.timestamp}
                  </p>

                  <div className="flex items-center gap-2">
                    {activeTab === 'received' && (
                      <>
                        <button className="flex-1 bg-stone-900 text-white rounded-xl py-2.5 text-xs font-bold hover:bg-stone-800 transition-all shadow-md">Accept</button>
                        <button className="p-2.5 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-all"><X className="w-4 h-4" /></button>
                      </>
                    )}
                    {activeTab === 'sent' && (
                      <div className={cn(
                        "flex-1 text-center py-2.5 rounded-xl text-xs font-bold border",
                        (item as any).status === 'accepted' 
                          ? "bg-emerald-50/50 border-emerald-100 text-emerald-600 flex items-center justify-center gap-1.5" 
                          : "bg-stone-50 border-stone-100 text-stone-500"
                      )}>
                        {(item as any).status === 'accepted' ? <><Check className="w-3.5 h-3.5" /> Request Accepted</> : 'Awaiting Response'}
                      </div>
                    )}
                    {activeTab === 'shortlist' && (
                      <>
                        <button className="flex-1 bg-copper-600 text-white rounded-xl py-2.5 text-xs font-bold hover:bg-copper-500 transition-all shadow-md">Send Interest</button>
                        <button className="p-2.5 rounded-xl border border-stone-200 text-stone-400 hover:text-stone-600 transition-all"><X className="w-4 h-4" /></button>
                      </>
                    )}
                    <Link href="/feed" className="p-2.5 rounded-xl bg-stone-50 text-stone-400 hover:text-stone-900 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 py-24 text-center glass rounded-[3rem] border-2 border-dashed border-stone-200">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <HeartOff className="w-8 h-8 text-stone-200" />
               </div>
               <h3 className="text-2xl font-display font-bold text-stone-900 mb-2">No activity here yet</h3>
               <p className="text-stone-500 max-w-xs mx-auto text-sm leading-relaxed mb-8">
                 {activeTab === 'received' && "You haven't received any interest requests yet. Make sure your profile is 100% complete to stand out!"}
                 {activeTab === 'sent' && "You haven't sent any interests yet. Browse matches in the feed to find profiles you like."}
                 {activeTab === 'shortlist' && "Your shortlist is empty. Save profiles from the discovery feed to view them here later."}
               </p>
               <Link href="/feed" className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all">
                  Browse Profiles
                  <LayoutGrid className="w-4 h-4" />
               </Link>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
