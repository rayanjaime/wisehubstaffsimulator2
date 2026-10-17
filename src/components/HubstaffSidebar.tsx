import React, { useState } from 'react';
import { 
  Star, 
  ChevronDown, 
  ChevronRight, 
  LayoutDashboard, 
  Clock, 
  Activity, 
  Lightbulb, 
  Briefcase, 
  CheckSquare, 
  Calendar, 
  BarChart2, 
  Users, 
  DollarSign
} from 'lucide-react';
import { TraineeProfile } from '../types';

interface HubstaffSidebarProps {
  trainee: TraineeProfile;
  currentTab: string;
  onTabChange: (tab: string) => void;
  isWiseConnected: boolean;
}

export const HubstaffSidebar: React.FC<HubstaffSidebarProps> = ({
  trainee,
  currentTab,
  onTabChange,
  isWiseConnected
}) => {
  const [favoritesExpanded, setFavoritesExpanded] = useState(true);
  const [financialsExpanded, setFinancialsExpanded] = useState(true);

  return (
    <aside className="w-56 bg-white border-r border-neutral-200 text-neutral-700 flex flex-col shrink-0 select-none text-[13px] h-[calc(100vh-3.25rem)] overflow-y-auto">
      <div className="py-2.5 px-2 space-y-0.5">
        {/* Favorites (1) */}
        <div>
          <button 
            onClick={() => setFavoritesExpanded(!favoritesExpanded)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 font-medium">
              <Star className="w-4 h-4 text-neutral-400" />
              <span>Favorites (1)</span>
            </div>
            {favoritesExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {favoritesExpanded && (
            <div className="ml-7 py-0.5 space-y-0.5">
              <button 
                onClick={() => onTabChange('timeline')}
                className="w-full text-left px-2 py-1 text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded"
              >
                Timeline
              </button>
            </div>
          )}
        </div>

        {/* Dashboard */}
        <button 
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
            currentTab === 'dashboard'
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="w-4 h-4 text-neutral-400" />
            <span>Dashboard</span>
          </div>
        </button>

        {/* Timesheets > */}
        <button 
          onClick={() => onTabChange('timesheets')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
            currentTab === 'timesheets'
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-neutral-400" />
            <span>Timesheets</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {/* Activity > */}
        <button 
          onClick={() => onTabChange('activity')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
            currentTab === 'activity'
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-neutral-400" />
            <span>Activity</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {/* Insights > */}
        <button 
          onClick={() => onTabChange('insights')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
            currentTab === 'insights'
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Lightbulb className="w-4 h-4 text-neutral-400" />
            <span>Insights</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {/* Section: Job sites */}
        <div className="pt-2 px-2.5 text-xs text-neutral-500 font-medium">
          Job sites
        </div>

        {/* Project management > */}
        <button 
          onClick={() => onTabChange('project_management')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
            currentTab === 'project_management'
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckSquare className="w-4 h-4 text-neutral-400" />
            <span>Project management</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {/* Calendar > */}
        <button 
          onClick={() => onTabChange('calendar')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
            currentTab === 'calendar'
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-neutral-400" />
            <span>Calendar</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {/* Reports > */}
        <button 
          onClick={() => onTabChange('reports')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
            currentTab === 'reports'
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BarChart2 className="w-4 h-4 text-neutral-400" />
            <span>Reports</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {/* People > */}
        <button 
          onClick={() => onTabChange('people')}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
            currentTab === 'people'
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-neutral-400" />
            <span>People</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {/* Financials v (Expanded) */}
        <div>
          <button 
            onClick={() => setFinancialsExpanded(!financialsExpanded)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 text-neutral-700 hover:bg-neutral-50 rounded-md transition-colors font-medium"
          >
            <div className="flex items-center gap-2.5 text-blue-600">
              <div className="w-4 h-4 rounded-full border border-blue-600 flex items-center justify-center font-bold text-[10px]">
                $
              </div>
              <span className="text-neutral-800">Financials</span>
            </div>
            {financialsExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {financialsExpanded && (
            <div className="ml-7 py-0.5 space-y-0.5">
              {/* Payment accounts (Active, matching screenshot exact styling) */}
              <button 
                onClick={() => onTabChange('payment_accounts')}
                className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md font-medium transition-colors ${
                  currentTab === 'payment_accounts'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                Payment accounts
              </button>

              <button 
                onClick={() => onTabChange('invoices')}
                className="w-full text-left px-2.5 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-md transition-colors"
              >
                Invoices
              </button>

              <button 
                onClick={() => onTabChange('expenses')}
                className="w-full text-left px-2.5 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-md transition-colors"
              >
                Expenses
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
