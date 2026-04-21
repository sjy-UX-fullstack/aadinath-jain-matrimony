'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutGrid,
  User,
  MessageCircle,
  Heart,
  LogOut,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/feed',     label: 'Matches',   icon: LayoutGrid },
  { href: '/profile',  label: 'My Profile',icon: User },
  { href: '/messages', label: 'Messages',  icon: MessageCircle },
  { href: '/interest', label: 'Interests', icon: Heart },
];

interface AppNavProps {
  isPremium?: boolean;
  userName?: string;
}

export default function AppNav({ isPremium = false, userName = 'Guest' }: AppNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
            <span className="text-copper-400 font-display font-medium text-lg leading-none">A</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-stone-900 font-display font-bold text-base tracking-tight leading-tight">
              Adinath Vivah
            </p>
            <p className="text-stone-500 text-[10px] uppercase tracking-[0.2em] font-medium leading-none mt-0.5">
              Jain Matrimony
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 p-1 bg-stone-100/50 rounded-xl border border-stone-200">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50/50',
                )}
              >
                <Icon className={cn("w-4 h-4", active ? "text-copper-500" : "text-stone-400")} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Premium badge / upgrade CTA */}
          {isPremium ? (
            <div className="hidden sm:flex items-center gap-1.5 bg-copper-50 border border-copper-200 rounded-full px-3 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-copper-600" />
              <span className="text-[11px] uppercase tracking-wider font-bold text-copper-700">Premium</span>
            </div>
          ) : (
            <Link
              href="/upgrade"
              id="nav-upgrade-cta"
              className="hidden sm:flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[13px] font-semibold px-4 py-2 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-xl hover:shadow-stone-900/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-copper-400" />
              Unlock Premium
            </Link>
          )}

          {/* User avatar */}
          <div className="flex items-center gap-2 pl-3 border-l border-stone-200">
            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center">
              <span className="text-stone-700 font-display font-bold text-xs uppercase">
                {userName.charAt(0)}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            id="nav-logout"
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors hidden sm:block"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5 text-stone-600" /> : <Menu className="w-5 h-5 text-stone-600" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-1.5 absolute w-full shadow-xl">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
               <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  active ? 'bg-stone-50 text-stone-900 border border-stone-100' : 'text-stone-600 hover:bg-stone-50',
                )}
              >
                <Icon className={cn("w-4 h-4", active ? "text-copper-500" : "text-stone-400")} />
                {label}
              </Link>
            )
          })}
          {!isPremium && (
            <Link
              href="/upgrade"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 mt-4 bg-stone-900 text-white text-sm font-medium px-4 py-3.5 rounded-xl shadow-md"
            >
              <Sparkles className="w-4 h-4 text-copper-400" />
              Upgrade to Premium
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
