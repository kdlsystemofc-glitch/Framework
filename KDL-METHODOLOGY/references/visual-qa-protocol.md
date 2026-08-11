# KDL METHODOLOGY V2 — PROTOCOLO OPERACIONAL DE VISUAL QA & REFINEMENT

> **REGRA ABSOLUTA**: A landing page **NUNCA** pode ser aprovada apenas olhando o código. A página renderizada em navegador real é a única fonte da verdade.

---

## 1. Viewports Mínimos de Inspeção

A inspeção visual via navegador real (Playwright/Chrome) deve ser executada obrigatoriamente nos seguintes 3 viewports:

- **Desktop**: `1440x900`
- **Tablet**: `768x1024`
- **Mobile**: `390x844`

*(Testar resoluções intermediárias de 375px e 1024px quando existirem dúvidas de layout).*

---

## 2. Política de Evidências em Screenshots

Durante o desenvolvimento, as capturas de tela devem ser armazenadas em `reports/visual-qa/`:

- **Nomeação de Iterações**: `hero-desktop-v1.png`, `hero-mobile-v1.png`, `full-desktop-v1.png`, `full-tablet-v1.png`, `full-mobile-v1.png`.
- **Política de Limpeza de Lixo**: Ao concluir o projeto, as capturas intermediárias de rascunho são removidas, mantendo-se estritamente o pacote de baselines finais aprovadas:
  - `full-desktop-final.png`
  - `full-tablet-final.png`
  - `full-mobile-final.png`

---

## 3. O Protocolo de Crítica Visual em 20 Pontos

Para cada renderização inspecionada, o Antigravity deve avaliar os seguintes **20 pontos**:

1. **First Impression**: O impacto estético em 3 segundos transmite autoridade e desejo?
2. **Brand Fit**: A atmosfera visual representa com fidelidade o posicionamento do cliente?
3. **Composition**: O equilíbrio visual e a distribuição de massas no grid estão harmoniosos?
4. **Visual Hierarchy**: O olho navega naturalmente do H1 para os pontos chave e CTAs?
5. **Typography**: A legibilidade, pares tipográficos, tamanhos e pesos estão impecáveis?
6. **Image Quality**: As fotografias e vetores estão em alta definição e bem otimizados?
7. **Cropping**: Os recortes de imagens (`object-fit`, `object-position`) preservam o produto/sujeito?
8. **Color**: A paleta HSL respeita a regra 60-30-10 com iluminação cênica coerente?
9. **Contrast**: O contraste HSL atinge a exigência mínima de 4.5:1 (WCAG 2.2 AA)?
10. **Whitespace**: O respiro vertical (min 8rem em desktop) evita fadiga visual?
11. **Density**: A densidade de informação é adequada à proposta comercial?
12. **Section Rhythm**: A alternância de layouts entre as seções cria fluidez de leitura?
13. **Continuity**: Existe transição suave e coerente entre o topo e o rodapé?
14. **CTA Prominence**: Os botões de ação se destacam inconfundivelmente na tela?
15. **Navigation**: O menu header e o scroll suave funcionam perfeitamente?
16. **Motion**: As animações (easing, tempo, revelação) são elegantes e sem travamentos?
17. **Interaction**: O feedback visual de `:hover`, `:focus` e clique é instantâneo?
18. **Originality**: A solução visual é única e livre de clichês de templates/IA?
19. **Mobile Composition**: A recomposição mobile possui crops e fontes projetados sob medida?
20. **Perceived Quality**: A sensação geral transmitida é de um produto digital de classe mundial?

---

## 4. Proibição de Crítica Genérica e Classificação por Severidade

### Proibição de Elogios Genéricos
É proibido relatar: *"Layout moderno"*, *"Visual bonito"*, *"Responsividade boa"*. Todos os problemas apontados devem ser **concretos e localizados**.
- **Exemplo Concreto**: *"Em 390px o título H1 quebra em 5 linhas e empurra o CTA principal para baixo da primeira dobra."*
- **Exemplo Concreto**: *"Em desktop a fotografia principal corta o produto ao meio devido ao object-position: center."*

### As 4 Categoria de Severidade

| Severidade | Descrição | Impacto na Aprovação |
| :--- | :--- | :--- |
| **`BLOCKER`** | Falha crítica de layout, quebra de renderização, texto ilegível, overflow horizontal ou erro JS. | **BLOQUEIA APROVAÇÃO** |
| **`MAJOR`** | Desalinhamento visual grave, botão sem destaque, corte ruim de imagem ou falta de contraste. | **BLOQUEIA APROVAÇÃO** |
| **`MINOR`** | Pequeno desajuste de espaçamento (ex: 8px de desvio) ou transição ligeiramente rápida. | Permitido corrigir na próxima iteração |
| **`POLISH`** | Refinamento estético opcional para aumentar o nível de sofisticação visual. | Opcional |

> **REGRA**: É estritamente proibido aprovar o Checkpoint G enquanto existir **qualquer problema de severidade `BLOCKER` ou `MAJOR`**.

---

## 5. Motion QA & Browser QA Técnico

### Motion QA
- Início e gatilho de animação (ScrollTrigger).
- Easing natural (ex: `cubic-bezier(0.16, 1, 0.3, 1)`).
- Suporte obrigatório a `@media (prefers-reduced-motion: reduce)`.
- Ausência total de layout shift (CLS = 0) durante a animação.

### Technical Browser QA
- Zero erros no console JavaScript.
- Zero requisições de rede com falha (404 / 500).
- Zero imagens quebradas ou links de âncora inválidos.
- Zero rolagem horizontal acidental (`overflow-x`).

*KDL Methodology V2 — Protocolo de Visual QA.*
