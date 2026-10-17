export interface TraineeProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  organizationId: string;
  hourlyRate: number;
  trackedHoursThisWeek: number;
  avatarUrl?: string;
}

export type PaymentProvider = 'wise' | 'paypal' | 'payoneer' | 'bitwage';

export interface WiseAccountData {
  wiseEmail: string;
  fullName: string;
  accountType: 'personal' | 'business';
  currency: string;
  currencyName: string;
  recipientType: 'email' | 'tag' | 'bank_details';
  wiseTag: string;
  bankCountry?: string;
  accountNumberMasked?: string;
  connectedAt?: string;
  isVerified: boolean;
  twoFactorVerified: boolean;
  autoPayrollEnabled: boolean;
  payoutSchedule: 'weekly' | 'bi_weekly' | 'monthly';
}

export interface PaymentAccount {
  id: string;
  provider: PaymentProvider;
  name: string;
  status: 'connected' | 'pending_verification' | 'failed' | 'not_connected';
  details?: WiseAccountData;
  errorReason?: string;
}

export type TrainingScenario = 'happy_path' | 'name_mismatch' | 'invalid_currency' | 'two_factor_auth';

export type TrainingMode = 'guided' | 'exam';

export interface TrainingStep {
  id: number;
  title: string;
  description: string;
  actionRequired: string;
  completed: boolean;
  hint: string;
}
