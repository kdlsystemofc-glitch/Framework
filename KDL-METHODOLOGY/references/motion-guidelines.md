# Diretrizes de Motion Design e Animação (Motion Guidelines)

> **"A animação na web não serve para decorar. Ela serve para guiar o olhar, contar uma história e tornar o intangível físico. Usamos GSAP, Lenis e física de movimento para criar interfaces fluidas de 60fps+."**

---

## 1. Introdução

Animações mal executadas causam lentidão, prejudicam a acessibilidade e tornam a experiência do usuário irritante. No **KDL Landing Framework**, a animação é tratada como um elemento estrutural de storytelling. Rejeitamos micro-animações frenéticas e repetitivas geradas de forma aleatória.

Esta diretriz define as regras para o uso de animações fluidas, com curvas de aceleração naturais, aceleração de GPU garantida e controle físico do scroll.

---

## 2. Orquestração e Tecnologias de Animação

Utilizamos bibliotecas de alto desempenho especializadas em engenharia de movimento:

### A. Lenis (Smooth Scroll)
Para garantir que as animações baseadas no scroll do usuário se desloquem sem atrito ou saltos visuais nos diferentes sistemas operacionais (especialmente Windows com mouse com clique mecânico), é obrigatório integrar o **Lenis** (ou um renderizador de scroll suave equivalente baseado em física).
* **Parâmetros Físicos Sugeridos:**
  ```javascript
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // physics ease-out
    smoothWheel: true,
    orientation: 'vertical'
  });
  ```

### B. GSAP & ScrollTrigger (Timelines Complexas)
Para transições de cenas e efeitos dinâmicos, utilizamos o **GSAP** (GreenSock Animation Platform) com seu plugin **ScrollTrigger**.
* **O Efeito de Entrada Sequencial (Stagger):**
  ```javascript
  gsap.from(".bento-card", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".bento-section",
      start: "top 80%"
    }
  });
  ```

---

## 3. Parâmetros de Tempo e Curvas (Easing)

Toda transição de movimento deve parecer natural e orgânica, simulando a inércia física do mundo real.

### Curvas de Velocidade (Easing)
* **Nunca use `linear` ou `ease-in-out` padrão para movimentos de entrada de elementos primários.**
* **Entrada de Elemento (Pop-in/Fade-in):** Use curvas desaceleradas (o elemento começa rápido e para suavemente).
  ```css
  transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000); /* Decel / ease-out */
  ```
* **Interação de Hover Inteligente (Feedback do Cursor):** Use curvas expressivas e rápidas.
  ```css
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); /* Custom ease-out */
  ```

### Duração do Movimento (Duration)
* **Micro-interações (hovers, pequenos cliques):** `150ms` a `300ms`.
* **Animações de entrada (seções inteiras, elementos que surgem):** `600ms` a `1000ms`.
* Animações mais lentas que `1000ms` devem ser restritas a transições de páginas inteiras ou revelações cinematográficas muito específicas.

---

## 4. Aceleração de Hardware e Performance

Animações de CSS que provocam o redesenho do layout (layout shifts/reflows) destroem o desempenho da página. 

### Propriedades Permitidas para Animação
A IA deve animar apenas propriedades que podem ser processadas diretamente na GPU (Graphics Processing Unit):
1. **`transform`:** (para translação, rotação e escala).
2. **`opacity`:** (para fades de entrada e saída).
3. **`filter`:** (para blur ou ajustes de saturação controlados).

### Propriedades Banidas de Animações
* ❌ **`width` / `height`:** Forçam o recálculo geométrico da página.
* ❌ **`top` / `bottom` / `left` / `right`:** Use `transform: translateY()` ou `translateX()`.
* ❌ **`margin` / `padding`:** Causam saltos visuais em elementos adjacentes.

---

## 5. Tipos de Animação do Framework

### A. Entrance Animations (Animações de Entrada)
Elementos primários devem surgir com fades combinados a pequenas translações no eixo Y (`translateY(30px) -> translateY(0)`) ou leves aumentos de escala (`scale(0.95) -> scale(1.0)`).

### B. Exit Animations (Animações de Saída)
Ao rolar a tela e afastar elementos de foco do centro, eles devem escurecer ligeiramente (`opacity: 0.3`) e sofrer desfoque progressivo (`filter: blur(4px)`), liberando o foco visual do usuário para a próxima seção.

### C. Hover Inteligente (Interactive Physics)
Os elementos clicáveis (botões, cards) devem reagir com suavidade física de atrito.
* **Magnetic Hover:** Elementos menores (como botões redondos ou ícones de redes sociais) devem "grudar" levemente no cursor do mouse quando este passar perto, deslocando-se em alguns pixels na direção do cursor (`gsap quickTo`).
* **Scale & Image Pan:** Em hovers de cards com imagens, o container se mantém estável com `overflow: hidden` e a imagem interna aumenta de escala (`scale(1.05)`) de forma desacelerada.

### D. Sticky Sections (Seções Fixadas)
Ao descer o scroll em áreas informativas complexas (como um passo-a-passo técnico), fixe o título ou a ilustração conceitual na tela (`position: sticky; top: 10%`) enquanto os blocos descritivos passam rolando na lateral oposta.

---

## 6. Boas Práticas vs. Anti-Patterns (Más Práticas)

### Boas Práticas
* **Respeito à Acessibilidade:** Respeitar a preferência de acessibilidade do sistema do usuário para redução de movimento (`prefers-reduced-motion`).
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-delay: 0s !important;
      animation-duration: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      scroll-behavior: auto !important;
    }
  }
  ```
* **Staggered Delays:** Aplicar pequenos atrasos incrementais (ex: `0.1s`, `0.2s`, `0.3s`) ao animar grades de elementos.

### Anti-Patterns
* ❌ **Animações em Loops Infinitos:** Cards que ficam tremendo ou brilhando eternamente sem interação do usuário.
* ❌ **Layout Shifts Críticos:** Animações que empurram os elementos vizinhos durante o carregamento da página.
* ❌ **Jankiness (Queda de Frames):** Usar scripts complexos de JavaScript manipulando o DOM diretamente na thread principal durante o scroll.

---

## 7. Checklist de Motion Design

- [ ] A página integra Lenis ou outro renderizador de scroll suave de alta performance?
- [ ] Todas as transições usam curvas de timing baseadas em inércia física (não-lineares)?
- [ ] Apenas as propriedades `transform`, `opacity` e `filter` estão sendo modificadas em animações de alto desempenho?
- [ ] O arquivo CSS inclui suporte à media query `@media (prefers-reduced-motion: reduce)`?
- [ ] Elementos interativos menores usam hover inteligente (magnetic hover) para maior deleite do usuário?
- [ ] As animações de scroll param de rodar quando o elemento está fora do viewport (evitando consumo de CPU residual)?

---

## 8. Referências Cruzadas
* Consulte [references/parallax-guidelines.md](file:///c:/Framework/references/parallax-guidelines.md) para técnicas de profundidade em scroll.
* Consulte [references/cinematic-experience.md](file:///c:/Framework/references/cinematic-experience.md) para orquestração narrativa do ritmo de tela.
* Consulte [references/performance.md](file:///c:/Framework/references/performance.md) para otimização de renderização e taxas de quadros por segundo.
