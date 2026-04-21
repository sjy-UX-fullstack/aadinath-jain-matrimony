'use client';

import { useState, useMemo, useEffect } from 'react';
import MatchCard from '@/components/feed/MatchCard';
import FeedFilters, { FilterState } from '@/components/feed/FeedFilters';
import UpgradeBanner from '@/components/feed/UpgradeBanner';
import AppNav from '@/components/layout/AppNav';
import { supabase } from '@/lib/supabase';
import { MOCK_PROFILES } from '@/lib/mockData';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  Users,
  Search,
  Sparkles,
  RefreshCw,
  ChevronRight,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Demo toggle ──────────────────────────────────────────
// In production, replace this with real Firebase Auth + subscription check.
type ViewMode = 'free' | 'premium';

// ─── Stats bar ───────────────────────────────────────────
function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-2xl px-5 py-4 border border-stone-200/50 shadow-sm transition-transform hover:-translate-y-0.5">
      <div className="w-10 h-10 rounded-xl bg-copper-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-copper-600" />
      </div>
      <div>
        <p className="text-xl font-display font-bold text-stone-900 leading-none mb-1">{value}</p>
        <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

// ─── Sort Options ─────────────────────────────────────────
const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'age_asc',   label: 'Age: Young to Old' },
  { value: 'age_desc',  label: 'Age: Old to Young' },
  { value: 'relevance', label: 'Most Relevant' },
];

