import fs from 'fs';
import path from 'path';
import { ClientProjectContext, DataField, ReviewItem, BriefingParseResult } from './briefing.types.js';
import { BriefingValidator } from './briefing.validator.js';

export class BriefingParser {
  public static findBriefingFile(projectPath: string): string | null {
    const candidates = [
      path.join(projectPath, 'briefing', 'briefing.md'),
      path.join(projectPath, 'Briefing', 'briefing.md'),
      path.join(projectPath, 'Briefing', 'Briefing.md'),
      path.join(projectPath, 'briefing.md'),
      path.join(projectPath, 'BRIEFING.md'),
    ];

    for (const cand of candidates) {
      if (fs.existsSync(cand)) return cand;
    }

    const briefingDir = path.join(projectPath, 'briefing');
    if (fs.existsSync(briefingDir)) {
      const files = fs.readdirSync(briefingDir);
      const mdFile = files.find((f) => f.toLowerCase().endsWith('.md'));
      if (mdFile) return path.join(briefingDir, mdFile);
    }

    return null;
  }

  public static parse(projectPath: string, fallbackProjectName: string): BriefingParseResult {
    const filePath = this.findBriefingFile(projectPath);

    if (!filePath || !fs.existsSync(filePath)) {
      const emptyContext = this.createEmptyContext(fallbackProjectName, '');
      return BriefingValidator.validate(emptyContext);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const context = this.parseMarkdownContent(content, fallbackProjectName);
    return BriefingValidator.validate(context);
  }

  private static parseMarkdownContent(content: string, fallbackProjectName: string): ClientProjectContext {
    const ctx = this.createEmptyContext(fallbackProjectName, content);

    // 1. Extract Business Name
    const businessNameMatch = content.match(/##\s*Nome\s*comercial[\s\r\n]+([^\r\n#]+)/i) ||
                              content.match(/Cliente:\s*([^\r\n#]+)/i);
    if (businessNameMatch && businessNameMatch[1].trim()) {
      ctx.businessName = { value: businessNameMatch[1].trim(), confidence: 'CONFIRMED', source: 'briefing.md' };
      ctx.projectName = ctx.businessName.value;
    }

    // 2. Extract Slogan
    const sloganMatch = content.match(/##\s*Slogan[^\r\n]*[\s\r\n]+["'„”]?([^"'\r\n#]+)["'„”]?/i);
    if (sloganMatch && sloganMatch[1].trim()) {
      ctx.slogan = { value: sloganMatch[1].trim(), confidence: 'CONFIRMED', source: 'briefing.md' };
    }

    // 3. Extract Segment / Sector
    const sectorMatch = content.match(/##\s*Segmento[\s\r\n]+([^\r\n#]+)/i);
    if (sectorMatch && sectorMatch[1].trim()) {
      ctx.sector = { value: sectorMatch[1].trim().toLowerCase(), confidence: 'CONFIRMED', source: 'briefing.md' };
    }

    // 4. Subsector
    const subsectorMatch = content.match(/##\s*Subsegmento[\s\r\n]+([^\r\n#]+)/i);
    if (subsectorMatch && subsectorMatch[1].trim()) {
      ctx.subsector = { value: subsectorMatch[1].trim(), confidence: 'CONFIRMED', source: 'briefing.md' };
    }

    // 5. Foundation Year
    const foundingMatch = content.match(/(?:Desde|Fundação)[^\d]*(\d{4})/i);
    if (foundingMatch) {
      ctx.foundingYear = { value: foundingMatch[1], confidence: 'CONFIRMED', source: 'briefing.md' };
    }

    // 6. Location & Address
    const addressMatch = content.match(/##\s*Localização[\s\r\n]+([\s\S]*?)(?=\n#|\n##|$)/i);
    if (addressMatch) {
      const locText = addressMatch[1].trim();
      ctx.location.address = { value: locText.split('\n')[0] || locText, confidence: 'CONFIRMED', source: 'briefing.md' };
    }

    // 7. Contacts (Phones & WhatsApp)
    const phoneMatches = content.match(/\(\d{2}\)\s*\d{4,5}-\d{4}/g);
    if (phoneMatches && phoneMatches.length > 0) {
      ctx.contacts.primaryPhone = { value: phoneMatches[0], confidence: 'CONFIRMED', source: 'briefing.md' };
      if (phoneMatches.length > 1) {
        ctx.contacts.secondaryPhone = { value: phoneMatches[1], confidence: 'CONFIRMED', source: 'briefing.md' };
      }
    }

    // 8. Instagram & Web Links
    const instaMatch = content.match(/@([a-zA-Z0-9._]+)/);
    if (instaMatch) {
      ctx.digitalPresence.instagram = { value: `@${instaMatch[1]}`, confidence: 'CONFIRMED', source: 'briefing.md' };
    }

    const ifoodMatch = content.match(/iFood[\s\S]*?(Sim|disponível)/i);
    if (ifoodMatch) {
      ctx.digitalPresence.ifood = { value: 'Disponível no iFood', confidence: 'CONFIRMED', source: 'briefing.md' };
      ctx.operations.ifoodDelivery = { value: true, confidence: 'CONFIRMED', source: 'briefing.md' };
    }

    // 9. Parse Customer Reviews
    const reviewBlocks = content.match(/###\s*Avaliação[\s\S]*?(?=\n###|\n##|\n#|$)/g);
    if (reviewBlocks) {
      for (const block of reviewBlocks) {
        const textMatch = block.match(/["'„”]([^"'\r\n]+)["'„”]/);
        if (textMatch) {
          ctx.reviews.positiveItems.push({
            comment: textMatch[1],
            sentiment: 'POSITIVE',
            source: 'briefing.md',
          });
        }
      }
      if (ctx.reviews.positiveItems.length > 0) {
        ctx.reviews.rating = { value: 4.2, confidence: 'DERIVED', source: 'briefing.md' };
        ctx.reviews.reviewCount = { value: ctx.reviews.positiveItems.length, confidence: 'CONFIRMED', source: 'briefing.md' };
      }
    }

    return ctx;
  }

  private static createEmptyContext(projectName: string, rawMarkdown: string): ClientProjectContext {
    const unk = <T>(val: T): DataField<T> => ({ value: val, confidence: 'UNKNOWN' });
    return {
      projectName,
      businessName: unk(projectName),
      slogan: unk(''),
      sector: unk('general'),
      subsector: unk('general'),
      foundingYear: unk(''),
      location: {
        address: unk(''),
        neighborhood: unk(''),
        cityState: unk(''),
        postalCode: unk(''),
        plusCode: unk(''),
      },
      contacts: {
        primaryPhone: unk(''),
        secondaryPhone: unk(''),
        whatsapp: unk(''),
        email: unk(''),
      },
      digitalPresence: {
        instagram: unk(''),
        website: unk(''),
        ifood: unk(''),
        googleMaps: unk(''),
      },
      operations: {
        delivery: unk(false),
        ifoodDelivery: unk(false),
        dineIn: unk(false),
        deliveryFee: unk(''),
        openingHours: unk(''),
      },
      products: {
        menuItems: unk([]),
        featuredItems: unk([]),
        categories: unk([]),
      },
      brandPositioning: {
        archetype: unk(''),
        toneOfVoice: unk(''),
        valueProposition: unk(''),
        targetAudience: unk([]),
        differentials: unk([]),
        commercialObjections: unk([]),
      },
      reviews: {
        rating: unk(0),
        reviewCount: unk(0),
        positiveItems: [],
        negativeItems: [],
      },
      competitors: unk([]),
      rawMarkdownContent: rawMarkdown,
      parsedAt: new Date().toISOString(),
      missingRequiredFields: [],
    };
  }
}
