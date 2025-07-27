import React, { useState } from 'react';
import { Bot, MessageSquareText, BarChart3, Sparkles } from 'lucide-react';

import BotAnalytics from '@/components/features/analytics/BotAnalytics';
import TemplateAnalytics from '@/components/features/analytics/TemplateAnalytics';
import GeneralAnalytics from '@/components/features/analytics/GeneralAnalytics';
import AssistantAnalytics from '@/components/features/analytics/AssistantAnalytics';

type View = 'bots' | 'templates' | 'general' | 'assistant';

const menuItems: { id: View; label: string; icon: React.ElementType }[] = [
  { id: 'bots', label: 'Bots', icon: Bot },
  { id: 'templates', label: 'Templates', icon: MessageSquareText },
  { id: 'general', label: 'General', icon: BarChart3 },
  { id: 'assistant', label: 'AI Assistant', icon: Sparkles },
];

const Analytics = () => {
  const [activeView, setActiveView] = useState<View>('bots');

  const renderContent = () => {
    switch (activeView) {
      case 'bots':
        return <BotAnalytics />;
      case 'templates':
        return <TemplateAnalytics />;
      case 'general':
        return <GeneralAnalytics />;
      case 'assistant':
        return <AssistantAnalytics />;
      default:
        return <BotAnalytics />;
    }
  };

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r bg-slate-50/50 dark:bg-slate-900/50 p-4">
        <h2 className="text-lg font-semibold mb-6 px-2">Analytics</h2>
        <nav className="flex flex-col gap-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeView === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default Analytics;
