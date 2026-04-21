'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  ShieldCheck,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Users,
  Sparkles,
  Phone,
  MessageCircle,
  CalendarCheck,
  ChevronRight,
} from 'lucide-react';
import { cn, formatHeight, DIET_LABELS, OCCUPATION_LABELS, MARITAL_LABELS, SUBSECT_LABELS, BRANCH_LABELS, MANGLIK_LABELS } from '@/lib/utils';
import type { ProfileCardData } from '@/types/matrimony';

// ─────────────────────────────────────────────────────────
// Pill Badge
// ─────────────────────────────────────────────────────────
function Pill({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border uppercase tracking-wider',
        className ?? 'bg-stone-50 text-stone-700 border-stone-200',
      )}
    >
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────
// Info Row
// ─────────────────────────────────────────────────────────
function InfoRow({
  icon: Icon,
  label,
  value,
  locked,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  locked?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center">
        <Icon className="w-4 h-4 text-copper-600" />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 font-bold mb-0.5">{label}</p>
        {locked ? (
          <div className="flex items-center gap-1.5 mt-1 bg-stone-50 w-fit px-2 py-0.5 rounded border border-stone-100">
            <Lock className="w-3 h-3 text-copper-500" />
            <span className="text-xs font-medium text-copper-600">Premium Only</span>
          </div>
        ) : (
          <p className="text-sm font-medium text-stone-900 truncate">{value}</p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Upgrade Nudge Banner
// ─────────────────────────────────────────────────────────
function UpgradeNudge() {
  return (
    <Link href="/upgrade" className="block relative group overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-stone-800 transition-transform duration-500 group-hover:scale-105" />
      
      {/* Decorative shimmer */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-32 h-32 bg-copper-500/20 rounded-full blur-2xl" />
      
      <div className="relative p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-copper-500/10 border border-copper-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-copper-400" />
            </div>
            <div>
              <p className="text-copper-400 text-[10px] uppercase tracking-widest font-bold mb-0.5">Locked Profile</p>
              <p className="text-white font-display font-medium text-lg leading-tight">Upgrade to Premium</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-stone-400 text-xs line-through mb-0.5">₹19,999</p>
            <p className="text-white font-display font-bold text-xl leading-none">
              ₹9,999<span className="text-stone-400 text-sm font-medium">/yr</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2 text-stone-900 transition-transform active:scale-95 shadow-lg shadow-black/20 group-hover:bg-copper-50">
            <span className="text-sm font-bold">Unlock</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────
// Main MatchCard Component
// ─────────────────────────────────────────────────────────
interface MatchCardProps {
  profile: ProfileCardData;
  viewerIsPremium: boolean;
  compact?: boolean;
}

export default function MatchCard({ profile, viewerIsPremium, compact = false }: MatchCardProps) {
  const [showInterestSent, setShowInterestSent] = useState(false);
  const isLocked = !viewerIsPremium;

  const sect = `${SUBSECT_LABELS[profile.subSect] ?? profile.subSect} · ${BRANCH_LABELS[profile.subSectBranch] ?? profile.subSectBranch}`;

  return (
    <article
      className={cn(
        'card flex flex-col',
        compact ? 'max-w-sm' : 'max-w-[420px]',
      )}
    >
      {/* ── Photo Area ─────────────────────────────────────── */}
      <div className="relative h-80 bg-stone-100 overflow-hidden flex-shrink-0 rounded-t-2xl">
        <div className={cn('w-full h-full transition-transform duration-700', isLocked ? 'blur-[16px] scale-110 saturate-50' : 'hover:scale-105')}>
          <Image
            src={profile.profilePhotoUrl}
            alt={isLocked ? 'Profile Photo' : profile.fullName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent pointer-events-none" />

        {/* Lock icon centre */}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none z-10">
            <div className="w-16 h-16 rounded-full glass-dark flex items-center justify-center shadow-2xl">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="glass-dark px-4 py-1.5 rounded-full">
              <p className="text-white text-xs font-semibold uppercase tracking-wider">
                Photo Locked
              </p>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          {profile.verificationStatus === 'verified' && (
            <div className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-sage-600" />
              <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wide">ID Verified</span>
            </div>
          )}
          
          {!isLocked && (
            <div className="bg-stone-900/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5 rounded-full px-3 py-1.5 ml-auto">
              <Sparkles className="w-3.5 h-3.5 text-copper-400" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wide">Premium</span>
            </div>
          )}
        </div>

        {/* Bottom name bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          {isLocked ? (
            <div className="flex items-center gap-2 glass-dark w-fit px-3 py-2 rounded-lg">
              <Lock className="w-4 h-4 text-copper-400" />
              <span className="text-white text-sm font-medium tracking-wide">Name hidden</span>
            </div>
          ) : (
            <div>
              <h3 className="text-white font-display text-2xl font-semibold mb-1 tracking-tight shadow-sm">
                {profile.fullName}
              </h3>
              <p className="text-stone-300 font-medium text-sm drop-shadow-sm flex items-center gap-1.5">
                <span>{profile.age} yrs</span>
                <span className="w-1 h-1 rounded-full bg-stone-500" />
                <span>{formatHeight(profile.heightCm)}</span>
                <span className="w-1 h-1 rounded-full bg-stone-500" />
                <span>{MARITAL_LABELS[profile.maritalStatus]}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Card Body ──────────────────────────────────────── */}
      <div className="flex-1 p-6 flex flex-col gap-6">

        {/* Key Pills */}
        <div className="flex flex-wrap gap-2">
          <Pill label={sect} />
          <Pill label={DIET_LABELS[profile.diet] ?? profile.diet} className="bg-sage-50 text-sage-600 border-sage-200" />
          {profile.willingToRelocate && (
            <Pill label="Open to Relocate" className="bg-sky-50 text-sky-600 border-sky-200" />
          )}
          <Pill label={MANGLIK_LABELS[profile.manglikStatus] ?? profile.manglikStatus} className="bg-copper-50 text-copper-700 border-copper-200" />
        </div>

        <div className="divider" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-4">
          <InfoRow
            icon={MapPin}
            label="Location"
            value={`${profile.currentCity}, ${profile.currentState}`}
          />
          <InfoRow
            icon={Briefcase}
            label="Occupation"
            value={`${OCCUPATION_LABELS[profile.occupation] ?? profile.occupation} · ${profile.annualIncomeRange}`}
            locked={isLocked}
          />
          <InfoRow
            icon={GraduationCap}
            label="Education"
            value={profile.highestQualification}
          />
          <InfoRow
            icon={Users}
            label="Gotra · Pat / Mat"
            value={`${profile.paternalGotra} / ${profile.maternalGotra}`}
            locked={isLocked}
          />
          <InfoRow
            icon={Heart}
            label="Family Setup"
            value={profile.familyType === 'nuclear' ? 'Nuclear Family' : 'Joint Family'}
          />
        </div>

        {/* About snippet */}
        {profile.aboutMe && !isLocked && (
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 relative overflow-hidden">
             <div className="absolute top-2 left-2 text-stone-200 font-display text-4xl leading-none">"</div>
            <p className="text-stone-600 text-sm leading-relaxed italic relative z-10 pl-2">
              {profile.aboutMe}
            </p>
          </div>
        )}

        <div className="divider" />

        {/* CTA Section */}
        {isLocked ? (
          <UpgradeNudge />
        ) : (
          <div className="flex flex-col gap-3">
            {/* Send Interest */}
            {!showInterestSent ? (
              <button
                id={`send-interest-${profile.id}`}
                onClick={() => setShowInterestSent(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium py-3.5 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <Heart className="w-5 h-5 transition-transform hover:scale-110" />
                Send Interest
              </button>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 rounded-xl bg-sage-50 border border-sage-200 text-sage-600 font-semibold py-3.5">
                <ShieldCheck className="w-5 h-5" />
                Interest Sent Successfully
              </div>
            )}

            {/* Secondary row */}
            <div className="flex gap-3">
              <button
                id={`message-${profile.id}`}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium py-3 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-stone-400" />
                Message
              </button>
              <button
                id={`contact-${profile.id}`}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium py-3 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-stone-400" />
                Contact
              </button>
            </div>

            {/* Offline Family Meeting CTA */}
            <button
              id={`meeting-${profile.id}`}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-copper-50 hover:bg-copper-100 border border-copper-200 text-copper-800 font-semibold py-3 transition-colors shadow-sm mt-1"
            >
              <CalendarCheck className="w-4 h-4" />
              Request Offline Family Meeting
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
