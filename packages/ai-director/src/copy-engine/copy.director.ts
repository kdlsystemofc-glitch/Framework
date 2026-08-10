import { IndustrySector } from '@kdl/inspiration';

export class CopyDirector {
  public static determineToneOfVoice(sector: IndustrySector): { tone: string; forbiddenWords: string[] } {
    return {
      tone: 'Authoritative, Urgent, Punchy, Anti-AI Directness',
      forbiddenWords: [
        'in the fast-paced world',
        'delve',
        'tapestry',
        'revolutionize',
        'game-changer',
        'cutting-edge solution',
      ],
    };
  }
}
