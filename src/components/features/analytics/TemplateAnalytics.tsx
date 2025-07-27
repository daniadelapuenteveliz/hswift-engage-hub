import React from 'react';
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

const getCategoryBadge = (category: string) => {
  switch (category.toLowerCase()) {
    case 'welcome':
      return <Badge variant="default">Welcome</Badge>;
    case 'sales':
      return <Badge variant="destructive">Sales</Badge>;
    case 'announcements':
      return <Badge variant="secondary">Announcements</Badge>;
    case 'support':
      return <Badge variant="outline">Support</Badge>;
    case 'marketing':
      return <Badge className="bg-blue-500 text-white">Marketing</Badge>;
    default:
      return <Badge>{category}</Badge>;
  }
};

const TemplateAnalytics = () => {
  return (
    <div className="p-4 sm:p-6 flex-1 flex flex-col h-full">
      <Card className="w-full flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>Template Analytics</CardTitle>
          <CardDescription>
            Performance metrics for your message templates.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Sent</TableHead>
                <TableHead className="text-right">Opened</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Conversion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templateAnalyticsData.map((template) => (
                <TableRow key={template.name}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{getCategoryBadge(template.category)}</TableCell>
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
