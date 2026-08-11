# KDL METHODOLOGY V2 — GOVERNANÇA DE MIGRAÇÃO E ARQUITETURA

## 1. Visão Geral da Transição

O KDL passa por uma transição arquitetural fundamental:
- **V1 (Legacy)**: Arquitetura baseada em software gerador programático (`CLI`, `AI Providers`, `Builder`, `CognitiveArtifactLoader`, `--from-artifacts`, renderização dinâmica baseada em esquemas JSON).
- **V2 (Ativa / Oficial)**: Arquitetura **Metodológica Operacional**, onde a KDL consiste em regras, processos, princípios, checklists, diretrizes e padrões de qualidade documentados. O **Antigravity** passa a ser o executor direto e oficial da metodologia.

---

## 2. Motivo da Migração

1. **Agência Criativa Direta**: Motores intermediários JSON-para-HTML engessavam a criação visual e forçavam um "template universal". O Antigravity como executor direto possui capacidade nativa de raciocínio, direção criativa, copywriting e implementação de código de altíssimo nível.
2. **Eliminação de Dependência Externa de IA**: A metodologia KDL não depende de chamadas a APIs de IA (`GeminiProvider`, `OpenAIProvider`, `ClaudeProvider`) via código CLI. A inteligência cognitiva e executora reside no Antigravity.
3. **Foco na Identidade do Cliente**: A metodologia V2 prioriza a singularidade e a personalidade visual de cada marca.

---

## 3. Papel do Antigravity

Como executor oficial da Metodologia KDL V2, o Antigravity é responsável por:
1. Ler a metodologia em `KDL-METHODOLOGY/`.
2. Localizar o cliente em `Clientes/<NomeDoCliente>/`.
3. Analisar briefing, assets e referências.
4. Conduzir pesquisas de mercado e inteligência de marca.
5. Definir a direção criativa e o conceito visual único.
6. Desenvolver copy, argumentos de venda e gatilhos de conversão.
7. Construir o Design System específico do projeto.
8. Implementar o código HTML5, CSS3 vanila e animações GSAP/Lenis diretamente.
9. Executar a aplicação localmente e realizar inspeção no navegador (Playwright/Chrome).
10. Validar responsividade em Desktop, Tablet e Mobile.
11. Testar acessibilidade (WCAG 2.2 AA), performance e SEO.
12. Executar auditorias técnica e visual medidas.
13. Gerar os relatórios e preparar o pacote de entrega.

---

## 4. Estrutura do Workspace `C:\KDL\`

```
C:\KDL\
│
├── KDL-METHODOLOGY\
│   ├── MASTER.md                  # Especificação Mestre da Metodologia V2
│   ├── WORKFLOW.md                # Fluxo de Trabalho Operacional de 22 Etapas
│   ├── QUALITY-STANDARD.md        # Padrões de Qualidade Medidos & Quality Gates
│   ├── DESIGN-PHILOSOPHY.md       # Filosofia de Design e Anti-Homogeneização
│   ├── ANTI-PATTERNS.md           # Práticas Proibidas e Travas Anti-Engessamento
│   ├── MIGRATION-V2.md            # Documento Oficial de Governança da Migração V2
│   ├── prompts\                   # Prompts Operacionais da Metodologia
│   ├── references\                # Guias de Acessibilidade, Motion, SEO e Copy
│   ├── checklists\                # Quality Gates de Design, Dev e Publicação
│   └── templates\                 # Moldelos de Relatórios e Estruturas
│
├── Clientes\
│   ├── Lanchão da Vila\           # Projeto Ativo (Briefing, Assets, Referências)
│   └── ...                        # Novos Clientes
│
└── _legacy\
    └── Framework-main\            # Motor de Software V1 Isolado (Preservado)
```

---

## 5. Status dos Componentes

| Componente | Categoria | Status | Observação |
| :--- | :--- | :--- | :--- |
| `KDL-METHODOLOGY/` | Metodologia V2 | **ATIVO (OFICIAL)** | Fonte única de verdade de processos e qualidade |
| `Clientes/` | Workspace Clientes | **ATIVO (OFICIAL)** | Projetos reais de clientes com assets e landing pages |
| `Framework-main/` | Motor Software V1 | **LEGACY** | Isolado em `_legacy/`. Código e histórico preservados |
| APIs Externas de IA | Infraestrutura V1 | **DEPRECIADO** | Submetido ao controle direto do Antigravity (0 API Keys exigidas pelo framework) |

---

## 6. Regras de Compatibilidade e Governança

- **Proibição de Deletar Histórico**: Nenhum código, commit ou documentação histórica do V1 foi destruído. Tudo reside em `_legacy/Framework-main/`.
- **Preservação dos Dados do Cliente**: O projeto `Clientes/Lanchão da Vila` mantém todos os seus briefings (`briefing/briefing.md`), imagens (`Assets/`), referências e dados de análise intactos.
- **Independência Operacional**: A Metodologia KDL V2 não requer execução de scripts de build programáticos intermediários para rodar.

*Documento aprovado e registrado em 11 de Agosto de 2026.*
