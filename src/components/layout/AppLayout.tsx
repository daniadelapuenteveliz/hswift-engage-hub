import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useAuth } from "react-oidc-context";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from './LanguageSwitcher';
import { Badge } from "@/components/ui/badge";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();
  const { user, signoutSilent } = useAuth();

  const signoutRedirect = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_COGNITO_POST_LOGOUT_REDIRECT_URI;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    signoutSilent();
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };


  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card shadow-sm flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8" />
              <div className="text-lg font-semibold text-foreground">
                {t('header.title')}
              </div>
              {user && user.profile['custom:plan'] && <Badge variant="outline">{user.profile['custom:plan']}</Badge>}
            </div>
            
            <div className="flex items-center gap-1">
              {user && (
                <div className="flex items-center gap-4">
                  <LanguageSwitcher />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.profile.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.profile.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={signoutRedirect}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t('header.logout')}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}