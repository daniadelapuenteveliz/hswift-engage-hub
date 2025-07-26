import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from 'react-router-dom';
import { ArrowRight, PlusCircle, Zap, SlidersHorizontal, AlertCircle, CheckCircle, Package, Globe } from 'lucide-react';

// Mock Data for integrations
const integrations = [
  {
    name: 'Integración Boe',
    description: 'API personalizada para operaciones internas y flujos de trabajo automatizados.',
    logo: <SlidersHorizontal className="w-8 h-8 text-primary" />,
    connected: true,
    stats: [
      { label: 'Endpoints', value: '12' },
      { label: 'Tasa de Fallo', value: '1.2%', icon: <AlertCircle className="w-4 h-4 text-destructive" /> },
      { label: 'Uptime', value: '99.98%', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
    ],
  },
  {
    name: 'Slack',
    description: 'Envía notificaciones y alertas directamente a los canales de tu equipo.',
    logo: <img src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" alt="Slack Logo" className="w-8 h-8" />,
    connected: true,
    stats: [
      { label: 'Workspaces', value: '1' },
      { label: 'Canales Activos', value: '5' },
    ],
  },
  {
    name: 'Zendesk',
    description: 'Sincroniza conversaciones y tickets con tu plataforma de soporte al cliente.',
    logo: <img src="https://cdn.worldvectorlogo.com/logos/zendesk.svg" alt="Zendesk Logo" className="w-8 h-8" />,
    connected: false,
    stats: [],
  },
];

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

const toolSets = [
  {
    name: 'Boe tools',
    description: 'A collection of tools to interact with the Boe API, including user management and order processing.',
    icon: <Package className="w-8 h-8 text-primary" />,
    status: 'Installed',
    action: 'Configure',
  },
  {
    name: 'Search internet tool',
    description: 'A powerful tool to perform web searches and get up-to-date information from the internet.',
    icon: <Globe className="w-8 h-8 text-primary" />,
    status: 'Available',
    action: 'Install',
  },
];

const ApisAndTools = () => {
  return (
    <TooltipProvider>
      <div className="p-6 sm:p-8 bg-muted/40 min-h-full">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <Card className="mb-8 shadow-sm bg-gradient-to-r from-background to-primary/5 border-primary/10">
            <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h1 className="text-3xl font-bold text-foreground">Conecta, Automatiza, Triunfa.</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  Integra tus herramientas favoritas en minutos y crea flujos de trabajo sin esfuerzo. Desde notificaciones en Slack hasta APIs personalizadas, HSwift es tu centro de comando.
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-foreground">¿Cómo funciona?</h3>
                <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span><b>Conecta con un clic:</b> Elige de nuestra creciente lista de aplicaciones y autoriza la conexión. ¡Así de fácil!</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span><b>Crea tu propia API:</b> Define tus propios endpoints como en Postman para construir integraciones a medida. Sin límites.</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Integrations Grid */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Integraciones Disponibles</h2>
            <Button><PlusCircle className="w-4 h-4 mr-2" />Conectar Nueva Herramienta</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((tool, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {tool.logo}
                    </div>
                    <div>
                      <CardTitle>{tool.name}</CardTitle>
                      <Badge variant={tool.connected ? 'default' : 'secondary'}>{tool.connected ? 'Conectado' : 'Disponible'}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </CardContent>
                <CardContent className="flex-grow-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    {tool.stats.map(stat => (
                      <Tooltip key={stat.label}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1.5 cursor-pointer">
                            {stat.icon || ''}
                            <span><b>{stat.value}</b> {stat.label}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent><p>{stat.label}</p></TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </CardContent>
                <CardContent className="flex-grow-0">
                  {tool.connected ? (
                    <Link to={`/apis-and-tools/api/${slugify(tool.name)}`} className="w-full">
                      <Button className="w-full" variant={'outline'}>
                        Administrar
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full" variant={'default'}>
                      Conectar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Tools sets</h2>
            <p className="mt-2 text-muted-foreground">
              Pre-built packages of tools to enhance your agents' capabilities.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {toolSets.map((tool) => (
                <Card key={tool.name} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      {tool.icon}
                      <Badge variant={tool.status === 'Installed' ? 'default' : 'secondary'}>{tool.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground flex-grow">{tool.description}</p>
                    <div className="mt-6">
                      <Link to={`/tools/${slugify(tool.name)}`} className="w-full">
                        <Button className="w-full">
                          {tool.action}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ApisAndTools;
