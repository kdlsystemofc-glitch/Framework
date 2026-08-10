# Catálogo e Índice de Conhecimento (Knowledge Index)

> **KDL Landing Framework — Base de Conhecimento**
> **Tipo:** Catálogo e Índice Central de Documentos (Knowledge Catalog)
> **Mandato:** Mapear todos os guias, prompts, referências e checklists do framework, servindo como o índice oficial de busca, navegação e resolução de links para os agentes.

---

## 1. Introdução

O **Knowledge Index** é o inventário unificado de conhecimento do **KDL Landing Framework**. Sua responsabilidade é servir como um mapa de descoberta para agentes de IA e engenheiros do projeto. Ao agrupar todos os documentos por temas (como Motion, SEO ou Acessibilidade), categorizá-los por criticidade e estabelecer a hierarquia canônica de autoridades, este catálogo elimina a necessidade de buscas físicas desordenadas no repositório, garantindo que a informação oficial correta seja carregada no contexto operacional correto.

---

## 2. Conceitos Fundamentais

A gestão de informação do KDL Landing Framework baseia-se nos seguintes conceitos:

* **Base de Conhecimento (Knowledge Base):** O conjunto completo de manuais, diretrizes, templates e checklists do framework salvos nas pastas `docs/`, `references/`, `templates/`, `checklists/` e `knowledge/`.
* **Indexação (Indexing):** O mapeamento de localização física e objetivos de cada arquivo para busca imediata.
* **Descoberta de Conhecimento (Knowledge Discovery):** O processo pelo qual um agente de IA descobre a documentação de apoio recomendada para sua tarefa atual sem intervenção humana.
* **Navegação (Navigation):** O fluxo lógico de movimentação por links relativos (`[text](file://...)`) entre os documentos da base.
* **Classificação (Classification):** A categorização de criticidade (Mandatório vs. Opcional) e tipo de dado do arquivo.
* **Dependência (Dependency):** A relação lógica onde um arquivo necessita da leitura prévia ou concomitante de outro para fazer sentido técnico.
* **Fonte Oficial (Official Source):** O documento canônico que detém autoridade máxima sobre uma dimensão do projeto.
* **Documento Canônico (Canonical Document):** A fonte oficial de verdade técnica (ex: `MANIFESTO.md` é o documento canônico dos valores morais do framework).

---

## 3. Descoberta Dinâmica de Skills (Orquestração de Conhecimento)

Para gerenciar, otimizar e auditar a arquitetura de informação do repositório, os seguintes recursos e skills de ambiente local são mapeados e justificados:

* **Skills de Gestão de Conhecimento e Arquitetura de Wikis (`wiki-architect`, `wiki-builder`):**
  * *Justificativa:* Estruturam o catálogo e organizam links relativos cruzados sem referências circulares quebradas.
* **Skills de Busca e Recuperação Semântica (`search-specialist`, `not-human-search-mcp`):**
  * *Justificativa:* Auxiliam os agentes a realizarem buscas cirúrgicas na base por palavras-chave (ex: buscar "Lenis speed" nas referências de motion).
* **Skills de Planejamento de Cópia e Documentos (`concise-planning`, `writing-plans`):**
  * *Justificativa:* Fornecem esquemas padronizados de diagramação markdown legíveis por IAs de alta cognição.

---

## 4. Organização Geral de Categorias

Os arquivos do KDL Landing Framework estão distribuídos nas seguintes divisões operacionais:

* **Core (c:/Framework/core/):** O cérebro operacional do framework (orquestrador, construtor de contexto e memória permanente).
* **Agents (c:/Framework/agents/):** A especificação conceitual de responsabilidades de cada IA especializada (tomadores de decisão).
* **Templates (c:/Framework/templates/):** Os arquivos base estruturados em Markdown que devem ser preenchidos pelos agentes.
* **References (c:/Framework/references/):** Guias de engenharia e direção de arte detalhados contendo regras de design e limitações.
* **Checklists (c:/Framework/checklists/):** As folhas de critérios técnicos e estéticos exigidas nos Portões de Qualidade (Gates).
* **Prompts (c:/Framework/prompts/):** As diretrizes estruturadas que servem de base para disparar as execuções de agentes (espelhando a camada de `agents/`).
* **Knowledge (c:/Framework/knowledge/):** Índice centralizado e grafo de dependência do framework.

