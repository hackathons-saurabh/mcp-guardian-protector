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
  Star,
  Github,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Rocket,
  Target
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Runtime Protection Layer",
      description: "One-liner library with monkey-patching for seamless threat mitigation without code changes.",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: Eye,
      title: "Passive Proxy Monitoring", 
      description: "Always-on service that intercepts MCP/LLM calls network-wide to flag and block threats automatically.",
      color: "from-emerald-400 to-blue-500"
    },
    {
      icon: BarChart3,
      title: "Enterprise Dashboard Suite",
      description: "Real-time threat feeds, compliance reporting, and team-wide alerts with ROI metrics visualization.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Settings,
      title: "Policy Orchestration Engine",
      description: "Adaptive rules tied to SAFE-MCP's 76 techniques with ML-driven updates from shared threat intel.",
      color: "from-orange-400 to-red-500"
    }
  ];

  const segments = [
    {
      industry: "Tech Giants",
      examples: "Amazon, Google, Microsoft",
      pricing: "$300K-500K/year",
      value: "Prevent leaks in Bedrock/Gemini agents, avoiding GDPR fines",
      color: "from-blue-400 to-purple-500"
    },
    {
      industry: "Finance/Banking", 
      examples: "JPMorgan, Bank of America",
      pricing: "$200K-400K/year",
      value: "Secure trading/risk agents, dodging SEC penalties",
      color: "from-emerald-400 to-teal-500"
    },
    {
      industry: "Healthcare/Biotech",
      examples: "Pfizer, UnitedHealth", 
      pricing: "$200K-500K/year",
      value: "Safeguard diagnostic agents, complying with HIPAA",
      color: "from-pink-400 to-purple-500"
    },
    {
      industry: "E-Commerce/Retail",
      examples: "eBay, Shopify, Walmart",
      pricing: "$100K-300K/year", 
      value: "Protect buyer bots from exfiltration, reducing fraud losses",
      color: "from-orange-400 to-red-500"
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
      ],
      buttonText: "Get Started",
      popular: false
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
      ],
      buttonText: "Start Free Trial",
      popular: false
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
      buttonText: "Contact Sales",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/80 border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  MCPGuard
                </span>
                <p className="text-sm text-slate-600">AI Agent Security Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Dashboard</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Pricing</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Contact</a>
              <Button className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/5 to-emerald-400/8" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white border-0 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Enterprise-Grade AI Security Platform
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-700 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight">
            Secure Every Agent,<br />Every Call, Everywhere
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            The definitive zero-trust security platform for MCP-based AI agents. One-liner protection that evolves into comprehensive runtime shield, preventing breaches and ensuring compliance <span className="font-semibold text-blue-500">without a single line of effort</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <Rocket className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-blue-300 text-blue-500 hover:bg-blue-50">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/70 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">$207.9B</div>
                <p className="text-sm text-slate-600 font-medium">AI Agent Market by 2030</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent mb-2">30%</div>
                <p className="text-sm text-slate-600 font-medium">AI Breaches from Prompt Injection</p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-red-200 hover:shadow-lg transition-all transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">$4.5M</div>
                <p className="text-sm text-slate-600 font-medium">Average Cost per Data Leak</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">The AI Security Crisis</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              70% of organizations hesitate to adopt AI agents due to security gaps, compliance fears, and regulatory fines
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white hover:shadow-xl transition-all hover:scale-105 border-red-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-red-600 flex items-center text-lg">
                  <div className="p-2 rounded-lg bg-red-100 mr-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  Prompt Injections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Responsible for 30% of AI breaches, allowing attackers to manipulate agent behavior and extract sensitive data.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-xl transition-all hover:scale-105 border-orange-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-orange-600 flex items-center text-lg">
                  <div className="p-2 rounded-lg bg-orange-100 mr-3">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                  </div>
                  Data Leaks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Costing enterprises $4.5M per incident on average, with GDPR penalties averaging €2.9M per violation.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-xl transition-all hover:scale-105 border-red-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-red-600 flex items-center text-lg">
                  <div className="p-2 rounded-lg bg-red-100 mr-3">
                    <Building2 className="h-5 w-5 text-red-600" />
                  </div>
                  Compliance Gaps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">95% of breaches caused by human error, requiring automated solutions for SOC2, HIPAA, GDPR compliance.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">The MCPGuard Solution</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transform from a dev tool into a full governance suite that prevents breaches, ensures compliance, and unlocks AI scale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-all hover:scale-105 border-slate-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg text-slate-900">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} mr-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Enterprise Customer Segments</h2>
            <p className="text-xl text-slate-600">
              Trusted by leading organizations across industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {segments.map((segment, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-all hover:scale-105 border-slate-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center text-slate-900">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${segment.color} mr-3`}>
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      {segment.industry}
                    </span>
                    <Badge className={`bg-gradient-to-r ${segment.color} text-white border-0`}>
                      {segment.pricing}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="font-medium text-slate-600">{segment.examples}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{segment.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600">
              Choose the plan that fits your organization's needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative bg-white hover:shadow-xl transition-all ${
                tier.popular 
                ? 'border-2 border-blue-500 shadow-xl scale-105 bg-gradient-to-br from-blue-50 to-purple-50' 
                : 'border-slate-200 hover:scale-105'
              }`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl text-slate-900">{tier.name}</CardTitle>
                  <div className="text-4xl font-bold text-slate-900">
                    {tier.price}
                    {tier.period && <span className="text-lg font-normal text-slate-600">{tier.period}</span>}
                  </div>
                  <CardDescription className="text-slate-600">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${
                    tier.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg' 
                    : 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`} 
                          variant={tier.popular ? "default" : "outline"}>
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Secure Your AI Agents?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join the leading enterprises who trust MCPGuard to protect their AI infrastructure. Start with a free trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-500 hover:bg-slate-50 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <Target className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-semibold text-white">MCPGuard</span>
                <p className="text-sm text-slate-400">The invisible fortress for AI agents</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              © 2024 MCPGuard. Securing the AI agent revolution.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;