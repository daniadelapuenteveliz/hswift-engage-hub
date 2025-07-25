import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Users, 
  Building2, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Phone
} from 'lucide-react';
import { mockAnalytics, mockTenants, mockConversations } from '@/data/mockData';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Conversations',
      value: mockAnalytics.totalConversations.toLocaleString(),
      icon: MessageSquare,
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Tenants',
      value: mockTenants.length.toString(),
      icon: Building2,
      change: '+2 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Avg Response Time',
      value: `${mockAnalytics.avgResponseTime}s`,
      icon: Clock,
      change: '-0.5s',
      changeType: 'positive' as const
    },
    {
      title: 'Success Rate',
      value: `${mockAnalytics.successRate}%`,
      icon: TrendingUp,
      change: '+2.1%',
      changeType: 'positive' as const
    }
  ];

  const recentConversations = mockConversations.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-warning/10 text-warning border-warning/20';
      case 'bot_responding': return 'bg-info/10 text-info border-info/20';
      case 'escalated': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting': return AlertCircle;
      case 'bot_responding': return MessageSquare;
      case 'escalated': return AlertCircle;
      case 'resolved': return CheckCircle;
      default: return MessageSquare;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your conversations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-elegant border-border/50 bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                  <p className={`text-xs mt-1 ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Conversations */}
        <Card className="shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentConversations.map((conversation) => {
              const StatusIcon = getStatusIcon(conversation.status);
              return (
                <div key={conversation.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <StatusIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {conversation.contactName}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(conversation.status)}>
                      {conversation.status.replace('_', ' ')}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {conversation.lastActivity}
                    </p>
                  </div>
                </div>
              );
            })}
            <Button variant="outline" className="w-full">
              View All Conversations
            </Button>
          </CardContent>
        </Card>

        {/* Active Tenants */}
        <Card className="shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Active Tenants
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTenants.map((tenant) => (
              <div key={tenant.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {tenant.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {tenant.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {tenant.phoneNumbers.length}
                  </div>
                  <Badge variant="secondary" className="mt-1">
                    {tenant.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Manage Tenants
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-elegant border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-primary hover:opacity-90">
              <Building2 className="w-6 h-6" />
              <span>Create New Tenant</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              <span>View Conversations</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;