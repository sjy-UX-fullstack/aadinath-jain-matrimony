'use client';

import Link from 'next/link';
import {
  CheckCircle, ShieldCheck, Sparkles, Lock,
  ArrowLeft, ChevronRight, Star, Users, CreditCard,
} from 'lucide-react';

const FEATURES = [
  'Unblurred, high-res profile photos',
  'Full name, contact & mobile numbers',
  'Annual income & occupation details',
  'Paternal & Maternal Gotra access',
  'Direct chat & messaging',
  'Request Offline Family Meetings',
  'Advanced search filters',
  'Priority listing in match feed',
  'Unlimited profile views',
];

const TESTIMONIALS = [
  {
    name: 'Aarav & Priya',
    location: 'Jaipur',
    text: 'We found each other through Adinath Vivah. The verified profiles gave our families complete confidence.',
    rating: 5,
  },
  {
    name: 'Vivek & Nidhi',
    location: 'Mumbai',
    text: 'The offline family meeting request feature made it so easy to arrange a formal introduction. Highly recommended!',
    rating: 5,
  },
];

declare global {
  // Razorpay types
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function handleRazorpay() {
  // TODO: Create order on server → open Razorpay checkout
  if (typeof window !== 'undefined' && window.Razorpay) {
    const rzp = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 999900,  // paise
      currency: 'INR',
      name: 'Adinath Vivah Premium',
      description: 'Annual Premium Membership',
      theme: { color: '#000000' },
      handler: function (response: Record<string, string>) {
        console.log('Payment successful:', response);
        window.location.href = '/feed?upgraded=true';
      },
    });
    rzp.open();
  } else {
    alert('Razorpay SDK not loaded. Please ensure Razorpay script is included.');
  }
}

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-copper-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-200/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 h-16 flex items-center z-10">
        <Link href="/feed" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-semibold uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" />
          Back to Matches
        </Link>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex-1 z-10 page-enter">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-900 shadow-xl mb-6 transform rotate-3">
            <Sparkles className="w-8 h-8 text-copper-400 -rotate-3" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-stone-900 mb-4 tracking-tight">
            Elevate to <span className="text-stone-900">Premium</span>
          </h1>
          <p className="text-stone-500 text-lg max-w-xl mx-auto leading-relaxed">
            Gain full access to all profiles, direct contacts, and our exclusive offline family meeting service for a flat transparent fee.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Pricing Card */}
          <div className="relative overflow-hidden bg-stone-900 rounded-[2rem] p-8 sm:p-10 shadow-2xl text-white order-2 lg:order-1 transition-transform hover:-translate-y-1">
            {/* Soft decorative light */}
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-copper-500/20 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-copper-500/10 border border-copper-500/20 rounded-full px-4 py-1.5 mb-8 text-copper-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Annual Plan
              </div>

              <div className="mb-10">
                <p className="text-stone-400 text-sm line-through mb-1 font-medium">₹19,999 / year</p>
                <div className="flex items-end gap-2 mb-2">
                  <p className="text-6xl font-display font-bold tracking-tighter leading-none">
                    ₹9,999
                  </p>
                  <span className="text-xl text-stone-400 font-medium mb-1">/year</span>
                </div>
                <p className="text-copper-400 text-sm font-semibold tracking-wide">
                  Limited time 50% launch offer
                </p>
              </div>

              <button
                id="razorpay-upgrade-btn"
                onClick={handleRazorpay}
                className="w-full flex items-center justify-center gap-2 bg-copper-500 hover:bg-copper-400 text-stone-900 font-bold py-4 rounded-xl text-[15px] transition-all shadow-[0_0_20px_rgba(180,132,92,0.2)] hover:shadow-[0_0_30px_rgba(180,132,92,0.4)] mb-8 hover:scale-[1.02] active:scale-[0.98]"
              >
                <CreditCard className="w-5 h-5" />
                Secure Checkout
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Trust */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
                <div className="flex items-center gap-3 text-stone-400 text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="font-medium text-stone-300">Secured by Razorpay via 256-bit SSL</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400 text-sm">
                  <Lock className="w-5 h-5 text-copper-400 flex-shrink-0" />
                  <span className="font-medium text-stone-300">7-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400 text-sm">
                  <Users className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <span className="font-medium text-stone-300">Join 368+ premium families</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 sm:p-10 border border-stone-200 shadow-xl shadow-stone-900/5 order-1 lg:order-2">
            <h2 className="text-2xl font-display font-semibold text-stone-900 mb-6 tracking-tight">
              What you get with Premium
            </h2>
            <ul className="space-y-4">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-stone-700 font-medium">{f}</span>
                </li>
              ))}
            </ul>

            {/* What free users miss */}
            <div className="mt-8 p-5 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-stone-500" />
                <p className="text-stone-800 font-semibold text-sm">Currently locked in free tier:</p>
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {['Profile photos', 'Full names', 'Contact details', 'Gotras & income'].map((i) => (
                  <li key={i} className="text-stone-500 text-xs font-medium flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-stone-300 flex-shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-xl font-bold uppercase tracking-wider text-stone-400 text-center mb-8">
            Trusted by the community
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-stone-200 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-copper-500 fill-copper-500" />
                  ))}
                </div>
                <p className="text-stone-700 text-[15px] font-medium leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
                    <span className="text-stone-500 font-bold font-display uppercase">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm tracking-tight">{t.name}</p>
                    <p className="text-stone-500 text-xs font-medium uppercase tracking-wider">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
