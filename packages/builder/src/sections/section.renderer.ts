import { SectionDefinition, PageBlueprint } from '../types/builder.types.js';

export class SectionRenderer {
  public static renderHeader(nav: PageBlueprint['headerNavigation']): string {
    const logoHtml = nav.logoAsset
      ? `<img src="${nav.logoAsset.relativePath}" alt="${nav.logoAsset.altCandidate}" class="brand-logo-img" width="180">`
      : `<span style="font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em;">${nav.brandName}</span>`;

    const linksHtml = nav.links
      .map((link) => `<a href="${link.anchor}" style="margin-left: 1.5rem; font-weight: 500;">${link.label}</a>`)
      .join('');

    const ctaHtml = nav.cta
      ? `<a href="${nav.cta.url}" class="btn-primary" style="margin-left: 2rem;">${nav.cta.label}</a>`
      : '';

    return `<header class="header container" style="padding-top: 1.5rem; padding-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-secondary-30);">
  <div>${logoHtml}</div>
  <nav style="display: flex; align-items: center;">
    ${linksHtml}
    ${ctaHtml}
  </nav>
</header>`;
  }

  public static renderSection(section: SectionDefinition): string {
    switch (section.type) {
      case 'Hero':
        return this.renderHero(section);
      case 'BrandStory':
        return this.renderBrandStory(section);
      case 'ProductShowcase':
        return this.renderProductShowcase(section);
      case 'Benefits':
        return this.renderBenefits(section);
      case 'SocialProof':
        return this.renderSocialProof(section);
      case 'Location':
        return this.renderLocation(section);
      case 'Contact':
        return this.renderContact(section);
      case 'Footer':
        return this.renderFooter(section);
      default:
        return this.renderGeneric(section);
    }
  }

  private static renderHero(section: SectionDefinition): string {
    const imageHtml = section.assignedAssets && section.assignedAssets.length > 0
      ? `<img src="${section.assignedAssets[0].relativePath}" alt="${section.assignedAssets[0].altCandidate}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 16px;" loading="eager">`
      : `<div style="background-color: var(--color-secondary-30); height: 400px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: var(--color-text-secondary);">Visual Hero</div>`;

    const ctaPrimary = section.primaryCta
      ? `<a href="${section.primaryCta.url}" class="btn-primary">${section.primaryCta.label}</a>`
      : '';

    return `<section id="${section.id}" class="section-padding container">
  <div class="bento-grid" style="align-items: center;">
    <div style="grid-column: span 7;">
      <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 1.5rem;">${section.headline || ''}</h1>
      <p style="font-size: 1.25rem; color: var(--color-text-secondary); margin-bottom: 2rem;">${section.subheadline || ''}</p>
      <div>${ctaPrimary}</div>
    </div>
    <div style="grid-column: span 5;">
      ${imageHtml}
    </div>
  </div>
</section>`;
  }

  private static renderBrandStory(section: SectionDefinition): string {
    return `<section id="${section.id}" class="section-padding container" style="background-color: var(--color-secondary-30); border-radius: 24px; margin-top: 2rem;">
  <div style="max-width: 800px; margin: 0 auto; text-align: center;">
    <h2 style="font-size: 2.25rem; margin-bottom: 1.5rem;">${section.headline}</h2>
    <p style="font-size: 1.125rem; color: var(--color-text-secondary); line-height: 1.8;">${section.body}</p>
  </div>
</section>`;
  }

  private static renderProductShowcase(section: SectionDefinition): string {
    const items = section.items || [];
    const images = section.assignedAssets || [];

    const cardsHtml = items.map((item, idx) => {
      const img = images[idx % images.length];
      const imgTag = img
        ? `<img src="${img.relativePath}" alt="${img.altCandidate}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;" loading="lazy">`
        : '';
      const title = typeof item === 'string' ? item : (item.name || item.title || 'Item');

      return `<div style="background-color: var(--color-secondary-30); padding: 1.5rem; border-radius: 16px; grid-column: span 4;">
  ${imgTag}
  <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${title}</h3>
</div>`;
    }).join('');

    return `<section id="${section.id}" class="section-padding container">
  <h2 style="font-size: 2.25rem; margin-bottom: 0.5rem; text-align: center;">${section.headline}</h2>
  <p style="color: var(--color-text-secondary); text-align: center; margin-bottom: 3rem;">${section.subheadline || ''}</p>
  <div class="bento-grid">${cardsHtml}</div>
</section>`;
  }

  private static renderBenefits(section: SectionDefinition): string {
    const items = section.items || [];
    const itemsHtml = items.map((b) => `<div style="grid-column: span 6; background-color: var(--color-secondary-30); padding: 2rem; border-radius: 16px;">
  <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${typeof b === 'string' ? b : b.title}</h3>
</div>`).join('');

    return `<section id="${section.id}" class="section-padding container">
  <h2 style="font-size: 2.25rem; margin-bottom: 2.5rem; text-align: center;">${section.headline}</h2>
  <div class="bento-grid">${itemsHtml}</div>
</section>`;
  }

  private static renderSocialProof(section: SectionDefinition): string {
    const items = section.items || [];
    const reviewsHtml = items.map((r) => `<div style="grid-column: span 4; background-color: var(--color-secondary-30); padding: 1.5rem; border-radius: 16px;">
  <p style="font-style: italic; color: var(--color-text-primary); margin-bottom: 1rem;">"${r.comment || r.text || r}"</p>
</div>`).join('');

    return `<section id="${section.id}" class="section-padding container">
  <h2 style="font-size: 2.25rem; margin-bottom: 2.5rem; text-align: center;">${section.headline}</h2>
  <div class="bento-grid">${reviewsHtml}</div>
</section>`;
  }

  private static renderLocation(section: SectionDefinition): string {
    const cta = section.primaryCta
      ? `<a href="${section.primaryCta.url}" target="_blank" class="btn-primary" style="margin-top: 1.5rem;">${section.primaryCta.label}</a>`
      : '';

    return `<section id="${section.id}" class="section-padding container">
  <div style="background-color: var(--color-secondary-30); padding: 3rem; border-radius: 24px; text-align: center;">
    <h2 style="font-size: 2.25rem; margin-bottom: 1rem;">${section.headline}</h2>
    <p style="font-size: 1.125rem; color: var(--color-text-secondary);">${section.body}</p>
    ${cta}
  </div>
</section>`;
  }

  private static renderContact(section: SectionDefinition): string {
    const cta = section.primaryCta
      ? `<a href="${section.primaryCta.url}" class="btn-primary" style="font-size: 1.125rem; padding: 1rem 2.5rem;">${section.primaryCta.label}</a>`
      : '';

    return `<section id="${section.id}" class="section-padding container" style="text-align: center;">
  <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">${section.headline}</h2>
  ${cta}
</section>`;
  }

  private static renderFooter(section: SectionDefinition): string {
    return `<footer class="container" style="padding: 4rem 0; border-top: 1px solid var(--color-secondary-30); text-align: center; color: var(--color-text-secondary);">
  <p>${section.body}</p>
</footer>`;
  }

  private static renderGeneric(section: SectionDefinition): string {
    return `<section id="${section.id}" class="section-padding container">
  <h2>${section.headline || section.type}</h2>
  <p>${section.body || ''}</p>
</section>`;
  }
}
