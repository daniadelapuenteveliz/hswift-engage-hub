import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
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
  CheckCircle,
  Plus
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockConversations, Conversation } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThreadsView from '@/components/features/conversations/ThreadsView';

const Conversations = () => {
  const { t } = useTranslation();

  const statusColumns = useMemo(() => [
    { id: 'waiting', title: t('conversationsView.board.columns.waiting') },
    { id: 'bot_responding', title: t('conversationsView.board.columns.bot_responding') },
    { id: 'escalated', title: t('conversationsView.board.columns.escalated') },
    { id: 'resolved', title: t('conversationsView.board.columns.resolved') }
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
      case 'waiting': return <AlertTriangle className="w-3 h-3 mr-1.5" />;
      case 'bot_responding': return <Bot className="w-3 h-3 mr-1.5" />;
      case 'escalated': return <AlertTriangle className="w-3 h-3 mr-1.5" />;
      case 'resolved': return <CheckCircle className="w-3 h-3 mr-1.5" />;
      default: return <MessageSquare className="w-3 h-3 mr-1.5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-warning/10 text-warning border-warning/20';
      case 'bot_responding': return 'bg-info/10 text-info border-info/20';
      case 'escalated': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 h-full flex flex-col">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t('conversationsView.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('conversationsView.description')}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            {t('conversationsView.filter')}
          </Button>
          <Button variant="outline">
            {t('conversationsView.export')}
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t('conversationsView.newConversation')}
          </Button>
        </div>
      </header>

      <Tabs defaultValue="board" className="w-full flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <TabsList className="grid w-full grid-cols-2 max-w-[320px]">
              <TabsTrigger value="threads">{t('conversationsView.tabs.threads')}</TabsTrigger>
              <TabsTrigger value="board">{t('conversationsView.tabs.board')}</TabsTrigger>
            </TabsList>
            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t('conversationsView.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
        </div>

        <TabsContent value="threads" className="flex-1">
          <ThreadsView />
        </TabsContent>
        <TabsContent value="board" className="flex-1">
          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
            {statusColumns.map((column) => (
              <div key={column.id} className="flex flex-col bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{column.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {getConversationsByStatus(column.id).length}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3 p-3 flex-1 overflow-y-auto">
                  {getConversationsByStatus(column.id).map((conversation) => (
                    <Card 
                      key={conversation.id} 
                      className="shadow-sm hover:shadow-md transition-all cursor-pointer group bg-card"
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border">
                              <AvatarImage src={conversation.avatarUrl} alt={conversation.contactName} />
                              <AvatarFallback>{conversation.contactName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-foreground text-sm truncate">
                                {conversation.contactName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate flex items-center">
                                <Phone className="w-3 h-3 mr-1.5" />
                                {conversation.contactPhone}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {conversation.lastMessage}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              <span>{conversation.lastActivity}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {`${conversation.messages} ${t('conversationsView.card.messagesSuffix')}`}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 mt-3 border-t">
                            <Badge className={cn("text-xs", getStatusColor(conversation.status))}>
                              {getStatusIcon(conversation.status)}
                              {t(`conversationsView.board.columns.${conversation.status}`)}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {getConversationsByStatus(column.id).length === 0 && (
                    <div className="text-center py-16 text-muted-foreground h-full flex flex-col items-center justify-center">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">{t('conversationsView.board.noConversations')}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Conversation Detail Modal */}
      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-primary">
                <AvatarImage src={selectedConversation?.avatarUrl} alt={selectedConversation?.contactName} />
                <AvatarFallback>{selectedConversation?.contactName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-lg font-bold">{selectedConversation?.contactName}</span>
                <p className="text-sm text-muted-foreground flex items-center"><Phone className="w-4 h-4 mr-2" />{selectedConversation?.contactPhone}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          {selectedConversation && (
            <div className="space-y-4 mt-4">
              <div className="prose prose-sm max-w-none bg-muted/50 p-3 rounded-md">
                <p>{selectedConversation.lastMessage}</p>
              </div>
              <div className="text-xs text-muted-foreground pt-4 border-t grid grid-cols-2 gap-2">
                <p className="flex flex-col"><strong>Status:</strong> <span className="flex items-center">{getStatusIcon(selectedConversation.status)} {t(`conversationsView.board.columns.${selectedConversation.status}`)}</span></p>
                <p className="flex flex-col"><strong>Agent:</strong> {selectedConversation.currentAgent}</p>
                <p className="flex flex-col"><strong>Last Activity:</strong> {selectedConversation.lastActivity}</p>
                <p className="flex flex-col"><strong>Messages:</strong> {selectedConversation.messages}</p>
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