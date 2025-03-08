
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "@/components/Dashboard";
import NavBar from "@/components/NavBar";
import EmergencyTrigger from "@/components/EmergencyTrigger";
import LoginPage from "@/pages/LoginPage";
import { GuardianProvider } from "@/contexts/GuardianContext";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-guardian-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading Guardian-IO...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <GuardianProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <NavBar />
        <main>
          <Dashboard />
        </main>
        <EmergencyTrigger />
      </div>
    </GuardianProvider>
  );
};

export default Index;
