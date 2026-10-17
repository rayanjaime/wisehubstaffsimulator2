/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HubstaffHeader } from './components/HubstaffHeader';
import { HubstaffSidebar } from './components/HubstaffSidebar';
import { TrainingToolbar } from './components/TrainingToolbar';
import { PaymentAccountsView } from './components/PaymentAccountsView';
import { WiseEditModal } from './components/WiseEditModal';
import { WiseConnectModal } from './components/WiseConnectModal';
import { PayoutSimulatorModal } from './components/PayoutSimulatorModal';
import { PromptViewerModal } from './components/PromptViewerModal';
import { ProfileModal } from './components/ProfileModal';
import { BrowserAddressBar } from './components/BrowserAddressBar';
import { 
  TraineeProfile, 
  WiseAccountData, 
  TrainingMode, 
  TrainingScenario, 
  TrainingStep 
} from './types';
import { Clock, LayoutDashboard, Activity, Receipt, Settings, ArrowLeft } from 'lucide-react';

const INITIAL_STEPS: TrainingStep[] = [
  {
    id: 1,
    title: "Open Payment Accounts",
    description: "In the left sidebar, open Financials and click Payment accounts.",
    actionRequired: "Click 'Payment accounts'",
    completed: false,
    hint: "Look for Financials in the left sidebar, then click Payment accounts."
  },
  {
    id: 2,
    title: "Click Edit on the Wise account",
    description: "Under Payout method you will see the Wise account (Preferred) and Direct payout to your bank. Click the pencil (Edit) on the Wise account card.",
    actionRequired: "Click the pencil icon",
    completed: false,
    hint: "The pencil icon is in the top right corner of the Wise account (Preferred) card."
  },
  {
    id: 3,
    title: "Type the Wise Tag Name",
    description: "Enter the contractor's Wise tag in the Wise Tag Name field.",
    actionRequired: "Type the Wise Tag Name",
    completed: false,
    hint: "Example: @markrayanpadilloj"
  },
  {
    id: 4,
    title: "Choose Philippine Peso",
    description: "Set the Wise Currency to PHP – Philippine Peso.",
    actionRequired: "Select Wise Currency",
    completed: false,
    hint: "Open the Wise Currency list and pick PHP – Philippine Peso."
  },
  {
    id: 5,
    title: "Save the Wise account",
    description: "Click Save. The Wise card should show the tag, PHP – Philippine Peso and a Connected badge.",
    actionRequired: "Click Save",
    completed: false,
    hint: "Click the blue Save button at the bottom of the form."
  }
];

