
import React from "react";
import { useGuardian } from "@/contexts/GuardianContext";
import { MapPin, Home, AlertCircle, Users } from "lucide-react";

const SafeHavenMap = () => {
  const { safeHavens, findNearestSafeHaven } = useGuardian();
  
  const nearestHaven = findNearestSafeHaven();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-guardian-primary text-white">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Safe Haven Network
        </h2>
      </div>
      
      {/* Map placeholder - in a real app, this would be an actual map */}
      <div className="h-64 bg-gray-200 dark:bg-gray-700 relative p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Interactive map would be displayed here
          </p>
        </div>
        
        {/* Map pins for safe havens */}
        <div className="absolute left-1/4 top-1/3">
          <div className="w-6 h-6 rounded-full bg-guardian-safe flex items-center justify-center text-white">
            <Home className="h-3 w-3" />
          </div>
        </div>
        
        <div className="absolute right-1/3 top-1/2">
          <div className="w-6 h-6 rounded-full bg-guardian-safe flex items-center justify-center text-white">
            <Home className="h-3 w-3" />
          </div>
        </div>
        
        <div className="absolute left-1/2 bottom-1/4">
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white">
            <AlertCircle className="h-3 w-3" />
          </div>
        </div>
        
        {/* User location */}
        <div className="absolute left-2/5 top-2/4">
          <div className="w-8 h-8 rounded-full bg-guardian-primary border-2 border-white flex items-center justify-center text-white animate-pulse-slow">
            <Users className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      {/* Safe havens list */}
      <div className="p-4">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Nearest Safe Havens</h3>
        
        {nearestHaven && (
          <div className="bg-guardian-safe/10 border border-guardian-safe/30 rounded-md p-3 mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-guardian-safe">{nearestHaven.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {nearestHaven.distance} away • Status: {nearestHaven.status}
                </p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-guardian-safe/20 text-guardian-safe">
                Nearest
              </span>
            </div>
          </div>
        )}
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {safeHavens.map(haven => (
            <div 
              key={haven.id}
              className={`p-3 rounded-md border ${
                haven.status === "open" 
                  ? "border-guardian-safe/30 bg-guardian-safe/5" 
                  : haven.status === "full"
                  ? "border-yellow-500/30 bg-yellow-500/5"
                  : "border-orange-500/30 bg-orange-500/5"
              }`}
            >
              <h4 className="font-medium">{haven.name}</h4>
              <div className="flex justify-between text-sm">
                <span>{haven.distance}</span>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${haven.status === "open" 
                    ? "bg-guardian-safe/20 text-guardian-safe" 
                    : haven.status === "full"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-orange-500/20 text-orange-500"
                  }
                `}>
                  {haven.status.charAt(0).toUpperCase() + haven.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafeHavenMap;
