# @kdl/bootstrap — Project Bootstrap Engine

**Package:** `@kdl/bootstrap`
**Version:** `1.0.0`
**License:** Proprietary (KDL System)

---

## 1. Overview

The **`@kdl/bootstrap`** package is the foundational project preparation engine of the **KDL Landing Framework**.
It processes client directories deterministically (with zero LLM overhead), calculating SHA-256 file checksums, classifying assets (Logos, Briefings, Images, Vectors, Videos, Documents), ensuring 12 standard project directories, validating asset quality, generating internal project indexes (`project-index.json`, `PROJECT_STATUS.json`), 4 Markdown project analysis documents, and an audit report (`reports/bootstrap-report.md`).

---

## 2. API Usage

```typescript
import { BootstrapEngine } from '@kdl/bootstrap';

const result = await BootstrapEngine.execute('./Clientes/TW Modas ABC');
console.log(`Score: ${result.validation.score}/100`);
console.log(`Report: ${result.reportPath}`);
```

---

## 3. Standard 12 Project Directories

The Bootstrap Engine automatically creates any missing standard directories:
1. `assets/`
2. `briefing/`
3. `references/`
4. `design/`
5. `copy/`
6. `motion/`
7. `landing/`
8. `audit/`
9. `output/`
10. `deploy/`
11. `reports/`
12. `temp/`
