import React, { useState } from 'react';
import { 
  Headphones, 
  HelpCircle, 
  Bell, 
  Grid3X3, 
  User, 
  Clock, 
  ArrowUpRight, 
  PanelLeft, 
  Check, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { TraineeProfile } from '../types';

interface HubstaffHeaderProps {
  trainee: TraineeProfile;
  isWiseConnected: boolean;
  onOpenPromptModal: () => void;
  onOpenProfileModal: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const HubstaffHeader: React.FC<HubstaffHeaderProps> = ({
  trainee,
  isWiseConnected,
  onOpenPromptModal,
  onOpenProfileModal,
  onNavigateToTab
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Format timer as 0:00:00
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white border-b border-neutral-200 h-13 px-4 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left Area: Hubstaff Logo, Sidebar Toggle, Timer Widget */}
      <div className="flex items-center gap-4">
        {/* Hubstaff Brand Icon & Wordmark */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateToTab?.('payment_accounts')}>
          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-9c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v9zm4-2c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v5zm-8-2c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1z" />
          </svg>
          <span className="font-bold text-neutral-900 text-lg tracking-tight font-sans">
            Hubstaff
          </span>
        </div>

        {/* Sidebar Toggle Icon */}
        <button 
          className="text-neutral-500 hover:text-neutral-700 p-1.5 rounded hover:bg-neutral-100 transition-colors"
          title="Toggle sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {/* Stopwatch Timer Box: ⏱ 0:00:00 ↗ */}
        <div 
          onClick={() => setTimerRunning(!timerRunning)}
          className="flex items-center gap-2 border border-neutral-200 rounded-md px-2.5 py-1 text-xs text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 cursor-pointer transition-colors shadow-2xs font-mono"
          title={timerRunning ? "Click to stop timer" : "Click to start timer"}
        >
          <Clock className={`w-3.5 h-3.5 ${timerRunning ? 'text-emerald-500 animate-spin' : 'text-neutral-400'}`} />
          <span className="font-medium text-neutral-700 tabular-nums">
            {formatTime(timerSeconds)}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
        </div>
      </div>

      {/* Right Area: Action Icons + User Avatar with Menu */}
      <div className="flex items-center gap-3">
        {/* Support Headset */}
        <button 
          onClick={() => alert("Hubstaff 24/7 Support: Live chat available for Homeaglow contractors.")}
          className="text-neutral-500 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          title="Support"
        >
          <Headphones className="w-4 h-4" />
        </button>

        {/* Help Question Square */}
        <button 
          onClick={onOpenPromptModal}
          className="text-neutral-500 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          title="Help & Training Simulator Guide"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notification Bell with Badge 3 */}
        <div className="relative">
          <button 
            className="text-neutral-500 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
            3
          </span>
        </div>

        {/* App Switcher 3x3 Grid */}
        <button 
          className="text-neutral-500 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          title="Hubstaff Apps"
        >
          <Grid3X3 className="w-4 h-4" />
        </button>

        {/* User Avatar with Profile Dropdown Menu */}
        <div className="relative">
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity ring-2 ring-transparent focus:ring-blue-500"
            title="Account Menu"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Hubstaff Authentic User Dropdown as in Screenshot */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-neutral-200 py-1.5 text-xs text-neutral-700 z-50 animate-in fade-in zoom-in-95 duration-100">
              <button 
                onClick={() => { setIsUserMenuOpen(false); onOpenProfileModal(); }}
                className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex items-center justify-between"
              >
                <span>My account</span>
                <span className="text-[10px] text-neutral-400 font-mono">#{trainee.id}</span>
              </button>

              <button 
                onClick={() => { setIsUserMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-neutral-50"
              >
                User settings & billing
              </button>

              <button 
                onClick={() => { setIsUserMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-neutral-50"
              >
                Earn a sign-up bonus
              </button>

              <div className="my-1 border-t border-neutral-100" />

              {/* Payment accounts (Highlighted in screenshot with gray background) */}
              <button 
                onClick={() => { setIsUserMenuOpen(false); onNavigateToTab?.('payment_accounts'); }}
                className="w-full text-left px-4 py-2 bg-neutral-100 font-medium text-neutral-900"
              >
                Payment accounts
              </button>

              <button 
                onClick={() => { setIsUserMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-neutral-50"
              >
                Integrations
              </button>

              <div className="my-1 border-t border-neutral-100" />

              <button 
                onClick={() => { setIsUserMenuOpen(false); onOpenPromptModal(); }}
                className="w-full text-left px-4 py-2 hover:bg-neutral-50"
              >
                Support & Training Guide
              </button>

              <button 
                onClick={() => { setIsUserMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-neutral-50"
              >
                Download the app
              </button>

              <button 
                onClick={() => { setIsUserMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-neutral-50"
              >
                Developer API
              </button>

              <div className="my-1 border-t border-neutral-100" />

              <button 
                onClick={() => { setIsUserMenuOpen(false); alert("Signed out of demo session."); }}
                className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-neutral-500"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
