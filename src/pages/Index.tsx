import { useState, useEffect } from "react";
import { SecurityDashboard } from "@/components/SecurityDashboard";
import { LiveDemo } from "@/components/LiveDemo";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            MCPGuard Security Center
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The One-Line Zero-Trust Shield for AI Agents. Real-time monitoring, threat detection, and live security demonstrations.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border border-blue-200">
            <TabsTrigger value="dashboard" className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">Security Dashboard</TabsTrigger>
            <TabsTrigger value="demo" className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-purple-500 data-[state=active]:text-white">Live Demo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <SecurityDashboard />
          </TabsContent>
          
          <TabsContent value="demo" className="space-y-6">
            <LiveDemo />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
