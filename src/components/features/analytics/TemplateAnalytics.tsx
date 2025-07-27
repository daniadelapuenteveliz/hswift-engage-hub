import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const templateAnalyticsData = [
  {
    name: 'Onboarding Welcome',
    category: 'Welcome',
    sent: 1203,
    opened: 987,
    clicks: 345,
    conversion: 28.6,
  },
  {
    name: 'Abandoned Cart',
    category: 'Sales',
    sent: 845,
    opened: 654,
    clicks: 210,
    conversion: 24.8,
  },
  {
    name: 'Feature Update v2.1',
    category: 'Announcements',
    sent: 2341,
    opened: 1879,
    clicks: 450,
    conversion: 19.2,
  },
  {
    name: 'Feedback Request',
    category: 'Support',
    sent: 540,
    opened: 480,
    clicks: 280,
    conversion: 51.8,
  },
  {
    name: 'Holiday Sale',
    category: 'Marketing',
    sent: 5432,
    opened: 3210,
    clicks: 987,
    conversion: 18.2,
  },
];

const GetCategoryBadge = ({ category }: { category: string }) => {
  const { t } = useTranslation();
  const categoryKey = category.toLowerCase();
  const translatedCategory = t(`analytics.templates.categories.${categoryKey}`);

  switch (categoryKey) {
    case 'welcome':
      return <Badge variant="default">{translatedCategory}</Badge>;
    case 'sales':
      return <Badge variant="destructive">{translatedCategory}</Badge>;
    case 'announcements':
      return <Badge variant="secondary">{translatedCategory}</Badge>;
    case 'support':
      return <Badge variant="outline">{translatedCategory}</Badge>;
    case 'marketing':
      return <Badge className="bg-blue-500 text-white">{translatedCategory}</Badge>;
    default:
      return <Badge>{category}</Badge>;
  }
};

const TemplateAnalytics = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 sm:p-6 flex-1 flex flex-col h-full">
      <Card className="w-full flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>{t('analytics.templates.title')}</CardTitle>
          <CardDescription>{t('analytics.templates.description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('analytics.templates.templateName')}</TableHead>
                <TableHead>{t('analytics.templates.category')}</TableHead>
                <TableHead className="text-right">{t('analytics.templates.sent')}</TableHead>
                <TableHead className="text-right">{t('analytics.templates.opened')}</TableHead>
                <TableHead className="text-right">{t('analytics.templates.clicks')}</TableHead>
                <TableHead className="text-right">{t('analytics.templates.conversion')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templateAnalyticsData.map((template) => (
                <TableRow key={template.name}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell><GetCategoryBadge category={template.category} /></TableCell>
                  <TableCell className="text-right">{template.sent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{template.opened.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{template.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">{template.conversion}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateAnalytics;