---

## 5. Catálogo de Documentos (Mapeamento de Arquivos)

A tabela abaixo lista os documentos que compõem o repositório mestre do framework:

| Nome do Documento | Localização Física | Categoria | Descrição | Objetivo Técnico | Responsável (IA) | Dependências | Docs Relacionados | Prioridade | Nível de Criticidade |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **README** | [README.md](file:///c:/Framework/README.md) | Geral | Guia de inicialização e visão geral do framework. | Apresentar a metodologia e árvore de pastas. | Loader Agent | N/A | [MANIFESTO.md](file:///c:/Framework/MANIFESTO.md) | Alta | Crítico (Mandatório) |
| **MANIFESTO** | [MANIFESTO.md](file:///c:/Framework/MANIFESTO.md) | Geral | Manifesto de valores estéticos e de engenharia. | Impor qualidade cinematográfica e anti-clichês. | Todos | N/A | [quality-standards.md](file:///c:/Framework/docs/quality-standards.md) | Máxima | Crítico (Mandatório) |
| **CHANGELOG** | [CHANGELOG.md](file:///c:/Framework/CHANGELOG.md) | Geral | Histórico de alterações do framework e releases. | Controlar versionamento semântico do framework. | Loader Agent | N/A | [README.md](file:///c:/Framework/README.md) | Média | Operacional |
| **workflow** | [workflow.md](file:///c:/Framework/docs/workflow.md) | Core (Docs) | Guia operacional detalhado do fluxo de trabalho. | Mapear dependências e alimentação de fases. | Orchestrator | N/A | [development-lifecycle.md](file:///c:/Framework/docs/development-lifecycle.md) | Alta | Crítico (Mandatório) |
| **methodology**| [methodology.md](file:///c:/Framework/docs/methodology.md) | Core (Docs) | Roteiro cognitivo de pensamento de cada fase. | Ensinar a IA a pensar e tomar decisões. | Orchestrator | N/A | [quality-standards.md](file:///c:/Framework/docs/quality-standards.md) | Alta | Crítico (Mandatório) |
| **lifecycle** | [development-lifecycle.md](file:///c:/Framework/docs/development-lifecycle.md) | Core (Docs) | Matriz cronológica contendo portões e tarefas. | Mapear entradas, saídas e critérios de avanço. | Orchestrator | [workflow.md](file:///c:/Framework/docs/workflow.md) | [workflow.md](file:///c:/Framework/docs/workflow.md) | Alta | Crítico (Mandatório) |
| **standards** | [quality-standards.md](file:///c:/Framework/docs/quality-standards.md) | Core (Docs) | Padrões de excelência KDL e regras de rejeição. | Impor metas Lighthouse, WCAG, CLS e SEO. | QA (Audit Agent) | N/A | [quality-gate.md](file:///c:/Framework/checklists/quality-gate.md) | Máxima | Crítico (Mandatório) |
| **orchestrator**| [framework-orchestrator.md](file:///c:/Framework/core/framework-orchestrator.md) | Core | Sistema operacional de loop e controle de estados. | Controlar máquina de estados e rollbacks. | Orchestrator | [workflow.md](file:///c:/Framework/docs/workflow.md) | [context-builder.md](file:///c:/Framework/core/context-builder.md) | Máxima | Crítico (Mandatório) |
| **context-builder**| [context-builder.md](file:///c:/Framework/core/context-builder.md) | Core | Gerenciador de contexto e otimizador de tokens. | Compilar dados de fase e compactar context windows. | Context Builder | [framework-orchestrator.md](file:///c:/Framework/core/framework-orchestrator.md) | [project-memory.md](file:///c:/Framework/core/project-memory.md) | Máxima | Crítico (Mandatório) |
| **project-memory**| [project-memory.md](file:///c:/Framework/core/project-memory.md) | Core | Registro semântico de decisões e assets do projeto. | Ledger permanente e imutável de decisões. | Project Memory | [context-builder.md](file:///c:/Framework/core/context-builder.md) | [framework-orchestrator.md](file:///c:/Framework/core/framework-orchestrator.md) | Máxima | Crítico (Mandatório) |
| **skill-manager** | [skill-manager.md](file:///c:/Framework/core/skill-manager.md) | Core | Gerenciador e descobridor dinâmico de skills locais. | Catalogar, ranquear e justificar equipe virtual de tools. | Skill Manager | [framework-orchestrator.md](file:///c:/Framework/core/framework-orchestrator.md) | [project-memory.md](file:///c:/Framework/core/project-memory.md) | Máxima | Crítico (Mandatório) |
| **prompt-compiler**| [prompt-compiler.md](file:///c:/Framework/compiler/prompt-compiler.md) | Core | Compilador central de prompts estruturados. | Validar entradas, herdar variáveis e gerar prompts de agentes. | Prompt Compiler | [context-builder.md](file:///c:/Framework/core/context-builder.md) | [skill-manager.md](file:///c:/Framework/core/skill-manager.md) | Máxima | Crítico (Mandatório) |
| **asset-manager**  | [asset-manager.md](file:///c:/Framework/core/asset-manager.md) | Core | Gerenciador de mídias e otimizações de ativos. | Validar enquadramentos de imagens, logos SVG e compactar WebP. | Asset Manager | [framework-orchestrator.md](file:///c:/Framework/core/framework-orchestrator.md) | [project-memory.md](file:///c:/Framework/core/project-memory.md) | Máxima | Crítico (Mandatório) |
| **design-intelligence**| [design-intelligence.md](file:///c:/Framework/core/design-intelligence.md) | Core | Manual de regras estéticas e viabilidade (DFII). | Regular a estética, tipografia fluida clamp, eases e o score DFII. | Design Intelligence | [framework-orchestrator.md](file:///c:/Framework/core/framework-orchestrator.md) | [project-memory.md](file:///c:/Framework/core/project-memory.md) | Máxima | Crítico (Mandatório) |
| **framework-engine** | [framework-engine.md](file:///c:/Framework/engine/framework-engine.md) | Engine | Runtime oficial e motor de execução do pipeline KDL. | Gerenciar máquina de estados, scheduler, eventos, logs e rollbacks. | Framework Engine | [framework-orchestrator.md](file:///c:/Framework/core/framework-orchestrator.md) | Todos os componentes Core | Máxima | Crítico (Mandatório) |
| **automation-engine**| [automation-engine.md](file:///c:/Framework/engine/automation-engine.md) | Engine | Motor de automação reativa e orquestração de eventos. | Reagir a Triggers, validar Conditions, disparar Actions, gerenciar Retry e Recovery. | Automation Engine | [framework-engine.md](file:///c:/Framework/engine/framework-engine.md) | Todos os componentes do Framework | Máxima | Crítico (Mandatório) |
| **framework-auditor** | [framework-auditor.md](file:///c:/Framework/engine/framework-auditor.md) | Engine | Diretor de qualidade, matriz de scoring KDL e auditoria final. | Inspecionar 20 categorias de qualidade, calcular Score KDL e autorizar deploy. | Framework Auditor | [framework-engine.md](file:///c:/Framework/engine/framework-engine.md) | Todos os componentes do Framework | Máxima | Crítico (Mandatório) |
| **final-audit-report** | [framework-final-audit.md](file:///c:/Framework/reports/framework-final-audit.md) | Reports | Relatório oficial de auditoria da arquitetura v1.0.0. | Homologar a arquitetura KDL v1.0.0 com nota 98.5/100 e selo Obra-Prima. | Framework Auditor | Todos os componentes do Framework | N/A | Alta | Informativo / Audit |
| **index** | [index.md](file:///c:/Framework/knowledge/index.md) | Knowledge | Catálogo unificado de documentos do framework. | Permitir descoberta e resolução de caminhos. | Todos | N/A | [knowledge-map.md](file:///c:/Framework/knowledge/knowledge-map.md) | Alta | Crítico (Mandatório) |
| **knowledge-map**| [knowledge-map.md](file:///c:/Framework/knowledge/knowledge-map.md) | Knowledge | Grafo de dependências Mermaid e fluxos. | Visualizar o relacionamento entre arquivos. | Todos | [index.md](file:///c:/Framework/knowledge/index.md) | [index.md](file:///c:/Framework/knowledge/index.md) | Alta | Crítico (Mandatório) |
| **00. Loader** | [00-framework-loader.md](file:///c:/Framework/prompts/00-framework-loader.md) | Prompts | Inicializador de ambiente e descoberta de skills. | Executar boot do projeto e emitir Handoff. | Loader Agent | N/A | [discovery-agent.md](file:///c:/Framework/prompts/01-discovery-agent.md) | Alta | Crítico (Mandatório) |
| **01. Discovery**| [01-discovery-agent.md](file:///c:/Framework/prompts/01-discovery-agent.md) | Prompts | Pesquisa de ICP e auditoria física de imagens/logos. | Gerar relatório de pesquisa do cliente. | Discovery Agent | [00-framework-loader.md](file:///c:/Framework/prompts/00-framework-loader.md) | `discovery-template.md` | Alta | Crítico (Mandatório) |
| **02. Brand** | [02-brand-strategy-agent.md](file:///c:/Framework/agents/02-brand-strategy-agent.md) | Agents | Estratégia de marca, arquétipos e tom de voz. | Travar o posicionamento verbal e Big Idea. | Brand Agent | [01-discovery-agent.md](file:///c:/Framework/prompts/01-discovery-agent.md) | `brand-strategy-template.md` | Alta | Crítico (Mandatório) |
| **03. Design** | [03-design-system-agent.md](file:///c:/Framework/agents/03-design-system-agent.md) | Agents | Arquitetura de Design Tokens e contrastes WCAG. | Definir cores 60-30-10 e escalas clamp. | Design Agent | [02-brand-strategy-agent.md](file:///c:/Framework/agents/02-brand-strategy-agent.md) | `design-system-template.md` | Alta | Crítico (Mandatório) |
| **04. Copy** | [04-copywriting-agent.md](file:///c:/Framework/agents/04-copywriting-agent.md) | Agents | Redação persuasiva AIDA livre de clichês de IA. | Gerar copy mestre humana da página. | Copywriter Agent| [03-design-system-agent.md](file:///c:/Framework/agents/03-design-system-agent.md) | `copywriting-template.md` | Alta | Crítico (Mandatório) |
| **05. Creative**| [05-creative-direction-agent.md](file:///c:/Framework/agents/05-creative-direction-agent.md) | Agents | Conceito visual, iluminação radial e score DFII. | Criar o memorial criativo tridimensional. | Art Director | [04-copywriting-agent.md](file:///c:/Framework/agents/04-copywriting-agent.md) | `creative-direction-template.md`| Alta | Crítico (Mandatório) |
| **06. UX** | [06-experience-design-agent.md](file:///c:/Framework/agents/06-experience-design-agent.md) | Agents | Jornada do scroll, pacing e micro-interações. | Roteirizar o fluxo e velocidade de scroll. | Motion Architect| [05-creative-direction-agent.md](file:///c:/Framework/agents/05-creative-direction-agent.md) | `experience-design-template.md`| Alta | Crítico (Mandatório) |
| **07. UI** | [07-ui-architecture-agent.md](file:///c:/Framework/agents/07-ui-architecture-agent.md) | Agents | Geometria responsiva mobile-first e Bento Grid. | Criar wireframe técnico de linhas/colunas. | UI Designer | [06-experience-design-agent.md](file:///c:/Framework/agents/06-experience-design-agent.md) | `ui-architecture-template.md` | Alta | Crítico (Mandatório) |
| **07.1. Motion**| [07.1-cinematic-experience-agent.md](file:///c:/Framework/agents/07.1-cinematic-experience-agent.md) | Agents | Animações GSAP, Lenis, parallax e loaders SVG. | Roteirizar a física de scroll cinematográfica. | Cinematic Agent| [07-ui-architecture-agent.md](file:///c:/Framework/agents/07-ui-architecture-agent.md) | `cinematic-experience-template.md`| Alta | Crítico (Mandatório) |
| **08. Dev** | [08-implementation-agent.md](file:///c:/Framework/agents/08-implementation-agent.md) | Agents | Engenharia de código HTML/CSS modular e JS. | Codificar a landing page sob a especificação. | Front Engineer | [07.1-cinematic-experience-agent.md](file:///c:/Framework/agents/07.1-cinematic-experience-agent.md) | `development-gate.md` | Alta | Crítico (Mandatório) |
| **08.1. QA** | [08.1-final-audit-agent.md](file:///c:/Framework/agents/08.1-final-audit-agent.md) | Agents | Auditoria Lighthouse, WCAG 2.2 AA e bugs de código. | Garantir conformidade técnica e estética KDL. | QA Engineer | [08-implementation-agent.md](file:///c:/Framework/agents/08-implementation-agent.md) | `audit-template.md`, `quality-gate.md`| Alta | Crítico (Mandatório) |
| **09. DevOps** | [09-publication-agent.md](file:///c:/Framework/agents/09-publication-agent.md) | Agents | Deploy seguro, headers Vercel, sitemaps e robots. | Colocar o site em produção HTTPS estável. | DevOps Engineer| [08.1-final-audit-agent.md](file:///c:/Framework/agents/08.1-final-audit-agent.md) | `publication-template.md`, `pub-gate.md`| Alta | Crítico (Mandatório) |

---

## 6. Índice Temático de Conhecimento (Navegação por Assuntos)

Quando um agente precisar resolver uma pendência técnica específica, ele deve consultar as rotas temáticas abaixo para carregar as dependências de conhecimento adequadas:

### A. Tema: Estética Hero e Animações Cinematográficas
* **Diretrizes de Layout e Grids:** [ui-architecture-agent.md](file:///c:/Framework/agents/07-ui-architecture-agent.md)
* **Diretrizes Estéticas de Arte:** [creative-direction-agent.md](file:///c:/Framework/agents/05-creative-direction-agent.md) e [hero-guidelines.md](file:///c:/Framework/references/hero-guidelines.md)
* **Especificação Física de Animação:** [cinematic-experience-agent.md](file:///c:/Framework/agents/07.1-cinematic-experience-agent.md) e [motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md)
* **Checklist de Validação:** [design-gate.md](file:///c:/Framework/checklists/design-gate.md)
* **Código de Implementação:** [implementation-agent.md](file:///c:/Framework/agents/08-implementation-agent.md)

### B. Tema: Redação e Tom de Voz
* **Diretriz de Posicionamento:** [brand-strategy-agent.md](file:///c:/Framework/agents/02-brand-strategy-agent.md)
* **Referência de Storytelling:** [storytelling.md](file:///c:/Framework/references/storytelling.md)
* **Redação de Objeções:** [copywriting-agent.md](file:///c:/Framework/agents/04-copywriting-agent.md) e [copywriting.md](file:///c:/Framework/references/copywriting.md)

### C. Tema: Otimizações SEO, Robots e Sitemaps
* **Canonical e Tags de Busca:** [copywriting-agent.md](file:///c:/Framework/agents/04-copywriting-agent.md) e [seo.md](file:///c:/Framework/references/seo.md)
* **Metadados JSON-LD de LocalBusiness:** [implementation-agent.md](file:///c:/Framework/agents/08-implementation-agent.md)
* **Configuração de Rotas e Publicação:** [publication-agent.md](file:///c:/Framework/agents/09-publication-agent.md) e [publication-gate.md](file:///c:/Framework/checklists/publication-gate.md)

### D. Tema: Acessibilidade e Teclado (WCAG 2.2 AA)
* **Cores e Contrastes Matemáticos:** [design-system-agent.md](file:///c:/Framework/agents/03-design-system-agent.md)
* **Navegação e Motion Reduzido:** [accessibility.md](file:///c:/Framework/references/accessibility.md)
* **Portão de Homologação:** [quality-gate.md](file:///c:/Framework/checklists/quality-gate.md) e [final-audit-agent.md](file:///c:/Framework/agents/08.1-final-audit-agent.md)

---

## 7. Hierarquia Canônica de Autoridades

Para resolver divergências entre diretrizes de arquivos diferentes, a KDL System estabelece a seguinte árvore hierárquica de autoridade de conhecimento:

1. **Documento Mestre (Nível 1 - Supremacia):** [MANIFESTO.md](file:///c:/Framework/MANIFESTO.md) e [quality-standards.md](file:///c:/Framework/docs/quality-standards.md). Suas metas de performance (Lighthouse ≥ 95/90) e exigência de fotos reais dominam sobre qualquer preferência artística.
2. **Documento Operacional (Nível 2 - Governança):** [framework-orchestrator.md](file:///c:/Framework/core/framework-orchestrator.md) e [context-builder.md](file:///c:/Framework/core/context-builder.md). Ditam como os agentes rodam, bloqueando compilações físicas se portões de qualidade forem violados.
3. **Documento de Projeto (Nível 3 - Decisões):** [project-memory.md](file:///c:/Framework/core/project-memory.md). Registra as restrições persistidas que nenhum programador pode reescrever arbitrariamente.
4. **Documento Complementar (Nível 4 - Orientação):** Manuais em `references/` (ex: `motion-guidelines.md`). Servem de suporte técnico para parametrização.

---

## 8. Protocolo de Pesquisa e Consulta (Navegação Inteligente)

Sempre que uma IA for acionada, ela deve seguir o protocolo abaixo para consultar o conhecimento:

```
[Pesquisa por Assunto no index.md] ──► [Localizar documento Canônico (Nível 1/2)]
                                                │
                                                ▼
[Carregar Template de Saída da pasta templates/] ◄── [Ler Especificações em references/]
                                                │
                                                ▼
[Validar entregas na checklist correspondente da pasta checklists/]
```

---

## 9. Versionamento do Índice de Conhecimento

O Knowledge Index deve ser atualizado obrigatoriamente nas seguintes situações:

1. **Criação de Novo Documento:** Inclusão imediata do arquivo na tabela do catálogo, categorizando-o e indicando suas dependências.
2. **Alteração de Nome de Arquivo (Renomeação):** Atualização imediata do caminho absoluto e links relativos correspondentes no `index.md` e `knowledge-map.md`.
3. **Desativação de Guideline:** Registro do documento na Memória Histórica de descarte, removendo-o da listagem ativa para evitar poluição de contexto.

---

## 10. Boas Práticas de Gestão de Conhecimento

* **Apontar para a Fonte Oficial:** Nunca duplique diretrizes de movimento (GSAP) dentro de arquivos de design system. Aponte para a referência canônica [motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md).
* **Manter Links Relativos Válidos:** Garanta que todas as URLs usem a sintaxe correta `[name](file:///c:/Framework/...)` para permitir navegação direta no ambiente local.

---

## 11. Anti-Patterns de Organização

* ❌ **Referências Circulares (Circular Dependencies):** Criar um cenário onde o documento A aponta para B como dependência mandatória, e B aponta para A, travando o compilador de contexto.
* ❌ **Documentos Órfãos (Orphans):** Criar arquivos de instruções técnicas na raiz do projeto sem mapeamento ou links de referência nas tabelas de categorias e no mapa de conhecimento.

---

## 12. Conclusão

O **Knowledge Index** é o pilar organizador da base de conhecimento KDL. Ao centralizar todos os links de referências técnicas, delimitar a hierarquia canônica de autoridades e organizar o conhecimento por temas de desenvolvimento, ele garante que os agentes acessem instantaneamente a informação oficial necessária, blindando o ecossistema contra a desorganização de arquivos e duplicação de tokens.

---

*KDL Landing Framework — A organização impecável a serviço da engenharia.*
