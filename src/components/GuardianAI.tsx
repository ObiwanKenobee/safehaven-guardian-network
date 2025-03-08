
import React from "react";
import { useGuardian } from "@/contexts/GuardianContext";
import { useAuth } from "@/contexts/AuthContext";
import { Brain, Shield, Users, MessageCircle } from "lucide-react";

const GuardianAI = () => {
  const { currentThreatLevel } = useGuardian();
  const { user } = useAuth();

  const getAISuggestion = () => {
    switch (currentThreatLevel) {
      case "safe":
        return "Your risk level is currently low. Stay aware of your surroundings.";
      case "caution":
        return "Minor risk factors detected. Consider checking in with trusted contacts.";
      case "warning":
        return "Elevated risk detected. Move to a public area and stay vigilant.";
      case "danger":
        return "Immediate action recommended. Proceed to nearest safe haven or contact emergency services.";
      default:
        return "Guardian AI is monitoring your environment.";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-guardian-secondary text-white">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Guardian AI Assistant
        </h2>
      </div>
      
      <div className="p-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-guardian-secondary/10 flex items-center justify-center flex-shrink-0">
            <Brain className="h-5 w-5 text-guardian-secondary" />
          </div>
          
          <div className="bg-guardian-secondary/10 rounded-lg p-3 relative">
            <p className="text-gray-800 dark:text-gray-200">{getAISuggestion()}</p>
            <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-guardian-secondary/10"></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-left p-3 rounded-lg flex items-center gap-3 transition-colors">
            <Shield className="h-5 w-5 text-guardian-primary" />
            <span>What should I do to stay safe?</span>
          </button>
          
          <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-left p-3 rounded-lg flex items-center gap-3 transition-colors">
            <Users className="h-5 w-5 text-guardian-primary" />
            <span>Connect me with support</span>
          </button>
          
          <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-left p-3 rounded-lg flex items-center gap-3 transition-colors">
            <MessageCircle className="h-5 w-5 text-guardian-primary" />
            <span>I need guidance on my situation</span>
          </button>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Ask Guardian AI..."
            className="flex-1 border-0 focus:ring-0 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400"
          />
          <button className="bg-guardian-secondary text-white p-2 rounded-full">
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuardianAI;
