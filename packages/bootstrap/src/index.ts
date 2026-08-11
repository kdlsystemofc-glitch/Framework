import path from 'path';
import { FolderScanner } from './scanner/folder.scanner.js';
import { ProjectValidator } from './validators/project.validator.js';
import { StructureManager } from './filesystem/structure.manager.js';
import { IndexGenerator } from './generators/index.generator.js';
import { MarkdownGenerator } from './generators/markdown.generator.js';
import { BootstrapReporter } from './reports/bootstrap.reporter.js';
import { BriefingParser } from './briefing/briefing.parser.js';
import { ClientProjectContext, BriefingParseResult } from './briefing/briefing.types.js';
import { ProjectIndex, ProjectStatusLedger, ValidationResult } from './types/bootstrap.types.js';

export * from './types/bootstrap.types.js';
export * from './briefing/briefing.types.js';
export * from './briefing/briefing.parser.js';
export * from './briefing/briefing.validator.js';
export * from './scanner/folder.scanner.js';
export * from './analyzer/asset.classifier.js';
export * from './analyzer/quality.analyzer.js';
export * from './validators/project.validator.js';
export * from './filesystem/structure.manager.js';
export * from './generators/index.generator.js';
export * from './generators/markdown.generator.js';
export * from './reports/bootstrap.reporter.js';

export interface BootstrapResult {
  projectName: string;
  projectPath: string;
  createdDirectories: string[];
  index: ProjectIndex;
  validation: ValidationResult;
  statusLedger: ProjectStatusLedger;
  briefingParse: BriefingParseResult;
  clientContext: ClientProjectContext;
  reportPath: string;
}

export class BootstrapEngine {
  public static async execute(targetClientFolder: string): Promise<BootstrapResult> {
    const projectPath = path.resolve(targetClientFolder);
    const sanitizedProjectName = path.basename(projectPath);

    // 1. Ensure 12 standard directories
    const createdDirectories = StructureManager.ensureStandardDirectories(projectPath);

    // 2. Scan folder & compute SHA-256 metadata
    const scanner = new FolderScanner(projectPath);
    const { files, directories } = scanner.scan();

    // 3. Parse Briefing Markdown
    const briefingParse = BriefingParser.parse(projectPath, sanitizedProjectName);
    const clientContext = briefingParse.clientContext;
    const finalProjectName = clientContext.businessName.value || sanitizedProjectName;

    // 4. Validate project quality & mandatory assets
    const validation = ProjectValidator.validate(files);

    // 5. Generate index & status
    const index = IndexGenerator.generateIndex(projectPath, files, directories);
    const statusLedger = IndexGenerator.generateStatusLedger(finalProjectName, validation);
    IndexGenerator.writeIndexAndStatus(projectPath, index, statusLedger);

    // 6. Generate Markdown analysis documents
    MarkdownGenerator.writeAllMarkdownDocs(projectPath, index, validation, createdDirectories);

    // 7. Generate bootstrap report
    const reportPath = BootstrapReporter.writeReport(projectPath, index, validation, createdDirectories);

    return {
      projectName: finalProjectName,
      projectPath,
      createdDirectories,
      index,
      validation,
      statusLedger,
      briefingParse,
      clientContext,
      reportPath,
    };
  }
}
