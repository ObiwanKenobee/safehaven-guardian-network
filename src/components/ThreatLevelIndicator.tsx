
import React from "react";
import { useGuardian } from "@/contexts/GuardianContext";
import { Shield, AlertTriangle, AlertCircle, AlertOctagon } from "lucide-react";

const ThreatLevelIndicator = () => {
  const { currentThreatLevel } = useGuardian();

  const getLevelData = () => {
    switch (currentThreatLevel) {
      case "safe":
        return {
          color: "text-guardian-safe",
          bgColor: "bg-guardian-safe/10",
          borderColor: "border-guardian-safe",
          icon: <Shield className="h-8 w-8" />,
          label: "Safe"
        };
      case "caution":
        return {
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500",
          icon: <AlertTriangle className="h-8 w-8" />,
          label: "Caution"
        };
      case "warning":
        return {
          color: "text-orange-500",
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500",
          icon: <AlertCircle className="h-8 w-8" />,
          label: "Warning"
        };
      case "danger":
        return {
          color: "text-guardian-danger",
          bgColor: "bg-guardian-danger/10",
          borderColor: "border-guardian-danger",
          icon: <AlertOctagon className="h-8 w-8" />,
          label: "Danger"
        };
      default:
        return {
          color: "text-guardian-safe",
          bgColor: "bg-guardian-safe/10",
          borderColor: "border-guardian-safe",
          icon: <Shield className="h-8 w-8" />,
          label: "Safe"
        };
    }
  };

  const { color, bgColor, borderColor, icon, label } = getLevelData();

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg ${bgColor} border ${borderColor} animate-fade-in`}>
      <div className={`${color} ${currentThreatLevel === "danger" ? "animate-pulse-slow" : ""}`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-semibold ${color}`}>Threat Level: {label}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {currentThreatLevel === "safe" && "No immediate threats detected."}
          {currentThreatLevel === "caution" && "Minor anomalies detected. Stay alert."}
          {currentThreatLevel === "warning" && "Potential risks in your area. Exercise caution."}
          {currentThreatLevel === "danger" && "Imminent danger detected. Seek safe haven immediately."}
        </p>
      </div>
    </div>
  );
};

export default ThreatLevelIndicator;
