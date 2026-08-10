# @kdl/cli — Architecture & Technical Specifications

> **KDL Landing Framework — Software Operating System CLI**

---

## 1. Subsystem Directory Layout

```text
packages/
└── cli/
    ├── bin/
    │   └── kdl.js                  # Executable entry point (#!/usr/bin/env node)
    ├── src/
    │   ├── index.ts                # Main CLI entry point & Commander parser
    │   ├── commands/               # Modular Command handlers
    │   │   ├── command.interface.ts # KDLCLICommand interface
    │   │   ├── create.command.ts    # kdl create
    │   │   ├── init.command.ts      # kdl init
    │   │   ├── doctor.command.ts    # kdl doctor
    │   │   └── version.command.ts   # kdl version
    │   ├── core/                   # Framework Core orchestrator
    │   │   ├── framework-loader.ts  # Locates MANIFESTO.md & loads 12 phases
    │   │   ├── orchestrator.ts      # Pipeline state coordinator
    │   │   └── state-machine.ts    # State machine tracker
    │   ├── services/               # Services Layer
    │   │   ├── config.service.ts    # Global/Local .kdlrc.json configuration manager
    │   │   ├── plugin.service.ts    # Plugin lifecycle registry & hooks
    │   │   └── error-handler.service.ts # Centralized error handler
    │   ├── engine/                 # Execution & Event Engine
    │   │   ├── execution-engine.ts  # Session runner
    │   │   ├── event-dispatcher.ts # Async event emitter
    │   │   └── hook-runner.ts      # Lifecycle hook runner
    │   ├── utils/                  # Cross-platform utilities
    │   │   ├── logger.ts           # Level-based logger
    │   │   ├── formatter.ts        # Terminal banners & status indicators
    │   │   └── system.ts           # OS, CPUs, memory & path normalizer
    │   ├── prompts/                # Interactive wizard prompts
    │   │   └── wizard.prompt.ts    # Interactive CLI wizard helpers
    │   └── types/                  # TypeScript interface contracts
    │       ├── config.types.ts
    │       ├── framework.types.ts
    │       └── error.types.ts
    ├── tests/                      # Automated test suite
    │   ├── cli.test.ts
    │   ├── framework-loader.test.ts
    │   ├── config.test.ts
    │   └── logger.test.ts
    ├── README.md
    └── ARCHITECTURE.md
```

---

## 2. Decoupled Architecture Principles

1. **Framework Loader Isolation:** The CLI dynamically discovers the framework root containing `MANIFESTO.md`, `README.md`, `core/`, `engine/`, `prompts/`, `templates/`, and `checklists/` without hardcoding OS-dependent paths.
2. **Command Pattern:** Each CLI command implements `KDLCLICommand` and registers its Commander options independently.
3. **Pluggable Event & Hook Dispatcher:** Extensions can register hooks (`onBeforePhase`, `onAfterPhase`) and listen to lifecycle events.
4. **Cross-Platform Readiness:** Path normalization and OS memory/CPU inspection support Windows, macOS, and Linux seamlessly.
