import fs from 'fs';
import path from 'path';
import { CognitiveArtifactError } from '../errors/cognitive-artifact.error.js';

export interface CognitiveArtifactPhaseMap {
  '01-discovery': Record<string, unknown>;
  '02-brand-strategy': Record<string, unknown>;
  '03-design-system': Record<string, unknown>;
  '04-copywriting': Record<string, unknown>;
  '05-creative-direction': Record<string, unknown>;
  '06-experience-design': Record<string, unknown>;
  '07-ui-architecture': Record<string, unknown>;
  '07.1-cinematic-experience': Record<string, unknown>;
}

export class CognitiveArtifactLoader {
  public static readonly MANDATORY_ARTIFACTS: Array<{
    phaseId: keyof CognitiveArtifactPhaseMap;
    relativePath: string;
  }> = [
    { phaseId: '01-discovery', relativePath: '01-discovery/discovery.json' },
    { phaseId: '02-brand-strategy', relativePath: '02-brand-strategy/brand-strategy.json' },
    { phaseId: '03-design-system', relativePath: '03-design-system/design-system.json' },
    { phaseId: '04-copywriting', relativePath: '04-copywriting/copywriting.json' },
    { phaseId: '05-creative-direction', relativePath: '05-creative-direction/creative-direction.json' },
    { phaseId: '06-experience-design', relativePath: '06-experience-design/experience-design.json' },
    { phaseId: '07-ui-architecture', relativePath: '07-ui-architecture/ui-architecture.json' },
    { phaseId: '07.1-cinematic-experience', relativePath: '07.1-cinematic-experience/cinematic-experience.json' },
  ];

