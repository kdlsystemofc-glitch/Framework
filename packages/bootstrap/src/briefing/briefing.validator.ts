import { ClientProjectContext, BriefingParseResult } from './briefing.types.js';

export class BriefingValidator {
  public static validate(context: ClientProjectContext): BriefingParseResult {
    const warnings: string[] = [];
    const missingFields: string[] = [];

    if (context.businessName.confidence === 'UNKNOWN') {
      missingFields.push('businessName');
      warnings.push('Business name not explicitly confirmed in briefing.');
    }

    if (context.sector.confidence === 'UNKNOWN') {
      missingFields.push('sector');
      warnings.push('Industry sector not identified in briefing.');
    }

    if (context.contacts.primaryPhone.confidence === 'UNKNOWN' && context.contacts.whatsapp.confidence === 'UNKNOWN') {
      warnings.push('No primary phone or WhatsApp contact identified.');
    }

    if (context.digitalPresence.instagram.confidence === 'UNKNOWN') {
      warnings.push('Instagram profile not identified.');
    }

    const isValid = missingFields.length === 0;

    return {
      clientContext: context,
      isValid,
      warnings,
      missingFields,
    };
  }
}
