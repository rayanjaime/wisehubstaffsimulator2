import React, { useState } from 'react';
import { X, AlertCircle, Lightbulb } from 'lucide-react';
import { TraineeProfile, WiseAccountData, TrainingMode } from '../types';

interface WiseEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainee: TraineeProfile;
  wiseData: WiseAccountData | null;
  mode: TrainingMode;
  onTagTyped: () => void;
  onCurrencyPicked: () => void;
  onSave: (data: WiseAccountData) => void;
}

const CURRENCIES: { code: string; name: string }[] = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'PHP', name: 'Philippine Peso' }
];

export const WiseEditModal: React.FC<WiseEditModalProps> = ({
  isOpen,
  onClose,
  trainee,
  wiseData,
  mode,
  onTagTyped,
  onCurrencyPicked,
  onSave
}) => {
  const [tag, setTag] = useState(wiseData?.wiseTag ?? '');
  const [currency, setCurrency] = useState(wiseData?.currency ?? '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const expectedTag = '@' + trainee.email.split('@')[0].toLowerCase();

  const handleTag = (value: string) => {
    setTag(value);
    setError('');
    if (value.trim().length > 1) onTagTyped();
  };

  const handleCurrency = (value: string) => {
    setCurrency(value);
    setError('');
    if (value === 'PHP') onCurrencyPicked();
  };

  const handleSave = () => {
    const cleanTag = tag.trim().replace(/^@+/, '');
    if (!cleanTag) {
      setError('Enter your Wise Tag Name.');
      return;
    }
    if (!currency) {
      setError('Select your Wise Currency.');
      return;
    }
    if (mode === 'guided' && currency !== 'PHP') {
      setError('Homeaglow pays this contractor in Philippine Peso (PHP). Select PHP – Philippine Peso.');
      return;
    }
    const found = CURRENCIES.find((c) => c.code === currency);
    onSave({
      wiseEmail: trainee.email,
      fullName: trainee.name,
      accountType: 'personal',
      currency,
      currencyName: found ? found.name : currency,
      recipientType: 'tag',
      wiseTag: '@' + cleanTag,
      connectedAt: 'Active',
      isVerified: true,
      twoFactorVerified: true,
      autoPayrollEnabled: true,
      payoutSchedule: 'weekly'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-neutral-200 select-text">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <h2 className="text-base font-bold text-neutral-900">Edit Wise account</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="wise-tag" className="block text-xs font-semibold text-neutral-700">
              Wise Tag Name
            </label>
            <input
              id="wise-tag"
              type="text"
              value={tag}
              onChange={(e) => handleTag(e.target.value)}
              placeholder="@yourwisetag"
              autoComplete="off"
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="wise-currency" className="block text-xs font-semibold text-neutral-700">
              Wise Currency
            </label>
            <select
              id="wise-currency"
              value={currency}
              onChange={(e) => handleCurrency(e.target.value)}
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select currency</option>
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} – {c.name}
                </option>
              ))}
            </select>
          </div>

          {mode === 'guided' && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-md p-3 text-xs text-amber-900">
              <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Type your Wise tag, for example <strong>{expectedTag}</strong>, then choose{' '}
                <strong>PHP – Philippine Peso</strong> as the currency.
              </span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-md p-3 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 px-5 py-4 border-t border-neutral-200 bg-neutral-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 border border-neutral-300 rounded-md bg-white hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
