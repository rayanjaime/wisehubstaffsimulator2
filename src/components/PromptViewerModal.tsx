import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  FileText, 
  HelpCircle,
  ExternalLink,
  Award
} from 'lucide-react';
import { MASTER_PROMPT_TEMPLATE, TRAINEE_INSTRUCTION_GUIDE, TRAINEE_FAQ } from '../data/promptAndScript';

interface PromptViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptViewerModal: React.FC<PromptViewerModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'prompt' | 'guide' | 'faq'>('prompt');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedGuide, setCopiedGuide] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(MASTER_PROMPT_TEMPLATE);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyGuide = () => {
    navigator.clipboard.writeText(TRAINEE_INSTRUCTION_GUIDE);
    setCopiedGuide(true);
    setTimeout(() => setCopiedGuide(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-neutral-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Master Prompt & Training Package
              </h3>
              <p className="text-xs text-slate-400">
                Hubstaff + Wise Integration Simulator for Homeaglow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-neutral-200 bg-neutral-50 text-xs">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-2.5 font-medium rounded-t-lg transition-colors flex items-center gap-2 border-b-2 -mb-[1px] ${
              activeTab === 'prompt'
                ? 'bg-white border-blue-600 text-blue-600 shadow-2xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Master AI Prompt</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2.5 font-medium rounded-t-lg transition-colors flex items-center gap-2 border-b-2 -mb-[1px] ${
              activeTab === 'guide'
                ? 'bg-white border-blue-600 text-blue-600 shadow-2xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Trainee Step-by-Step Script</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2.5 font-medium rounded-t-lg transition-colors flex items-center gap-2 border-b-2 -mb-[1px] ${
              activeTab === 'faq'
                ? 'bg-white border-blue-600 text-blue-600 shadow-2xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Homeaglow Payroll FAQ</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 text-neutral-800">
          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-900">
                  <strong>Ready to copy:</strong> Use this comprehensive prompt to re-create or customize this simulator across any AI coding model or AI Studio build agent.
                </div>
                <button
                  onClick={handleCopyPrompt}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Master Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-neutral-900 text-neutral-200 p-4 rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-[50vh] overflow-y-auto select-all border border-neutral-800">
                {MASTER_PROMPT_TEMPLATE}
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-neutral-100 p-3 rounded-lg border border-neutral-200">
                <div className="text-xs text-neutral-700">
                  <strong>Trainer Handout:</strong> Step-by-step instructions for Homeaglow trainees to read before practicing.
                </div>
                <button
                  onClick={handleCopyGuide}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs"
                >
                  {copiedGuide ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>

              <div className="prose prose-xs max-w-none bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-xs text-neutral-800 whitespace-pre-wrap leading-relaxed font-sans">
                {TRAINEE_INSTRUCTION_GUIDE}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="text-xs text-neutral-500 mb-2">
                Frequently asked questions encountered during Homeaglow contractor onboarding:
              </div>
              {TRAINEE_FAQ.map((faq, idx) => (
                <div key={idx} className="bg-neutral-50 p-3.5 rounded-lg border border-neutral-200 text-xs">
                  <div className="font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                    <span className="text-blue-600 font-mono">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed pl-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
          <span>Homeaglow Onboarding Reference · URL: <code className="text-neutral-700">/users/2884697/payment_accounts</code></span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-md font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
