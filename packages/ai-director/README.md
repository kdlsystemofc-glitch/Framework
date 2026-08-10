# `@kdl/ai-director` — AI Director Engine

The **AI Director Engine (`@kdl/ai-director`)** is the cognitive brain of the **KDL Landing Framework**. It orchestrates the Project Bootstrap Engine and Inspiration Engine, executing an 8-step structured reasoning process to autonomously determine the creative direction, brand positioning, design system, grid proportions, motion physics, copy tone, section hierarchy, and cinematic experience for any client landing page.

---

## Key Capabilities

1. **8-Stage Cognitive Reasoning Loop (`src/reasoning/`)**:
   - Understand Client, Sector, Target Audience, Positioning, Competitors, Knowledge Base, Inspiration Benchmarks, and Formulate Creative Direction.
2. **Creative DNA Generator (`src/creative-engine/`)**:
   - Generates `creative-dna.json` detailing concept, archetypes, visual style, keywords, and adopted principles.
3. **Technical Decision Logger (`src/decision-engine/`)**:
   - Emits `decision-logs.json` providing technical justifications for why specific colors, typography, grids, and motion easing curves were chosen over rejected alternatives.
4. **Anti-AI Creative Constraints (`src/utils/`)**:
   - Enforces strict anti-cliché rules (no generic fonts like Arial/Times, no purple/pink gradients, minimum WCAG contrast >= 4.5).
5. **Originality & DFII Evaluator (`src/review-engine/`)**:
   - Evaluates projects across 10 dimensions to compute composite **DFII Score** and Originality metrics.
6. **Continuous Auto-Learning Memory (`src/memory/`)**:
   - Feeds historical project decisions back into framework memory for continuous self-improvement.

---

## Usage

```typescript
import { AIDirectorService } from '@kdl/ai-director';

const director = new AIDirectorService();
const result = await director.directProject('Gourmet Restaurant', './client-folder', 'restaurants', inspirationResult);

console.log(result.dna);
console.log(result.originality.dfiiScore);
```
