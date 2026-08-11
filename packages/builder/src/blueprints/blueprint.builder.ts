import { PageBlueprint, SectionDefinition, LandingBuildInput, AssetManifest } from '../types/builder.types.js';

export class PageBlueprintBuilder {
  public static buildBlueprint(input: LandingBuildInput, manifest: AssetManifest): PageBlueprint {
    const copywriting = input.copywriting || {};
    const client = input.clientContext;
    const brandName = client?.businessName.value || input.project.projectName;

    const sections: SectionDefinition[] = [];

    // 1. Hero Section
    sections.push({
      id: 'section-hero',
      type: 'Hero',
      layoutVariant: input.uiArchitecture?.heroLayout || 'split',
      headline: copywriting.hero?.headline || copywriting.headline || `${brandName}`,
      subheadline: copywriting.hero?.subheadline || copywriting.subheadline || client?.slogan.value || '',
      primaryCta: copywriting.hero?.primaryCta || { label: 'Fazer Pedido', url: '#contato' },
      secondaryCta: copywriting.hero?.secondaryCta,
      assignedAssets: manifest.heroImage ? [manifest.heroImage] : (manifest.productImages[0] ? [manifest.productImages[0]] : []),
    });

    // 2. Brand Story / Authority Section
    if (copywriting.brandStory || client?.foundingYear?.value) {
      sections.push({
        id: 'section-story',
        type: 'BrandStory',
        headline: copywriting.brandStory?.headline || `Sobre ${brandName}`,
        body: copywriting.brandStory?.body || `Desde ${client?.foundingYear?.value || '2015'}, trazendo qualidade e tradição.`,
        assignedAssets: manifest.galleryImages.slice(0, 1),
      });
    }

    // 3. Product Showcase Section
    if (manifest.productImages.length > 0 || copywriting.products || client?.products?.menuItems?.value?.length) {
      sections.push({
        id: 'section-products',
        type: 'ProductShowcase',
        headline: copywriting.products?.headline || 'Nossas Especialidades',
        subheadline: copywriting.products?.subheadline || 'Preparados com os melhores ingredientes',
        items: copywriting.products?.items || client?.products?.menuItems?.value || ['Especialidade da Casa'],
        assignedAssets: manifest.productImages,
      });
    }

    // 4. Benefits / Differentials Section
    if (copywriting.benefits || client?.brandPositioning?.differentials?.value?.length) {
      sections.push({
        id: 'section-benefits',
        type: 'Benefits',
        headline: copywriting.benefits?.headline || 'Por que Nos Escolher',
        items: copywriting.benefits?.items || client?.brandPositioning?.differentials?.value || ['Qualidade Garantida', 'Entrega Rápida'],
      });
    }

    // 5. Social Proof Section (ONLY if confirmed reviews exist)
    const confirmedReviews = client?.reviews?.positiveItems || [];
    if (confirmedReviews.length > 0 || copywriting.testimonials) {
      sections.push({
        id: 'section-reviews',
        type: 'SocialProof',
        headline: copywriting.reviews?.headline || 'O Que Nossos Clientes Dizem',
        items: confirmedReviews.length > 0 ? confirmedReviews : copywriting.testimonials,
      });
    }

    // 6. Location / Delivery Section
    if (client?.location?.address?.value || client?.operations?.delivery?.value) {
      sections.push({
        id: 'section-location',
        type: 'Location',
        headline: 'Localização e Entrega',
        body: client?.location?.address?.value ? `Endereço: ${client.location.address.value}` : '',
        primaryCta: client?.digitalPresence?.ifood?.value
          ? { label: 'Pedir pelo iFood', url: client.digitalPresence.ifood.value }
          : undefined,
      });
    }

    // 7. Contact / Conversion Section
    sections.push({
      id: 'section-contact',
      type: 'Contact',
      headline: copywriting.contact?.headline || 'Fale Conosco',
      primaryCta: client?.contacts?.primaryPhone?.value
        ? { label: `Ligar: ${client.contacts.primaryPhone.value}`, url: `tel:${client.contacts.primaryPhone.value.replace(/\D/g, '')}` }
        : { label: 'Entrar em Contato', url: '#contato' },
    });

    // 8. Footer Section
    sections.push({
      id: 'section-footer',
      type: 'Footer',
      headline: brandName,
      body: `© ${new Date().getFullYear()} ${brandName}. Todos os direitos reservados.`,
    });

    return {
      sections,
      visualTheme: input.creativeDirection?.visualStyle || 'modern-clean',
      headerNavigation: {
        brandName,
        logoAsset: manifest.logo,
        links: sections
          .filter((s) => s.type !== 'Hero' && s.type !== 'Footer')
          .map((s) => ({ label: s.headline || s.type, anchor: `#${s.id}` })),
        cta: copywriting.headerCta || { label: 'Contato', url: '#section-contact' },
      },
    };
  }
}
