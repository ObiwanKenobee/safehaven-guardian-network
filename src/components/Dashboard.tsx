
import React from "react";
import ThreatLevelIndicator from "./ThreatLevelIndicator";
import SafeHavenMap from "./SafeHavenMap";
import GuardianAI from "./GuardianAI";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, User, Bell, Settings } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-guardian-primary dark:text-white mb-2">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Guardian-IO is actively monitoring your safety and security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <ThreatLevelIndicator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <User className="h-5 w-5 text-guardian-primary" />
                Personal Safety Status
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-guardian-safe h-2.5 rounded-full" 
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-guardian-safe">Low</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Emergency Contacts</p>
                  <div className="mt-1">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm">{user.trustedContacts[0]?.name || "No contact set"}</span>
                      <span className="text-xs text-gray-500">{user.trustedContacts[0]?.phone || ""}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">{user.trustedContacts[1]?.name || "No contact set"}</span>
                      <span className="text-xs text-gray-500">{user.trustedContacts[1]?.phone || ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Bell className="h-5 w-5 text-guardian-primary" />
                Recent Alerts
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Elevated Risk Alert</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Area caution advised • 35 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <div className="w-8 h-8 rounded-full bg-guardian-safe/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-guardian-safe" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Safe Haven Added</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Community Center verified • 2 hrs ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">System Update</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">AI security enhancements • 1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <SafeHavenMap />
        </div>
        
        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-6">
          <GuardianAI />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-guardian-primary text-white">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Resources
              </h2>
            </div>
            
            <div className="p-4 space-y-3">
              <a href="#" className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-medium">Personal Safety Guide</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Essential tips for staying safe</p>
              </a>
              
              <a href="#" className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-medium">Emergency Response Training</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Learn how to respond to threats</p>
              </a>
              
              <a href="#" className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-medium">Safe Haven Directory</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Complete list of verified locations</p>
              </a>
              
              <a href="#" className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <h3 className="font-medium">Community Support Network</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Connect with trained counselors</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
