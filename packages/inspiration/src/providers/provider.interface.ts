import { InspirationReference, IndustrySector, ProviderSource } from '../types/inspiration.types.js';

export interface IInspirationProvider {
  readonly name: ProviderSource;
  fetchReferences(sector: IndustrySector): Promise<InspirationReference[]>;
}
