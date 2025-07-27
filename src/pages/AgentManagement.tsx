import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentManagement = () => {
  const { t } = useTranslation();

  const agents = useMemo(() => [
    {
      name: 'Hermes',
      description: t('agentManagement.agents.hermes.description'),
      avatar: '/avatars/hermes.png',
      fallback: 'H',
    },
    {
      name: 'Boet',
      description: t('agentManagement.agents.boet.description'),
      avatar: '/avatars/boet.png',
      fallback: 'B',
    },
    {
      name: 'Maui',
      description: t('agentManagement.agents.maui.description'),
      avatar: '/avatars/maui.png',
      fallback: 'M',
    },
  ], [t]);

  return (
    <div className="p-4 sm:p-6 h-full flex flex-col">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('agentManagement.header.title')}</h1>
          <p className="text-muted-foreground">{t('agentManagement.header.description')}</p>
        </div>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          {t('agentManagement.header.createAgent')}
        </Button>
      </header>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder={t('agentManagement.searchPlaceholder')} className="pl-10" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent) => (
          <Card key={agent.name} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex-row items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-primary/20">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback className="font-bold">{agent.fallback}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>{t('agentManagement.agentType')}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground italic">"{agent.description}"</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link to={`/agent/${agent.name.toLowerCase()}/configure`} className="w-full">
                <Button variant="outline" className="w-full">
                  {t('agentManagement.buttons.configure')}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentManagement;
