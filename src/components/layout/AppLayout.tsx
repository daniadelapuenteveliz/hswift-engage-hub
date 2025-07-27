import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useAuth } from "react-oidc-context";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { LanguageSwitcher } from './LanguageSwitcher';
import { Badge } from "@/components/ui/badge";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();
  const { user, signoutRedirect } = useAuth();

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
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{user.profile.name}</span>
                  </div>
                  <LanguageSwitcher />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signoutRedirect()}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('header.logout')}
                  </Button>
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