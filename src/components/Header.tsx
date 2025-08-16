import { Shield, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">MCPGuard</h1>
            <p className="text-sm text-muted-foreground">AI Agent Security Platform</p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </a>
          <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/saurabh-yergattikar/mcp_guard" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href="https://docs.lovable.dev" target="_blank" rel="noopener noreferrer">
              Documentation
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};