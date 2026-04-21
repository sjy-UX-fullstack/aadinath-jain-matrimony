'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATES = [
  'All States', 'Rajasthan', 'Gujarat', 'Maharashtra', 'Delhi', 'Karnataka',
  'Madhya Pradesh', 'Uttar Pradesh', 'Haryana', 'Punjab',
];

const INCOME_RANGES = [
  'Any', '0–3 LPA', '3–5 LPA', '5–10 LPA', '10–20 LPA', '20–50 LPA', '50 LPA+',
];

const QUALIFICATIONS = [
  'Any', 'B.Com', 'B.Tech', 'B.Sc', 'M.Com', 'MBA', 'CA', 'MBBS', 'LLB', 'Ph.D', 'Other',
];

const DIET_OPTIONS = [
  { value: 'any',              label: 'Any Diet' },
  { value: 'regular_veg',      label: 'Regular Veg' },
  { value: 'jain_no_root',     label: 'Jain (No Root Veg)' },
  { value: 'strict_chauvihar', label: 'Strict Chauvihar' },
];

const SECT_OPTIONS = [
  { value: 'any',        label: 'Any Sect' },
  { value: 'digambar',   label: 'Digambar' },
  { value: 'shwetambar', label: 'Shwetambar' },
];

// ─── Collapsible Filter Section ───────────────────────────
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-100 pb-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-[13px] uppercase tracking-wider font-bold text-stone-900 hover:text-copper-600 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform text-stone-400', open && 'rotate-180')} />
      </button>
      {open && <div className="mt-2 space-y-3">{children}</div>}
    </div>
  );
}

