import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center opacity-70">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-copper-200/30 mesh-blob" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-stone-300/30 mesh-blob" style={{ animationDelay: '-8s', marginLeft: '20%' }} />
      </div>

      <div className="relative z-10 glass p-12 rounded-[2rem] max-w-lg w-full shadow-2xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Large 404 Text */}
        <h1 className="text-8xl font-display font-bold text-copper-600 mb-2 drop-shadow-sm">
          404
        </h1>
        
        <h2 className="text-2xl font-display font-semibold text-stone-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-stone-500 mb-10 max-w-sm mx-auto leading-relaxed">
          It looks like the profile or page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-medium px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-medium px-6 py-3.5 rounded-xl transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-stone-400" />
            Go Back
          </button>
        </div>
      </div>
      
    </div>
  );
}
