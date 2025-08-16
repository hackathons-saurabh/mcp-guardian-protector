import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Building2, 
  CheckCircle, 
  ArrowRight,
  Lock,
  Eye,
  Settings,
  BarChart3,
  Globe,
  Users,
  DollarSign,
  Star
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Runtime Protection Layer",
      description: "One-liner library with monkey-patching for seamless threat mitigation without code changes."
    },
    {
      icon: Eye,
      title: "Passive Proxy Monitoring", 
      description: "Always-on service that intercepts MCP/LLM calls network-wide to flag and block threats automatically."
    },
    {
      icon: BarChart3,
      title: "Enterprise Dashboard Suite",
      description: "Real-time threat feeds, compliance reporting, and team-wide alerts with ROI metrics visualization."
    },
    {
      icon: Settings,
      title: "Policy Orchestration Engine",
      description: "Adaptive rules tied to SAFE-MCP's 76 techniques with ML-driven updates from shared threat intel."
    }
  ];

  const segments = [
    {
      industry: "Tech Giants",
      examples: "Amazon, Google, Microsoft",
      pricing: "$300K-500K/year",
      value: "Prevent leaks in Bedrock/Gemini agents, avoiding GDPR fines"
    },
    {
      industry: "Finance/Banking", 
      examples: "JPMorgan, Bank of America",
      pricing: "$200K-400K/year",
      value: "Secure trading/risk agents, dodging SEC penalties"
    },
    {
      industry: "Healthcare/Biotech",
      examples: "Pfizer, UnitedHealth", 
      pricing: "$200K-500K/year",
      value: "Safeguard diagnostic agents, complying with HIPAA"
    },
    {
      industry: "E-Commerce/Retail",
      examples: "eBay, Shopify, Walmart",
      pricing: "$100K-300K/year", 
      value: "Protect buyer bots from exfiltration, reducing fraud losses"
    }
  ];

  const pricingTiers = [
    {
      name: "Free/Open Source",
      price: "$0",
      description: "Basic library + demo dashboard",
      features: [
        "Core protection library",
        "Basic dashboard",
        "Community support", 
        "Open source license"
      ]
    },
    {
      name: "Pro",
      price: "$99",
      period: "/user/month",
      description: "One-liner + basic proxy mode",
      features: [
        "One-liner protection",
        "Basic proxy monitoring",
        "Standard dashboard",
        "Email support",
        "Policy templates"
      ]
    },
    {
      name: "Enterprise",
      price: "$999",
      period: "/org/month",
      description: "Full enterprise suite",
      features: [
        "Full proxy monitoring", 
        "Advanced dashboard",
        "ML baselines",
        "On-premise options",
        "Dedicated support",
        "Custom integrations"
      ],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MCPGuard
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground">Contact</a>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6" variant="secondary">
            Enterprise-Grade AI Security Platform
          </Badge>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Secure Every Agent,<br />Every Call, Everywhere
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            The definitive zero-trust security platform for MCP-based AI agents. One-liner protection that evolves into comprehensive runtime shield, preventing breaches and ensuring compliance without a single line of effort.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <Button size="lg" className="text-lg px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$207.9B</div>
              <p className="text-sm text-muted-foreground">AI Agent Market by 2030</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">30%</div>
              <p className="text-sm text-muted-foreground">AI Breaches from Prompt Injection</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$4.5M</div>
              <p className="text-sm text-muted-foreground">Average Cost per Data Leak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The AI Security Crisis</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              70% of organizations hesitate to adopt AI agents due to security gaps, compliance fears, and regulatory fines
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Prompt Injections</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Responsible for 30% of AI breaches, allowing attackers to manipulate agent behavior and extract sensitive data.</p>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Data Leaks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Costing enterprises $4.5M per incident on average, with GDPR penalties averaging €2.9M per violation.</p>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Compliance Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">95% of breaches caused by human error, requiring automated solutions for SOC2, HIPAA, GDPR compliance.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The MCPGuard Solution</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform from a dev tool into a full governance suite that prevents breaches, ensures compliance, and unlocks AI scale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <feature.icon className="h-6 w-6 mr-3 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Enterprise Customer Segments</h2>
            <p className="text-xl text-muted-foreground">
              Trusted by leading organizations across industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {segments.map((segment, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{segment.industry}</span>
                    <Badge variant="secondary">{segment.pricing}</Badge>
                  </CardTitle>
                  <CardDescription>{segment.examples}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{segment.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your organization's needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {tier.price}
                    {tier.period && <span className="text-lg font-normal text-muted-foreground">{tier.period}</span>}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={tier.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Secure Your AI Agents?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Join the leading enterprises who trust MCPGuard to protect their AI infrastructure. Start with a free trial today.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-background">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">MCPGuard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MCPGuard. The invisible fortress for AI agents.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;