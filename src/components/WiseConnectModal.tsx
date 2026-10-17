import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Building, 
  Eye, 
  EyeOff, 
  Smartphone,
  RefreshCw,
  Info,
  DollarSign
} from 'lucide-react';
import { TraineeProfile, TrainingScenario, WiseAccountData } from '../types';

interface WiseConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainee: TraineeProfile;
  scenario: TrainingScenario;
  onSuccess: (data: WiseAccountData) => void;
  onStepComplete?: (stepId: number) => void;
}

export const WiseConnectModal: React.FC<WiseConnectModalProps> = ({
  isOpen,
  onClose,
  trainee,
  scenario,
  onSuccess,
  onStepComplete
}) => {
  if (!isOpen) return null;

  // Wizard Sub-steps:
  // 1: Wise Login & Account Selection
  // 2: 2-Factor Authentication (2FA)
  // 3: Select Payout Balance / Currency
  // 4: Authorization & Compliance Review
  // 5: Resolution for Name Mismatch (if triggered)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields with realistic dummy defaults for trainees
  const [wiseEmail, setWiseEmail] = useState('alex.morgan@cleaner.homeaglow.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [accountHolderName, setAccountHolderName] = useState(
    scenario === 'name_mismatch' ? 'Alexander J. Morgan-Smith' : trainee.name
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    scenario === 'invalid_currency' ? 'XOF' : 'USD'
  );
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorError, setTwoFactorError] = useState('');
  const [nameMismatchError, setNameMismatchError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto fill dummy helpers for quick training
  const handleAutoFillDummy = () => {
    setWiseEmail('alex.morgan@cleaner.homeaglow.com');
    setPassword('DemoWisePass2026!');
    setAccountHolderName(scenario === 'name_mismatch' ? 'Alexander J. Morgan-Smith' : trainee.name);
    setSelectedCurrency('USD');
  };

  const handleNextFromLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wiseEmail || !wiseEmail.includes('@')) {
      alert('Please enter a valid Wise email address');
      return;
    }
    onStepComplete?.(3);
    setCurrentStep(2); // Go to 2FA
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFactorCode !== '839201' && twoFactorCode !== '123456') {
      setTwoFactorError('Invalid 6-digit code. Use test code 839201 or 123456.');
      return;
    }
    setTwoFactorError('');
    onStepComplete?.(4);
    setCurrentStep(3); // Go to Currency & Account selection
  };

  const handleConfirmAuthorization = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Check for Name Mismatch scenario
      if (scenario === 'name_mismatch' && accountHolderName !== trainee.name) {
        setNameMismatchError(
          `Name Mismatch Alert: The name on your Wise profile ("${accountHolderName}") does not match your registered Homeaglow Hubstaff legal name ("${trainee.name}"). International automated payroll requires matching account holder names to comply with AML banking rules.`
        );
        setCurrentStep(5); // Go to mismatch error step
        return;
      }

      // Check for Invalid Currency scenario
      if (scenario === 'invalid_currency' && selectedCurrency === 'XOF') {
        alert('Homeaglow Hubstaff automated payroll does not support XOF payouts. Please select USD, EUR, GBP, PHP, or CAD.');
        return;
      }

      const currencyNames: Record<string, string> = {
        PHP: 'Philippine Peso',
        USD: 'US Dollar',
        EUR: 'Euro',
        GBP: 'British Pound',
        CAD: 'Canadian Dollar',
        AUD: 'Australian Dollar',
        INR: 'Indian Rupee'
      };

      // Success!
      const finalData: WiseAccountData = {
        wiseEmail,
        fullName: accountHolderName,
        accountType,
        currency: selectedCurrency,
        currencyName: currencyNames[selectedCurrency] || selectedCurrency,
        recipientType: 'email',
        wiseTag: `@${accountHolderName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        connectedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isVerified: true,
        twoFactorVerified: true,
        autoPayrollEnabled: true,
        payoutSchedule: 'weekly'
      };

      onSuccess(finalData);
    }, 700);
  };

  const handleFixNameMismatch = () => {
    setAccountHolderName(trainee.name);
    setNameMismatchError('');
    setCurrentStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200 flex flex-col max-h-[92vh]">
        {/* Wise Brand Header */}
        <div className="bg-[#163300] text-[#9fe870] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Authentic Wise Brand Fast-Flag Icon */}
            <div className="w-8 h-8 rounded-full bg-[#9fe870] text-[#163300] flex items-center justify-center font-black text-sm">
              <span className="font-extrabold tracking-tighter">W</span>
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight flex items-center gap-2">
                <span>Wise</span>
                <span className="text-[10px] bg-[#9fe870]/20 text-[#9fe870] px-2 py-0.5 rounded-full font-medium">
                  OAuth 2.0 Simulator
                </span>
              </div>
              <div className="text-xs text-[#9fe870]/80">
                Connect account with Homeaglow on Hubstaff
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#9fe870]/70 hover:text-white p-1 rounded-md transition-colors"
            title="Cancel connection"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Training Context Banner */}
        <div className="bg-emerald-50 px-6 py-2 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Safe Training Mode:</strong> You can enter dummy credentials. No real bank accounts are touched.
            </span>
          </div>
          <button
            onClick={handleAutoFillDummy}
            type="button"
            className="underline font-semibold hover:text-emerald-950 text-[11px] shrink-0 ml-2"
          >
            Autofill Dummy
          </button>
        </div>

        {/* Wizard Steps Content */}
        <div className="p-6 overflow-y-auto flex-1 text-neutral-800">
          {/* STEP 1: Wise Login & Account Type */}
          {currentStep === 1 && (
            <form onSubmit={handleNextFromLogin} className="space-y-4">
              <div className="text-center mb-5">
                <h3 className="text-lg font-bold text-neutral-900">
                  Log in to your Wise account
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Hubstaff will link your Wise recipient details for Homeaglow weekly payroll disbursements.
                </p>
              </div>

              {/* Account Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Wise Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType('personal')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      accountType === 'personal'
                        ? 'border-[#163300] bg-emerald-50/40 text-neutral-900 ring-1 ring-[#163300]'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                    }`}
                  >
                    <div className="text-xs font-bold">Personal Account</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Individual contractor / cleaner</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('business')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      accountType === 'business'
                        ? 'border-[#163300] bg-emerald-50/40 text-neutral-900 ring-1 ring-[#163300]'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                    }`}
                  >
                    <div className="text-xs font-bold">Business Account</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Registered company / LLC</div>
                  </button>
                </div>
              </div>

              {/* Wise Registered Email */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Wise Registered Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={wiseEmail}
                  onChange={(e) => setWiseEmail(e.target.value)}
                  placeholder="e.g. your.name@example.com"
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#163300] focus:border-[#163300] focus:outline-hidden"
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Must be the email you used to register on Wise.
                </span>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Wise Password (Demo) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg pr-10 focus:ring-2 focus:ring-[#163300] focus:border-[#163300] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#163300] hover:bg-[#0e2200] text-[#9fe870] font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Continue to 2-Step Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Simulated 2-Factor Authentication */}
          {currentStep === 2 && (
            <form onSubmit={handleVerify2FA} className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#163300] flex items-center justify-center mx-auto mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Wise 2-Step Verification
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  We sent a simulated 6-digit security code to your phone linked to {wiseEmail}.
                </p>
              </div>

              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs">
                <div className="flex items-center justify-between font-mono text-neutral-700 mb-1">
                  <span>Demo Test Code:</span>
                  <button
                    type="button"
                    onClick={() => setTwoFactorCode('839201')}
                    className="text-blue-600 hover:underline font-bold"
                  >
                    Click to Autofill (839201)
                  </button>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Trainees can type <code className="bg-white px-1 py-0.5 rounded border font-bold">839201</code> or click the button above.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.trim())}
                  placeholder="839201"
                  className="w-full text-center tracking-widest font-mono text-lg py-2.5 px-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#163300] focus:border-[#163300] focus:outline-hidden"
                />
                {twoFactorError && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {twoFactorError}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 py-2 px-3 border border-neutral-300 text-neutral-700 font-medium text-xs rounded-lg hover:bg-neutral-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 px-4 bg-[#163300] hover:bg-[#0e2200] text-[#9fe870] font-semibold text-sm rounded-lg transition-colors"
                >
                  Confirm & Continue
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Currency, Recipient Name & Permissions */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <h3 className="text-lg font-bold text-neutral-900">
                  Configure Payout & Permissions
                </h3>
                <p className="text-xs text-neutral-500">
                  Homeaglow will disburse tracked hours in this currency to your Wise account.
                </p>
              </div>

              {/* Account Holder Name Check */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Wise Account Holder Name (Must match Homeaglow)
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#163300] focus:border-[#163300] focus:outline-hidden font-medium"
                />
                <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Homeaglow Registered Name: <strong className="text-neutral-800">{trainee.name}</strong></span>
                  {accountHolderName === trainee.name ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Names Match
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Mismatch Risk
                    </span>
                  )}
                </div>
              </div>

              {/* Currency Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Payout Currency Selection
                </label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#163300] focus:border-[#163300] focus:outline-hidden"
                >
                  <option value="USD">USD - United States Dollar (Recommended for Homeaglow)</option>
                  <option value="PHP">PHP - Philippine Peso (Direct local bank via Wise)</option>
                  <option value="EUR">EUR - Euro (SEPA Transfer)</option>
                  <option value="GBP">GBP - British Pound (Faster Payments)</option>
                  <option value="CAD">CAD - Canadian Dollar (Direct Deposit)</option>
                  <option value="AUD">AUD - Australian Dollar (PayID / BECS)</option>
                  <option value="INR">INR - Indian Rupee (NEFT / IMPS)</option>
                  <option value="XOF">XOF - West African CFA franc (Error Simulation)</option>
                </select>
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Wise guarantees mid-market FX rates with zero hidden markups.
                </span>
              </div>

              {/* Hubstaff & Homeaglow Permission Scope Grant */}
              <div className="bg-neutral-50 p-3.5 rounded-lg border border-neutral-200 space-y-2 text-xs">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Permissions Requested by Hubstaff (Homeaglow):</span>
                </div>
                <ul className="space-y-1.5 text-neutral-600 pl-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Send weekly automated payouts for approved tracked hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Verify account holder identity against Homeaglow contractor records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Receive instant Wise deposit delivery confirmation receipts</span>
                  </li>
                </ul>
              </div>

              {/* Authorize Button */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-1/3 py-2 px-3 border border-neutral-300 text-neutral-700 font-medium text-xs rounded-lg hover:bg-neutral-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAuthorization}
                  disabled={isSubmitting}
                  className="w-2/3 py-2.5 px-4 bg-[#163300] hover:bg-[#0e2200] text-[#9fe870] font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying with Homeaglow...</span>
                    </>
                  ) : (
                    <>
                      <span>Authorize & Connect Wise</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Name Mismatch Error Resolution (Training Module) */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg text-amber-900">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-amber-900">
                      Compliance Alert: Name Mismatch Detected
                    </h4>
                    <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                      {nameMismatchError}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-amber-200 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/80 p-2 rounded">
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">
                      Hubstaff Contractor Name
                    </span>
                    <span className="font-bold text-neutral-800">{trainee.name}</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded">
                    <span className="text-[10px] text-neutral-500 uppercase block font-semibold">
                      Wise Account Name
                    </span>
                    <span className="font-bold text-neutral-800">{accountHolderName}</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-xs">
                <div className="font-semibold text-neutral-900 mb-1">
                  🎓 Trainer Tip for Trainees:
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  In live Homeaglow operations, if your Wise account name doesn't match your Hubstaff legal profile, automated payroll will fail and deposit back to Homeaglow. Trainees must either align their Wise profile name or contact Homeaglow onboarding support to update their contractor record.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleFixNameMismatch}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Wise Name to Match "{trainee.name}" (Resolve Error)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-2 px-3 border border-neutral-300 text-neutral-700 font-medium text-xs rounded-lg hover:bg-neutral-100"
                >
                  Go Back & Manually Edit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-neutral-100 px-6 py-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
            <span>256-bit TLS Encrypted Session</span>
          </div>
          <span className="font-mono text-[11px]">Wise Platform API v3</span>
        </div>
      </div>
    </div>
  );
};
