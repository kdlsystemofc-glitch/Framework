# KDL Framework — CLI Reference Guide

The KDL Framework CLI (`@kdl/cli`) provides developer and CI/CD commands for generating and managing landing page projects.

## Commands

### `kdl create [folder]`
Creates a new project environment and executes the Master Landing Page Pipeline.

**Options**:
- `-n, --niche <niche>`: Business niche (`restaurants`, `saas`, `corporate`, etc.).
- `-r, --resume`: Resume from prior checkpoint.
- `--non-interactive`: Run non-interactively using project environment defaults.
- `-d, --dry-run`: Dry-run simulation without writing files.

```bash
kdl create examples/real-project --niche restaurants --non-interactive
```
