import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  MessageSquare, 
  User, 
  Clock, 
  Phone,
  Search,
  Filter,
  MoreHorizontal,
  Bot,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { mockConversations, Conversation } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThreadsView from '@/components/features/conversations/ThreadsView';

const Conversations = () => {
  const { t } = useTranslation();

  const statusColumns = useMemo(() => [
    { id: 'waiting', title: t('conversations.board.columns.waiting'), color: 'border-warning bg-warning/5' },
    { id: 'bot_responding', title: t('conversations.board.columns.bot_responding'), color: 'border-info bg-info/5' },
    { id: 'escalated', title: t('conversations.board.columns.escalated'), color: 'border-destructive bg-destructive/5' },
    { id: 'resolved', title: t('conversations.board.columns.resolved'), color: 'border-success bg-success/5' }
  ], [t]);

  const [conversations] = useState<Conversation[]>(mockConversations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const filteredConversations = conversations.filter(conv =>
    conv.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.contactPhone.includes(searchTerm) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConversationsByStatus = (status: string) => {
    return filteredConversations.filter(conv => conv.status === status);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting': return AlertTriangle;
      case 'bot_responding': return Bot;
      case 'escalated': return AlertTriangle;
      case 'resolved': return CheckCircle;
      default: return MessageSquare;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-warning/10 text-warning border-warning/20';
      case 'bot_responding': return 'bg-info/10 text-info border-info/20';
      case 'escalated': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('conversations.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('conversations.description')}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            {t('conversations.filter')}
          </Button>
          <Button variant="outline">
            {t('conversations.export')}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={t('conversations.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="board" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[320px] mb-4">
          <TabsTrigger value="threads">{t('conversations.tabs.threads')}</TabsTrigger>
          <TabsTrigger value="board">{t('conversations.tabs.board')}</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          <ThreadsView />
        </TabsContent>
        <TabsContent value="board">
          {/* Kanban Board */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
        {statusColumns.map((column) => {
          const conversations = getConversationsByStatus(column.id);
          return (
            <div key={column.id} className={cn(
              "flex flex-col rounded-lg border-2 border-dashed p-4 transition-all",
              column.color
            )}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {conversations.length}
                </Badge>
              </div>
              
              <div className="space-y-3 flex-1">
                {conversations.map((conversation) => {
                  const StatusIcon = getStatusIcon(conversation.status);
                  return (
                    <Card 
                      key={conversation.id} 
                      className="shadow-sm hover:shadow-md transition-all cursor-pointer group border-border/50"
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-foreground text-sm truncate">
                                {conversation.contactName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {conversation.contactPhone}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-foreground line-clamp-2">
                            {conversation.lastMessage}
                          </p>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {conversation.lastActivity}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(conversation.status)}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {conversation.currentAgent}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {`${conversation.messages} ${t('conversations.card.messagesSuffix')}`}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                {conversations.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{t('conversations.board.noConversations')}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
        </TabsContent>
      </Tabs>

      {/* Conversation Detail Modal */}
      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {t('conversations.details.title')}
            </DialogTitle>
          </DialogHeader>
          
          {selectedConversation && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {selectedConversation.contactName}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {selectedConversation.contactPhone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedConversation.lastActivity}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(selectedConversation.status)}>
                  {selectedConversation.status.replace('_', ' ')}
                </Badge>
              </div>

              {/* Conversation Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">
                    {selectedConversation.messages}
                  </p>
                  <p className="text-sm text-muted-foreground">Messages</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {selectedConversation.currentAgent}
                  </p>
                  <p className="text-sm text-muted-foreground">Current Agent</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">Active</p>
                  <p className="text-sm text-muted-foreground">Status</p>
                </div>
              </div>

              {/* Last Message */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Last Message</h4>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-foreground">{selectedConversation.lastMessage}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">
                  View Full Chat
                </Button>
                <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                  Intervene
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Conversations;