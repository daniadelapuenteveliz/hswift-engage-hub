import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from 'react-router-dom';
import { ArrowRight, PlusCircle, Zap, SlidersHorizontal, AlertCircle, CheckCircle, Package, Globe } from 'lucide-react';

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

const ApisAndTools = () => {
  const { t } = useTranslation();

  const integrations = useMemo(() => [
    {
      name: t('apisAndTools.integrations.items.boe.name'),
      description: t('apisAndTools.integrations.items.boe.description'),
      logo: <SlidersHorizontal className="w-8 h-8 text-primary" />,
      connected: true,
      stats: [
        { label: t('apisAndTools.integrations.items.boe.stats.endpoints'), value: '12' },
        { label: t('apisAndTools.integrations.items.boe.stats.failureRate'), value: '1.2%', icon: <AlertCircle className="w-4 h-4 text-destructive" /> },
        { label: t('apisAndTools.integrations.items.boe.stats.uptime'), value: '99.98%', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
      ],
    },
    {
      name: t('apisAndTools.integrations.items.slack.name'),
      description: t('apisAndTools.integrations.items.slack.description'),
      logo: <img src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" alt="Slack Logo" className="w-8 h-8" />,
      connected: true,
      stats: [
        { label: t('apisAndTools.integrations.items.slack.stats.workspaces'), value: '1' },
        { label: t('apisAndTools.integrations.items.slack.stats.activeChannels'), value: '5' },
      ],
    },
    {
      name: t('apisAndTools.integrations.items.zendesk.name'),
      description: t('apisAndTools.integrations.items.zendesk.description'),
      logo: <img src="https://cdn.worldvectorlogo.com/logos/zendesk.svg" alt="Zendesk Logo" className="w-8 h-8" />,
      connected: false,
      stats: [],
    },
  ], [t]);

  const toolSets = useMemo(() => [
    {
      name: t('apisAndTools.toolSets.items.boe.name'),
      description: t('apisAndTools.toolSets.items.boe.description'),
      icon: <Package className="w-8 h-8 text-primary" />,
      status: t('apisAndTools.toolSets.status.installed'),
      action: t('apisAndTools.toolSets.buttons.configure'),
    },
    {
      name: t('apisAndTools.toolSets.items.search.name'),
      description: t('apisAndTools.toolSets.items.search.description'),
      icon: <Globe className="w-8 h-8 text-primary" />,
      status: t('apisAndTools.toolSets.status.available'),
      action: t('apisAndTools.toolSets.buttons.install'),
    },
  ], [t]);

  return (
    <TooltipProvider>
      <div className="p-6 sm:p-8 bg-muted/40 min-h-full">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <Card className="mb-8 shadow-sm bg-gradient-to-r from-background to-primary/5 border-primary/10">
            <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h1 className="text-3xl font-bold text-foreground">{t('apisAndTools.header.title')}</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  {t('apisAndTools.header.description')}
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-foreground">{t('apisAndTools.header.howItWorks')}</h3>
                <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: t('apisAndTools.header.step1') }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: t('apisAndTools.header.step2') }} />
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Integrations Grid */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">{t('apisAndTools.integrations.title')}</h2>
            <Button><PlusCircle className="w-4 h-4 mr-2" />{t('apisAndTools.integrations.connectNewTool')}</Button>
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
                      <Badge variant={tool.connected ? 'default' : 'secondary'}>{tool.connected ? t('apisAndTools.integrations.status.connected') : t('apisAndTools.integrations.status.available')}</Badge>
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
                        {t('apisAndTools.integrations.buttons.manage')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full" variant={'default'}>
                      {t('apisAndTools.integrations.buttons.connect')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t('apisAndTools.toolSets.title')}</h2>
            <p className="mt-2 text-muted-foreground">
              {t('apisAndTools.toolSets.description')}
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {toolSets.map((tool) => (
                <Card key={tool.name} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      {tool.icon}
                      <Badge variant={tool.status === t('apisAndTools.toolSets.status.installed') ? 'default' : 'secondary'}>{tool.status}</Badge>
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
