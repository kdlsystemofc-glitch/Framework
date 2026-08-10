export interface WizardAnswers {
  projectName: string;
  niche: string;
  profile: string;
  enableCinematic: boolean;
}

export class WizardPrompt {
  public static async promptProjectCreation(defaults?: Partial<WizardAnswers>): Promise<WizardAnswers> {
    return {
      projectName: defaults?.projectName || 'kdl-landing-demo',
      niche: defaults?.niche || 'Fine Dining Gastronomy',
      profile: defaults?.profile || 'default',
      enableCinematic: defaults?.enableCinematic !== undefined ? defaults.enableCinematic : true,
    };
  }
}
