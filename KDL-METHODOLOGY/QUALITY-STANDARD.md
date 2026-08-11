# KDL METHODOLOGY V2 — FILOSOFIA E PADRÕES DE QUALIDADE MEDIDA

> **DECLARAÇÃO FUNDAMENTAL DE QUALIDADE**:
> - `BUILD PASS != QUALITY PASS`
> - `LIGHTHOUSE PASS != DESIGN PASS`
> - `TEST PASS != VISUAL PASS`
> 
> A aprovação técnica e automatizada de um código é apenas o pré-requisito mínimo para testes. A qualidade real de um projeto KDL V2 exige **apelo visual de alto impacto, fidelidade à marca do cliente, copy persuasiva e experiência fluida no navegador real**.

---

## 1. As Quatro Dimensões da Qualidade Integrada

A qualidade final de uma landing page sob a Metodologia KDL V2 é avaliada obrigatoriamente através de 4 dimensões complementares:

```
                  ┌─────────────────────────────────────────┐
                  │        QUALIDADE INTEGRADA KDL          │
                  └────────────────────┬────────────────────┘
                                       │
         ┌──────────────────┬──────────┴──────────┬──────────────────┐
         ▼                  ▼                     ▼                  ▼
┌─────────────────┐ ┌───────────────┐ ┌───────────────────┐ ┌──────────────────┐
│   DIMENSÃO 1    │ │  DIMENSÃO 2   │ │    DIMENSÃO 3     │ │    DIMENSÃO 4    │
│ Impacto Visual  │ │ Engenharia de │ │ Excelência Técnica│ │   Fidelidade &   │
│   & Atração     │ │   Conversão   │ │  & Performance    │ │   Factualidade   │
└─────────────────┘ └───────────────┘ └───────────────────┘ └──────────────────┘
```

### Dimensão 1 — Impacto Visual & Atração Estética
- **Conceito & Atmosfera**: A página possui um conceito visual forte, adequado ao público e alinhado ao posicionamento do cliente?
- **Composição & Hierarquia**: O olhar do leitor é conduzido com clareza através de tamanho, contraste, cor e espaçamento?
- **Tratamento de Assets**: As imagens e logos do cliente foram integradas com elegância, recortes intencionais e acabamento profissional?
- **Originalidade (Zero Template)**: A landing possui personalidade própria sem parecer um modelo genérico de IA ou um template pré-fabricado?

### Dimensão 2 — Engenharia de Conversão & Copywriting
- **Clareza da Proposta de Valor**: O leitor entende em menos de 5 segundos o que o cliente oferece e qual o diferencial?
- **Copy Humanizada**: A linguagem é direta, persuasiva, focada na dor/desejo do público e livre de clichês de IA?
- **Fluxo Narrativo AIDA**: A página conduz o leitor pelas fases de Atenção, Interesse, Desejo e Ação?
- **CTAs Estratégicos**: As chamadas para ação possuem alto contraste, mensagem direta e posicionamento intuitivo?

### Dimensão 3 — Excelência Técnica, Performance & Acessibilidade
- **Performance Medida**: Lighthouse Performance >= 90 em testes reais (FCP < 1.5s, LCP < 2.5s, CLS < 0.1).
- **SEO Semântico**: Estrutura HTML5 impecável (uma única tag H1, hierarquia H2/H3 correta, Meta tags completas, OpenGraph, Schema.org).
- **Acessibilidade WCAG 2.2 AA**: Contraste mínimo de texto 4.5:1, suporte a navegação por teclado e atributos ARIA adequados.
- **Responsividade Real**: Composição perfeita em Desktop, Tablet e Mobile sem overflow ou quebras.

### Dimensão 4 — Fidelidade Factual & Ética
- **Zero Invenções**: Nenhuma informação, dado estático, depoimento ou benefício foi inventado.
- **Conformidade com o Briefing**: Todos os alinhamentos comerciais e de produto respeitam estritamente as diretrizes fornecidas pelo cliente.

---

## 2. O Processo de Avaliação Conjunta

Uma landing page é considerada **REPROVADA** se falhar em qualquer uma das 4 dimensões.

### Exemplos de Reprovação Obrigatória:
- ❌ **Código perfeito com Lighthouse 100/100, mas visual genérico e feio** ➔ **REPROVADO** (Falhou na Dimensão 1).
- ❌ **Design lindo e sofisticado, mas com copy cheia de clichês de IA ou dados inventados** ➔ **REPROVADO** (Falhou nas Dimensões 2 e 4).
- ❌ **Página excelente no Desktop, mas com layout empilhado e quebrado no Mobile** ➔ **REPROVADO** (Falhou na Dimensão 3).

---

## 3. Filosofia do Refinamento no Navegador Real (Browser QA)

A inspeção visual conduzida pelo Antigravity em navegador real (Playwright/Chrome) é o momento supremo de validação de qualidade:
1. **Inspeção Estática**: Avaliação de enquadramento, margens, legibilidade e harmonia de cores.
2. **Inspeção Dinâmica**: Teste de rolagem de página, resposta de hover em botões, transições de aba e animações de scroll.
3. **Inspeção Multi-Dispositivo**: Mudança de viewport entre 1920px (Desktop), 768px (Tablet) e 375px (Mobile).

Qualquer desvio observado no navegador deve ser **imediatamente corrigido no código** antes de avançar para a próxima fase.

*KDL Methodology V2 — Filosofia de Qualidade Medida.*
