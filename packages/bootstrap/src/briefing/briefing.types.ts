export type FieldConfidence = 'CONFIRMED' | 'DERIVED' | 'UNKNOWN';

export interface DataField<T> {
  value: T;
  confidence: FieldConfidence;
  source?: string;
  notes?: string;
}

export interface ReviewItem {
  author?: string;
  rating?: number;
  comment: string;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  source?: string;
}

export interface ClientProjectContext {
  projectName: string;
  businessName: DataField<string>;
  slogan: DataField<string>;
  sector: DataField<string>;
  subsector: DataField<string>;
  foundingYear: DataField<string>;
  location: {
    address: DataField<string>;
    neighborhood: DataField<string>;
    cityState: DataField<string>;
    postalCode: DataField<string>;
    plusCode: DataField<string>;
  };
  contacts: {
    primaryPhone: DataField<string>;
    secondaryPhone: DataField<string>;
    whatsapp: DataField<string>;
    email: DataField<string>;
  };
  digitalPresence: {
    instagram: DataField<string>;
    website: DataField<string>;
    ifood: DataField<string>;
    googleMaps: DataField<string>;
  };
  operations: {
    delivery: DataField<boolean>;
    ifoodDelivery: DataField<boolean>;
    dineIn: DataField<boolean>;
    deliveryFee: DataField<string>;
    openingHours: DataField<string>;
  };
  products: {
    menuItems: DataField<string[]>;
    featuredItems: DataField<string[]>;
    categories: DataField<string[]>;
  };
  brandPositioning: {
    archetype: DataField<string>;
    toneOfVoice: DataField<string>;
    valueProposition: DataField<string>;
    targetAudience: DataField<string[]>;
    differentials: DataField<string[]>;
    commercialObjections: DataField<string[]>;
  };
  reviews: {
    rating: DataField<number>;
    reviewCount: DataField<number>;
    positiveItems: ReviewItem[];
    negativeItems: ReviewItem[];
  };
  competitors: DataField<string[]>;
  rawMarkdownContent: string;
  parsedAt: string;
  missingRequiredFields: string[];
}

export interface BriefingParseResult {
  clientContext: ClientProjectContext;
  isValid: boolean;
  warnings: string[];
  missingFields: string[];
}
