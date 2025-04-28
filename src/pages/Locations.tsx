
import React, { useState } from "react";
import { locations } from "@/data/locations";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertTriangle, AlertCircle, AlertOctagon, Shield, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  useSEO({
    title: "Guardian-IO | Global Protection Network Locations",
    description: "Find Guardian-IO protection services, safe havens, and crisis resources in high-risk areas around the world."
  });
  
  const getThreatIcon = (threatLevel: string) => {
    switch (threatLevel) {
      case "low":
        return <Shield className="h-5 w-5 text-guardian-safe" />;
      case "moderate":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "high":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "critical":
        return <AlertOctagon className="h-5 w-5 text-guardian-danger" />;
      default:
        return <Shield className="h-5 w-5 text-guardian-safe" />;
    }
  };
  
  const filteredLocations = locations.filter(location => 
    location.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
    location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.region.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tighter mb-2 text-guardian-primary">
          Guardian-IO Global Network
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Find protection services and safe havens in high-risk areas around the world.
        </p>
      </div>
      
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search by city, country or region..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-guardian-primary/20 to-transparent">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-guardian-primary" />
                  {location.city}
                </CardTitle>
                {getThreatIcon(location.threatLevel)}
              </div>
              <CardDescription>
                {location.country}, {location.region}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Threat Level:</span>
                  <span className={`capitalize ${
                    location.threatLevel === 'low' ? 'text-guardian-safe' :
                    location.threatLevel === 'moderate' ? 'text-yellow-500' :
                    location.threatLevel === 'high' ? 'text-orange-500' :
                    'text-guardian-danger'
                  }`}>
                    {location.threatLevel}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Safe Havens:</span> {location.safeHavensNearby.length} verified locations
                </div>
                <div>
                  <span className="font-medium">Success Rate:</span> {location.statistics.successRate}
                </div>
              </div>
              
              <div className="mt-4 pl-3 border-l-2 border-guardian-primary/30">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {location.statistics.incidentRate}
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
              <Link 
                to={`/locations/${location.id}`}
                className="w-full text-center inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-guardian-primary text-primary-foreground hover:bg-guardian-primary/90 h-10 px-4 py-2"
              >
                View Protection Resources
              </Link>
            </CardFooter>
          </Card>
        ))}
        
        {filteredLocations.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No locations found matching "{searchTerm}". Try a different search term or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Locations;
