import { AIDirectorResult } from '@kdl/ai-director';

export class CSSGenerator {
  public static generateCSS(designSystem: any, directorResult?: AIDirectorResult): string {
    const colors = designSystem?.colors || directorResult?.designTokens?.colors || {};
    const typography = designSystem?.typography || directorResult?.designTokens?.typography || {};
    const layout = designSystem?.layout || directorResult?.designTokens?.layout || {};

    const dominantColor = colors.dominant60 || colors.primary || '#0f172a';
    const secondaryColor = colors.secondary30 || colors.secondary || '#1e293b';
    const accentColor = colors.accent10 || colors.accent || '#3b82f6';
    const textPrimary = colors.textPrimary || '#f8fafc';
    const textSecondary = colors.textSecondary || '#94a3b8';

    const displayFont = typography.displayFont || 'Inter';
    const bodyFont = typography.bodyFont || 'Inter';

    return `:root {
  --color-dominant-60: ${dominantColor};
  --color-secondary-30: ${secondaryColor};
  --color-accent-10: ${accentColor};
  --color-text-primary: ${textPrimary};
  --color-text-secondary: ${textSecondary};

  --font-display: '${displayFont}', system-ui, -apple-system, sans-serif;
  --font-body: '${bodyFont}', system-ui, -apple-system, sans-serif;

  --grid-columns: ${layout.columns || 12};
  --grid-gutter: ${layout.gutterPx || 24}px;
  --grid-margin: ${layout.marginPx || 32}px;
  --container-max-width: 1200px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-dominant-60);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, .display-heading {
  font-family: var(--font-display);
  color: var(--color-text-primary);
  line-height: 1.2;
}

a {
  color: var(--color-accent-10);
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--grid-margin);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter);
}

.section-padding {
  padding: 5rem 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent-10);
  color: #ffffff;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

.brand-logo-img {
  height: 48px;
  width: auto;
  object-fit: contain;
}

@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .section-padding {
    padding: 3rem 0;
  }
}
`;
  }
}