// ─── Select Dropdown ─────────────────────────────────────
function FilterSelect({
  value,
  onChange,
  options,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[] | { value: string; label: string }[];
  id: string;
}) {
  const opts = options.map((o) =>
    typeof o === 'string' ? { value: o, label: o } : o,
  );
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-sm rounded-xl border border-stone-200 bg-stone-50 text-stone-700 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-copper-500 focus:border-copper-500 transition-all font-medium appearance-none"
    >
      {opts.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

// ─── Range Slider ─────────────────────────────────────────
function RangeRow({
  label,
  min,
  max,
  step,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  suffix,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  valueMin: number;
  valueMax: number;
  onChangeMin: (n: number) => void;
  onChangeMax: (n: number) => void;
  suffix?: string;
}) {
  return (
    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
      <div className="flex justify-between text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-2">
        <span>{label}</span>
        <span className="text-copper-600">
          {valueMin}{suffix} – {valueMax}{suffix}
        </span>
      </div>
      <div className="flex gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) => onChangeMin(Number(e.target.value))}
          className="flex-1 accent-copper-600"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(e) => onChangeMax(Number(e.target.value))}
          className="flex-1 accent-copper-600"
        />
      </div>
    </div>
  );
}

// ─── Main FeedFilters Component ───────────────────────────
export interface FilterState {
  search: string;
  ageMin: number;
  ageMax: number;
  heightMinCm: number;
  heightMaxCm: number;
  state: string;
  income: string;
  qualification: string;
  diet: string;
  sect: string;
  verifiedOnly: boolean;
  relocate: boolean;
}

interface FeedFiltersProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function FeedFilters({ filters, onChange, mobileOpen, onMobileClose }: FeedFiltersProps) {
  const set = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    onChange({ ...filters, [key]: val });

  const resetAll = () =>
    onChange({
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

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-[280px] bg-white z-40 overflow-y-auto shadow-2xl transition-transform duration-300 lg:static lg:shadow-none lg:h-auto lg:w-[280px] lg:translate-x-0 lg:z-auto lg:rounded-3xl lg:border lg:border-stone-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-6 pt-6 pb-4 border-b border-stone-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-stone-900" />
              <h2 className="font-display font-semibold text-stone-900 text-lg tracking-tight">Filters</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={resetAll}
                className="text-xs text-stone-500 hover:text-stone-900 font-semibold uppercase tracking-wider transition-colors"
              >
                Reset
              </button>
              <button
                onClick={onMobileClose}
                className="lg:hidden p-1.5 rounded-full hover:bg-stone-100 transition-colors"
              >
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="filter-search"
              type="text"
              placeholder="Search names, cities..."
              value={filters.search}
              onChange={(e) => set('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 transition-all placeholder:text-stone-400 text-stone-900"
            />
          </div>
        </div>

        <div className="px-6 pb-8 space-y-2 mt-4">
          {/* Age */}
          <FilterSection title="Age Range">
            <RangeRow
              label="Age"
              min={18} max={55} step={1}
              valueMin={filters.ageMin} valueMax={filters.ageMax}
              onChangeMin={(v) => set('ageMin', v)}
              onChangeMax={(v) => set('ageMax', v)}
              suffix=" yrs"
            />
          </FilterSection>

          {/* Height */}
          <FilterSection title="Height" defaultOpen={false}>
            <RangeRow
              label="Height"
              min={140} max={210} step={1}
              valueMin={filters.heightMinCm} valueMax={filters.heightMaxCm}
              onChangeMin={(v) => set('heightMinCm', v)}
              onChangeMax={(v) => set('heightMaxCm', v)}
              suffix=" cm"
            />
          </FilterSection>

          {/* Location */}
          <FilterSection title="Location">
            <FilterSelect
              id="filter-state"
              value={filters.state}
              onChange={(v) => set('state', v)}
              options={STATES}
            />
          </FilterSection>

          {/* Sect */}
          <FilterSection title="Sect & Sub-Sect">
            <FilterSelect
              id="filter-sect"
              value={filters.sect}
              onChange={(v) => set('sect', v)}
              options={SECT_OPTIONS}
            />
          </FilterSection>

          {/* Diet */}
          <FilterSection title="Dietary Preference">
            <FilterSelect
              id="filter-diet"
              value={filters.diet}
              onChange={(v) => set('diet', v)}
              options={DIET_OPTIONS}
            />
          </FilterSection>

          {/* Education */}
          <FilterSection title="Education" defaultOpen={false}>
            <FilterSelect
              id="filter-qualification"
              value={filters.qualification}
              onChange={(v) => set('qualification', v)}
              options={QUALIFICATIONS}
            />
          </FilterSection>

          {/* Income */}
          <FilterSection title="Annual Income" defaultOpen={false}>
            <FilterSelect
              id="filter-income"
              value={filters.income}
              onChange={(v) => set('income', v)}
              options={INCOME_RANGES}
            />
          </FilterSection>

          {/* Toggles */}
          <FilterSection title="Other Preferences" defaultOpen={false}>
            <label className="flex items-center justify-between cursor-pointer group bg-stone-50 p-3 rounded-xl border border-stone-100 hover:border-stone-200 transition-colors">
              <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors">ID Verified Only</span>
              <button
                role="switch"
                aria-checked={filters.verifiedOnly}
                id="filter-verified"
                onClick={() => set('verifiedOnly', !filters.verifiedOnly)}
                className={cn(
                  'relative w-10 h-6 rounded-full transition-colors',
                  filters.verifiedOnly ? 'bg-copper-600' : 'bg-stone-300',
                )}
              >
                <span
                  className={cn(
                    'absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform',
                    filters.verifiedOnly ? 'translate-x-5' : 'translate-x-1',
                  )}
                />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer group bg-stone-50 p-3 rounded-xl border border-stone-100 hover:border-stone-200 transition-colors mt-2">
              <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors">Open to Relocate</span>
              <button
                role="switch"
                aria-checked={filters.relocate}
                id="filter-relocate"
                onClick={() => set('relocate', !filters.relocate)}
                className={cn(
                  'relative w-10 h-6 rounded-full transition-colors',
                  filters.relocate ? 'bg-copper-600' : 'bg-stone-300',
                )}
              >
                <span
                  className={cn(
                    'absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform',
                    filters.relocate ? 'translate-x-5' : 'translate-x-1',
                  )}
                />
              </button>
            </label>
          </FilterSection>
        </div>
      </aside>
    </>
  );
}
