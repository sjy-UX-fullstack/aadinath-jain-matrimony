'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';

export default function UpgradeBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-stone-900 p-8 shadow-xl">
      {/* Decorative circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-copper-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />

      {/* Subtle border top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-copper-400/30 to-transparent" />

      <div className="relative z-10">
        {/* Icon + tag */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-copper-500/10 border border-copper-500/20 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-copper-400" />
          </div>
          <span className="text-copper-400 font-bold uppercase tracking-widest text-xs">Adinath Premium</span>
        </div>

        <h2 className="text-white text-3xl font-display font-semibold mb-2 tracking-tight">
          Unlock the complete experience
        </h2>
        <p className="text-stone-400 text-[15px] leading-relaxed mb-6 max-w-xl">
          View full profiles, high-res photos, contact details, and income—plus the exclusive <span className="text-copper-300 font-medium">Offline Family Meeting</span> request feature.
        </p>

        {/* Feature bullets */}
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-8">
          {[
            'High-res profile photos (unblurred)',
            'Full name, contact & income details',
            'Paternal & Maternal Gotra access',
            'Direct messaging & chat',
            'Request Offline Family Meetings',
            'Priority customer support'
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-stone-300 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-copper-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/5 rounded-2xl p-5 border border-white/10">
          <div>
            <p className="text-stone-500 text-sm line-through mb-0.5">₹19,999/year</p>
            <p className="text-white font-display font-bold text-3xl">
              ₹9,999
              <span className="text-stone-400 font-body text-base font-medium"> / year</span>
            </p>
          </div>
          <Link
            href="/upgrade"
            id="upgrade-banner-cta"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-copper-500 hover:bg-copper-400 text-stone-900 font-bold text-[15px] px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(180,132,92,0.3)] hover:shadow-[0_0_25px_rgba(180,132,92,0.5)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Upgrade Membership
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Trust note */}
        <div className="mt-5 flex items-center justify-center sm:justify-start gap-2 opacity-80">
          <Lock className="w-3.5 h-3.5 text-stone-400" />
          <p className="text-stone-400 text-xs">
            Secured by Razorpay · 256-bit SSL · 7-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}
