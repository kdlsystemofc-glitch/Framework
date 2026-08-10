# Mapa de Relacionamento de Conhecimento (Knowledge Map)

> **KDL Landing Framework — Base de Conhecimento**
> **Tipo:** Grafo e Mapa de Dependências Físicas (Knowledge Map)
> **Mandato:** Mapear graficamente os fluxos de dados, a árvore hierárquica de arquivos e os relacionamentos de dependência de toda a base de conhecimento.

---

## 1. Mapa Geral de Conhecimento (Master Graph)

Abaixo está mapeado o grafo geral de dependências e caminhos de fluxo de dados de todos os arquivos do **KDL Landing Framework**:

```mermaid
graph TD
    %% Geral
    M[MANIFESTO.md] -->|Impoe Valores| DS[03-design-system.md]
    M -->|Impoe Direcao| CD[05-creative-direction.md]
    R[README.md] -->|Estrutura Geral| LO[00-framework-loader.md]
    
    %% Core docs
    WF[workflow.md] -->|Define Alimentacao| LC[development-lifecycle.md]
    ME[methodology.md] -->|Ensina Cognicao| LC
    QS[quality-standards.md] -->|Define Metas| G_QA[quality-gate.md]
    
    %% Runtime Engine (camada raiz de execucao)
    ENG[framework-engine.md] -->|Dispara Boot| OR
    ENG -->|Gerencia Scheduler| SM_CORE
    ENG -->|Emite Eventos| PM
    ENG -->|Valida Gates| G_QA
    ENG -->|Orquestra Eventos| AUTO[automation-engine.md]
    AUTO -->|Reage a Triggers| CB
    AUTO -->|Executa Retry/Recovery| PM
    ENG -->|Executa Inspeção de Qualidade| AUDIT[framework-auditor.md]
    AUDIT -->|Calcula Score KDL & Valida 20 Categorias| G_QA
    AUDIT -->|Grava Lições Aprendidas| PM

    %% Core engines
    OR[framework-orchestrator.md] -->|Controla Estados| CB[context-builder.md]
    CB -->|Compila Contexto| PM[project-memory.md]
    PM -->|Injeta Regras| OR
    OR -->|Orquestra Recursos| SM_CORE[skill-manager.md]
    SM_CORE -->|Ranqueia Tools| PM
    OR -->|Solicita Instrucoes| PC_CORE[prompt-compiler.md]
    PC_CORE -->|Injeta no Agente| LO
    OR -->|Audita Mídias| AM_CORE[asset-manager.md]
    AM_CORE -->|Valida Formatos/Preload| PM
    OR -->|Impe Regras de Arte| DI_CORE[design-intelligence.md]
    DI_CORE -->|Calcula DFII/Contraste| PM
    
    %% Agents Pipeline
    LO -->|Handoff Matrix| DI[01-discovery-agent.md]
    DI -->|docs/01-discovery.md| BS[02-brand-strategy-agent.md]
    BS -->|docs/02-brand-strategy.md| DS
    DS -->|docs/03-design-system.md| CW[04-copywriting-agent.md]
    CW -->|docs/04-copywriting.md| CD
    CD -->|docs/05-creative-direction.md| EX[06-experience-design-agent.md]
    EX -->|docs/06-experience-design.md| UA[07-ui-architecture-agent.md]
    UA -->|docs/07-ui-architecture.md| CE[07.1-cinematic-experience-agent.md]
    CE -->|docs/07.1-cinematic-experience.md| IM[08-implementation-agent.md]
    IM -->|Codigo de Producao| AU[08.1-final-audit-agent.md]
    AU -->|audit/final-audit-report.md| PU[09-publication-agent.md]
    
    %% References to Agents
    REF_ST[references/storytelling.md] --> BS
    REF_DS[references/design-principles.md] --> DS
    REF_CO[references/copywriting.md] --> CW
    REF_HE[references/hero-guidelines.md] --> CD
    REF_MO[references/motion-guidelines.md] --> EX
    REF_PA[references/parallax-guidelines.md] --> UA
    REF_CI[references/cinematic-experience.md] --> CE
    REF_PE[references/performance.md] --> IM
    REF_AC[references/accessibility.md] --> AU
    REF_SE[references/seo.md] --> PU
    
    %% Checklists to Gates
    G_DS[checklists/design-gate.md] --> UA
    G_DV[checklists/development-gate.md] --> IM
    G_QA --> AU
    G_PU[checklists/publication-gate.md] --> PU
```

---

## 2. Diagramas por Categoria

### A. Core Operacional (Engine Loop)
O loop operacional dos motores core do framework funciona em simbiose constante:

```mermaid
stateDiagram-v2
    FrameworkEngine --> Orchestrator : 0. Boot & Disparo do Pipeline
    Orchestrator --> SkillManager : 1. Solicita Descoberta de Recursos
    SkillManager --> ContextBuilder : 2. Entrega Inventário de Skills Ranqueadas
    ContextBuilder --> ProjectMemory : 3. Lê Dados do Ledger do Cliente
    ProjectMemory --> ContextBuilder : 4. Retorna Variáveis Cromáticas e Tom
    ContextBuilder --> PromptCompiler : 5. Envia Contexto e Skills Otimizados
    PromptCompiler --> Agent : 6. Injeta Prompt Estruturado Compilado
    Agent --> DesignIntelligence : 7. Valida Estilo & Calcula Score DFII
    DesignIntelligence --> AssetManager : 8. Solicita Validação de Imagens/Logos
    AssetManager --> ProjectMemory : 9. Salva Ativos Otimizados no Ledger
    ProjectMemory --> FrameworkEngine : 10. Retorna Estado para Gate Validation
```