export default function App() {
  // Trainee Profile matching user request link https://app.hubstaff.com/users/2884697/payment_accounts
  const [trainee, setTrainee] = useState<TraineeProfile>({
    id: '2884697',
    name: 'Mark Rayan Padillo',
    email: 'markrayanpadilloj@gmail.com',
    role: 'Homeaglow Contractor',
    organization: 'Homeaglow',
    organizationId: 'homeaglow-8291',
    hourlyRate: 20.0,
    trackedHoursThisWeek: 32.5
  });

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [trainingMode, setTrainingMode] = useState<TrainingMode>('guided');
  const [scenario, setScenario] = useState<TrainingScenario>('happy_path');
  const [steps, setSteps] = useState<TrainingStep[]>(INITIAL_STEPS);
  
  // Demo starts with no Wise tag or currency saved. The agent fills them in.
  const [wiseData, setWiseData] = useState<WiseAccountData | null>(null);

  // Modals state
  const [isWiseModalOpen, setIsWiseModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Exam assessment score state
  const [examScore, setExamScore] = useState<{
    completed: boolean;
    score: number;
    feedback: string[];
  } | null>(null);

  // Step index tracker
  const currentStepIndex = Math.min(
    steps.findIndex((s) => !s.completed) === -1 ? steps.length - 1 : steps.findIndex((s) => !s.completed),
    steps.length - 1
  );

  const markStepComplete = (stepId: number) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id <= stepId ? { ...step, completed: true } : step
      )
    );
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'payment_accounts') markStepComplete(1);
  };

  const handleEditWiseClick = () => {
    markStepComplete(2);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (data: WiseAccountData) => {
    setWiseData(data);
    setIsEditModalOpen(false);
    markStepComplete(5);
    if (trainingMode === 'exam') {
      const expectedTag = '@' + trainee.email.split('@')[0].toLowerCase();
      const ok = data.wiseTag.toLowerCase() === expectedTag && data.currency === 'PHP';
      setExamScore({
        completed: true,
        score: ok ? 100 : 75,
        feedback: ok
          ? ['Full Marks: Wise tag and Philippine Peso saved correctly']
          : ['Check the Wise tag name and currency against the contractor record']
      });
    }
  };

  const handleConnectWiseClick = () => {
    markStepComplete(2);
    setIsWiseModalOpen(true);
  };

  const handleWiseSuccess = (data: WiseAccountData) => {
    setWiseData(data);
    setIsWiseModalOpen(false);
    markStepComplete(5);

    if (trainingMode === 'exam') {
      const isNameMatched = data.fullName.trim().toLowerCase() === trainee.name.trim().toLowerCase();
      const score = isNameMatched ? 100 : 75;
      const feedback = isNameMatched
        ? ['Full Marks: Account verified with exact legal name match', 'Auto-payroll enabled for Monday']
        : ['Warning: Name mismatch detected on final confirmation', 'AML review needed'];
      setExamScore({
        completed: true,
        score,
        feedback
      });
    }
  };

  const handleDisconnectWise = () => {
    if (confirm('Are you sure you want to disconnect your Wise account from Homeaglow? You will not receive automated payroll until reconnected.')) {
      setWiseData(null);
      setSteps((prev) =>
        prev.map((step) => (step.id >= 2 ? { ...step, completed: false } : step))
      );
      setExamScore(null);
    }
  };

  const handleResetSimulation = () => {
    setWiseData(null);
    setSteps(INITIAL_STEPS);
    setExamScore(null);
    setCurrentTab('dashboard');
    setIsEditModalOpen(false);
    setIsWiseModalOpen(false);
    setIsPayoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 0. Optional Browser Chrome Bar mirroring user's browser environment */}
      <BrowserAddressBar userId={trainee.id} />

      {/* 1. Trainer & Simulator Control Banner (Collapsible) */}
      <TrainingToolbar
        mode={trainingMode}
        onModeChange={(m) => {
          setTrainingMode(m);
          setExamScore(null);
        }}
        scenario={scenario}
        onScenarioChange={(s) => {
          setScenario(s);
          handleResetSimulation();
        }}
        steps={steps}
        currentStepIndex={currentStepIndex}
        onReset={handleResetSimulation}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        trainee={trainee}
        examScore={examScore}
      />

      {/* 2. Authentic Hubstaff Header */}
      <HubstaffHeader
        trainee={trainee}
        isWiseConnected={!!wiseData}
        onNavigateToTab={handleTabChange}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* 3. Main Workspace Area: Sidebar + Active Tab Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Hubstaff Sidebar */}
        <HubstaffSidebar
          trainee={trainee}
          currentTab={currentTab}
          onTabChange={handleTabChange}
          isWiseConnected={!!wiseData}
        />

        {/* Tab View Switcher */}
        {currentTab === 'payment_accounts' ? (
          <PaymentAccountsView
            trainee={trainee}
            wiseData={wiseData}
            onConnectWise={handleEditWiseClick}
            onEditWise={handleEditWiseClick}
            onResetDemo={handleResetSimulation}
            onDisconnectWise={handleDisconnectWise}
            onOpenPayoutSim={() => setIsPayoutModalOpen(true)}
            mode={trainingMode}
            currentStepIndex={currentStepIndex}
          />
        ) : (
          /* Placeholder view for other Hubstaff tabs with easy back navigation */
          <div className="flex-1 p-8 bg-white flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
              {currentTab === 'dashboard' && <LayoutDashboard className="w-8 h-8" />}
              {currentTab === 'activity' && <Activity className="w-8 h-8" />}
              {currentTab === 'timesheets' && <Clock className="w-8 h-8" />}
              {currentTab === 'payroll' && <Receipt className="w-8 h-8" />}
              {currentTab === 'settings' && <Settings className="w-8 h-8" />}
            </div>
            <h2 className="text-xl font-bold text-neutral-800 capitalize">
              {currentTab.replace('_', ' ')} Tab
            </h2>
            <p className="text-xs text-neutral-500 max-w-md mt-1 mb-4">
              This demo focuses on the Wise account in Payment accounts. In the left sidebar, open Financials, then click Payment accounts. Page address: <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono">/users/{trainee.id}/payment_accounts</code>.
            </p>
          </div>
        )}
      </div>

      {/* Edit Wise account (tag + currency) */}
      <WiseEditModal
        key={isEditModalOpen ? 'open' : 'closed'}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        trainee={trainee}
        wiseData={wiseData}
        mode={trainingMode}
        onTagTyped={() => markStepComplete(3)}
        onCurrencyPicked={() => markStepComplete(4)}
        onSave={handleEditSave}
      />

      {/* Wise OAuth & Connection Modal */}
      <WiseConnectModal
        isOpen={isWiseModalOpen}
        onClose={() => setIsWiseModalOpen(false)}
        trainee={trainee}
        scenario={scenario}
        onSuccess={handleWiseSuccess}
        onStepComplete={markStepComplete}
      />

      {/* Payout Simulator Modal */}
      {wiseData && (
        <PayoutSimulatorModal
          isOpen={isPayoutModalOpen}
          onClose={() => setIsPayoutModalOpen(false)}
          trainee={trainee}
          wiseData={wiseData}
        />
      )}

      {/* Prompt & Trainer Script Viewer Modal */}
      <PromptViewerModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />

      {/* Trainee Profile Customizer Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        trainee={trainee}
        onSave={setTrainee}
      />
    </div>
  );
}
