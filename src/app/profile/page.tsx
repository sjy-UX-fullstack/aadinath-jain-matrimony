'use client';

import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Users, Heart, ShieldCheck, Edit3, Camera, Save, X,
  ChevronRight, Calendar, Ruler, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// ─── Mock User Data ───────────────────────────────────────
const MOCK_USER = {
  fullName: 'Sanjay Jain',
  age: 28,
  heightCm: 178,
  dob: '1996-05-15',
  maritalStatus: 'Never Married',
  gender: 'Male',
  mobile: '+91 98765 43210',
  email: 'sanjay.j@example.com',
  subSect: 'Digambar',
  subSectBranch: 'Mandir',
  paternalGotra: 'Golchha',
  maternalGotra: 'Nahar',
  currentCity: 'Indore',
  currentState: 'Madhya Pradesh',
  highestQualification: 'B.Tech + MBA',
  occupation: 'Business Owner',
  jobTitle: 'Creative Director',
  annualIncome: '20L - 30L',
  familyType: 'Joint',
  diet: 'Strict Jain (No Root Veg)',
  aboutMe: 'I am a passionate entrepreneur who values traditional Jain principles while embracing modern creativity. Looking for a partner who shares similar values and a zest for life.',
  profilePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600'
};

// ─── Components ───────────────────────────────────────────

function ProfileSection({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-stone-200 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-bl-[3rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
      <div className="flex items-center gap-4 mb-8 relative">
        <div className="w-12 h-12 rounded-2xl bg-copper-50 flex items-center justify-center border border-copper-100/50">
          <Icon className="w-6 h-6 text-copper-600" />
        </div>
        <h3 className="text-xl font-display font-semibold text-stone-900 tracking-tight">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 relative">
        {children}
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{label}</p>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-stone-300" />}
        <p className="text-[15px] font-medium text-stone-900">{value}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(MOCK_USER);

  return (
    <div className="min-h-screen bg-stone-50">
      <AppNav isPremium={true} userName={user.fullName} />

      {/* ── Header / Hero ─────────────────────────────────── */}
      <div className="relative py-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src={user.profilePhoto} alt="Background" fill className="object-cover blur-3xl scale-110" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 to-stone-900" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
            {/* Profile Photo */}
            <div className="relative group">
              <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-[6px] border-white/10 shadow-2xl relative">
                <Image src={user.profilePhoto} alt={user.fullName} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-copper-500 text-stone-900 p-3 rounded-2xl shadow-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left mb-4">
              <div className="flex flex-col md:flex-row items-center md:items-baseline gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                  {user.fullName}
                </h1>
                <span className="text-copper-400 font-display text-2xl font-light">#{user.age}</span>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="glass-dark px-4 py-2 rounded-xl text-white/80 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-copper-400" />
                  {user.currentCity}, {user.currentState}
                </div>
                <div className="glass-dark px-4 py-2 rounded-xl text-white/80 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-copper-400" />
                  {user.occupation}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl",
                isEditing 
                  ? "bg-white text-stone-900 hover:bg-stone-50" 
                  : "bg-copper-500 text-stone-900 hover:bg-copper-400"
              )}
            >
              {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
            </button>
          </div>
        </div>
      </div>

      {/* ── Profile Content ───────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main sections */}
          <div className="lg:col-span-2 space-y-8">
            
            <ProfileSection title="About Me" icon={Info}>
              <div className="md:col-span-2">
                 <p className="text-stone-601 text-lg leading-relaxed italic">"{user.aboutMe}"</p>
              </div>
            </ProfileSection>

            <ProfileSection title="Personal Basics" icon={User}>
              <InfoItem label="Full Name" value={user.fullName} />
              <InfoItem label="Date of Birth" value={user.dob} icon={Calendar} />
              <InfoItem label="Height" value={`${user.heightCm} cm`} icon={Ruler} />
              <InfoItem label="Marital Status" value={user.maritalStatus} icon={Heart} />
            </ProfileSection>

            <ProfileSection title="Religious & Cultural" icon={Heart}>
              <InfoItem label="Sect" value={user.subSect} />
              <InfoItem label="Branch" value={user.subSectBranch} />
              <InfoItem label="Paternal Gotra" value={user.paternalGotra} />
              <InfoItem label="Maternal Gotra" value={user.maternalGotra} />
            </ProfileSection>

            <ProfileSection title="Career & Education" icon={Briefcase}>
              <InfoItem label="Highest Degree" value={user.highestQualification} icon={GraduationCap} />
              <InfoItem label="Occupation" value={user.occupation} />
              <InfoItem label="Job Title" value={user.jobTitle} />
              <InfoItem label="Annual Income" value={user.annualIncome} />
            </ProfileSection>

            <ProfileSection title="Family Details" icon={Users}>
              <InfoItem label="Family Type" value={user.familyType} />
              <InfoItem label="Current Location" value={`${user.currentCity}, ${user.currentState}`} />
            </ProfileSection>

          </div>

          {/* Sidebar / Contact Info */}
          <div className="space-y-8">
            <div className="bg-stone-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-copper-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <h3 className="text-xl font-display font-semibold mb-8 relative">Contact Details</h3>
               <div className="space-y-6 relative">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Mail className="w-4 h-4 text-copper-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Email</p>
                      <p className="font-medium text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Phone className="w-4 h-4 text-copper-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Mobile</p>
                      <p className="font-medium text-sm">{user.mobile}</p>
                    </div>
                  </div>
               </div>
               
               <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-sage-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">ID Verified User</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">Your contact details are only visible to matches whose requests you have accepted.</p>
               </div>
            </div>

            <div className="bg-copper-50 rounded-[2.5rem] p-8 border border-copper-100">
               <h3 className="text-xl font-display font-semibold text-stone-900 mb-6">Profile Strength</h3>
               <div className="w-full bg-copper-200/50 rounded-full h-2 mb-4 overflow-hidden">
                  <div className="w-[85%] h-full bg-copper-500 rounded-full" />
               </div>
               <p className="text-sm font-bold text-copper-700 mb-4">85% Complete</p>
               <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                    <CheckCircle className="w-4 h-4 text-sage-500" /> Basics Completed
                  </li>
                  <li className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                    <CheckCircle className="w-4 h-4 text-sage-500" /> ID Verified
                  </li>
                  <li className="flex items-center gap-2 text-xs text-stone-400 font-medium">
                    <Info className="w-4 h-4" /> Add sibling details (+15%)
                  </li>
               </ul>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
