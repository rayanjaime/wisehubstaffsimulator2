import React, { useState } from 'react';
import { 
  X, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Receipt, 
  Download,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { TraineeProfile, WiseAccountData } from '../types';

interface PayoutSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainee: TraineeProfile;
  wiseData: WiseAccountData;
}

export const PayoutSimulatorModal: React.FC<PayoutSimulatorModalProps> = ({
  isOpen,
  onClose,
  trainee,
  wiseData
}) => {
  if (!isOpen) return null;

  const [isProcessing, setIsProcessing] = useState(false);
  const [payoutComplete, setPayoutComplete] = useState(false);
  const [txId, setTxId] = useState('');

  const grossEarnings = trainee.trackedHoursThisWeek * trainee.hourlyRate;
  const wiseFee = 1.45; // Transparent low Wise fee
  const netEarnings = Math.max(0, grossEarnings - wiseFee);

  // Conversion rates (simulated mid-market rates)
  const fxRates: Record<string, { rate: number; symbol: string }> = {
    USD: { rate: 1.0, symbol: '$' },
    PHP: { rate: 58.75, symbol: '₱' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.79, symbol: '£' },
    CAD: { rate: 1.36, symbol: 'CA$' },
    AUD: { rate: 1.52, symbol: 'A$' },
    INR: { rate: 84.10, symbol: '₹' }
  };

  const currentFx = fxRates[wiseData.currency] || { rate: 1.0, symbol: '$' };
  const localPayoutAmount = (netEarnings * currentFx.rate).toFixed(2);

  const handleRunPayout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPayoutComplete(true);
      setTxId(`HMG-WISE-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Weekly Payroll Deposit Simulator</h3>
              <p className="text-xs text-blue-100">
                Simulating Homeaglow automated payroll disbursement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {!payoutComplete ? (
            <>
              {/* Calculation Summary */}
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-600 pb-2 border-b border-neutral-200">
                  <span>Organization</span>
                  <span className="font-semibold text-neutral-900">{trainee.organization}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Approved Tracked Time</span>
                  <span className="font-mono tabular-nums text-neutral-900">
                    {trainee.trackedHoursThisWeek} hrs @ ${trainee.hourlyRate.toFixed(2)}/hr
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Gross Contractor Earnings</span>
                  <span className="font-mono tabular-nums font-semibold text-neutral-900">
                    ${grossEarnings.toFixed(2)} USD
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Wise Direct Transfer Fee</span>
                  <span className="font-mono tabular-nums text-emerald-700">
                    -${wiseFee.toFixed(2)} USD (0.2%)
                  </span>
                </div>

                {wiseData.currency !== 'USD' && (
                  <div className="flex items-center justify-between text-xs text-neutral-600 pt-1 border-t border-neutral-200">
                    <span>Mid-Market FX Rate (Wise)</span>
                    <span className="font-mono tabular-nums text-neutral-700">
                      1 USD = {currentFx.rate} {wiseData.currency}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-300">
                  <span>Estimated Net Deposit to Wise</span>
                  <span className="font-mono tabular-nums text-emerald-600 text-base">
                    {currentFx.symbol}{localPayoutAmount} {wiseData.currency}
                  </span>
                </div>
              </div>

              {/* Destination Card */}
              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Destination: Wise Multi-Currency Account</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5 font-mono">
                    {wiseData.wiseEmail} ({wiseData.fullName})
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  Active
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleRunPayout}
                  disabled={isProcessing}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Homeaglow Monday Payroll...</span>
                    </>
                  ) : (
                    <>
                      <span>Simulate Monday Payroll Payout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Completed Receipt View */
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-neutral-900">
                  Payroll Payout Successfully Deposited!
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Homeaglow has credited your Wise account via Hubstaff automated payroll integration.
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Transaction ID:</span>
                  <span className="font-bold text-neutral-900">{txId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Sender:</span>
                  <span className="text-neutral-900">Homeaglow Operations LLC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Recipient:</span>
                  <span className="text-neutral-900">{wiseData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Wise Deposit:</span>
                  <span className="font-bold text-emerald-600">
                    {currentFx.symbol}{localPayoutAmount} {wiseData.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Payout Date:</span>
                  <span className="text-neutral-900">Upcoming Monday, 12:00 AM UTC</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setPayoutComplete(false)}
                  className="w-1/2 py-2 px-3 border border-neutral-300 text-neutral-700 font-medium text-xs rounded-lg hover:bg-neutral-50"
                >
                  Test Another Calculation
                </button>
                <button
                  onClick={onClose}
                  className="w-1/2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
