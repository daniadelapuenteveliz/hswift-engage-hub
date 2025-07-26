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

const Landing = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "WhatsApp Integration",
      description: "Seamlessly connect and manage multiple WhatsApp Business numbers with advanced automation."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Tenant Management",
      description: "Organize clients, phone numbers, and conversations in isolated tenant environments."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Track performance metrics, response times, and conversation success rates in real-time."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Intelligent Automation",
      description: "Create complex conversation flows with AI-powered agent graphs and templates."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Role-based access control, secure API management, and data protection compliance."
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Omnichannel Support",
      description: "Manage conversations across multiple channels from one unified dashboard."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for small businesses getting started",
      features: ["1 tenant", "2 phone numbers", "Basic analytics", "Community support"],
      popular: false
    },
    {
      name: "Pro",
      price: "$49",
      description: "Advanced features for growing businesses",
      features: ["5 tenants", "Unlimited phone numbers", "Advanced analytics", "Priority support", "Custom templates"],
      popular: true
    },
    {
      name: "Premium",
      price: "$99",
      description: "Enterprise-grade solution for large organizations",
      features: ["Unlimited tenants", "White-label solution", "Custom integrations", "24/7 support", "SLA guarantee"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Revolutionize Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> WhatsApp </span>
              Business Communication
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              HSwift empowers businesses to automate, scale, and optimize their conversational experiences 
              with intelligent multi-tenant agent management.
            </p>
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              🚀 Next-generation conversational AI platform
            </Badge>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white px-8 py-3 h-auto">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 h-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to scale conversations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help businesses of all sizes manage and optimize 
              their conversational AI experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your business needs. All plans include our core features 
              with increasing limits and advanced capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-elegant' : 'border-border/50'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-primary text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-foreground mt-4">
                    {plan.price}<span className="text-lg text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/login">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-primary text-white' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to transform your customer conversations?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using HSwift to automate and scale 
            their WhatsApp communication.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="px-8 py-3 h-auto">
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
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