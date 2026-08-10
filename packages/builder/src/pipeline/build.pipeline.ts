import { IBuilder } from '../builders/builder.interface.js';
import { HTMLBuilder } from '../builders/html.builder.js';
import { ReactBuilder } from '../builders/react.builder.js';
import { NextBuilder } from '../builders/next.builder.js';
import { AstroBuilder } from '../builders/astro.builder.js';
import { BuilderTarget } from '../types/builder.types.js';

export class BuildPipeline {
  private builders = new Map<BuilderTarget, IBuilder>();

  constructor() {
    this.registerBuilder(new HTMLBuilder());
    this.registerBuilder(new ReactBuilder());
    this.registerBuilder(new NextBuilder());
    this.registerBuilder(new AstroBuilder());
  }

  public registerBuilder(builder: IBuilder): void {
    this.builders.set(builder.targetName as BuilderTarget, builder);
  }

  public getBuilder(target: BuilderTarget): IBuilder {
    const builder = this.builders.get(target);
    if (!builder) {
      throw new Error(`No builder registered for target '${target}'`);
    }
    return builder;
  }
}
