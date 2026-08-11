# KDL METHODOLOGY V2 — DIRETRIAZES DE DESIGN SYSTEM E ARQUITETURA UX

> **REGRA FUNDAMENTAL**: O Design System não é decoração documental. Ele nasce estritamente da Direção Criativa (Fase 03) e todo token definido **DEVE chegar diretamente ao código CSS/HTML** do projeto.

---

## 1. Justificativa Tipográfica Obrigatória

É estritamente proibido selecionar fontes populares (ex: *Inter*, *Plus Jakarta Sans*, *Poppins*, *Manrope*, *Syne*) de forma automática "porque todo mundo usa".
- **Requisito**: O uso de qualquer família tipográfica exige justificativa explícita no relatório da Fase 04, demonstrando como ela traduz a essência da marca do cliente.
- **Estrutura Tipográfica**:
  - **Fonte Display / Headline**: Escolhida para transmitir a personalidade e atmosfera da marca (serifada expressiva, sans-serif geométrica encorpada ou display customizada).
  - **Fonte de Corpo / Leitura**: Escolhida por legibilidade impecável sem fadiga visual.
  - **Escala Modular**: Definição de proporção (1.25 a 1.33) garantindo contraste forte de escala entre H1 (3rem - 4.5rem), H2 (2.25rem - 3rem), H3 (1.5rem - 2rem) e Corpo (1rem - 1.125rem).

---

## 2. Cores HSL e Regra 60-30-10

A gestão de cor utiliza obrigatoriamente o modelo HSL com a **Regra 60-30-10**:
- **Dominante (60%)**: `hsl(var(--color-dominant))` — Cor de fundo base.
- **Secundária / Superfície (30%)**: `hsl(var(--color-secondary))` — Cartões, divisores e estruturas.
- **Acento / CTA (10%)**: `hsl(var(--color-accent))` — Reservada estritamente para elementos de ação e conversão de altíssimo contraste.
- **Contraste WCAG 2.2 AA**: A razão de contraste entre a cor de fundo e o texto sobreposto deve ser no mínimo **4.5:1** para texto normal e **3:1** para títulos gigantes.

---

## 3. Sistema de Espaçamento, Grids e Densidade Visual

- **Containers e Breakpoints**:
  - Max Width Desktop: `1280px` ou `1440px` (conforme a Direção Criativa).
  - Breakpoints: Desktop (`1024px+`), Tablet (`768px - 1023px`), Mobile (`375px - 767px`).
- **Espaçamento Vertical (Section Rhythm)**:
  - Seções em Desktop devem manter respiro de no mínimo `8rem` a `12rem` (128px a 192px).
  - Seções em Mobile devem ajustar o respiro para `4rem` a `6rem` (64px a 96px).
- **Densidade Visual**: Definida conforme a atmosfera (espaçoso e elegante vs denso e informativo).

---

## 4. Componentes com Propósito UX (Anti-Componentização Desnecessária)

É proibido criar componentes ou cartões "porque todo site possui".
- **Regra**: Cada componente (bento card, botão, campo de formulário, lista, filtro) só deve ser codificado se houver uma função UX clara para a jornada do usuário.
- **Estados Obrigatórios**: Todo elemento interativo deve ter seus estados `:hover`, `:focus-visible`, `:active` e `:disabled` especificados em CSS.

---

## 5. Recomposição Responsiva para Mobile

A experiência mobile não é apenas "desktop empilhado":
- **Grid Adaptativo**: Grids de 3 ou 4 colunas em desktop se recomprõem em 1 coluna ou sliders/scrolls horizontais intencionais no mobile.
- **Typography Scaling**: Títulos gigantes H1 usam unidades dinâmicas (`clamp(2.2rem, 6vw, 4.5rem)`) para garantir que não estourem em telas de 375px.

*KDL Methodology V2 — Padrões de Design System e UX.*
