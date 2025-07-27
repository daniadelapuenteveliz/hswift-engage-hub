import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Sparkles } from 'lucide-react';

const AssistantAnalytics = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 sm:p-6 flex-1 flex flex-col h-full">
      {/* Welcome/Chat History Area */}
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <Sparkles className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold">{t('analytics.assistant.title')}</h2>
        <p className="text-muted-foreground mt-2 max-w-md">{t('analytics.assistant.description')}</p>
      </div>

      {/* Input Area */}
      <div className="mt-auto pt-4 max-w-3xl w-full mx-auto">
        <div className="relative">
          <Input
            placeholder={t('analytics.assistant.placeholder')}
            className="pr-14 h-12 text-base rounded-full"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full h-9 w-9"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssistantAnalytics;

