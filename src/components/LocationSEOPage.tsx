
import React from "react";
import { useSEO } from "@/hooks/useSEO";
import { Location } from "@/data/locations";
import { useGuardian } from "@/contexts/GuardianContext";
import { MapPin, Shield, AlertTriangle, Phone, Bookmark, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SafeHavenMap from "@/components/SafeHavenMap";
import ThreatLevelIndicator from "@/components/ThreatLevelIndicator";
import { useIsMobile } from "@/hooks/use-mobile";

interface LocationSEOPageProps {
  location: Location;
}

const LocationSEOPage = ({ location }: LocationSEOPageProps) => {
  const { currentThreatLevel } = useGuardian();
  const isMobile = useIsMobile();
  
  // Set SEO metadata
  useSEO({ 
    location,
    canonicalUrl: `https://guardian-io.org/locations/${location.id}`
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter mb-2 text-guardian-primary">
            Stay Protected in {location.city} with Guardian-IO
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AI-powered protection and verified safe havens for individuals at risk in {location.city}, {location.country}.
          </p>
        </section>
        
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-guardian-primary" />
                  {location.region}: {location.country}
                </CardTitle>
                <CardDescription>
                  Guardian-IO's protection network in {location.city}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <ThreatLevelIndicator />
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">Current Situation</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    In {location.city}, {location.statistics.incidentRate}. Guardian-IO empowers individuals 
                    with real-time AI crisis detection, access to {location.statistics.safeHavenCount} blockchain-verified 
                    safe spaces, and discreet emergency communication.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2">Success Rate</h3>
                  <div className="bg-guardian-safe/10 rounded-lg p-4 flex items-center gap-4">
                    <Shield className="h-12 w-12 text-guardian-safe" />
                    <div>
                      <p className="text-2xl font-bold text-guardian-safe">{location.statistics.successRate}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Using Guardian-IO's alert system and safe haven network
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-guardian-primary" />
                  Local Resources
                </CardTitle>
                <CardDescription>
                  Verified support services in {location.city}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {location.localResources.map((resource, index) => (
                    <div 
                      key={index} 
                      className="p-3 border rounded-md flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium">{resource.name}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          resource.type === 'shelter' ? 'bg-blue-100 text-blue-800' :
                          resource.type === 'medical' ? 'bg-green-100 text-green-800' :
                          resource.type === 'police' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </span>
                      </div>
                      <a 
                        href={`tel:${resource.contact}`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-guardian-primary text-primary-foreground hover:bg-guardian-primary/90 h-10 px-4 py-2"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <button className="w-full justify-center inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save These Resources
                </button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-guardian-primary">Safe Havens in {location.city}</h2>
          <div className="h-[400px]">
            <SafeHavenMap />
          </div>
        </section>
        
        {location.testimonial && (
          <section className="mb-8">
            <Card className="bg-guardian-primary/5 border-guardian-primary/20">
              <CardContent className="pt-6">
                <blockquote className="border-l-4 border-guardian-primary pl-4 italic">
                  "{location.testimonial.quote}"
                  <footer className="text-right mt-2 font-medium">
                    — {location.testimonial.author}, {location.testimonial.location}
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          </section>
        )}
        
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-guardian-primary">Join Guardian-IO in {location.city}</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Help us expand our protection network in {location.city} and save more lives.
            Partner with us by registering your safe space or becoming a verified responder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-guardian-primary text-primary-foreground hover:bg-guardian-primary/90 h-10 px-4 py-2">
              Register Safe Haven
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Become a Guardian
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LocationSEOPage;
