import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Users, Star, Sparkles, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col relative overflow-hidden">
      
      {/* ── Abstract Mesh Background ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-copper-200/40 mesh-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-stone-300/40 mesh-blob" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-rose-100/40 mesh-blob" style={{ animationDelay: '-10s' }} />
        
        {/* Fine grid overlay for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(28,25,23,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,25,23,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_100%)]" />
      </div>

      {/* ── Hero Content ─────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start page-enter">
            <div className="inline-flex items-center gap-2 bg-stone-900/5 hover:bg-stone-900/10 transition-colors border border-stone-900/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md cursor-pointer page-enter">
              <Sparkles className="w-3.5 h-3.5 text-copper-600" />
              <span className="text-stone-700 text-[11px] font-semibold uppercase tracking-[0.2em]">Adinath Jain Community</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-stone-900 tracking-tight leading-[1.05] mb-6 page-enter" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              Find your perfect <br className="hidden sm:block" />
              <span className="italic font-light text-stone-600">life partner.</span>
            </h1>

            <p className="text-stone-500 text-lg sm:text-xl max-w-xl leading-relaxed mb-12 page-enter" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              A premium matrimony experience exclusively for the Digambar and Shwetambar Jain community. Traditional values meet modern design.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto page-enter" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <Link
                href="/login"
                id="home-get-started"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-medium px-8 py-4 rounded-xl text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-stone-900/20"
              >
                Create your profile
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/feed"
                id="home-browse"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/50 hover:bg-white text-stone-900 border border-stone-200 font-medium px-8 py-4 rounded-xl text-base transition-all backdrop-blur-sm shadow-sm"
              >
                Browse matches
              </Link>
            </div>
          </div>

          {/* Right: Floating Couples Collage */}
          <div className="relative hidden lg:block h-[600px] w-full page-enter" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            {/* Top Left Image */}
            <div className="absolute top-0 left-0 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl glass transform -rotate-3 hover:translate-y-[-10px] transition-transform duration-500 z-20">
              <Image 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
                alt="Happy Bride" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/60 to-transparent p-4">
                <p className="text-white font-medium drop-shadow-sm font-display">Priya & Rahul</p>
                <p className="text-white/80 text-xs shadow-sm">Matched 2 months ago</p>
              </div>
            </div>
            
            {/* Bottom Right Image */}
            <div className="absolute bottom-10 right-0 w-72 h-80 rounded-2xl overflow-hidden shadow-2xl glass transform rotate-2 hover:translate-y-[-10px] transition-transform duration-500 z-10">
              <Image 
                src="https://images.unsplash.com/photo-1543132220-4bf5292c58ee?auto=format&fit=crop&q=80&w=800" 
                alt="Happy Couple" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/60 to-transparent p-4">
                <p className="text-white font-medium drop-shadow-sm font-display">Ananya & Sid</p>
                <p className="text-white/80 text-xs shadow-sm">Married 2024</p>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass px-6 py-4 rounded-2xl shadow-2xl z-30 flex items-center gap-4 animate-bounce-slow">
              <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center">
                <Heart className="w-5 h-5 text-copper-400" fill="currentColor" />
              </div>
              <div>
                 <p className="text-stone-900 font-display font-bold text-lg leading-none">1,240+</p>
                 <p className="text-stone-500 text-xs font-medium uppercase tracking-wider mt-1">Matches Made</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* ── Bento Floating Trust Section ───────────────── */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full page-enter" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          {[
            { icon: Users, value: '25,000+', label: 'Active Members', desc: 'Growing community of verified individuals sharing your values.' },
            { icon: ShieldCheck, value: '100%', label: 'ID Verified', desc: 'Every profile is manually checked for safety & authenticity.' },
            { icon: Star, value: 'Premium', label: 'Exclusive Experience', desc: 'State of the art platform with seamless communication.' },
          ].map(({ icon: Icon, value, label, desc }, i) => (
            <div key={label} className="glass p-8 rounded-3xl flex flex-col items-center lg:items-start text-center lg:text-left transition-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-900/5 duration-500">
              <div className="w-14 h-14 rounded-2xl bg-copper-50/50 border border-copper-100/50 flex items-center justify-center mb-6">
                <Icon className="w-7 h-7 text-copper-600" />
              </div>
              <h3 className="text-4xl font-display font-semibold text-stone-900 mb-2">{value}</h3>
              <p className="text-stone-900 font-bold text-sm tracking-wide mb-2">{label}</p>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs">{desc}</p>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
