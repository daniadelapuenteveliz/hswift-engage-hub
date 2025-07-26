import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const agents = [
  {
    name: 'Hermes',
    description: 'Hola, soy Hermes, encargado de la mensajería y de asegurar que tus comunicaciones fluyan sin interrupciones.',
    avatar: '/avatars/hermes.png', // Placeholder
    fallback: 'H',
  },
  {
    name: 'Boet',
    description: 'Soy Boet, tu especialista en ventas. Mi objetivo es identificar oportunidades y cerrar tratos de manera eficiente.',
    avatar: '/avatars/boet.png',
    fallback: 'B',
  },
  {
    name: 'Maui',
    description: '¡De nada! Soy Maui, semidiós del viento y el mar, listo para realizar hazañas increíbles por ti.',
    avatar: '/avatars/maui.png',
    fallback: 'M',
  },
];

const AgentManagement = () => {
  return (
    <div className="p-4 sm:p-6 h-full flex flex-col">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agent Management</h1>
          <p className="text-muted-foreground">Crea, configura y gestiona tus agentes de IA.</p>
        </div>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </header>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search agents..." className="pl-10" />
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
                <CardDescription>AI Agent</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground italic">"{agent.description}"</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link to={`/agent/${agent.name.toLowerCase()}/configure`} className="w-full">
                <Button variant="outline" className="w-full">
                  Configure
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
