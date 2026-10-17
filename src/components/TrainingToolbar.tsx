import React from 'react';
import { 
  GraduationCap, 
  HelpCircle, 
  RotateCcw, 
  Sparkles, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Sliders,
  Check
} from 'lucide-react';
import { TrainingMode, TrainingScenario, TrainingStep, TraineeProfile } from '../types';

interface TrainingToolbarProps {
  mode: TrainingMode;
  onModeChange: (mode: TrainingMode) => void;
  scenario: TrainingScenario;
  onScenarioChange: (scenario: TrainingScenario) => void;
  steps: TrainingStep[];
  currentStepIndex: number;
  onReset: () => void;
  onOpenPromptModal: () => void;
  onOpenProfileModal: () => void;
  trainee: TraineeProfile;
  examScore: { completed: boolean; score: number; feedback: string[] } | null;
}

export const TrainingToolbar: React.FC<TrainingToolbarProps> = ({
  mode,
  onModeChange,
  scenario,
  onScenarioChange,
  steps,
  currentStepIndex,
  onReset,
  onOpenPromptModal,
  onOpenProfileModal,
  trainee,
  examScore
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const completedCount = steps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  if (isCollapsed) {
    return (
      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-900 text-white rounded-full text-xs font-medium shadow-lg backdrop-blur-xs border border-slate-700/80 transition-all hover:scale-105"
          title="Open Training & Demo Controls"
        >
          <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
          <span>Trainer & Demo Simulator Controls</span>
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Bar with Mode, Scenario, and Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Simulator Badge & Mode Selection */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded border border-blue-500/30 font-semibold tracking-wide uppercase text-[10px]">
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            <span>Trainee Demo Simulator</span>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => onModeChange('guided')}
              className={`px-3 py-1 rounded-md transition-colors font-medium ${
                mode === 'guided'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Guided Tutorial
            </button>
            <button
              onClick={() => onModeChange('exam')}
              className={`px-3 py-1 rounded-md transition-colors font-medium ${
                mode === 'exam'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Exam Mode (No Hints)
            </button>
          </div>
        </div>

        {/* Center: Scenario Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium hidden sm:inline">Scenario:</span>
          <select
            value={scenario}
            onChange={(e) => onScenarioChange(e.target.value as TrainingScenario)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-md px-2.5 py-1 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
          >
            <option value="happy_path">Standard Connection (Happy Path)</option>
            <option value="name_mismatch">Error: Name Mismatch (KYC Alert)</option>
            <option value="invalid_currency">Error: Unsupported Currency</option>
            <option value="two_factor_auth">Wise 2-Step Verification (2FA)</option>
          </select>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPromptModal}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-medium transition-colors shadow-xs"
            title="View the prompt that generates this simulator & copy training guide"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Prompt & Script</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md transition-colors border border-slate-700"
            title="Reset training simulation state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={() => setIsCollapsed(true)}
            className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors text-xs"
            title="Hide training controls"
          >
            Hide Controls
          </button>
        </div>
      </div>

      {/* Guided Progress & Step Banner (Active in Guided Mode) */}
      {mode === 'guided' && (
        <div className="bg-slate-800/90 border-t border-slate-700/60 px-4 sm:px-6 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-semibold text-blue-400">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {currentStepIndex + 1}
                </span>
                <span>Current Step: {steps[currentStepIndex]?.title}</span>
              </div>
              <span className="text-slate-400 hidden sm:inline">·</span>
              <span className="text-slate-300">
                {steps[currentStepIndex]?.hint}
              </span>
            </div>

            {/* Checklist Dots / Progress */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-400 font-mono text-[11px]">
                {completedCount}/{steps.length} Completed
              </span>
              <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exam Mode Result Banner */}
      {mode === 'exam' && examScore && (
        <div className="bg-purple-950/80 border-t border-purple-800/70 px-4 sm:px-6 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">Exam Result: Score {examScore.score}/100</span>
              <span className="text-purple-300">· {examScore.feedback.join(' · ')}</span>
            </div>
            <button
              onClick={onReset}
              className="text-purple-300 underline hover:text-white"
            >
              Retake Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
