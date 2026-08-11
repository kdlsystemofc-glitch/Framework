# KDL METHODOLOGY V2 — FILOSOFIA DE DESIGN E DIREÇÃO DE ARTE

> **PROPÓSITO**: Este documento estabelece os princípios visuais e as diretrizes de direção de arte para garantir landing pages com estética cinematográfica, originalidade absoluta e valor percebido inquestionável.

---

## 1. Princípio da Anti-Homogeneização Visual

A Metodologia KDL V2 rejeita categoricamente o "design de IA" e os "templates genéricos". 

Não existe uma estética pré-fabricada KDL. Uma landing page para uma hamburgueria artesanal de luxo deve parecer, respirar e comunicar de maneira completamente diferente de uma landing page para uma clínica odontológica de alta tecnologia ou um escritório de advocacia corporativo.

O design DEVE nascer das entranhas da marca do cliente, de seus assets reais e do seu público-alvo.

---

## 2. Pilares de Composição Visual

### 2.1 Atmosfera e Conceito Visual
Antes de qualquer decisão de layout, deve ser definido o conceito visual mestre (a "atmosfera" da página).
- **Abstrato vs Concreto**: Não descreva a atmosfera como "elegante". Descreva o conceito como *"Visual escuro e denso, inspirado na iluminação lateral de fotografia gastronômica, com fundos pretos levemente quentes (`#0C0A09`), acentos em dourado âmbar queimado (`#D97706`), tipografia com serifas expressivas e recortes de imagem sem bordas arredondadas para transmitir solidez artesanal"*.

### 2.2 Teoria de Cores e Regra 60-30-10
A paleta de cores deve utilizar o modelo **HSL (Hue, Saturation, Lightness)** com propósitos bem definidos:
- **Dominante (60%)**: A cor de fundo ou base visual da página. Define o tom emocional principal (e.g. escuro, limpo, quente, minimalista).
- **Secundária / Superfície (30%)**: Cores de estruturas, cartões, fundos alternados e divisores de seção. Cria profundidade e ritmo visual.
- **Acento / CTA (10%)**: A cor de maior contraste e vibração visual. Reservada estritamente para elementos de ação principal (botões de conversão, links primários, indicadores de urgência).

### 2.3 Tipografia Expressiva e Hierarquia
A escolha tipográfica deve combinar dois tipos de fonte que se complementam:
1. **Fonte Display (Títulos & Headlines)**: Fonte com forte personalidade visual (serifada expressiva, sans-serif geométrica encorpada ou display moderna) para capturar atenção imediata.
2. **Fonte de Corpo (Leitura & Detalhes)**: Fonte de alta legibilidade (sans-serif limpa e neutra) calibrada para leitura sem fadiga visual em qualquer tamanho de tela.
- **Escala Modular**: O tamanho dos títulos deve ter forte diferenciação em relação ao corpo do texto (e.g., proporção de escala 1.25 a 1.33).

### 2.4 Fotografia e Tratamento dos Assets Reais
Os assets fotográficos do cliente são os protagonistas da landing page:
- **Inspeção de Assets**: As imagens do cliente devem ser analisadas quanto à resolução, iluminação e enquadramento.
- **Tratamento & Crop**: Aplicação de filtros de cor consistentes (CSS `backdrop-filter`, máscaras SVG, crops verticais/horizontais intencionais) para integrar as fotos ao fundo da página de forma fluida.
- **Integração Visual**: Fotos não devem parecer "coladas em um card estático", mas sim integradas à composição através de sobreposição tipográfica, sombras suaves direcionadas ou máscaras personalizadas.

---

## 3. Estrutura, Ritmo e Espaçamento

### 3.1 Ritmo Visual e Alívio
Uma landing page excelente intercala momentos de alta densidade visual (informação, dados, produtos) com momentos de alívio visual (espaçamentos generosos, respiro tipográfico).
- **Proibição de Aglomeração**: Seções não devem ser "espremidas". O espaçamento vertical entre seções em Desktop deve respeitar no mínimo `8rem` a `12rem` (128px a 192px) para garantir elegância.

### 3.2 Bento Grids Assimétricos
Bento Grids não devem ser matrizes previsíveis de cartões idênticos.
- Use **assimetria intencional**: Um card gigante de destaque (ocupando 60% ou 2 colunas de largura) combinado com dois cards menores de suporte.
- Variação de conteúdo nos cards: Um card com imagem em destaque, outro com dado numérico gigante e outro com depoimento em texto curto.

---

## 4. Motion, Interação e Experiência Cinematográfica

Animações devem ser sentidas, não apenas vistas.
- **Propósito**: Toda animação deve conduzir o olho do leitor para o próximo ponto de interesse ou confirmar uma ação do usuário.
- **Entradas Fluídas**: Transições de entrada via scroll devem usar curvas de easing naturais (e.g. `power2.out` ou `cubic-bezier(0.16, 1, 0.3, 1)`) com durações entre 400ms e 800ms.
- **Scroll Suave**: A experiência de rolagem deve passar sensação de peso e fluidez (usando Lenis ou GSAP ScrollTrigger quando adequado ao nicho).

---

## 5. Mobile Composition (Composição Dedicada a Telas Pequenas)

O design para mobile é uma **recomposição consciente**:
- **Crops Específicos**: Fotografias na horizontal que funcionavam no desktop devem ser cortadas na vertical ou substituídas por variações orientadas a portrait no mobile.
- **Ajuste Tipográfico**: Títulos gigantes de desktop devem ser reduzidos proporcionalmente para não ocuparem a tela inteira sem espaço para o texto de suporte.
- **Barra de Ação Rápida**: CTAs principais em telas mobile podem ser fixados na parte inferior da tela (Sticky Bottom Bar) para facilitar a conversão com o polegar.

*KDL Methodology V2 — Filosofia de Design e Direção de Arte.*
