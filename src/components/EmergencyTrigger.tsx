
import React, { useState } from "react";
import { useGuardian } from "@/contexts/GuardianContext";
import { AlertOctagon, Phone, X } from "lucide-react";

const EmergencyTrigger = () => {
  const { isEmergencyActive, activateEmergency, deactivateEmergency } = useGuardian();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEmergencyTrigger = () => {
    if (!isEmergencyActive) {
      setIsDialogOpen(true);
    } else {
      deactivateEmergency();
    }
  };

  const confirmEmergency = () => {
    activateEmergency();
    setIsDialogOpen(false);
  };

  const cancelEmergency = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleEmergencyTrigger}
          className={`
            w-16 h-16 rounded-full shadow-lg flex items-center justify-center
            transition-all duration-300 transform hover:scale-105
            ${isEmergencyActive 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-guardian-danger hover:bg-red-700"}
          `}
          aria-label={isEmergencyActive ? "Deactivate Emergency" : "Activate Emergency"}
        >
          {isEmergencyActive ? (
            <X className="h-8 w-8 text-white" />
          ) : (
            <AlertOctagon className="h-8 w-8 text-white" />
          )}
        </button>
      </div>

      {/* Emergency Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-guardian-danger/10 flex items-center justify-center">
                <AlertOctagon className="h-8 w-8 text-guardian-danger" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-center mb-2">Activate Emergency Protocol?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              This will alert your trusted contacts and share your location with the Guardian Network.
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={confirmEmergency}
                className="w-full bg-guardian-danger hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <AlertOctagon className="h-5 w-5" />
                Activate Emergency
              </button>
              
              <button
                onClick={cancelEmergency}
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
            
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <button className="w-full flex items-center justify-center gap-2 text-guardian-secondary">
                <Phone className="h-4 w-4" />
                <span className="font-medium">Call Emergency Services</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Emergency Alert */}
      {isEmergencyActive && (
        <div className="fixed top-0 left-0 right-0 bg-guardian-danger text-white py-2 px-4 flex justify-between items-center animate-pulse-slow z-50">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5" />
            <span className="font-medium">Emergency Active</span>
          </div>
          <button
            onClick={deactivateEmergency}
            className="text-white bg-guardian-danger/30 hover:bg-guardian-danger/50 rounded-full p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
};

export default EmergencyTrigger;
