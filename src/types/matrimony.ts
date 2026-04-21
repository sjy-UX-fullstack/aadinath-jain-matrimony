// =============================================================
// Adinath Jain Matrimony — Firestore TypeScript Types
// =============================================================

export type Gender = 'male' | 'female';
export type MaritalStatus = 'never_married' | 'divorced' | 'widowed';
export type SubSect = 'digambar' | 'shwetambar';
export type SubSectBranch = 'mandir' | 'sthanak';
export type ManglikStatus = 'yes' | 'no' | 'dont_know';
export type Diet = 'regular_veg' | 'jain_no_root' | 'strict_chauvihar';
export type Occupation =
  | 'private_job'
  | 'govt_job'
  | 'business'
  | 'professional'
  | 'not_working';
export type FamilyType = 'nuclear' | 'joint';
export type AnnualIncome = '0-3L' | '3-5L' | '5-10L' | '10-20L' | '20-50L' | '50L+';
export type Plan = 'free' | 'premium';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type MatchStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'meeting_requested';
export type MeetingStatus = 'pending' | 'confirmed' | 'completed';
export type AdminRole = 'super_admin' | 'coordinator';
export type PhotoPrivacy = 'everyone' | 'accepted_matches_only';
export type RegistrationSource = 'online' | 'offline_admin';
export type IdProofType = 'aadhaar' | 'pan';

// ------------------------------------------------------------------
// Sub-objects
// ------------------------------------------------------------------

export interface UserAuth {
  mobile: string;         // "+91XXXXXXXXXX"
  email: string;
  uid: string;
  createdAt: Date;
  lastLogin: Date;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
}

export interface Subscription {
  plan: Plan;
  startDate: Date | null;
  endDate: Date | null;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  autoRenew: boolean;
}

export interface Verification {
  status: VerificationStatus;
  idProofType: IdProofType | null;
  idProofUrl: string;
  verifiedBy: string;     // admin UID
  verifiedAt: Date | null;
  rejectionReason: string;
}

export interface ProfileBasics {
  fullName: string;
  gender: Gender;
  dob: string;            // "YYYY-MM-DD"
  timeOfBirth: string;    // "HH:MM"
  placeOfBirth: string;
  maritalStatus: MaritalStatus;
  heightCm: number;
  profilePhotoUrl: string;
  additionalPhotos: string[];
  photoPrivacy: PhotoPrivacy;
}

export interface ProfileCultural {
  motherTongue: string;
  religion: 'Jain';
  subSect: SubSect;
  subSectBranch: SubSectBranch;
  paternalGotra: string;
  maternalGotra: string;
  manglikStatus: ManglikStatus;
}

export interface ProfileLocation {
  currentCity: string;
  currentState: string;
  hometown: string;
}

export interface ProfileEducation {
  highestQualification: string;
  collegeUniversity: string;
  occupation: Occupation;
  jobTitle: string;
  company: string;
  annualIncomeRange: AnnualIncome;
}

export interface ProfileFamily {
  fatherOccupation: string;
  motherOccupation: string;
  brothers: { married: number; unmarried: number };
  sisters: { married: number; unmarried: number };
  familyType: FamilyType;
  familyCity: string;
  familyState: string;
}

export interface ProfileLifestyle {
  diet: Diet;
  smoking: boolean;
  drinking: boolean;
  willingToRelocate: boolean;
}

export interface PartnerPreferences {
  ageMin: number;
  ageMax: number;
  heightMinCm: number;
  cities: string[];
  subSect: SubSect[];
  diet: Diet[];
  incomeRange: AnnualIncome[];
  education: string[];
}

export interface UserProfile {
  basics: ProfileBasics;
  cultural: ProfileCultural;
  location: ProfileLocation;
  education: ProfileEducation;
  family: ProfileFamily;
  lifestyle: ProfileLifestyle;
  aboutMe: string;
  partnerPreferences: PartnerPreferences;
}

// ------------------------------------------------------------------
// Root Documents
// ------------------------------------------------------------------

export interface UserDocument {
  auth: UserAuth;
  subscription: Subscription;
  verification: Verification;
  profile: UserProfile;
  profileCompletion: number;   // 0–100
  isActive: boolean;
  isBlocked: boolean;
  registrationSource: RegistrationSource;
}

export interface MatchDocument {
  user1: string;
  user2: string;
  status: MatchStatus;
  initiatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  offlineMeetingRequest?: {
    requested: boolean;
    requestedBy: string;
    scheduledDate: string;
    coordinatorNote: string;
    status: MeetingStatus;
  };
}

export interface MessageItem {
  msgId: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface ConversationDocument {
  participants: [string, string];
  messages: MessageItem[];
}

export interface AdminDocument {
  name: string;
  role: AdminRole;
  region: string;
  createdAt: Date;
}

export interface PaymentDocument {
  userId: string;
  amount: 9999;
  currency: 'INR';
  plan: 'premium_annual';
  orderId: string;
  paymentId: string;
  status: 'created' | 'captured' | 'failed' | 'refunded';
  createdAt: Date;
}

export interface OfflineMeetingDocument {
  matchId: string;
  coordinatorId: string;
  families: [string, string];
  scheduledAt: Date;
  venue: string;
  notes: string;
  status: MeetingStatus;
}

// ------------------------------------------------------------------
// UI-specific (flattened view card)
// ------------------------------------------------------------------

/** Flattened profile used by MatchCard — safe for both free & premium rendering */
export interface ProfileCardData {
  id: string;
  isPremium?: boolean;        // the VIEWER's plan, not the profile owner's
  fullName: string;
  age: number;
  heightCm: number;
  maritalStatus: MaritalStatus;
  currentCity: string;
  currentState: string;
  occupation: Occupation;
  annualIncomeRange: AnnualIncome;
  highestQualification: string;
  subSect: SubSect;
  subSectBranch: SubSectBranch;
  paternalGotra: string;
  maternalGotra: string;
  diet: Diet;
  familyType: FamilyType;
  manglikStatus: ManglikStatus;
  profilePhotoUrl: string;
  aboutMe: string;
  verificationStatus: VerificationStatus;
  willingToRelocate: boolean;
}
