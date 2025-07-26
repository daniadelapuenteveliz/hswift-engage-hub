import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building2, 
  Plus, 
  Phone, 
  MessageSquare, 
  Settings,
  Search,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockTenants, Tenant } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Tenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({ name: '', description: '' });
  const { toast } = useToast();

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTenant = () => {
    if (!newTenant.name.trim()) {
      toast({
        title: "Error",
        description: "Tenant name is required.",
        variant: "destructive",
      });
      return;
    }

    const tenant: Tenant = {
      id: Date.now().toString(),
      name: newTenant.name,
      description: newTenant.description,
      phoneNumbers: [],
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setTenants([...tenants, tenant]);
    setNewTenant({ name: '', description: '' });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Success",
      description: `Tenant "${tenant.name}" created successfully.`,
    });
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? CheckCircle : XCircle;
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-success/10 text-success border-success/20'
      : 'bg-destructive/10 text-destructive border-destructive/20';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tenants</h1>
          <p className="text-muted-foreground mt-1">
            Manage your tenants and their conversational agents
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4 mr-2" />
              Create Tenant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Tenant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tenant Name</Label>
                <Input
                  id="name"
                  placeholder="Enter tenant name"
                  value={newTenant.name}
                  onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the tenant"
                  value={newTenant.description}
                  onChange={(e) => setNewTenant({ ...newTenant, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateTenant}>
                  Create Tenant
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search tenants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant) => {
          const StatusIcon = getStatusIcon(tenant.status);
          return (
            <Card key={tenant.id} className="shadow-elegant border-border/50 hover:shadow-glow transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tenant.name}
                      </CardTitle>
                      <Badge className={getStatusColor(tenant.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {tenant.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tenant.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      Phone Numbers
                    </div>
                    <span className="text-sm font-medium">
                      {tenant.phoneNumbers.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      Total Conversations
                    </div>
                    <span className="text-sm font-medium">
                      {tenant.phoneNumbers.reduce((sum, phone) => sum + phone.conversations, 0)}
                    </span>
                  </div>
                </div>

                {/* Phone Numbers */}
                {tenant.phoneNumbers.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Connected Numbers:</h4>
                    {tenant.phoneNumbers.slice(0, 2).map((phone) => (
                      <div key={phone.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                        <span className="text-sm font-mono">{phone.number}</span>
                        <Badge variant={phone.whatsappConnected ? "default" : "secondary"}>
                          {phone.whatsappConnected ? 'Connected' : 'Disconnected'}
                        </Badge>
                      </div>
                    ))}
                    {tenant.phoneNumbers.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{tenant.phoneNumbers.length - 2} more numbers
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Manage
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No tenants found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? 'Try adjusting your search terms.' : 'Create your first tenant to get started.'}
          </p>
          {!searchTerm && (
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Tenant
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Tenants;