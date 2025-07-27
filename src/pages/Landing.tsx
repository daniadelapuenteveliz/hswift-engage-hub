import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LandingNav from '@/components/layout/LandingNav';
import { 
  Phone, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Zap, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const { t } = useTranslation();

  const features = t('landing.features.list', { returnObjects: true }) as { icon: string, title: string, description: string }[];
  const pricingPlans = t('landing.pricing.plans', { returnObjects: true }) as any[];

  const featureIcons: { [key: string]: React.ReactNode } = {
    MessageSquare: <MessageSquare className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    BarChart3: <BarChart3 className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Shield: <Shield className="w-6 h-6" />,
    Phone: <Phone className="w-6 h-6" />,
  };



  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              {t('landing.hero.title1')}
              <span className="bg-gradient-primary bg-clip-text text-transparent"> WhatsApp </span>
              {t('landing.hero.title2')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              {t('landing.hero.subtitle')}
            </p>
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              {t('landing.hero.badge')}
            </Badge>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white px-8 py-3 h-auto">
                  {t('landing.hero.cta')} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 h-auto">
                {t('landing.watchDemo')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border/20 hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg text-white">
                    {featureIcons[feature.icon]}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t('landing.pricing.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('landing.pricing.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`bg-card/80 backdrop-blur-sm ${plan.popular ? 'border-2 border-primary shadow-glow' : 'border-border/20'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1">
                    <Star className="w-3 h-3 mr-2"/> {t('landing.pricing.popular')}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-4xl font-extrabold text-foreground">{plan.price}<span className="text-sm font-normal text-muted-foreground">{t('landing.pricing.perMonth')}</span></CardDescription>
                  <p className="text-muted-foreground pt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((item: string, i: number) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/login" className="w-full block">
                    <Button className={`w-full ${plan.popular ? 'bg-gradient-primary text-white' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                      {t('landing.pricing.cta')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-primary rounded-lg p-10 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t('landing.finalCta.title')}
            </h2>
            <p className="text-lg opacity-80 mb-6 max-w-2xl mx-auto">
              {t('landing.finalCta.subtitle')}
            </p>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100 h-auto px-8 py-3">
                {t('landing.finalCta.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">HSwift</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 HSwift. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;