import Link from 'next/link';
import { ArrowRight, ChevronLeft, Target, TrendingUp, Users, ShieldCheck, PieChart, Star } from 'lucide-react';
import AppNav from '@/components/layout/AppNav';

export default function InvestorPitchDeckPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <AppNav isPremium={true} userName="Investor" />

      {/* ── Slide 1: Title Slide ────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-copper-200/30 blur-[100px] animate-bounce-slow" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto page-enter">
          <div className="inline-flex items-center gap-2 glass border border-copper-200/50 rounded-full px-4 py-1.5 mb-8 text-copper-800 backdrop-blur-md">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Confidential Pitch Deck</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-display font-semibold text-stone-900 tracking-tight leading-[1.05] mb-6">
            Adinath Vivah <br />
            <span className="italic font-light text-stone-600">The Future of Matrimony.</span>
          </h1>

          <p className="text-stone-500 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            A premium, highly-curated matchmaking platform exclusively serving the Digambar & Shwetambar Jain communities worldwide.
          </p>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-2">Scroll to discover</p>
          <div className="w-px h-12 bg-gradient-to-b from-stone-400 to-transparent mx-auto" />
        </div>
      </section>

      {/* ── Slide 2: The Problem & Solution ─────────────────────────────────── */}
      <section className="py-24 bg-white border-y border-stone-200/60 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="page-enter">
               <h2 className="text-sm font-bold text-rose-600 uppercase tracking-widest mb-2">The Problem</h2>
               <h3 className="text-4xl font-display text-stone-900 mb-6 drop-shadow-sm">Generic platforms fail niche communities.</h3>
               <ul className="space-y-4">
                 {['Lack of verification leads to low trust.', 'Irrelevant matches waste families’ time.', 'Poor UI/UX on traditional matrimony websites.', 'Sub-sects and religious nuances are often ignored.'].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                       <span className="w-2 h-2 rounded-full bg-rose-500" />
                     </div>
                     <p className="text-stone-600">{item}</p>
                   </li>
                 ))}
               </ul>
            </div>
            
            <div className="page-enter" style={{ animationDelay: '0.2s' }}>
               <h2 className="text-sm font-bold text-sage-600 uppercase tracking-widest mb-2">Our Solution</h2>
               <h3 className="text-4xl font-display text-stone-900 mb-6 drop-shadow-sm">Hyper-local, highly verified, beautifully designed.</h3>
               <div className="glass shadow-2xl rounded-3xl p-8 border border-stone-100">
                 <ul className="space-y-6">
                   <li className="flex gap-4">
                     <ShieldCheck className="w-8 h-8 text-sage-500 flex-shrink-0" />
                     <div>
                       <h4 className="font-bold text-stone-900 text-lg">100% ID Verification</h4>
                       <p className="text-stone-500 text-sm mt-1">Manual approval ensures community purity and trust.</p>
                     </div>
                   </li>
                   <div className="w-full h-px bg-stone-100" />
                   <li className="flex gap-4">
                     <Target className="w-8 h-8 text-sage-500 flex-shrink-0" />
                     <div>
                       <h4 className="font-bold text-stone-900 text-lg">Granular Filters</h4>
                       <p className="text-stone-500 text-sm mt-1">Filter by Gotra, Sub-Sect, Diet, and Manglik Status instantly.</p>
                     </div>
                   </li>
                   <div className="w-full h-px bg-stone-100" />
                   <li className="flex gap-4">
                     <Star className="w-8 h-8 text-sage-500 flex-shrink-0" />
                     <div>
                       <h4 className="font-bold text-stone-900 text-lg">Premium Monetization</h4>
                       <p className="text-stone-500 text-sm mt-1">Freemium model. Free to join, pay to seamlessly connect.</p>
                     </div>
                   </li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Slide 3: Market Size & Opportunity ────────────────────────────── */}
      <section className="py-32 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 page-enter">
            <h2 className="text-sm font-bold text-copper-400 uppercase tracking-widest mb-3">Market Opportunity</h2>
            <h3 className="text-4xl md:text-5xl font-display text-white drop-shadow-md">A Highly Lucrative Niche.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Jain Population in India', value: '~5 Million', desc: 'A deeply connected, affluent, and culturally rooted demographic.' },
              { title: 'TAM (Total Addressable Market)', value: '$120M+', desc: 'Annual spend on matchmaking and wedding-related initial services.' },
              { title: 'Projected ARR (Year 3)', value: '$4.5M', desc: 'Based on conservative 2% market penetration of marriageable age users.' },
            ].map((stat, i) => (
               <div key={i} className="glass-dark p-8 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-500">
                 <PieChart className="w-8 h-8 text-copper-400 mb-6" />
                 <h4 className="text-5xl font-display font-medium text-white mb-2">{stat.value}</h4>
                 <p className="text-lg font-bold text-copper-100 mb-2">{stat.title}</p>
                 <p className="text-stone-400 text-sm">{stat.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
