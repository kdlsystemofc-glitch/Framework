# Ciclo de Vida do Desenvolvimento (Development Lifecycle)

> **KDL Landing Framework — Guia Operacional**
> Este documento detalha a matriz completa de responsabilidades, entradas, saídas, referências e critérios de avanço que governam o ciclo de vida de uma landing page.

---

## 1. Matriz de Fases de Desenvolvimento

O ciclo de vida é composto por 10 fases principais de entrega:

---

### Fase 00: Discovery
* **Objetivo:** Coleta e consolidação de dados estratégicos do cliente e nicho.
* **Responsabilidade:** IA Pesquisadora / Operador Técnico de Discovery.
* **Entradas:** Briefing básico do cliente, entrevistas ou documentação corporativa.
* **Saídas:** `discovery.md` preenchido.
* **Critério para Avançar:** Todas as seções do template preenchidas, sem termos ocultos ou pendências comerciais.
* **Documentos Utilizados:** [templates/discovery-template.md](file:///c:/Framework/templates/discovery-template.md).
* **Checklists Utilizados:** N/A.
* **Referências Utilizadas:** [references/storytelling.md](file:///c:/Framework/references/storytelling.md).
* **Atualização da Documentação:** Registro das respostas em `/docs/projects/discovery.md`.

---

### Fase 01: Brand Strategy
* **Objetivo:** Definir arquétipo da marca, tom de voz e posicionamento de concorrência.
* **Responsabilidade:** IA Estrategista de Marca.
* **Entradas:** `discovery.md`.
* **Saídas:** `brand-strategy.md` preenchido.
* **Critério para Avançar:** Tom verbal definido em matriz de contrastes (O que dizemos vs O que não dizemos).
* **Documentos Utilizados:** [templates/brand-strategy-template.md](file:///c:/Framework/templates/brand-strategy-template.md).
* **Checklists Utilizados:** N/A.
* **Referências Utilizadas:** [references/storytelling.md](file:///c:/Framework/references/storytelling.md), [references/copywriting.md](file:///c:/Framework/references/copywriting.md).
* **Atualização da Documentação:** Guia de posicionamento salvo em `/docs/projects/brand-strategy.md`.

---

### Fase 02: Design System
* **Objetivo:** Estruturação semântica de tokens cromáticos, geométricos e tipográficos.
* **Responsabilidade:** IA Design Engineer.
* **Entradas:** `brand-strategy.md`.
* **Saídas:** `design-system.md` preenchido.
* **Critério para Avançar:** Aprovação do orçamento tipográfico (máximo de duas fontes) e declaração semântica de paleta 60-30-10 em variáveis CSS.
* **Documentos Utilizados:** [templates/design-system-template.md](file:///c:/Framework/templates/design-system-template.md).
* **Checklists Utilizados:** N/A.
* **Referências Utilizadas:** [references/design-principles.md](file:///c:/Framework/references/design-principles.md), [references/hero-guidelines.md](file:///c:/Framework/references/hero-guidelines.md).
* **Atualização da Documentação:** Folha de tokens de estilo em `/docs/projects/design-system.md`.

---

### Fase 03: Copywriting
* **Objetivo:** Redação da cópia baseada na estrutura AIDA livre de termos artificiais de IA.
* **Responsabilidade:** IA Copywriter Sênior.
* **Entradas:** `brand-strategy.md`, `design-system.md`.
* **Saídas:** `copywriting.md` preenchido.
* **Critério para Avançar:** Passar sem resíduos na auditoria anti-IA de clichês textuais.
* **Documentos Utilizados:** [templates/copywriting-template.md](file:///c:/Framework/templates/copywriting-template.md).
* **Checklists Utilizados:** N/A.
* **Referências Utilizadas:** [references/copywriting.md](file:///c:/Framework/references/copywriting.md), [references/storytelling.md](file:///c:/Framework/references/storytelling.md).
* **Atualização da Documentação:** Cópia mestre salva em `/docs/projects/copywriting.md`.

---

### Fase 04: Creative Direction
* **Objetivo:** Definição do conceito visual, iluminação, vinheta e score DFII.
* **Responsabilidade:** IA Art Director.
* **Entradas:** `copywriting.md`.
* **Saídas:** `creative-direction.md` preenchido.
* **Critério para Avançar:** Score DFII ≥ 10 e âncora de diferenciação visual validada.
* **Documentos Utilizados:** [templates/creative-direction-template.md](file:///c:/Framework/templates/creative-direction-template.md).
* **Checklists Utilizados:** N/A.
* **Referências Utilizadas:** [references/hero-guidelines.md](file:///c:/Framework/references/hero-guidelines.md), [references/design-principles.md](file:///c:/Framework/references/design-principles.md).
* **Atualização da Documentação:** Memorial de direção criativa em `/docs/projects/creative-direction.md`.

---

### Fase 05: Experience Design
* **Objetivo:** Mapeamento do ritmo do scroll e planejamento de transições de cena físicas.
* **Responsabilidade:** IA Motion Architect.
* **Entradas:** `creative-direction.md`.
* **Saídas:** `experience-design.md` preenchido.
* **Critério para Avançar:** Orquestração de scroll livre de loops ou travamentos de frame.
* **Documentos Utilizados:** [templates/experience-design-template.md](file:///c:/Framework/templates/experience-design-template.md).
* **Checklists Utilizados:** N/A.
* **Referências Utilizadas:** [references/cinematic-experience.md](file:///c:/Framework/references/cinematic-experience.md), [references/motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md).
* **Atualização da Documentação:** Roteiro de scroll salvo em `/docs/projects/experience-design.md`.

---

### Fase 06: UI Architecture
* **Objetivo:** Wireframe e geometria de Bento Grids responsivos.
* **Responsabilidade:** IA UI Designer.
* **Entradas:** `experience-design.md`.
* **Saídas:** `ui-architecture.md` preenchido.
* **Critério para Avançar:** Aprovação total no portão [design-gate.md](file:///c:/Framework/checklists/design-gate.md).
* **Documentos Utilizados:** [templates/ui-architecture-template.md](file:///c:/Framework/templates/ui-architecture-template.md).
* **Checklists Utilizados:** [checklists/design-gate.md](file:///c:/Framework/checklists/design-gate.md).
* **Referências Utilizadas:** [references/design-principles.md](file:///c:/Framework/references/design-principles.md), [references/parallax-guidelines.md](file:///c:/Framework/references/parallax-guidelines.md).
* **Atualização da Documentação:** Especificação geométrica em `/docs/projects/ui-architecture.md`.

---

### Fase 07: Implementation & Cinematic Experience
* **Objetivo:** Codificar a landing page em HTML/CSS nativo, Lenis e GSAP.
* **Responsabilidade:** IA Front-end Engineer.
* **Entradas:** `ui-architecture.md`, `copywriting.md`, `design-system.md`.
* **Saídas:** Código de produção (`index.html`, `style.css`, `main.js`).
* **Critério para Avançar:** Validação responsiva em viewports de 320px a 1920px e aprovação no [development-gate.md](file:///c:/Framework/checklists/development-gate.md).
* **Documentos Utilizados:** N/A (Código Direto).
* **Checklists Utilizados:** [checklists/development-gate.md](file:///c:/Framework/checklists/development-gate.md).
* **Referências Utilizadas:** [references/performance.md](file:///c:/Framework/references/performance.md), [references/accessibility.md](file:///c:/Framework/references/accessibility.md), [references/motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md).
* **Atualização da Documentação:** Atualização do histórico de alteração de código.

---

### Fase 08: Final Audit & Final Fix
* **Objetivo:** Inspecionar performance Lighthouse, métricas WCAG e correções de bugs.
* **Responsabilidade:** IA QA Engineer.
* **Entradas:** Código-fonte da fase anterior.
* **Saídas:** `audit.md` preenchido e patch de código aplicado.
* **Critério para Avançar:** Pontuação Lighthouse mínima de 95 em Performance, SEO e Acessibilidade. Aprovação no [quality-gate.md](file:///c:/Framework/checklists/quality-gate.md).
* **Documentos Utilizados:** [templates/audit-template.md](file:///c:/Framework/templates/audit-template.md).
* **Checklists Utilizados:** [checklists/quality-gate.md](file:///c:/Framework/checklists/quality-gate.md).
* **Referências Utilizadas:** [references/performance.md](file:///c:/Framework/references/performance.md), [references/seo.md](file:///c:/Framework/references/seo.md), [references/accessibility.md](file:///c:/Framework/references/accessibility.md).
* **Atualização da Documentação:** Relatório de auditoria salvo em `/docs/projects/audit.md`.

---

### Fase 09: Publication
* **Objetivo:** Deploy seguro em produção, indexação de schemas SEO e encerramento técnico.
* **Responsabilidade:** IA DevOps Engineer.
* **Entradas:** Código auditado e corrigido.
* **Saídas:** `publication.md` preenchido.
* **Critério para Avançar:** Aprovação no [publication-gate.md](file:///c:/Framework/checklists/publication-gate.md) e deploy HTTPS ativo.
* **Documentos Utilizados:** [templates/publication-template.md](file:///c:/Framework/templates/publication-template.md).
* **Checklists Utilizados:** [checklists/publication-gate.md](file:///c:/Framework/checklists/publication-gate.md).
* **Referências Utilizadas:** [references/seo.md](file:///c:/Framework/references/seo.md).
* **Atualização da Documentação:** Encerramento do ciclo de versão no `CHANGELOG.md` do projeto.

---

## 2. Referências Cruzadas
* Consulte [docs/workflow.md](file:///c:/Framework/docs/workflow.md) para detalhes sobre a cadeia de alimentação das fases.
* Consulte [docs/quality-standards.md](file:///c:/Framework/docs/quality-standards.md) para obter a definição detalhada de critérios mínimos, ideais e de excelência de entrega.
