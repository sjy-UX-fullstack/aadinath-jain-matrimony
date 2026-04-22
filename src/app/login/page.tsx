'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowRight, Shield, ChevronLeft, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'phone' | 'otp';

const COUNTRY_CODE = '+91';

function OTPInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const digits = value.padEnd(6, '').split('').slice(0, 6);

  const handleChange = (i: number, char: string) => {
    if (!/^\d*$/.test(char)) return;
    const arr = value.split('').slice(0, 6);
    arr[i] = char;
    onChange(arr.join('').slice(0, 6));
    // Auto-advance
    if (char && i < 5) {
      const next = document.getElementById(`otp-${i + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      const prev = document.getElementById(`otp-${i - 1}`);
      if (prev) (prev as HTMLInputElement).focus();
      const arr = value.split('');
      arr[i - 1] = '';
      onChange(arr.join(''));
    }
  };

  return (
    <div className="flex gap-2 justify-center w-full">
      {digits.map((d, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          className={cn(
            'flex-1 h-14 max-w-[3rem] text-center text-xl font-display font-bold rounded-xl border-2 focus:outline-none transition-all',
            d
              ? 'border-copper-500 bg-copper-50 text-stone-900'
              : 'border-stone-200 bg-stone-50 text-stone-900 focus:border-copper-400 focus:bg-white',
          )}
        />
      ))}
    </div>
  );
}

export default function LoginPage() {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setLoading(true);
    // TODO: Integrate Firebase Phone Auth / Twilio OTP here
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep('otp');
    // Countdown 30s
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    setError('');
    setLoading(true);
    // TODO: auth.signInWithPhoneNumber — verify OTP with Firebase
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    // Redirect to feed / onboarding
    setStep('phone'); // Reset for next time if they go back
    window.location.href = '/feed';
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    window.location.href = '/feed';
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row relative overflow-hidden">
      
      {/* ── Left Side Image (Visible on Desktop) ───────────────────── */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen">
        <Image 
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" 
          alt="Happy Couple Login" 
          fill 
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
        
        {/* Ad Copy */}
        <div className="absolute bottom-12 left-12 right-12 z-10 page-enter">
           <h2 className="text-4xl text-white font-display font-semibold mb-4 leading-tight shadow-sm drop-shadow-md">
             A Lifetime of <br />
             <span className="italic font-light text-copper-300">Togetherness.</span>
           </h2>
           <p className="text-white/80 text-lg max-w-sm drop-shadow-md">
             Join the most trusted community for Digambar and Shwetambar Jains and find your perfect life partner.
           </p>
        </div>
      </div>

      {/* ── Right Side Login Form ──────────────────────────────────── */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center px-4 relative overflow-y-auto">
        
        {/* Background Mesh for mobile/tablet */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center lg:hidden">
          <div className="absolute w-[800px] h-[800px] rounded-full bg-copper-100/40 mesh-blob" />
          <div className="absolute w-[600px] h-[600px] rounded-full bg-rose-100/30 mesh-blob" style={{ animationDelay: '-10s', marginLeft: '20%' }} />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md page-enter py-12">
        {/* Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="group flex flex-col items-center">
             <div className="w-16 h-16 rounded-[1.25rem] bg-stone-900 flex items-center justify-center mb-4 shadow-xl shadow-stone-900/10 transition-transform group-hover:scale-105">
              <span className="text-copper-400 font-display font-medium text-3xl leading-none">A</span>
             </div>
             <h1 className="text-stone-900 text-3xl font-display font-bold tracking-tight">Adinath Vivah</h1>
             <p className="text-stone-500 text-[10px] uppercase tracking-[0.25em] font-bold mt-1.5">Jain Matrimony</p>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 shadow-2xl shadow-stone-900/5 border border-white/50">
          {step === 'phone' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col items-center text-center gap-1 mb-8">
                <div className="w-12 h-12 rounded-xl bg-copper-50 border border-copper-100 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5 text-copper-600" />
                </div>
                <h2 className="font-display font-semibold text-stone-900 text-2xl tracking-tight">Sign In</h2>
                <p className="text-stone-500 text-sm">Enter your phone number to get started</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-stone-600 font-semibold text-sm flex-shrink-0 shadow-inner">
                      🇮🇳 {COUNTRY_CODE}
                    </div>
                    <input
                      id="phone-input"
                      type="tel"
                      inputMode="numeric"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-copper-500 focus:bg-white transition-all placeholder:text-stone-300 shadow-inner"
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-rose-500 text-sm font-medium pt-1 text-center">{error}</p>
                )}

                <button
                  id="send-otp-btn"
                  onClick={handleSendOTP}
                  disabled={loading || phone.length !== 10}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all',
                    phone.length === 10 && !loading
                      ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                      : 'bg-stone-100 text-stone-400 cursor-not-allowed',
                  )}
                >
                  {loading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send Secure OTP
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                <button
                  id="demo-login-btn"
                  onClick={handleDemoLogin}
                  className="w-full py-4 rounded-xl font-bold text-sm text-stone-500 hover:text-stone-900 border border-transparent hover:border-stone-100 transition-all font-display"
                >
                  Skip for Demo
                </button>
              </div>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-stone-200" />
                <span className="text-stone-400 text-xs font-semibold uppercase tracking-widest">New user?</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-stone-200" />
              </div>

              <Link
                href="/onboarding"
                id="register-link"
                className="block w-full text-center py-3.5 rounded-xl border-2 border-copper-200 text-copper-700 font-bold text-sm hover:bg-copper-50 transition-colors"
              >
                Create a Profile
              </Link>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
              <button
                onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                className="absolute top-8 left-8 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center gap-1 mb-8">
                <div className="w-12 h-12 rounded-xl bg-sage-50 border border-sage-100 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-sage-600" />
                </div>
                <h2 className="font-display font-semibold text-stone-900 text-2xl tracking-tight">Verify Code</h2>
                <p className="text-stone-500 text-sm">
                  Sent to <span className="font-semibold text-stone-800">{COUNTRY_CODE} {phone}</span>
                </p>
              </div>

              <OTPInput value={otp} onChange={setOtp} />

              {error && <p className="text-rose-500 text-sm font-medium text-center mt-4 w-full">{error}</p>}

              <button
                id="verify-otp-btn"
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all mt-8',
                  otp.length === 6 && !loading
                    ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed',
                )}
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Securely Verify'}
              </button>

              <p className="text-center text-stone-500 text-sm mt-6 font-medium">
                {timer > 0 ? (
                  <>Resend OTP in <span className="font-bold text-stone-900">{timer}s</span></>
                ) : (
                  <button
                    id="resend-otp-btn"
                    onClick={() => { setOtp(''); handleSendOTP(); }}
                    className="text-copper-600 font-bold hover:text-copper-700 underline underline-offset-2"
                  >
                    Resend Code
                  </button>
                )}
              </p>
            </div>
          )}

          {/* Trust note */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-2.5">
            <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <p className="text-stone-400 text-[11px] font-medium tracking-wide uppercase">
              256-bit secure encryption
            </p>
          </div>
        </div>

        <p className="text-center text-stone-400 text-xs mt-8">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-stone-500 hover:text-stone-800 font-medium transition-colors">Terms of Service</Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-stone-500 hover:text-stone-800 font-medium transition-colors">Privacy Policy</Link>
        </p>
      </div>
      </div>
    </div>
  );
}
