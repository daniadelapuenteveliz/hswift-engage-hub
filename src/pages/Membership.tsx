import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { Crown, ArrowRight, Download, CreditCard, LifeBuoy } from "lucide-react";

const oldChartData = [ // to be removed
  { month: "January", amount: 186 },
  { month: "February", amount: 205 },
  { month: "March", amount: 237 },
  { month: "April", amount: 173 },
  { month: "May", amount: 209 },
  { month: "June", amount: 254 },
];

const oldBillingHistory = [ // to be removed
  { invoice: "INV-2024-006", date: "June 1, 2024", amount: "$254.00", status: "Paid" },
  { invoice: "INV-2024-005", date: "May 1, 2024", amount: "$209.00", status: "Paid" },
  { invoice: "INV-2024-004", date: "April 1, 2024", amount: "$173.00", status: "Paid" },
  { invoice: "INV-2024-003", date: "March 1, 2024", amount: "$237.00", status: "Paid" },
];

const Membership = () => {
  const { t } = useTranslation();

  const chartData = [
    { month: t('months.january'), amount: 186 },
    { month: t('months.february'), amount: 205 },
    { month: t('months.march'), amount: 237 },
    { month: t('months.april'), amount: 173 },
    { month: t('months.may'), amount: 209 },
    { month: t('months.june'), amount: 254 },
  ];

  const billingHistory = [
    { invoice: "INV-2024-006", date: "June 1, 2024", amount: "$254.00", status: t('membership.billingHistory.status.paid') },
    { invoice: "INV-2024-005", date: "May 1, 2024", amount: "$209.00", status: t('membership.billingHistory.status.paid') },
    { invoice: "INV-2024-004", date: "April 1, 2024", amount: "$173.00", status: t('membership.billingHistory.status.paid') },
    { invoice: "INV-2024-003", date: "March 1, 2024", amount: "$237.00", status: t('membership.billingHistory.status.paid') },
  ];
  return (
    <div className="p-6 sm:p-8 bg-muted/40 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('membership.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('membership.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{t('membership.currentPlan.title')}</CardTitle>
                  <CardDescription>{t('membership.currentPlan.description')}</CardDescription>
                </div>
                <Button>{t('membership.currentPlan.upgrade')} <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-muted-foreground">{t('membership.currentPlan.perMonth')}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{t('membership.currentPlan.planDetails', { count: 10000 })}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{t('membership.currentPlan.conversationsUsed')}</span>
                    <span>7,849 / 10,000</span>
                  </div>
                  <Progress value={78.49} />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{t('membership.monthlySpending.title')}</CardTitle>
                <CardDescription>{t('membership.monthlySpending.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64 w-full">
                  <BarChart data={chartData} accessibilityLayer>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" fill="var(--color-primary)" radius={8} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{t('membership.billingHistory.title')}</CardTitle>
                <CardDescription>{t('membership.billingHistory.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('membership.billingHistory.table.invoice')}</TableHead>
                      <TableHead>{t('membership.billingHistory.table.date')}</TableHead>
                      <TableHead>{t('membership.billingHistory.table.amount')}</TableHead>
                      <TableHead>{t('membership.billingHistory.table.status')}</TableHead>
                      <TableHead className="text-right">{t('membership.billingHistory.table.action')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory.map((item) => (
                      <TableRow key={item.invoice}>
                        <TableCell className="font-medium">{item.invoice}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell><Badge variant="default">{item.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="icon"><Download className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{t('membership.billingDetails.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">{t('membership.billingDetails.nextBillingDate')}</p>
                    <p className="text-muted-foreground">July 1, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t('membership.billingDetails.paymentMethod')}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{t('membership.billingDetails.cardEnding', { last4: 4242 })}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">{t('membership.billingDetails.managePayment')}</Button>
              </CardFooter>
            </Card>

            <Card className="bg-primary/10 border-primary/20 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <LifeBuoy className="w-6 h-6 text-primary" />
                  <CardTitle>{t('membership.needHelp.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('membership.needHelp.description')}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">{t('membership.needHelp.contact')}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
