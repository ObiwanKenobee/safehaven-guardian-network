
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { locations } from "@/data/locations";
import LocationSEOPage from "@/components/LocationSEOPage";

const LocationDetail = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (locationId) {
      const foundLocation = locations.find(loc => loc.id === locationId);
      
      if (foundLocation) {
        setLocation(foundLocation);
      } else {
        // Redirect to locations page if location not found
        navigate("/locations", { replace: true });
      }
      
      setLoading(false);
    }
  }, [locationId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-guardian-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading location data...</p>
        </div>
      </div>
    );
  }

  if (!location) {
    return null;
  }

  return <LocationSEOPage location={location} />;
};

export default LocationDetail;
