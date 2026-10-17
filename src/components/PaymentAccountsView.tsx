import React, { useState } from 'react';
import { 
  Info, 
  FileText, 
  Pencil, 
  Check, 
  Minus, 
  Building2, 
  CreditCard,
  MessageSquare,
  Sparkles,
  ExternalLink,
  DollarSign,
  Trash2,
  Zap
} from 'lucide-react';
import { TraineeProfile, WiseAccountData, TrainingMode } from '../types';

interface PaymentAccountsViewProps {
  trainee: TraineeProfile;
  wiseData: WiseAccountData | null;
  onConnectWise: () => void;
  onDisconnectWise: () => void;
  onEditWise: () => void;
  onResetDemo: () => void;
  onOpenPayoutSim: () => void;
  mode: TrainingMode;
  currentStepIndex: number;
}

export const PaymentAccountsView: React.FC<PaymentAccountsViewProps> = ({
  trainee,
  wiseData,
  onConnectWise,
  onDisconnectWise,
  onEditWise,
  onResetDemo,
  onOpenPayoutSim,
  mode,
  currentStepIndex
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'PAYMENT ACCOUNTS' | string>('PAYMENT ACCOUNTS');
  const [showPencilOptions, setShowPencilOptions] = useState(false);

  const subTabs = [
    'BILLING',
    'PAYMENT ACCOUNTS',
    'PAYMENT EXPORTS',
    'INTEGRATIONS',
    'INVOICING',
    'NOTIFICATIONS',
    'SETTINGS'
  ];

  const isConnected = !!wiseData;

  return (
    <div className="flex-1 bg-white p-6 lg:p-10 overflow-y-auto select-none relative font-sans text-neutral-800">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Main Heading: Member settings */}
        <div>
          <h1 className="text-2xl font-normal text-neutral-800 tracking-tight font-sans">
            Member settings
          </h1>

          {/* Sub-tabs Row */}
          <div className="flex items-center gap-8 mt-5 border-b border-neutral-200 text-xs font-semibold tracking-wider text-neutral-500 overflow-x-auto">
            {subTabs.map((tab) => {
              const isActive = activeSubTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`pb-3 whitespace-nowrap transition-colors relative uppercase ${
                    isActive
                      ? 'text-blue-600 font-bold'
                      : 'hover:text-neutral-800'
                  }`}
                >
                  {tab}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Heading: Homeaglow payroll accounts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            Homeaglow payroll accounts
          </h2>

          {/* Main Card Container */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Payout method label & proof info */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-1.5 text-base font-bold text-neutral-900">
                  <span>Payout method</span>
                  <button 
                    className="text-neutral-400 hover:text-neutral-600"
                    title="Homeaglow sends automated weekly contractor payroll via approved accounts."
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-start gap-2 text-xs text-neutral-700">
                  <FileText className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>A proof of payment</strong> will be emailed once paid.
                  </span>
                </div>

                {/* Trainer Demo Reset */}
                <div className="pt-4 border-t border-neutral-100 flex items-center gap-2">
                  <span className="text-[11px] text-neutral-400 font-medium">Demo:</span>
                  <button
                    onClick={onResetDemo}
                    className="text-[11px] text-blue-600 hover:underline font-medium"
                  >
                    Reset demo
                  </button>
                </div>
              </div>

              {/* Right Column: Side-by-side Payout Method Cards */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Wise Account Card */}
                <div 
                  className={`border rounded-xl p-5 flex flex-col justify-between transition-all duration-200 ${
                    isConnected
                      ? 'border-blue-300 bg-[#f9fbff]'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Wise Logo + Title + Edit Pencil */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {/* Iconic Wise 7/Lightning Arrow in Black */}
                        <div className="w-5 h-5 flex items-center justify-center font-black text-sm text-neutral-900">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12.9 2L5 13.5h7.1L9.6 22l10.4-11.5h-7.1L15 2h-2.1z" />
                          </svg>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-neutral-900 text-sm">
                            Wise account
                          </span>
                          <span className="text-xs text-neutral-500 font-normal">
                            (Preferred)
                          </span>
                        </div>
                      </div>

                      {/* Edit Pencil Icon */}
                      <button
                        onClick={onEditWise}
                        className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md transition-colors"
                        title="Edit"
                        aria-label="Edit Wise account"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Middle: Details */}
                    {isConnected && wiseData ? (
                      <div className="space-y-1">
                        <p className="text-xs text-neutral-800 font-medium">
                          You're receiving payments via this account
                        </p>
                        <p className="text-xs text-neutral-500 font-mono">
                          {wiseData.wiseTag} · {wiseData.currency} — {wiseData.currencyName}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs text-neutral-600">
                          Add your Wise Tag Name and Wise Currency to receive payments here. Click the pencil to edit.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom: Connected Badge or Connect Button */}
                  <div className="pt-4">
                    {isConnected ? (
                      <button
                        onClick={onOpenPayoutSim}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-md text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer shadow-2xs"
                        title="Wise account is verified. Click to test payout simulation."
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Connected</span>
                      </button>
                    ) : (
                      <button
                        onClick={onEditWise}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold transition-colors shadow-xs"
                      >
                        <Zap className="w-3.5 h-3.5 fill-white" />
                        <span>Connect Wise account</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Direct Payout to Your Bank Card */}
                <div className="border border-neutral-200 rounded-xl p-5 flex flex-col justify-between bg-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-neutral-700 shrink-0" />
                      <span className="font-bold text-neutral-900 text-sm">
                        Direct payout to your bank
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Enter your bank account details. <strong className="text-neutral-800">Does not require a Wise account.</strong>
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => alert("Homeaglow Payroll Note: For international contractors, Homeaglow standardizes on Wise for real-time tracking and low FX fees. Direct bank payouts are reserved for US domestic accounts.")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-md text-xs font-medium hover:bg-neutral-200 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Not connected</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer Paragraph (Matching screenshot word-for-word) */}
        <p className="text-xs text-neutral-500 leading-relaxed pt-2">
          Hubstaff does not store or expose your personal payment information. However, we recommend stopping the timer while entering sensitive information to avoid accidental exposure in screenshots. To make sure no screenshots of your sensitive information were taken, check the{' '}
          <button 
            onClick={() => alert("Opening Hubstaff Activity Screenshots page for audit.")}
            className="text-blue-600 underline hover:text-blue-700"
          >
            activity page
          </button>
          .
        </p>
      </div>

      {/* Floating Hubstaff Support Chat Bubble at Bottom Right (from screenshot) */}
      <button 
        onClick={() => alert("Hubstaff Support Assistant: How can we help you with your Homeaglow payment account today?")}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#1e293b] text-blue-400 flex items-center justify-center shadow-xl hover:scale-105 transition-transform z-40 border-2 border-white/20"
        title="Hubstaff Support Chat"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12h8M12 8v8" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};
