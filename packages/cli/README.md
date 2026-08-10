# @kdl/cli — KDL Landing Framework Official CLI

**Package:** `@kdl/cli`
**Version:** `1.0.0`
**License:** Proprietary (KDL System)

---

## 1. Overview

The **`@kdl/cli`** package provides the official software Command Line Interface executable (`kdl`) for the **KDL Landing Framework**.
It transforms the KDL design engineering methodology into an extensible, cross-platform software operating system capable of orchestrating landing page generation, environment diagnostics, workspace configuration, and plugin lifecycle management across Windows, macOS, and Linux.

---

## 2. Installation & Usage

### Local Development / Linking
```bash
cd packages/cli
npm install
npm run build
node bin/kdl.js --help
```

### Global Binary Command
```bash
kdl --version
kdl doctor
kdl init
kdl create "restaurante-fine-dining" --niche "Gastronomia" --dry-run
```

---

## 3. Command Matrix (Sprint 1)

| Command | Options | Description |
| :--- | :--- | :--- |
| `kdl create [name]` | `-n, --niche <niche>`, `-d, --dry-run` | Orchestrate new landing page creation session under 12 KDL phases |
| `kdl init` | None | Initialize `.kdlrc.json` workspace configuration |
| `kdl doctor` | None | Diagnose framework root, system environment & 12-phase pipeline health |
| `kdl version` | None | Display banner and current software operating system version |