// ─── Main Feed Page ───────────────────────────────────────
export default function FeedPage() {
  // Demo: toggle between free / premium view
  const [viewMode, setViewMode] = useState<ViewMode>('free');
  const [gridMode, setGridMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [profilesData, setProfilesData] = useState(MOCK_PROFILES);

  // Fetch from Supabase if configured
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // If supabase anon key doesn't exist, this might fail or return nothing, so we fallback
        const { data, error } = await supabase.from('profiles').select('*');
        if (!error && data && data.length > 0) {
          // Map DB fields to our frontend structure if needed
          // For now, assume it exactly matches or we just use it directly
          setProfilesData(data as any);
        }
      } catch (e) {
        console.warn('Failed to fetch from supabase, using mock data.');
      }
    };
    fetchProfiles();
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    ageMin: 21,
    ageMax: 40,
    heightMinCm: 150,
    heightMaxCm: 190,
    state: 'All States',
    income: 'Any',
    qualification: 'Any',
    diet: 'any',
    sect: 'any',
    verifiedOnly: false,
    relocate: false,
  });

  // Basic client-side filtering for demo
  const filtered = useMemo(() => {
    return profilesData.filter((p) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !p.fullName.toLowerCase().includes(q) &&
          !p.currentCity.toLowerCase().includes(q) &&
          !p.currentState.toLowerCase().includes(q)
        ) return false;
      }
      if (p.age < filters.ageMin || p.age > filters.ageMax) return false;
      if (p.heightCm < filters.heightMinCm || p.heightCm > filters.heightMaxCm) return false;
      if (filters.state !== 'All States' && p.currentState !== filters.state) return false;
      if (filters.diet !== 'any' && p.diet !== filters.diet) return false;
      if (filters.sect !== 'any' && p.subSect !== filters.sect) return false;
      if (filters.verifiedOnly && p.verificationStatus !== 'verified') return false;
      if (filters.relocate && !p.willingToRelocate) return false;
      return true;
    });
  }, [filters]);

  const isPremium = viewMode === 'premium';

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Nav ────────────────────────────────────────── */}
      <AppNav isPremium={isPremium} userName="Sanjay J." />

      {/* ── Hero Strip ─────────────────────────────────── */}
      <div className="bg-stone-100/50 border-b border-stone-200 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50">
           <div className="absolute top-0 right-0 w-64 h-64 bg-copper-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
           <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-stone-300/40 rounded-full blur-3xl translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 tracking-tight mb-1">
                Find Your Perfect Match
              </h1>
              <p className="text-stone-500 text-sm">
                Curated profiles from the Adinath Jain community.
              </p>
            </div>

            {/* Demo toggle — free vs premium */}
            <div className="flex items-center gap-1.5 self-start md:self-center glass border border-stone-200 rounded-xl p-1.5">
              <button
                id="demo-free-toggle"
                onClick={() => setViewMode('free')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                  viewMode === 'free'
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100/50',
                )}
              >
                Free View
              </button>
              <button
                id="demo-premium-toggle"
                onClick={() => setViewMode('premium')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                  viewMode === 'premium'
                    ? 'bg-copper-50 bg-gradient-to-br from-copper-50 to-copper-100 text-copper-700 shadow-md border border-copper-200/50'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100/50',
                )}
              >
                <Sparkles className="w-4 h-4" />
                Premium View
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Active Profiles" value="1,240+" icon={Users} />
            <StatCard label="Verified Members" value="890+" icon={Star} />
            <StatCard label="Matches Made" value="340+" icon={Sparkles} />
            <StatCard label="Cities Covered" value="65+" icon={Search} />
          </div>
        </div>
      </div>

      {/* ── Main Layout ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Free-tier banner (only when in free mode) */}
        {!isPremium && (
          <div className="mb-8">
            <UpgradeBanner />
          </div>
        )}

        <div className="flex gap-8">
          {/* ── Sidebar Filters ─────────────────────────── */}
          <div className="hidden lg:block flex-shrink-0 rounded-3xl" style={{ width: '280px' }}>
            <div className="sticky top-24">
              <FeedFilters
                filters={filters}
                onChange={setFilters}
                mobileOpen={mobileFiltersOpen}
                onMobileClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>

          {/* ── Feed Content ─────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-3 pl-2">
                {/* Mobile filter toggle */}
                <button
                  id="mobile-filter-toggle"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm font-semibold text-stone-700 hover:border-stone-300 transition-colors shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                <p className="text-sm font-medium text-stone-500">
                  <span className="font-bold text-stone-900">{filtered.length}</span> profiles
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort */}
                <select
                  id="feed-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-medium rounded-xl border border-stone-200 bg-white text-stone-700 px-4 py-2focus:outline-none focus:ring-2 focus:ring-copper-500 shadow-sm appearance-none pr-8 cursor-pointer hover:bg-stone-50"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2378716C' stroke-width='2'%3e%3cpath d='m6 9 6 6 6-6'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                {/* Grid/List toggle */}
                <div className="flex bg-stone-100 rounded-xl p-1 shadow-inner">
                  <button
                    id="view-grid"
                    onClick={() => setGridMode('grid')}
                    className={cn('p-1.5 rounded-lg transition-all', gridMode === 'grid' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-700')}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    id="view-list"
                    onClick={() => setGridMode('list')}
                    className={cn('p-1.5 rounded-lg transition-all', gridMode === 'list' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-700')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <button
                  id="refresh-feed"
                  className="p-2 bg-white border border-stone-200 rounded-xl text-stone-400 hover:text-stone-900 hover:border-stone-300 transition-colors shadow-sm ml-1"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Demo Side-By-Side Label ─────────────────── */}
            <div className={cn(
              'mb-6 flex items-center gap-3 p-4 rounded-xl text-sm transition-all shadow-sm border',
              isPremium
                ? 'bg-copper-50/50 border-copper-200 text-copper-800'
                : 'bg-stone-50 border-stone-200 text-stone-700',
            )}>
              {isPremium ? (
                <>
                  <Sparkles className="w-5 h-5 text-copper-500 flex-shrink-0" />
                  <span className="font-medium">
                    <strong className="font-bold uppercase tracking-wide text-copper-900 text-xs mr-2 border border-copper-200 bg-white px-2 py-0.5 rounded">Premium View</strong> 
                    Full names, photos, contact details, gotras, and income are visible. The "Offline Meeting" CTA is unlocked.
                  </span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 text-stone-500 flex-shrink-0" />
                  <span className="font-medium">
                    <strong className="font-bold uppercase tracking-wide text-stone-900 text-xs mr-2 border border-stone-200 bg-white px-2 py-0.5 rounded">Free View</strong> 
                    Photos blurred. Names, contact, income & gotra are locked.{' '}
                    <button onClick={() => setViewMode('premium')} className="text-copper-600 font-bold ml-1 hover:underline">
                      See Premium →
                    </button>
                  </span>
                </>
              )}
            </div>

            {/* Cards Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-stone-100 text-center">
                <div className="w-20 h-20 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-stone-900 mb-2">No profiles found</h3>
                <p className="text-stone-500">Try adjusting your filters to broaden your search.</p>
              </div>
            ) : (
              <div
                className={cn(
                  'gap-6',
                  gridMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2' // Reduced from 3 to 2 so cards are larger and more premium look
                    : 'flex flex-col gap-6',
                )}
              >
                {filtered.map((profile, i) => (
                  <div key={profile.id} className="page-enter" style={{ animationDelay: `${i * 0.05}s`}}>
                    <MatchCard
                      profile={profile}
                      viewerIsPremium={isPremium}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Load more */}
            {filtered.length > 0 && (
              <div className="mt-12 flex justify-center">
                <button
                  id="load-more-profiles"
                  className="flex items-center gap-2 bg-white border border-stone-200 hover:border-stone-300 rounded-full px-8 py-4 text-sm font-bold text-stone-600 hover:text-stone-900 transition-all shadow-sm hover:shadow-md"
                >
                  Load More Profiles
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
