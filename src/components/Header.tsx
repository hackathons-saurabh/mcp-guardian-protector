import { Shield, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="backdrop-blur-md bg-white/80 border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">MCPGuard</h1>
            <p className="text-sm text-slate-600">AI Agent Security Platform</p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a href="/" className="text-sm text-slate-600 hover:text-blue-500 transition-colors font-medium">
            Home
          </a>
          <a href="/dashboard" className="text-sm text-slate-600 hover:text-blue-500 transition-colors font-medium">
            Dashboard
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-500 hover:bg-blue-50" asChild>
            <a href="https://github.com/saurabh-yergattikar/mcp_guard" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white" asChild>
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