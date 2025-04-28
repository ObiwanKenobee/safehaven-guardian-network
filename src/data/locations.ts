
export interface Location {
  id: string;
  region: string;
  country: string;
  city: string;
  keywords: string[];
  safeHavensNearby: string[];
  threatLevel: 'low' | 'moderate' | 'high' | 'critical';
  statistics: {
    incidentRate: string;
    safeHavenCount: number;
    successRate: string;
  };
  localResources: {
    name: string;
    contact: string;
    type: 'shelter' | 'police' | 'medical' | 'legal';
  }[];
  testimonial?: {
    quote: string;
    author: string;
    location: string;
  };
}

export const locations: Location[] = [
  {
    id: "nairobi",
    region: "Sub-Saharan Africa",
    country: "Kenya",
    city: "Nairobi",
    keywords: ["AI protection Nairobi", "domestic violence support Nairobi", "safe haven Kenya"],
    safeHavensNearby: ["Haven Home Nairobi", "Shelter Alliance Kenya", "Faith Center Refuge"],
    threatLevel: "high",
    statistics: {
      incidentRate: "42% of women report experiencing violence",
      safeHavenCount: 8,
      successRate: "78% successful interventions"
    },
    localResources: [
      {
        name: "Nairobi Women's Hospital Gender Violence Recovery Centre",
        contact: "+254-20-2726821",
        type: "medical"
      },
      {
        name: "Kenya Police Gender Desk",
        contact: "999",
        type: "police"
      }
    ],
    testimonial: {
      quote: "Guardian-IO alerted me to danger and guided me to a safe haven when I needed it most.",
      author: "Sarah M.",
      location: "Nairobi"
    }
  },
  {
    id: "delhi",
    region: "South Asia",
    country: "India",
    city: "Delhi",
    keywords: ["women safety Delhi", "domestic violence help India", "safe spaces Delhi"],
    safeHavensNearby: ["Shakti Safe Home", "Delhi Women's Shelter", "Faith Refuge Center"],
    threatLevel: "critical",
    statistics: {
      incidentRate: "37% of women report experiencing domestic violence",
      safeHavenCount: 12,
      successRate: "81% successful interventions"
    },
    localResources: [
      {
        name: "Delhi Commission for Women",
        contact: "181",
        type: "legal"
      },
      {
        name: "AIIMS One Stop Crisis Centre",
        contact: "+91-11-26593726",
        type: "medical"
      }
    ],
    testimonial: {
      quote: "The Guardian-IO app helped me escape a dangerous situation and find shelter.",
      author: "Priya K.",
      location: "Delhi"
    }
  },
  {
    id: "mexico-city",
    region: "Latin America",
    country: "Mexico",
    city: "Mexico City",
    keywords: ["femicide prevention Mexico City", "violence protection Mexico", "safe havens CDMX"],
    safeHavensNearby: ["Casa de la Mujer", "Refugio Esperanza", "Centro de Fe y Protección"],
    threatLevel: "high",
    statistics: {
      incidentRate: "66% of women report experiencing some form of violence",
      safeHavenCount: 10,
      successRate: "72% successful interventions"
    },
    localResources: [
      {
        name: "INMUJERES CDMX",
        contact: "+52-55-5512-2836",
        type: "legal"
      },
      {
        name: "Hospital de la Mujer",
        contact: "+52-55-5574-0026",
        type: "medical"
      }
    ]
  },
  {
    id: "kabul",
    region: "Middle East",
    country: "Afghanistan",
    city: "Kabul",
    keywords: ["women protection Kabul", "safe spaces Afghanistan", "crisis help Kabul"],
    safeHavensNearby: ["Hope Sanctuary", "Women's Protection Center", "Faith Shelter Network"],
    threatLevel: "critical",
    statistics: {
      incidentRate: "87% of women report experiencing physical, sexual or psychological violence",
      safeHavenCount: 5,
      successRate: "64% successful interventions"
    },
    localResources: [
      {
        name: "Women for Afghan Women",
        contact: "+93-75-555-5555",
        type: "shelter"
      },
      {
        name: "International Medical Corps",
        contact: "+93-79-123-4567",
        type: "medical"
      }
    ]
  },
  {
    id: "manila",
    region: "Southeast Asia",
    country: "Philippines",
    city: "Manila",
    keywords: ["women safety Manila", "protection Philippines", "safe havens Manila"],
    safeHavensNearby: ["Manila Women's Refuge", "Philippine Safe Haven", "Faith Protection Center"],
    threatLevel: "moderate",
    statistics: {
      incidentRate: "14.4% of women report experiencing physical violence",
      safeHavenCount: 7,
      successRate: "76% successful interventions"
    },
    localResources: [
      {
        name: "Philippine Commission on Women",
        contact: "+63-2-8735-8509",
        type: "legal"
      },
      {
        name: "Women's Care Center, Inc.",
        contact: "+63-2-8514-4104",
        type: "shelter"
      }
    ]
  }
];
