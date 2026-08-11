# KDL METHODOLOGY V2 — VISÃO MACRO DAS 8 MACROFASES E WORKFLOW

> **PROPÓSITO**: Mapeamento da arquitetura das 8 macrofases da Metodologia KDL V2, suas dependências, checkpoints de aprovação visual e regras de ciclo de refinamento.

---

## 1. As 8 Macrofases da Metodologia KDL V2

A execução de qualquer projeto de landing page pelo **Antigravity** obedece obrigatoriamente à seguinte sequência estruturada:

```
┌───────────────────────────────────────────────────────────────────────────┐
│                      AS 8 MACROFASES KDL METHODOLOGY V2                   │
└───────────────────────────────────────────────────────────────────────────┘
                                     │
   ┌─────────────────────────────────┴─────────────────────────────────┐
   ▼                                                                   ▼
┌───────────────────────────────┐                   ┌───────────────────────────────┐
│ 01 — CLIENT INTELLIGENCE      │ ────────────────► │ 02 — RESEARCH & INSPIRATION   │
│ Analise de Briefing & Assets  │                   │ Benchmarking & Referencias    │
└───────────────┬───────────────┘                   └───────────────┬───────────────┘
                │                                                   │
                ▼                                                   ▼
┌───────────────────────────────┐                   ┌───────────────────────────────┐
│ 03 — CREATIVE DIRECTION       │ ────────────────► │ 04 — DESIGN SYSTEM & UX       │
│ Conceito Visual & Atmosfera   │                   │ Tokens HSL, Tipografia & Grids│
└───────────────┬───────────────┘                   └───────────────┬───────────────┘
                │                                                   │
                ▼                                                   ▼
┌───────────────────────────────┐                   ┌───────────────────────────────┐
│ 05 — COPY & CONVERSION        │ ────────────────► │ 06 — IMPLEMENTATION           │
│ Redação AIDA & Argumentação   │                   │ HTML5, CSS3 vanila & Motion   │
└───────────────┬───────────────┘                   └───────────────┬───────────────┘
                │                                                   │
                ▼                                                   ▼
┌───────────────────────────────┐                   ┌───────────────────────────────┐
│ 07 — VISUAL QA & REFINEMENT   │ ────────────────► │ 08 — FINAL AUDIT & DELIVERY   │
│ Browser Inspection & Mobile   │                   │ Quality Gates & Publicacao    │
└───────────────────────────────┘                   └───────────────────────────────┘
```

---

## 2. Descrição Geral e Dependências entre Fases

### Fase 01 — CLIENT INTELLIGENCE
- **Foco**: Imersão total nos materiais do cliente (briefing, imagens, vídeos, marcas, posicionamento).
- **Dependência**: Pré-requisito para todas as demais fases. Proibido avançar sem clareza sobre o produto e o público (ICP).

### Fase 02 — RESEARCH & INSPIRATION
- **Foco**: Estudo de concorrentes e busca de referências visuais e de composição de altíssimo nível.
- **Dependência**: Requer insumos da Fase 01. Alimenta as escolhas visuais da Fase 03.

### Fase 03 — CREATIVE DIRECTION
- **Foco**: Tomada de decisão sobre o conceito visual único, paleta de atmosfera, narrativa e direção de arte.
- **Dependência**: Requer a Fase 02. Proibido escrever código ou criar o Design System sem a Direção Criativa aprovada.

### Fase 04 — DESIGN SYSTEM & UX
- **Foco**: Definição técnica de tokens de design (paleta HSL 60-30-10, fontes display/corpo, escopo de espaçamento) e arquitetura de informação.
- **Dependência**: Derivado diretamente da Fase 03.

### Fase 05 — COPY & CONVERSION
- **Foco**: Redação de headlines, argumentos comerciais, bento copy, prova social e chamadas para ação.
- **Dependência**: Alinhado à inteligência da Fase 01 e à narrativa da Fase 03.

### Fase 06 — IMPLEMENTATION
- **Foco**: Desenvolvimento de código HTML5 semântico, CSS3 vanila responsivo e animações JS.
- **Dependência**: Requer o Design System (Fase 04) e a Copy (Fase 05) definidos.

### Fase 07 — VISUAL QA & REFINEMENT
- **Foco**: Execução local e inspeção em navegador real (Playwright/Chrome) nos viewports Desktop, Tablet e Mobile.
- **Dependência**: Requer a implementação inicial da Fase 06.

### Fase 08 — FINAL AUDIT & DELIVERY
- **Foco**: Auditoria medida contra os 7 Quality Gates formais, relatórios de aprovação e empacotamento para publicação.
- **Dependência**: Somente acionada após aprovação no Visual QA (Fase 07).

---

## 3. Regras de Checkpoint e Retorno (Refinement Loops)

1. **Regra de Não Pular Fases**: O Antigravity NUNCA deve pular uma fase para iniciar a implementação diretamente.
2. **Checkpoint de Aprovação Visual no Hero**: Na Fase 06, após implementar o Hero, o Antigravity deve obrigatoriamente abrir o navegador, inspecionar a composição do Hero e realizar os ajustes necessários antes de construir as demais seções da página.
3. **Regra de Retorno (Loop de Refinamento)**: Se durante a inspeção visual no navegador (Fase 07) for detectada falha de contraste, quebra de responsividade ou falta de impacto visual, o Antigravity deve **retornar à Fase 06 (Código) ou Fase 04 (Design System)** para corrigir a raiz do problema.

---

## 4. Próximos Passos (Procedimentos Detalhados)

Os procedimentos operacionais detalhados e específicos de cada uma das 8 fases (guias de execução, templates de entrada/saída e parâmetros de auditoria) serão desenvolvidos no **PROMPT 3**.

*KDL Methodology V2 — Visão Macro do Workflow e 8 Macrofases.*
