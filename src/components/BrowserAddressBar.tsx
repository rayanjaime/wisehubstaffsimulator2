import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Star } from 'lucide-react';

interface BrowserAddressBarProps {
  userId: string;
}

export const BrowserAddressBar: React.FC<BrowserAddressBarProps> = ({ userId }) => {
  const [showChrome, setShowChrome] = useState(true);

  if (!showChrome) {
    return (
      <div className="bg-neutral-200 border-b border-neutral-300 py-0.5 px-3 flex justify-end text-[10px] text-neutral-600">
        <button 
          onClick={() => setShowChrome(true)}
          className="hover:text-neutral-900 underline font-mono"
        >
          Show Browser Bar (app.hubstaff.com/users/{userId}/payment_accounts)
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#dee1e6] border-b border-neutral-300 select-none text-xs font-sans">
      {/* 1. URL Navigation Row */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f1f3f4]">
        {/* Nav Controls */}
        <div className="flex items-center gap-1 text-neutral-600">
          <button className="p-1 hover:bg-neutral-200 rounded-full transition-colors" title="Back">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-neutral-200 rounded-full transition-colors opacity-40 cursor-not-allowed" title="Forward">
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-neutral-200 rounded-full transition-colors" title="Reload">
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex-1 bg-white border border-neutral-300 rounded-full px-3.5 py-1 flex items-center justify-between shadow-2xs hover:border-neutral-400 transition-colors">
          <div className="flex items-center gap-2 overflow-hidden text-neutral-800 text-[13px] font-normal">
            <Lock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
            <span className="truncate">
              app.hubstaff.com/users/{userId}/payment_accounts
            </span>
          </div>

          <div className="flex items-center gap-2 text-neutral-500 shrink-0">
            <button className="hover:text-neutral-800 p-0.5" title="Bookmark">
              <Star className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* User Account Verification Pill from Screenshot */}
        <div className="flex items-center gap-2">
          <div className="bg-[#bbf7d0] text-[#14532d] px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-2xs">
            <span className="w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[10px] font-bold">
              R
            </span>
            <span className="text-[11px] font-semibold hidden md:inline">Verify it's you</span>
          </div>

          <button 
            onClick={() => setShowChrome(false)}
            className="text-[10px] text-neutral-500 hover:text-neutral-800 px-1"
            title="Hide Browser Bar"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
