import { IndustrySector, SegmentBestPractices } from '../types/inspiration.types.js';

export class SegmentKnowledge {
  private static knowledgeBase: Record<IndustrySector, SegmentBestPractices> = {
    restaurants: {
      sector: 'restaurants',
      recommendedStyles: ['Dark Mode Cinematic', 'Warm Editorial Gastronomy', 'High-Contrast Food Showcase'],
      forbiddenPractices: ['Generic Purple Gradients', 'Stock Images of Plastic Food', 'Flat Narrow 6-line Headings'],
      recurringPatterns: ['Fullscreen Interactive Hero Menu', 'Bento Grid Chef Specials', 'Reservation Sticky Bar'],
      topColors: ['hsl(220, 15%, 8%)', 'hsl(38, 92%, 50%)', '#ffffff'],
      topFontPairs: [{ display: 'Syne', body: 'Plus Jakarta Sans' }],
    },
    fashion: {
      sector: 'fashion',
      recommendedStyles: ['Editorial High-Fashion', 'Monochrome Minimalist', 'Vogue Typography Grid'],
      forbiddenPractices: ['Cluttered Popups', 'Cheap Neon Glows', 'Generic Commerce Grids'],
      recurringPatterns: ['Large Kinetic Typography', 'Overlapping Canvas Lookbook', 'Minimal Underlined Links'],
      topColors: ['#0f0f0f', '#f9f6f0', '#b85b35'],
      topFontPairs: [{ display: 'Ogg', body: 'Neue Haas Grotesk' }],
    },
    dentists: {
      sector: 'dentists',
      recommendedStyles: ['Ultra-Clean Clinical Luxury', 'Soft Natural Organic Spa'],
      forbiddenPractices: ['Scary Dental Tool Stock Photos', 'Over-saturated Blue Gradients'],
      recurringPatterns: ['Before & After Interactive Slider', 'Doctor Credential Cards', 'Instant WhatsApp Consultation'],
      topColors: ['#f8fafc', '#0284c7', '#0f172a'],
      topFontPairs: [{ display: 'Cabinet Grotesk', body: 'Satoshi' }],
    },
    lawyers: {
      sector: 'lawyers',
      recommendedStyles: ['Corporate Prestige Advisory', 'Classic Regal Elegance'],
      forbiddenPractices: ['Stock Gavel Images', 'Low-Contrast Unreadable Text'],
      recurringPatterns: ['Case Settlement Bento Ledger', 'Partner Attorney Profiles', 'Confidential Consultation Form'],
      topColors: ['#0f172a', '#1e293b', '#d97706'],
      topFontPairs: [{ display: 'Fraunces', body: 'Inter' }],
    },
    'real-estate': {
      sector: 'real-estate',
      recommendedStyles: ['Architectural Luxury Showcase', 'Cinematic Drone Gallery'],
      forbiddenPractices: ['Pixelated Property Photos', 'Generic Search Bars Without Filters'],
      recurringPatterns: ['Fullscreen Video Tour Stage', 'Property Floorplan Slider', 'Private Agent Direct Call'],
      topColors: ['#091e42', '#0052cc', '#f4f5f8'],
      topFontPairs: [{ display: 'Clash Display', body: 'Switzer' }],
    },
    beauty: {
      sector: 'beauty',
      recommendedStyles: ['Organic Luxury Glow', 'Pastel Aesthetic Spa'],
      forbiddenPractices: ['Over-edited Fake Skin Photos', 'Cluttered Product Grids'],
      recurringPatterns: ['Treatment Video Previews', 'Esthetician Bio Badges', 'Book Appointment Widget'],
      topColors: ['#faf7f5', '#e8d5c4', '#2d2320'],
      topFontPairs: [{ display: 'Ogg', body: 'Plus Jakarta Sans' }],
    },
    gym: {
      sector: 'gym',
      recommendedStyles: ['High-Energy Kinetic Dark Mode', 'Neon Cyberpunk Athletic'],
      forbiddenPractices: ['Boring White Corporate Cards', 'Static Uninspired Icons'],
      recurringPatterns: ['Trainer Video Showreels', 'Membership Pricing Matrix', 'Free Trial Pass CTA'],
      topColors: ['#050505', '#161616', '#e11d48'],
      topFontPairs: [{ display: 'Space Grotesk', body: 'Inter' }],
    },
    technology: {
      sector: 'technology',
      recommendedStyles: ['Sleek Dark Mode WebGL', 'Modern DevTech Minimal'],
      forbiddenPractices: ['Abstract Cliché Floating Brains', 'Generic Tech Jargon Headlines'],
      recurringPatterns: ['Interactive Terminal / Code Stage', 'Bento Feature Grid', 'Live Demo Trigger CTA'],
      topColors: ['#0b0f19', '#1e293b', '#38bdf8'],
      topFontPairs: [{ display: 'General Sans', body: 'Inter' }],
    },
    industry: {
      sector: 'industry',
      recommendedStyles: ['Industrial Utilitarian Bold', 'Heavy B2B Engineering'],
      forbiddenPractices: ['Fragile Delicate Thin Fonts', 'Impractical Unaligned Spacings'],
      recurringPatterns: ['Machine Spec Comparison Sheet', 'Global Shipping Statistics', 'Request Quote Form'],
      topColors: ['#18181b', '#27272a', '#f97316'],
      topFontPairs: [{ display: 'Cabinet Grotesk', body: 'Switzer' }],
    },
    education: {
      sector: 'education',
      recommendedStyles: ['Modern Academic Knowledge', 'Vibrant EdTech Academy'],
      forbiddenPractices: ['Outdated School Hallway Photos', 'Unstructured Text Walls'],
      recurringPatterns: ['Curriculum Module Roadmap', 'Graduate Career Outcome Stats', 'Enrollment Trial Pass'],
      topColors: ['#0f172a', '#4338ca', '#f8fafc'],
      topFontPairs: [{ display: 'Outfit', body: 'Plus Jakarta Sans' }],
    },
    general: {
      sector: 'general',
      recommendedStyles: ['KDL Universal Cinematic Gold Standard'],
      forbiddenPractices: ['Generic AI Layout Symmetries'],
      recurringPatterns: ['Bento Grid', 'Scroll Scrub Storytelling', 'Floating Magnetic CTA'],
      topColors: ['hsl(220, 15%, 8%)', 'hsl(220, 10%, 15%)', 'hsl(45, 90%, 55%)'],
      topFontPairs: [{ display: 'Syne', body: 'Plus Jakarta Sans' }],
    },
  };

  public static getBestPractices(sector: IndustrySector): SegmentBestPractices {
    return this.knowledgeBase[sector] || this.knowledgeBase['general'];
  }
}
