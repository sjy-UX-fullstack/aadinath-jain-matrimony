'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Users, ShieldCheck, CalendarCheck,
  PlusCircle, BarChart2, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Clock, XCircle,
  ChevronRight, Search, Bell, LogOut, Sparkles,
  Menu, X, Eye, Pencil, Trash2, Phone, MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_PROFILES } from '@/lib/mockData';

// ─── Sidebar nav links ────────────────────────────────────
const ADMIN_NAV = [
  { href: '/admin',                label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/admin/users',         label: 'All Members',     icon: Users },
  { href: '/admin/verifications', label: 'Verifications',   icon: ShieldCheck },
  { href: '/admin/meetings',      label: 'Meetings',        icon: CalendarCheck },
  { href: '/admin/register',      label: 'Add Offline',     icon: PlusCircle },
];

// ─── Mock stats ───────────────────────────────────────────
const STATS = [
  { label: 'Total Members', value: '1,247', change: '+12', up: true, icon: Users },
  { label: 'Premium Members', value: '368', change: '+8', up: true, icon: Sparkles },
  { label: 'Pending Verification', value: '47', change: '+3', up: false, icon: ShieldCheck },
  { label: 'Meetings Scheduled', value: '23', change: '+5', up: true, icon: CalendarCheck },
];

// ─── Mock recent registrations ────────────────────────────
const RECENT_REGS = MOCK_PROFILES.map((p, i) => ({
  id: p.id,
  name: p.fullName,
  age: p.age,
  city: `${p.currentCity}, ${p.currentState}`,
  sect: p.subSect,
  verificationStatus: p.verificationStatus,
  plan: i === 0 ? 'premium' : 'free',
  registeredOn: `${20 - i} Apr 2026`,
  mobile: '+91 98765 ' + (43210 + i),
  source: i % 2 === 0 ? 'online' : 'offline',
}));

// ─── Admin Sidebar ────────────────────────────────────────
function AdminSidebar({ activeHref, mobileOpen, onClose }: { activeHref: string; mobileOpen: boolean; onClose: () => void }) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-30 lg:hidden" onClick={onClose} />
      )}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-64 z-40 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0',
        'bg-stone-950 border-r border-stone-800',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-stone-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center border border-stone-700 shadow-inner">
              <span className="text-copper-400 font-display font-medium text-xl leading-none">A</span>
            </div>
            <div>
              <p className="text-white font-display font-bold text-base tracking-tight">Adinath Admin</p>
              <p className="text-stone-500 text-[10px] uppercase tracking-widest font-semibold mt-0.5">Control Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-stone-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
            const active = activeHref === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                  active
                    ? 'bg-copper-500/10 text-copper-400 border border-copper-500/20 shadow-inner'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/50',
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {label === 'Verifications' && (
                  <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">47</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin user footer */}
        <div className="border-t border-stone-800/50 p-5 mt-auto bg-stone-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center flex-shrink-0">
              <span className="text-stone-300 font-display font-bold text-sm">SC</span>
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-stone-200 text-sm font-semibold truncate">Sanjay Coordinator</p>
              <p className="text-stone-500 text-[11px] font-medium uppercase tracking-wider mt-0.5">Jaipur Region</p>
            </div>
            <button className="text-stone-500 hover:text-white transition-colors p-2 hover:bg-stone-800 rounded-lg">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Stat Card Component ──────────────────────────────────
function StatCard({ label, value, change, up, icon: Icon }: typeof STATS[0]) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-[0_2px_10px_rgba(28,25,23,0.02)] transition-transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-copper-600" />
        </div>
        <div className={cn(
          'flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border',
          up ? 'bg-sage-50 text-sage-700 border-sage-100' : 'bg-rose-50 text-rose-700 border-rose-100',
        )}>
          {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {change} this week
        </div>
      </div>
      <p className="text-3xl font-display font-bold text-stone-900 mb-1">{value}</p>
      <p className="text-stone-500 text-sm font-medium">{label}</p>
    </div>
  );
}

// ─── Verification Status Badge ────────────────────────────
function VerifBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider',
      status === 'verified'  ? 'bg-sage-50 text-sage-700 border border-sage-200' :
      status === 'pending'   ? 'bg-stone-100 text-stone-600 border border-stone-200' :
      'bg-rose-50 text-rose-700 border border-rose-200',
    )}>
      {status === 'verified' ? <CheckCircle className="w-3 h-3" /> :
       status === 'pending'  ? <Clock className="w-3 h-3" /> :
       <XCircle className="w-3 h-3" />}
      {status === 'verified' ? 'Verified' : status === 'pending' ? 'Pending' : 'Rejected'}
    </span>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'meetings'>('overview');

  const filteredMembers = RECENT_REGS.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <AdminSidebar
        activeHref="/admin"
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 h-20 flex items-center justify-between px-6 sm:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              id="admin-mobile-menu"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-stone-100 text-stone-500 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-stone-900 font-display font-semibold text-xl tracking-tight">Dashboard Overview</h1>
              <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider hidden sm:block mt-0.5">Adinath Jain Community</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-600 transition-colors border border-stone-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white" />
            </button>
            <Link
              href="/admin/register"
              id="admin-add-offline"
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:block">Add Offline Member</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {STATS.map((s) => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-stone-100/50 p-1.5 rounded-2xl border border-stone-200 mb-6 w-fit shadow-inner">
            {([
              { id: 'overview',      label: 'Recent Members' },
              { id: 'verifications', label: 'Pending IDs' },
              { id: 'meetings',      label: 'Meetings' },
            ] as const).map(({ id, label }) => (
              <button
                key={id}
                id={`admin-tab-${id}`}
                onClick={() => setActiveTab(id)}
                className={cn(
                  'px-6 py-2.5 rounded-xl text-sm font-bold transition-all',
                  activeTab === id
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50'
                    : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Recent Members Table */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-stone-100 bg-stone-50/50">
                <h2 className="font-display font-semibold text-stone-900 text-lg">Member Registrations</h2>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    id="admin-search"
                    type="text"
                    placeholder="Search members..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2.5 text-sm font-medium border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-copper-500 w-full sm:w-64 bg-white shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-stone-50/80 border-b border-stone-100">
                      {['Profile', 'Contact', 'Sect', 'Membership', 'ID Status', 'Source', 'Registered', 'Actions'].map((h) => (
                        <th key={h} className="text-left px-6 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-stone-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-stone-900 text-[15px]">{m.name}</p>
                            <p className="text-stone-500 text-xs font-medium flex items-center gap-1.5 mt-1">
                              <MapPin className="w-3 h-3 text-stone-400" />{m.city}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-stone-700 font-medium text-[13px] flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-stone-400" />{m.mobile}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-stone-700 font-medium capitalize text-[13px]">{m.sect}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            'px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border',
                            m.plan === 'premium'
                              ? 'bg-copper-50 text-copper-700 border-copper-200'
                              : 'bg-stone-50 text-stone-600 border-stone-200',
                          )}>
                            {m.plan === 'premium' ? 'Premium' : 'Free'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <VerifBadge status={m.verificationStatus} />
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            'px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border',
                            m.source === 'online'
                              ? 'bg-stone-100 text-stone-600 border-stone-200'
                              : 'bg-sky-50 text-sky-700 border-sky-200',
                          )}>
                            {m.source === 'online' ? 'Online' : 'Offline'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-stone-500 font-medium text-[13px] whitespace-nowrap">{m.registeredOn}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              id={`admin-view-${m.id}`}
                              className="p-2 rounded-lg bg-stone-50 hover:bg-stone-200 text-stone-600 transition-colors border border-stone-200"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              id={`admin-edit-${m.id}`}
                              className="p-2 rounded-lg bg-stone-50 hover:bg-stone-200 text-stone-600 transition-colors border border-stone-200"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            {m.verificationStatus === 'pending' && (
                              <button
                                id={`admin-verify-${m.id}`}
                                className="p-2 rounded-lg bg-sage-50 border border-sage-200 hover:bg-sage-100 text-sage-600 transition-colors"
                                title="Verify ID"
                              >
                                <ShieldCheck className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Verifications Tab */}
          {activeTab === 'verifications' && (
            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm p-8">
              <h2 className="font-display font-semibold text-stone-900 text-xl mb-6">Pending Verifications (47)</h2>
              <div className="space-y-4">
                {filteredMembers.filter((m) => m.verificationStatus === 'pending').map((m) => (
                  <div key={m.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-stone-200 bg-stone-50 hover:border-copper-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-copper-100 border border-copper-200 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-copper-600" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 text-base">{m.name}</p>
                        <p className="text-stone-500 text-sm font-medium mt-0.5">{m.mobile} · {m.city}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        id={`verif-approve-${m.id}`}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold transition-colors shadow-sm"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        id={`verif-reject-${m.id}`}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-sm font-bold hover:bg-stone-100 transition-colors shadow-sm"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meetings Tab */}
          {activeTab === 'meetings' && (
            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="font-display font-semibold text-stone-900 text-xl">Scheduled Offline Meetings (23)</h2>
                <button
                  id="admin-schedule-meeting"
                  className="flex items-center justify-center gap-2 bg-copper-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-copper-500 transition-all shadow-md hover:shadow-lg"
                >
                  <PlusCircle className="w-4 h-4" />
                  Schedule Meeting
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { id: 'm1', families: 'Priya Golchha × Aryan Kothari', date: '22 Apr 2026', venue: 'Rajasthan Club, Jaipur', status: 'confirmed' },
                  { id: 'm2', families: 'Ankita Jain × Vivek Saklecha', date: '25 Apr 2026', venue: 'Residence, Jaipur', status: 'pending' },
                  { id: 'm3', families: 'Deepika Mehta × Rohit Doshi', date: '28 Apr 2026', venue: 'TBD', status: 'pending' },
                ].map((meeting) => (
                  <div key={meeting.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-stone-200 bg-stone-50 hover:shadow-sm transition-all hover:border-copper-200">
                     <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                        <CalendarCheck className="w-5 h-5 text-copper-600" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 text-[15px]">{meeting.families}</p>
                        <p className="text-stone-500 text-[13px] font-medium mt-1 uppercase tracking-wide">{meeting.date} · {meeting.venue}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <span className={cn(
                        'px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border',
                        meeting.status === 'confirmed' ? 'bg-sage-50 text-sage-700 border-sage-200' : 'bg-stone-200 text-stone-700 border-stone-300',
                      )}>
                        {meeting.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                      </span>
                      <button
                        id={`meeting-view-${meeting.id}`}
                        className="p-2.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
