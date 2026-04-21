// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convert DOB string ("YYYY-MM-DD") to age in years */
export function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

/** Format height: 162 → "5'4\"" */
export function formatHeight(cm: number): string {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}

/** Diet labels */
export const DIET_LABELS: Record<string, string> = {
  regular_veg:    'Regular Veg',
  jain_no_root:   'Jain (No Root Veg)',
  strict_chauvihar: 'Strict Chauvihar',
};

/** Occupation labels */
export const OCCUPATION_LABELS: Record<string, string> = {
  private_job:  'Private Job',
  govt_job:     'Govt. Job',
  business:     'Business',
  professional: 'Professional',
  not_working:  'Not Working',
};

/** Marital status labels */
export const MARITAL_LABELS: Record<string, string> = {
  never_married: 'Never Married',
  divorced:      'Divorced',
  widowed:       'Widowed',
};

/** Sub-sect labels */
export const SUBSECT_LABELS: Record<string, string> = {
  digambar:   'Digambar',
  shwetambar: 'Shwetambar',
};

export const BRANCH_LABELS: Record<string, string> = {
  mandir:   'Mandir',
  sthanak:  'Sthanak',
};

export const MANGLIK_LABELS: Record<string, string> = {
  yes:       'Manglik',
  no:        'Non-Manglik',
  dont_know: 'Not Sure',
};

export const FAMILY_TYPE_LABELS: Record<string, string> = {
  nuclear: 'Nuclear Family',
  joint:   'Joint Family',
};
