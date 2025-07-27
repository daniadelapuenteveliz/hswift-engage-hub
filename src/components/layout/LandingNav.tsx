import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

const LandingNav = () => {
  const { t } = useTranslation();
  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">HSwift</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('landingNav.features')}
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('landingNav.pricing')}
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('landingNav.about')}
            </a>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link to="/login">
              <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
                {t('landingNav.signIn')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;