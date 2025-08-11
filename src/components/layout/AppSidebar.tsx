import { 
  Home, 
  Building2, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Crown,
  Settings,
  FileText,
  Phone,
  Bot,
  Wrench
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-context";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();

  const userPlan = user?.profile['custom:plan'] || 'free';

  const mainNavItems = [
    { title: t('sidebar.nav.dashboard'), url: "/dashboard", icon: Home },
    { title: t('sidebar.nav.tenants'), url: "/tenants", icon: Building2 },
    { title: t('sidebar.nav.usersAndRoles'), url: "/users", icon: Users },
    ...(userPlan !== 'free' ? [{ title: t('sidebar.nav.apisAndTools'), url: "/apis-and-tools", icon: Wrench }] : []),
    { title: t('sidebar.nav.membership'), url: "/membership", icon: Crown },
  ];

  const secondNavItems = [
    ...(userPlan !== 'free' ? [
      { title: t('sidebar.nav.templates'), url: "/templates", icon: FileText },
      { title: t('sidebar.nav.agentManagement'), url: "/agent-management", icon: Bot },
      { title: t('sidebar.nav.conversations'), url: "/conversations", icon: MessageSquare },
      { title: t('sidebar.nav.analytics'), url: "/analytics", icon: BarChart3 },
    ] : []),
  ];

  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');

  const renderNavItems = (items: typeof mainNavItems) => (
    <SidebarMenu className="space-y-1">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive(item.url) && 
                "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                isActive(item.url) && "scale-110"
              )} />
              {!collapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );



  const planConfig = {
    free: {
      title: t('sidebar.freePlan.title'),
      description: t('sidebar.freePlan.description'),
    },
    pro: {
      title: t('sidebar.proPlan.title'),
      description: t('sidebar.proPlan.description'),
    },
    premium: {
      title: t('sidebar.premiumPlan.title'),
      description: t('sidebar.premiumPlan.description'),
    },
  };

  const currentPlan = planConfig[userPlan as keyof typeof planConfig] || planConfig.free;

  return (
    <Sidebar className="border-r border-sidebar-border transition-all duration-300">
      <SidebarHeader className="border-b border-sidebar-border ">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">HSwift</h2>
              <p className="text-xs text-sidebar-foreground/70">{t('sidebar.header.subtitle')}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-sidebar-foreground/60 uppercase text-xs font-semibold tracking-wider mb-2",
            collapsed && "sr-only"
          )}>
            {t('sidebar.mainNavigation')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderNavItems(mainNavItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="my-2 border-t border-sidebar-border/50" />

        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-sidebar-foreground/60 uppercase text-xs font-semibold tracking-wider my-2",
            collapsed && "sr-only"
          )}>
            {t('sidebar.secondNavigation')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderNavItems(secondNavItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="bg-sidebar-accent/30 rounded-lg p-4 m-2">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-sidebar-foreground">{currentPlan.title}</span>
                </div>
                <p className="text-xs text-sidebar-foreground/70">
                  {currentPlan.description}
                </p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}