  public static sanitizeWindowsPaths<T>(data: T): T {
    const jsonStr = JSON.stringify(data);
    // Replace raw Windows drive paths e.g. "C:\\Users\\...\\foo.jpg" or "C:/Users/.../foo.jpg" with clean filename or relative path
    const sanitized = jsonStr.replace(/([A-Z]:[\\/][^"'\s,]+[\\/])([^"'\s,]+)/gi, '$2');
    return JSON.parse(sanitized);
  }

  public static loadAndValidateAll(projectPath: string): CognitiveArtifactPhaseMap {
    const artifactsDir = path.join(projectPath, '.project', 'artifacts');

    if (!fs.existsSync(artifactsDir)) {
      throw new CognitiveArtifactError(
        'COGNITIVE_ARTIFACTS_NOT_FOUND',
        `Mandatory cognitive artifacts directory '.project/artifacts/' not found at '${projectPath}'.`
      );
    }

    const loadedMap: Partial<CognitiveArtifactPhaseMap> = {};

    for (const item of this.MANDATORY_ARTIFACTS) {
      const fullPath = path.join(artifactsDir, item.relativePath);

      if (!fs.existsSync(fullPath)) {
        throw new CognitiveArtifactError(
          'COGNITIVE_ARTIFACT_MISSING',
          `Mandatory cognitive artifact '${item.relativePath}' not found in '.project/artifacts/'.`,
          item.phaseId
        );
      }

      let fileContent = '';
      try {
        fileContent = fs.readFileSync(fullPath, 'utf-8');
      } catch (err: any) {
        throw new CognitiveArtifactError(
          'COGNITIVE_ARTIFACT_MISSING',
          `Could not read cognitive artifact '${item.relativePath}': ${err.message}`,
          item.phaseId
        );
      }

      let parsed: any;
      try {
        parsed = JSON.parse(fileContent);
      } catch (jsonErr: any) {
        throw new CognitiveArtifactError(
          'COGNITIVE_ARTIFACT_INVALID_JSON',
          `Failed to parse JSON in '.project/artifacts/${item.relativePath}': ${jsonErr.message}`,
          item.phaseId
        );
      }

      // Validate schema
      this.validatePhaseSchema(item.phaseId, parsed, item.relativePath);

      // Sanitize raw Windows paths to prevent leakage (Test H)
      const sanitized = this.sanitizeWindowsPaths(parsed);
      loadedMap[item.phaseId] = sanitized;
    }

    return loadedMap as CognitiveArtifactPhaseMap;
  }

  private static validatePhaseSchema(phaseId: string, data: any, relativePath: string): void {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new CognitiveArtifactError(
        'COGNITIVE_ARTIFACT_SCHEMA_INVALID',
        `Validation failed for phase '${phaseId}' in '${relativePath}': Root JSON payload must be an object. Received: ${typeof data}`,
        phaseId
      );
    }

    // Phase-specific contract validations
    switch (phaseId) {
      case '01-discovery':
        if (!data.businessMechanics && !data.icp && !data.summary && !data.businessName && Object.keys(data).length === 0) {
          throw new CognitiveArtifactError(
            'COGNITIVE_ARTIFACT_SCHEMA_INVALID',
            `Validation failed for phase '01-discovery' in '${relativePath}': Missing required discovery structure. Expected non-empty object.`,
            phaseId
          );
        }
        break;

      case '02-brand-strategy':
        if (!data.positioning && !data.archetype && !data.goldenCircle && !data.verbalMatrix && Object.keys(data).length === 0) {
          throw new CognitiveArtifactError(
            'COGNITIVE_ARTIFACT_SCHEMA_INVALID',
            `Validation failed for phase '02-brand-strategy' in '${relativePath}': Missing required brand strategy structure.`,
            phaseId
          );
        }
        break;

      case '03-design-system':
        if (!data.colorTokens && !data.colors && !data.typography && !data.designTokens && Object.keys(data).length === 0) {
          throw new CognitiveArtifactError(
            'COGNITIVE_ARTIFACT_SCHEMA_INVALID',
            `Validation failed for phase '03-design-system' in '${relativePath}': Missing required design tokens structure.`,
            phaseId
          );
        }
        break;

      case '04-copywriting':
        if (!data.hero && !data.headline && !data.sections && !data.products && !data.brandStory && Object.keys(data).length === 0) {
          throw new CognitiveArtifactError(
            'COGNITIVE_ARTIFACT_SCHEMA_INVALID',
            `Validation failed for phase '04-copywriting' in '${relativePath}': Missing required copywriting structure.`,
            phaseId
          );
        }
        break;

      case '05-creative-direction':
        if (!data.visualStyle && !data.concept && data.dfiiScore === undefined && !data.lighting && Object.keys(data).length === 0) {
          throw new CognitiveArtifactError(
            'COGNITIVE_ARTIFACT_SCHEMA_INVALID',
            `Validation failed for phase '05-creative-direction' in '${relativePath}': Missing required creative direction structure.`,
            phaseId
          );
        }
        break;

      case '06-experience-design':
        if (!data.scrollChoreography && !data.journey && !data.cardStacking && !data.transitions && Object.keys(data).length === 0) {
          throw new CognitiveArtifactError(
            'COGNITIVE_ARTIFACT_SCHEMA_INVALID',
            `Validation failed for phase '06-experience-design' in '${relativePath}': Missing required experience design structure.`,
            phaseId
          );
        }
        break;

      case '07-ui-architecture':
        if (!data.bentoGrid && !data.heroLayout && !data.sections && !data.layout && Object.keys(data).length === 0) {
          throw new CognitiveArtifactError(
            'COGNITIVE_ARTIFACT_SCHEMA_INVALID',
            `Validation failed for phase '07-ui-architecture' in '${relativePath}': Missing required UI architecture wireframe structure.`,
            phaseId
          );
        }
        break;

      case '07.1-cinematic-experience':
        if (!data.lenis && !data.gsap && !data.motionPhysics && !data.animations && Object.keys(data).length === 0) {
          throw new CognitiveArtifactError(
            'COGNITIVE_ARTIFACT_SCHEMA_INVALID',
            `Validation failed for phase '07.1-cinematic-experience' in '${relativePath}': Missing required cinematic motion structure.`,
            phaseId
          );
        }
        break;
    }
  }
}
