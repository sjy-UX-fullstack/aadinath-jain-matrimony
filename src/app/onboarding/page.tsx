'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User, MapPin, BookOpen, Users, Heart, ShieldCheck,
  CheckCircle, ChevronRight, ChevronLeft, Upload, Camera,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ─── Step Definitions ─────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Basics',    icon: User },
  { id: 2, label: 'Cultural',  icon: Heart },
  { id: 3, label: 'Career',    icon: BookOpen },
  { id: 4, label: 'Family',    icon: Users },
  { id: 5, label: 'Lifestyle', icon: ShieldCheck },
];

// ─── Form Field Primitives ────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
      {children}
      {required && <span className="text-copper-600 ml-1 text-[14px] leading-none">*</span>}
    </label>
  );
}

function Input({ id, type = 'text', placeholder, value, onChange, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 focus:border-copper-500 placeholder-stone-400 transition-all shadow-sm"
      {...rest}
    />
  );
}

function Select({ id, value, onChange, children }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 focus:border-copper-500 transition-all appearance-none shadow-sm cursor-pointer"
      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2378716C' stroke-width='2'%3e%3cpath d='m6 9 6 6 6-6'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
    >
      {children}
    </select>
  );
}

function RadioGroup({
  id,
  options,
  value,
  onChange,
}: {
  id: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          id={`${id}-${o.value}`}
          onClick={() => onChange(o.value)}
          className={cn(
            'px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all',
            value === o.value
              ? 'bg-stone-900 border-stone-900 text-white shadow-md'
              : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900 hover:bg-stone-50',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-sm">
      <h3 className="text-xl font-display font-semibold text-stone-900 mb-6 tracking-tight">
        {title}
      </h3>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>;
}

// ─── Step Components ──────────────────────────────────────

function Step1Basics({ data, set }: { data: Record<string, string>; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormCard title="Personal Information">
        <div>
          <Label required>Full Name</Label>
          <Input id="fullName" placeholder="As per Aadhaar / PAN" value={data.fullName ?? ''} onChange={(e) => set('fullName', e.target.value)} />
        </div>
        <div>
          <Label required>Gender</Label>
          <RadioGroup
            id="gender"
            options={[{ value: 'male', label: 'Male (Var)' }, { value: 'female', label: 'Female (Vadhu)' }]}
            value={data.gender ?? ''}
            onChange={(v) => set('gender', v)}
          />
        </div>
        <TwoCol>
          <div>
            <Label required>Date of Birth</Label>
            <Input id="dob" type="date" value={data.dob ?? ''} onChange={(e) => set('dob', e.target.value)} />
          </div>
          <div>
            <Label>Time of Birth</Label>
            <Input id="timeOfBirth" type="time" value={data.timeOfBirth ?? ''} onChange={(e) => set('timeOfBirth', e.target.value)} />
          </div>
        </TwoCol>
        <div>
          <Label>Place of Birth</Label>
          <Input id="placeOfBirth" placeholder="City, State" value={data.placeOfBirth ?? ''} onChange={(e) => set('placeOfBirth', e.target.value)} />
        </div>
        <TwoCol>
          <div>
            <Label required>Marital Status</Label>
            <Select id="maritalStatus" value={data.maritalStatus ?? ''} onChange={(e) => set('maritalStatus', e.target.value)}>
              <option value="">Select status</option>
              <option value="never_married">Never Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </Select>
          </div>
          <div>
            <Label required>Height</Label>
            <Select id="height" value={data.heightCm ?? ''} onChange={(e) => set('heightCm', e.target.value)}>
              <option value="">Select height</option>
              {Array.from({ length: 51 }, (_, i) => 150 + i).map((cm) => (
                <option key={cm} value={cm}>{cm} cm ({Math.floor(cm / 30.48)}'{Math.round((cm % 30.48) / 2.54)}")</option>
              ))}
            </Select>
          </div>
        </TwoCol>
      </FormCard>

      <FormCard title="Contact Information">
        <TwoCol>
          <div>
            <Label required>Mobile Number</Label>
            <Input id="mobile" type="tel" placeholder="+91 98765 43210" value={data.mobile ?? ''} onChange={(e) => set('mobile', e.target.value)} />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={data.email ?? ''} onChange={(e) => set('email', e.target.value)} />
          </div>
        </TwoCol>
      </FormCard>
    </div>
  );
}

function Step2Cultural({ data, set }: { data: Record<string, string>; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormCard title="Religious Background">
        <TwoCol>
          <div>
            <Label required>Sub-Sect</Label>
            <RadioGroup
              id="subSect"
              options={[{ value: 'digambar', label: 'Digambar' }, { value: 'shwetambar', label: 'Shwetambar' }]}
              value={data.subSect ?? ''}
              onChange={(v) => set('subSect', v)}
            />
          </div>
          <div>
            <Label required>Branch</Label>
            <RadioGroup
              id="subSectBranch"
              options={[{ value: 'mandir', label: 'Mandir' }, { value: 'sthanak', label: 'Sthanak' }]}
              value={data.subSectBranch ?? ''}
              onChange={(v) => set('subSectBranch', v)}
            />
          </div>
        </TwoCol>
        <TwoCol>
          <div>
            <Label required>Paternal Gotra</Label>
            <Input id="paternalGotra" placeholder="e.g. Golchha" value={data.paternalGotra ?? ''} onChange={(e) => set('paternalGotra', e.target.value)} />
          </div>
          <div>
            <Label required>Maternal Gotra (Nanihal)</Label>
            <Input id="maternalGotra" placeholder="e.g. Nahar" value={data.maternalGotra ?? ''} onChange={(e) => set('maternalGotra', e.target.value)} />
          </div>
        </TwoCol>
        <div>
          <Label>Mother Tongue</Label>
          <Select id="motherTongue" value={data.motherTongue ?? ''} onChange={(e) => set('motherTongue', e.target.value)}>
            <option value="">Select language</option>
            {['Hindi', 'Marwari', 'Gujarati', 'Kannada', 'Tamil', 'Rajasthani', 'Sindhi', 'Punjabi'].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label required>Manglik Status</Label>
          <RadioGroup
            id="manglikStatus"
            options={[
              { value: 'no', label: 'Non-Manglik' },
              { value: 'yes', label: 'Manglik' },
              { value: 'dont_know', label: "Don't Know" },
            ]}
            value={data.manglikStatus ?? ''}
            onChange={(v) => set('manglikStatus', v)}
          />
        </div>
      </FormCard>
    </div>
  );
}

function Step3Career({ data, set }: { data: Record<string, string>; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormCard title="Location">
        <TwoCol>
          <div>
            <Label required>Current City</Label>
            <Input id="currentCity" placeholder="Mumbai" value={data.currentCity ?? ''} onChange={(e) => set('currentCity', e.target.value)} />
          </div>
          <div>
            <Label required>Current State</Label>
            <Input id="currentState" placeholder="Maharashtra" value={data.currentState ?? ''} onChange={(e) => set('currentState', e.target.value)} />
          </div>
        </TwoCol>
        <div>
          <Label>Hometown</Label>
          <Input id="hometown" placeholder="Jaipur, Rajasthan" value={data.hometown ?? ''} onChange={(e) => set('hometown', e.target.value)} />
        </div>
      </FormCard>

      <FormCard title="Education">
        <TwoCol>
          <div>
            <Label required>Highest Qualification</Label>
            <Select id="highestQualification" value={data.highestQualification ?? ''} onChange={(e) => set('highestQualification', e.target.value)}>
              <option value="">Select qualification</option>
              {['High School', 'Diploma', 'B.A.', 'B.Com', 'B.Sc', 'B.Tech / B.E.', 'BBA', 'M.A.', 'M.Com', 'M.Sc', 'MBA', 'M.Tech', 'CA', 'CS', 'CFA', 'MBBS', 'MD', 'LLB', 'LLM', 'Ph.D', 'Other'].map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label>College / University</Label>
            <Input id="college" placeholder="University name" value={data.college ?? ''} onChange={(e) => set('college', e.target.value)} />
          </div>
        </TwoCol>
      </FormCard>

      <FormCard title="Career">
        <TwoCol>
          <div>
            <Label required>Occupation</Label>
            <Select id="occupation" value={data.occupation ?? ''} onChange={(e) => set('occupation', e.target.value)}>
              <option value="">Select occupation</option>
              <option value="private_job">Private Job</option>
              <option value="govt_job">Government Job</option>
              <option value="business">Business / Self-Employed</option>
              <option value="professional">Professional (CA/Doctor/Lawyer)</option>
              <option value="not_working">Not Currently Working</option>
            </Select>
          </div>
          <div>
            <Label>Annual Income</Label>
            <Select id="annualIncome" value={data.annualIncome ?? ''} onChange={(e) => set('annualIncome', e.target.value)}>
              <option value="">Select range</option>
              {['0-3L', '3-5L', '5-10L', '10-20L', '20-50L', '50L+'].map((r) => (
                <option key={r} value={r}>₹{r} per annum</option>
              ))}
            </Select>
          </div>
        </TwoCol>
        <TwoCol>
          <div>
            <Label>Job Title / Role</Label>
            <Input id="jobTitle" placeholder="e.g. Software Engineer" value={data.jobTitle ?? ''} onChange={(e) => set('jobTitle', e.target.value)} />
          </div>
          <div>
            <Label>Company / Firm</Label>
            <Input id="company" placeholder="Company name" value={data.company ?? ''} onChange={(e) => set('company', e.target.value)} />
          </div>
        </TwoCol>
      </FormCard>
    </div>
  );
}

function Step4Family({ data, set }: { data: Record<string, string>; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormCard title="Parents' Details">
        <TwoCol>
          <div>
            <Label>Father's Occupation</Label>
            <Input id="fatherOccupation" placeholder="e.g. Business" value={data.fatherOccupation ?? ''} onChange={(e) => set('fatherOccupation', e.target.value)} />
          </div>
          <div>
            <Label>Mother's Occupation</Label>
            <Input id="motherOccupation" placeholder="e.g. Homemaker" value={data.motherOccupation ?? ''} onChange={(e) => set('motherOccupation', e.target.value)} />
          </div>
        </TwoCol>
      </FormCard>

      <FormCard title="Siblings">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { id: 'brothersMarried', label: 'Brothers (Married)' },
            { id: 'brothersUnmarried', label: 'Brothers (Unmarried)' },
            { id: 'sistersMarried', label: 'Sisters (Married)' },
            { id: 'sistersUnmarried', label: 'Sisters (Unmarried)' },
          ].map(({ id, label }) => (
            <div key={id}>
              <Label>{label}</Label>
              <Select id={id} value={data[id] ?? '0'} onChange={(e) => set(id, e.target.value)}>
                {[0,1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
              </Select>
            </div>
          ))}
        </div>
      </FormCard>

      <FormCard title="Family Details">
        <TwoCol>
          <div>
            <Label required>Family Type</Label>
            <RadioGroup
              id="familyType"
              options={[{ value: 'nuclear', label: 'Nuclear' }, { value: 'joint', label: 'Joint' }]}
              value={data.familyType ?? ''}
              onChange={(v) => set('familyType', v)}
            />
          </div>
        </TwoCol>
        <TwoCol>
          <div>
            <Label>Family Location (City)</Label>
            <Input id="familyCity" placeholder="Jaipur" value={data.familyCity ?? ''} onChange={(e) => set('familyCity', e.target.value)} />
          </div>
          <div>
            <Label>Family Location (State)</Label>
            <Input id="familyState" placeholder="Rajasthan" value={data.familyState ?? ''} onChange={(e) => set('familyState', e.target.value)} />
          </div>
        </TwoCol>
        <div>
          <Label>About Your Family</Label>
          <textarea
            id="familyAbout"
            rows={3}
            placeholder="Briefly describe your family background, values, traditions…"
            value={data.familyAbout ?? ''}
            onChange={(e) => set('familyAbout', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 focus:border-copper-500 placeholder-stone-400 transition-all shadow-sm resize-none"
          />
        </div>
      </FormCard>
    </div>
  );
}

function Step5Lifestyle({ data, set }: { data: Record<string, string>; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FormCard title="Dietary & Lifestyle Preferences">
        <div>
          <Label required>Dietary Preference</Label>
          <RadioGroup
            id="diet"
            options={[
              { value: 'regular_veg', label: 'Regular Veg' },
              { value: 'jain_no_root', label: 'Jain (No Root Veg)' },
              { value: 'strict_chauvihar', label: 'Strict Chauvihar' },
            ]}
            value={data.diet ?? ''}
            onChange={(v) => set('diet', v)}
          />
        </div>
        <TwoCol>
          <div>
            <Label>Smoking</Label>
            <RadioGroup
              id="smoking"
              options={[{ value: 'false', label: 'No' }, { value: 'true', label: 'Yes' }]}
              value={data.smoking ?? 'false'}
              onChange={(v) => set('smoking', v)}
            />
          </div>
          <div>
            <Label>Drinking</Label>
            <RadioGroup
              id="drinking"
              options={[{ value: 'false', label: 'No' }, { value: 'true', label: 'Yes' }]}
              value={data.drinking ?? 'false'}
              onChange={(v) => set('drinking', v)}
            />
          </div>
        </TwoCol>
        <div>
          <Label>Willing to Relocate?</Label>
          <RadioGroup
            id="relocate"
            options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }, { value: 'depends', label: 'Depends on Location' }]}
            value={data.relocate ?? 'true'}
            onChange={(v) => set('relocate', v)}
          />
        </div>
        <div>
          <Label>About Me</Label>
          <textarea
            id="aboutMe"
            rows={4}
            placeholder="Write a few lines about yourself, your interests, and what you're looking for in a partner…"
            value={data.aboutMe ?? ''}
            onChange={(e) => set('aboutMe', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-copper-500 focus:border-copper-500 placeholder-stone-400 transition-all shadow-sm resize-none"
          />
        </div>
      </FormCard>

      <FormCard title="Photos & Verification">
        {/* Profile Photo */}
        <div>
          <Label required>Profile Photo</Label>
          <div id="photo-upload-zone" className="border-2 border-dashed border-stone-200 rounded-2xl p-8 text-center hover:border-copper-400 hover:bg-stone-50 transition-all cursor-pointer bg-stone-50/50">
            <Camera className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-sm text-stone-700 font-semibold mb-1">Click or drag to upload photo</p>
            <p className="text-xs text-stone-400">High Resolution JPG or PNG</p>
          </div>
        </div>

        {/* Photo privacy */}
        <div className="mt-5">
          <Label>Photo Privacy</Label>
          <RadioGroup
            id="photoPrivacy"
            options={[
              { value: 'everyone', label: 'Visible to Everyone' },
              { value: 'accepted_matches_only', label: 'Accepted Matches Only' },
            ]}
            value={data.photoPrivacy ?? 'everyone'}
            onChange={(v) => set('photoPrivacy', v)}
          />
        </div>

        {/* ID Proof */}
        <div className="mt-8 border-t border-stone-100 pt-6">
          <Label required>Government ID Proof</Label>
          <div className="flex items-start gap-3 bg-stone-50 border border-stone-200 rounded-xl p-4 mb-4">
            <ShieldCheck className="w-5 h-5 text-copper-500 mt-0.5 flex-shrink-0" />
            <p className="text-stone-600 text-xs leading-relaxed font-medium">
              We require ID verification to keep the community safe. Your ID is never shared with other members. Unverified profiles will have limited visibility.
            </p>
          </div>
          <Select id="idProofType" value={data.idProofType ?? ''} onChange={(e) => set('idProofType', e.target.value)}>
            <option value="">Select Document Type</option>
            <option value="aadhaar">Aadhaar Card</option>
            <option value="pan">PAN Card</option>
            <option value="passport">Passport</option>
          </Select>
          <div id="id-upload-zone" className="mt-4 border-2 border-dashed border-stone-200 rounded-2xl p-6 text-center hover:border-copper-400 hover:bg-stone-50 transition-all cursor-pointer bg-stone-50/50">
            <Upload className="w-8 h-8 text-stone-300 mx-auto mb-3" />
            <p className="text-sm text-stone-700 font-semibold mb-1">Upload ID Document</p>
            <p className="text-xs text-stone-400">PDF, JPG, or PNG (Max 5MB)</p>
          </div>
        </div>
      </FormCard>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────
function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full bg-stone-100 rounded-full h-1 mt-1 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-copper-400 via-copper-500 to-copper-600 transition-all duration-700 ease-out"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}

// ─── Main Onboarding Page ─────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const setField = (key: string, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const next = () => {
    if (currentStep < 5) setCurrentStep((s) => s + 1);
    else {
      // TODO: submit to Firestore
      router.push('/feed');
    }
  };
  const prev = () => { if (currentStep > 1) setCurrentStep((s) => s - 1); };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center shadow-lg shadow-stone-900/10">
                <span className="text-copper-400 text-lg font-display font-medium leading-none">A</span>
              </div>
              <span className="text-stone-900 font-display font-bold tracking-tight">
                Adinath Vivah
              </span>
            </Link>
            <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">Step {currentStep} of {STEPS.length}</span>
          </div>
          <StepProgress current={currentStep} total={STEPS.length} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Step Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {STEPS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              id={`step-tab-${id}`}
              onClick={() => id < currentStep && setCurrentStep(id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all uppercase tracking-wide',
                id === currentStep
                  ? 'bg-stone-900 text-white shadow-md shadow-stone-900/10'
                  : id < currentStep
                    ? 'bg-sage-50 text-sage-600 border border-sage-200 cursor-pointer hover:bg-sage-100 hover:border-sage-300'
                    : 'bg-white text-stone-400 border border-stone-200 cursor-not-allowed opacity-60',
              )}
            >
              {id < currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Icon className="w-4 h-4" />
              )}
              {label}
            </button>
          ))}
        </div>

        {/* Step Title */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-display font-semibold text-stone-900 mb-2 tracking-tight">
            {currentStep === 1 && 'Let\'s start with the basics'}
            {currentStep === 2 && 'Your cultural background'}
            {currentStep === 3 && 'Your location & career'}
            {currentStep === 4 && 'Your family setup'}
            {currentStep === 5 && 'Lifestyle, photos & verification'}
          </h1>
          <p className="text-stone-500 text-[15px]">
            {currentStep === 5 ? 'Almost there! Add a photo to stand out.' : 'This information will help us find the most compatible matches for you.'}
          </p>
        </div>

        {/* Step Content */}
        {currentStep === 1 && <Step1Basics data={formData} set={setField} />}
        {currentStep === 2 && <Step2Cultural data={formData} set={setField} />}
        {currentStep === 3 && <Step3Career data={formData} set={setField} />}
        {currentStep === 4 && <Step4Family data={formData} set={setField} />}
        {currentStep === 5 && <Step5Lifestyle data={formData} set={setField} />}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-stone-200">
          <button
            id="onboarding-prev"
            onClick={prev}
            disabled={currentStep === 1}
            className={cn(
              'flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all',
              currentStep === 1
                ? 'text-stone-300 cursor-not-allowed opacity-50'
                : 'text-stone-600 hover:bg-stone-200/50 bg-stone-100 shadow-sm border border-stone-200',
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button
            id="onboarding-next"
            onClick={next}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-copper-600 hover:bg-copper-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            {currentStep === 5 ? 'Create Profile' : 'Continue'}
            {currentStep < 5 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
