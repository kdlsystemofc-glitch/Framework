# @kdl/bootstrap — Technical Architecture Specifications

> **KDL Landing Framework — Project Bootstrap Engine**

---

## 1. Directory Structure

```text
packages/
└── bootstrap/
    ├── src/
    │   ├── index.ts                   # BootstrapEngine main facade
    │   ├── scanner/
    │   │   └── folder.scanner.ts      # Recursive filesystem scanner & SHA-256 calculator
    │   ├── analyzer/
    │   │   ├── asset.classifier.ts    # File extension & path asset classifier
    │   │   └── quality.analyzer.ts    # Zero-byte corruption & duplicate SHA-256 detector
    │   ├── validators/
    │   │   └── project.validator.ts   # Briefing, logo, image & quality validator
    │   ├── filesystem/
    │   │   └── structure.manager.ts   # Ensures 12 standard project directories
    │   ├── generators/
    │   │   ├── index.generator.ts     # Generates project-index.json & PROJECT_STATUS.json
    │   │   └── markdown.generator.ts  # Generates 4 Markdown analysis documents
    │   ├── reports/
    │   │   └── bootstrap.reporter.ts  # Emits reports/bootstrap-report.md
    │   ├── types/
    │   │   ├── bootstrap.types.ts
    │   │   └── index.types.ts
    │   └── utils/
    │       ├── hash.utils.ts          # SHA-256 crypto helper
    │       └── path.utils.ts          # Cross-platform path normalizer
    ├── tests/                         # Automated unit & integration tests
    │   ├── scanner.test.ts
    │   ├── classifier.test.ts
    │   ├── validator.test.ts
    │   └── bootstrap-engine.test.ts
    ├── README.md
    └── ARCHITECTURE.md
```

---

## 2. Decoupled Pipeline Design

1. **Zero LLM Overhead:** Pure deterministic TypeScript logic guaranteeing instant, high-speed project bootstrapping.
2. **Cryptographic Integrity:** Every scanned file is hashed using SHA-256 to detect duplicate uploads across folders.
3. **Machine & Human Ledger:** Generates structured JSON indexes for AI agents (`project-index.json`, `PROJECT_STATUS.json`) alongside readable Markdown documents for human developers (`PROJECT_ANALYSIS.md`, `PROJECT_STRUCTURE.md`, `CLIENT_PROFILE.md`, `EXECUTION_PLAN.md`, `reports/bootstrap-report.md`).
