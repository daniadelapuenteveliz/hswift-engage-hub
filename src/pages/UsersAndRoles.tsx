import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, PlusCircle, MoreHorizontal, ShieldCheck, User, Bot } from "lucide-react";
import { Checkbox } from '@/components/ui/checkbox';

// Mock Data
const mockUsers = [
  { id: 1, name: 'Dania de la Puente', email: 'dania@example.com', role: 'Admin', type: 'Human', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 2, name: 'Carlos Rodriguez', email: 'carlos@example.com', role: 'Editor', type: 'Human', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
  { id: 3, name: 'Support Bot', email: 'support@agent.hswift.com', role: 'Agent', type: 'Agent', avatar: null },
  { id: 4, name: 'Ana Gomez', email: 'ana@example.com', role: 'Viewer', type: 'Human', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
  { id: 5, name: 'System Process', email: 'system@internal.hswift.com', role: 'System', type: 'System', avatar: null },
];

const mockRoles = [
  { id: 'admin', name: 'Admin', description: 'Full access to all features and settings.' },
  { id: 'editor', name: 'Editor', description: 'Can create and manage templates and agents.' },
  { id: 'agent', name: 'Agent', description: 'Interacts with conversations, limited access.' },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access to dashboards and analytics.' },
  { id: 'system', name: 'System', description: 'Internal system processes.' },
];

const permissionsByRole = {
  admin: { 'template_management': ['create', 'edit', 'delete', 'view'], 'user_management': ['create', 'edit', 'delete', 'view'], 'billing': ['view', 'manage'] },
  editor: { 'template_management': ['create', 'edit', 'delete', 'view'], 'user_management': ['view'], 'billing': ['view'] },
  agent: { 'template_management': ['view'], 'user_management': [], 'billing': [] },
  viewer: { 'template_management': ['view'], 'user_management': ['view'], 'billing': ['view'] },
  system: { 'template_management': [], 'user_management': [], 'billing': [] },
};

const allPermissions = {
  'template_management': { label: 'Template Management', permissions: { 'create': 'Create Templates', 'edit': 'Edit Templates', 'delete': 'Delete Templates', 'view': 'View Templates' } },
  'user_management': { label: 'User Management', permissions: { 'create': 'Create Users', 'edit': 'Edit Users', 'delete': 'Delete Users', 'view': 'View Users' } },
  'billing': { label: 'Billing', permissions: { 'view': 'View Billing', 'manage': 'Manage Billing' } },
};

const UserIcon = ({ type, t }) => {
  const typeKey = Object.keys(t('usersAndRoles.users.types', { returnObjects: true })).find(key => t(`usersAndRoles.users.types.${key}`) === type);

  if (typeKey === 'agent') return <Bot className="w-5 h-5 text-muted-foreground" />;
  if (typeKey === 'system') return <ShieldCheck className="w-5 h-5 text-muted-foreground" />;
  return <User className="w-5 h-5 text-muted-foreground" />;
};

const UsersAndRoles = () => {
  const { t } = useTranslation();

  const mockUsers = useMemo(() => [
    { id: 1, name: 'Dania de la Puente', email: 'dania@example.com', role: t('usersAndRoles.roles.roleNames.admin'), type: t('usersAndRoles.users.types.human'), avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 2, name: 'Carlos Rodriguez', email: 'carlos@example.com', role: t('usersAndRoles.roles.roleNames.editor'), type: t('usersAndRoles.users.types.human'), avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: 3, name: 'Support Bot', email: 'support@agent.hswift.com', role: t('usersAndRoles.roles.roleNames.agent'), type: t('usersAndRoles.users.types.agent'), avatar: null },
    { id: 4, name: 'Ana Gomez', email: 'ana@example.com', role: t('usersAndRoles.roles.roleNames.viewer'), type: t('usersAndRoles.users.types.human'), avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
    { id: 5, name: 'System Process', email: 'system@internal.hswift.com', role: t('usersAndRoles.roles.roleNames.system'), type: t('usersAndRoles.users.types.system'), avatar: null },
  ], [t]);

  const mockRoles = useMemo(() => [
    { id: 'admin', name: t('usersAndRoles.roles.roleNames.admin'), description: t('usersAndRoles.roles.roleDescriptions.admin') },
    { id: 'editor', name: t('usersAndRoles.roles.roleNames.editor'), description: t('usersAndRoles.roles.roleDescriptions.editor') },
    { id: 'agent', name: t('usersAndRoles.roles.roleNames.agent'), description: t('usersAndRoles.roles.roleDescriptions.agent') },
    { id: 'viewer', name: t('usersAndRoles.roles.roleNames.viewer'), description: t('usersAndRoles.roles.roleDescriptions.viewer') },
    { id: 'system', name: t('usersAndRoles.roles.roleNames.system'), description: t('usersAndRoles.roles.roleDescriptions.system') },
  ], [t]);

  const allPermissions = useMemo(() => ({
    'template_management': { label: t('usersAndRoles.permissions.template_management.label'), permissions: { 'create': t('usersAndRoles.permissions.template_management.create'), 'edit': t('usersAndRoles.permissions.template_management.edit'), 'delete': t('usersAndRoles.permissions.template_management.delete'), 'view': t('usersAndRoles.permissions.template_management.view') } },
    'user_management': { label: t('usersAndRoles.permissions.user_management.label'), permissions: { 'create': t('usersAndRoles.permissions.user_management.create'), 'edit': t('usersAndRoles.permissions.user_management.edit'), 'delete': t('usersAndRoles.permissions.user_management.delete'), 'view': t('usersAndRoles.permissions.user_management.view') } },
    'billing': { label: t('usersAndRoles.permissions.billing.label'), permissions: { 'view': t('usersAndRoles.permissions.billing.view'), 'manage': t('usersAndRoles.permissions.billing.manage') } },
  }), [t]);

  const [userSearch, setUserSearch] = useState('');
  const [roleSearch, setRoleSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState(mockRoles[0]);

  useEffect(() => {
    setSelectedRole(mockRoles[0]);
  }, [mockRoles]);

  const filteredUsers = useMemo(() =>
    mockUsers.filter(user =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase())
    ), [userSearch, mockUsers]);

  const filteredRoles = useMemo(() =>
    mockRoles.filter(role =>
      role.name.toLowerCase().includes(roleSearch.toLowerCase())
    ), [roleSearch, mockRoles]);

  if (!selectedRole) {
    return null; // Or a loading indicator
  }

  return (
    <div className="p-6 sm:p-8 bg-muted/40 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('usersAndRoles.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('usersAndRoles.description')}</p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/3">
            <TabsTrigger value="users">{t('usersAndRoles.tabs.users')}</TabsTrigger>
            <TabsTrigger value="roles">{t('usersAndRoles.tabs.roles')}</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="shadow-sm mt-4">
              <CardHeader>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder={t('usersAndRoles.users.searchPlaceholder')} className="pl-10" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
                  </div>
                  <Button><PlusCircle className="w-4 h-4 mr-2" />{t('usersAndRoles.users.createUser')}</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('usersAndRoles.users.userColumn')}</TableHead>
                      <TableHead>{t('usersAndRoles.users.roleColumn')}</TableHead>
                      <TableHead>{t('usersAndRoles.users.userTypeColumn')}</TableHead>
                      <TableHead className="text-right">{t('usersAndRoles.users.actionsColumn')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {user.avatar ? <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" /> : <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><UserIcon type={user.type} t={t} /></div>}
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell><Badge variant={user.type === t('usersAndRoles.users.types.human') ? 'secondary' : 'outline'}>{user.type}</Badge></TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>{t('usersAndRoles.users.editUser')}</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">{t('usersAndRoles.users.deleteUser')}</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles">
            <div className="grid md:grid-cols-3 gap-8 mt-4">
              <div className="md:col-span-1">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>{t('usersAndRoles.roles.title')}</CardTitle>
                    <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder={t('usersAndRoles.roles.searchPlaceholder')} className="pl-10" value={roleSearch} onChange={(e) => setRoleSearch(e.target.value)} />
                    </div>
                  </CardHeader>
                  <CardContent className='p-0'>
                    <div className="flex flex-col">
                      {filteredRoles.map(role => (
                        <button key={role.id} onClick={() => setSelectedRole(role)} className={`text-left p-4 border-l-4 ${selectedRole.id === role.id ? 'bg-muted border-primary' : 'border-transparent hover:bg-muted/50'}`}>
                          <p className="font-semibold">{role.name}</p>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Button className="w-full mt-4"><PlusCircle className="w-4 h-4 mr-2" />{t('usersAndRoles.roles.createRole')}</Button>
              </div>
              <div className="md:col-span-2">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>{t('usersAndRoles.roles.permissionsFor', { role: selectedRole.name })}</CardTitle>
                    <CardDescription>{t('usersAndRoles.roles.permissionsDescription')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(allPermissions).map(([key, group]) => (
                      <div key={key}>
                        <h3 className="font-semibold mb-3">{group.label}</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(group.permissions).map(([perm, label]) => (
                            <div key={perm} className="flex items-center space-x-2">
                              <Checkbox id={`${key}-${perm}`} checked={permissionsByRole[selectedRole.id]?.[key]?.includes(perm)} />
                              <label htmlFor={`${key}-${perm}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UsersAndRoles;
