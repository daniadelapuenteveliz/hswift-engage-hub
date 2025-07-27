import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { USFlag } from '@/components/icons/flags/USFlag';
import { ESFlag } from '@/components/icons/flags/ESFlag';
import { DEFlag } from '@/components/icons/flags/DEFlag';
import { BRFlag } from '@/components/icons/flags/BRFlag';

type Language = 'en' | 'es' | 'de' | 'pt';

const languageOptions: { value: Language; label: string; icon: React.ElementType }[] = [
  { value: 'en', label: 'English', icon: USFlag },
  { value: 'es', label: 'Español', icon: ESFlag },
  { value: 'de', label: 'Deutsch', icon: DEFlag },
  { value: 'pt', label: 'Português', icon: BRFlag },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language.split('-')[0] as Language;
  const CurrentFlag = languageOptions.find(lang => lang.value === currentLanguage)?.icon || USFlag;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <CurrentFlag className="w-6 h-6 rounded-sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageOptions.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onSelect={() => i18n.changeLanguage(lang.value)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <lang.icon className="w-5 h-5 rounded-sm" />
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
