
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

type ThreatLevel = "safe" | "caution" | "warning" | "danger";
type SafeHaven = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  status: "open" | "full" | "restricted";
  distance: string; // e.g., "0.5 miles"
  verifiedBy: string[];
};

interface GuardianContextType {
  currentThreatLevel: ThreatLevel;
  safeHavens: SafeHaven[];
  isEmergencyActive: boolean;
  activateEmergency: () => void;
  deactivateEmergency: () => void;
  findNearestSafeHaven: () => SafeHaven | null;
}

const GuardianContext = createContext<GuardianContextType>({
  currentThreatLevel: "safe",
  safeHavens: [],
  isEmergencyActive: false,
  activateEmergency: () => {},
  deactivateEmergency: () => {},
  findNearestSafeHaven: () => null,
});

export const useGuardian = () => useContext(GuardianContext);

export const GuardianProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentThreatLevel, setCurrentThreatLevel] = useState<ThreatLevel>("safe");
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [safeHavens, setSafeHavens] = useState<SafeHaven[]>([]);

  // Simulate fetching safe havens
  useEffect(() => {
    // Mock data for safe havens
    const mockSafeHavens: SafeHaven[] = [
      {
        id: "sh-1",
        name: "Community Faith Center",
        location: { lat: 40.7128, lng: -74.006 },
        status: "open",
        distance: "0.5 miles",
        verifiedBy: ["Local Police", "Guardian Network"]
      },
      {
        id: "sh-2",
        name: "Hope Embassy",
        location: { lat: 40.7138, lng: -74.013 },
        status: "open",
        distance: "0.8 miles",
        verifiedBy: ["International Aid", "Guardian Network"]
      },
      {
        id: "sh-3",
        name: "Sanctuary NGO",
        location: { lat: 40.7110, lng: -74.005 },
        status: "restricted",
        distance: "1.2 miles",
        verifiedBy: ["Local Authority", "Guardian Network"]
      }
    ];
    
    setSafeHavens(mockSafeHavens);
  }, []);

  // Simulate AI threat assessment
  useEffect(() => {
    if (!user) return;

    // In a real app, this would be based on AI analysis
    const assessThreat = () => {
      const levels: ThreatLevel[] = ["safe", "caution", "warning", "danger"];
      const randomIndex = Math.floor(Math.random() * 10);
      
      // Most likely to be safe, with decreasing probability for higher threat levels
      if (randomIndex < 6) return "safe";
      if (randomIndex < 8) return "caution";
      if (randomIndex < 9) return "warning";
      return "danger";
    };

    const interval = setInterval(() => {
      // Only change threat level occasionally to avoid too much fluctuation
      if (Math.random() > 0.7) {
        setCurrentThreatLevel(assessThreat());
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [user]);

  const activateEmergency = () => {
    setIsEmergencyActive(true);
    setCurrentThreatLevel("danger");
    // In a real app, this would trigger emergency protocols
    console.log("EMERGENCY ACTIVATED");
  };

  const deactivateEmergency = () => {
    setIsEmergencyActive(false);
    setCurrentThreatLevel("safe");
    // In a real app, this would cancel emergency protocols
    console.log("EMERGENCY DEACTIVATED");
  };

  const findNearestSafeHaven = (): SafeHaven | null => {
    // In a real app, this would use geolocation to find the nearest safe haven
    const openSafeHavens = safeHavens.filter(haven => haven.status === "open");
    if (openSafeHavens.length === 0) return null;
    
    // Sort by distance
    const sortedByDistance = [...openSafeHavens].sort((a, b) => {
      const distA = parseFloat(a.distance.split(" ")[0]);
      const distB = parseFloat(b.distance.split(" ")[0]);
      return distA - distB;
    });
    
    return sortedByDistance[0];
  };

  return (
    <GuardianContext.Provider
      value={{
        currentThreatLevel,
        safeHavens,
        isEmergencyActive,
        activateEmergency,
        deactivateEmergency,
        findNearestSafeHaven
      }}
    >
      {children}
    </GuardianContext.Provider>
  );
};
