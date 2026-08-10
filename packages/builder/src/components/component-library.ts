export type ComponentCategory =
  | 'hero'
  | 'cta'
  | 'pricing'
  | 'gallery'
  | 'faq'
  | 'contact'
  | 'footer'
  | 'navigation'
  | 'testimonials'
  | 'stats';

export interface SavedComponent {
  name: string;
  category: ComponentCategory;
  code: string;
  tags: string[];
}

export class ComponentLibrary {
  private library = new Map<string, SavedComponent>();

  public registerComponent(comp: SavedComponent): void {
    this.library.set(comp.name, comp);
  }

  public getComponent(name: string): SavedComponent | undefined {
    return this.library.get(name);
  }

  public getByCategory(category: ComponentCategory): SavedComponent[] {
    return Array.from(this.library.values()).filter((c) => c.category === category);
  }
}
