import React, { useState } from 'react';
import { X, User, DollarSign, Clock, Building2, Check } from 'lucide-react';
import { TraineeProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainee: TraineeProfile;
  onSave: (updated: TraineeProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  trainee,
  onSave
}) => {
  if (!isOpen) return null;

  const [id, setId] = useState(trainee.id);
  const [name, setName] = useState(trainee.name);
  const [email, setEmail] = useState(trainee.email);
  const [hourlyRate, setHourlyRate] = useState(trainee.hourlyRate.toString());
  const [trackedHours, setTrackedHours] = useState(trainee.trackedHoursThisWeek.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...trainee,
      id,
      name,
      email,
      hourlyRate: parseFloat(hourlyRate) || 20,
      trackedHoursThisWeek: parseFloat(trackedHours) || 32
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-neutral-200">
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm">Customize Trainee Profile</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Hubstaff User ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              placeholder="2884697"
            />
            <span className="text-[11px] text-neutral-500 mt-0.5 block">
              Matches URL: /users/{id}/payment_accounts
            </span>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Contractor Legal Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              required
            />
            <span className="text-[11px] text-neutral-500 mt-0.5 block">
              Wise account holder name must match this name for automated payroll.
            </span>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Hubstaff Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Contractor Rate ($/hr)
              </label>
              <input
                type="number"
                step="0.5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Tracked Hours (This Week)
              </label>
              <input
                type="number"
                step="0.5"
                value={trackedHours}
                onChange={(e) => setTrackedHours(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 px-3 border border-neutral-300 rounded-lg font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