### B. Camada de Agentes de Execução (Prompts & Agents Chain)
O encadeamento de responsabilidade criativa e de código:

```mermaid
graph LR
    BS[02. Brand Strategy] -->|Definição Verbal| CW[04. Copywriting]
    DS[03. Design System] -->|Restrições Geométricas| CW
    CW -->|Narrativa AIDA| CD[05. Creative Direction]
    CD -->|Conceito e DFII| EX[06. Experience Design]
    EX -->|Scroll Pacing| UA[07. UI Architecture]
    UA -->|Bento Grid Spans| CE[07.1. Cinematic Experience]
    CE -->|GSAP ScrollTrigger| IM[08. Implementation]
```

### C. Mapeamento de Templates
Cada fase possui um template obrigatório de relatório salvo na pasta `templates/`:

```mermaid
graph TD
    T01[templates/discovery-template.md] -->|Preenchido por| A01[01-discovery-agent.md]
    T02[templates/brand-strategy-template.md] -->|Preenchido por| A02[02-brand-strategy-agent.md]
    T03[templates/design-system-template.md] -->|Preenchido por| A03[03-design-system-agent.md]
    T04[templates/copywriting-template.md] -->|Preenchido por| A04[04-copywriting-agent.md]
    T05[templates/creative-direction-template.md] -->|Preenchido por| A05[05-creative-direction-agent.md]
    T06[templates/experience-design-template.md] -->|Preenchido por| A06[06-experience-design-agent.md]
    T07[templates/ui-architecture-template.md] -->|Preenchido por| A07[07-ui-architecture-agent.md]
    T08[templates/cinematic-experience-template.md] -->|Preenchido por| A071[07.1-cinematic-experience-agent.md]
    T09[templates/audit-template.md] -->|Preenchido por| A081[08.1-final-audit-agent.md]
    T10[templates/publication-template.md] -->|Preenchido por| A09[09-publication-agent.md]
```

### D. Checklists e Portões de Qualidade (Gates)
O controle de qualidade inegociável protege as transições críticas de desenvolvimento:

```mermaid
graph TD
    UA[07. UI Architecture] -->|Fim da Fase Criativa| CG1{design-gate.md}
    CG1 -->|Reprovado: DFII < 10| CD[Rollback para Creative Direction]
    CG1 -->|Aprovado| CE[07.1. Cinematic Experience]
    
    IM[08. Implementation] -->|Fim da Codificação| CG2{development-gate.md}
    CG2 -->|Reprovado: HTML Incorreto| IM
    CG2 -->|Aprovado| AU[08.1. Final Audit]
    
    AU -->|Fim da Auditoria de CWV| CG3{quality-gate.md}
    CG3 -->|Reprovado: Lighthouse < 95| IM
    CG3 -->|Aprovado| PU[09. Publication]
    
    PU -->|Homologação final de Deploy| CG4{publication-gate.md}
    CG4 -->|Reprovado: Sem HTTPS/Sitemap| PU
    CG4 -->|Aprovado| Live[Site Online]
```

---

## 3. Roteiros de Navegação Inteligente (Descoberta Automática)

Sempre que um agente precisar de insumos conceituais ou técnicos, ele deve executar a descoberta através dos seguintes caminhos:

1. **Como encontrar uma diretriz de Motion (GSAP):**
   * *Origem:* Agente de Cinematic Experience.
   * *Rota:* `knowledge/index.md` -> Tópico: Estética Hero -> Abre [motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md).
2. **Como encontrar a folha de Design Tokens do Projeto:**
   * *Origem:* Agente de Implementação.
   * *Rota:* `core/project-memory.md` -> Objeto JSON: `designTokens` -> Carrega variáveis semânticas.
3. **Como encontrar as restrições de rejeição de deploy:**
   * *Origem:* Agente de Auditoria Final.
   * *Rota:* `docs/quality-standards.md` -> Seção: Hard Gates -> Compara com resultados de Lighthouse e Acessibilidade.

---

## 4. Integração de Fluxos de Dados

O fluxo de dados da esteira de desenvolvimento KDL consolida-se através da passagem ordenada de especificações conceituais para códigos compilados:

```mermaid
graph TD
    Discovery[Briefing & Dores] -->|Voz da Marca| Brand[Strategy & Tom Verbal]
    Brand -->|Tipografia Display & Clamp| Design[Tokens CSS & Cores 60-30-10]
    Design -->|Comprimento de Headlines| Copy[Copywriting AIDA]
    Copy -->|Conceito de Glows e Parallax| Creative[Art & Efeitos de Scroll]
    Creative -->|Estrutura de Linhas e Colunas| UI[Bento Grid Wireframe]
    UI -->|Timelines & Easing| Motion[Cinematic Specs]
    Motion -->|GSAP / Lenis / HTML semântico| Code[index.html & main.css]
```

---

## 5. Conclusão

O **Knowledge Map** é a representação visual da rigidez e consistência metodológica do KDL Landing Framework. Ao mapear em grafos interdependentes todas as conexões de dados entre os agentes, os portões de validação e as folhas de referências técnicas, ele atua como o mapa de navegação indispensável para manter a esteira linear de produção fluida, performática e livre de erros.

---

*KDL Landing Framework — O mapa para a excelência em engenharia de design.*
