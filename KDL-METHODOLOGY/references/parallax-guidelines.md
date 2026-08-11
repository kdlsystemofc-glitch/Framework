# Diretrizes de Efeito Parallax (Parallax Guidelines)

> **"Parallax cria a ilusão de tridimensionalidade em uma tela plana. Use-o para dar peso, profundidade e elegância à navegação."**

---

## 1. Introdução

O efeito Parallax consiste em mover elementos em diferentes planos visuais a velocidades distintas conforme a página é rolada. Em Landing Pages, ele transforma imagens estáticas sem graça em janelas tridimensionais imersivas. O maior erro de IAs ao implementar Parallax é usar scripts de JavaScript pesados que causam travamentos na renderização (jank) e quebram a responsividade.

Esta diretriz estabelece as regras de implementação técnica para efeitos de Parallax de alto desempenho na KDL.

---

## 2. A Física do Parallax (Planos de Profundidade)

Para criar um Parallax realista, dividimos a tela em três planos virtuais:

1. **Plano de Fundo (Background):** Se move muito lentamente em relação ao scroll. Usado para texturas, ruído, gradientes de malha ou fotos abstratas ambientais. (Velocidade sugerida: `0.2x` do scroll real).
2. **Plano Médio (Midground):** Onde reside o conteúdo principal (textos, botões, bento grids). Este plano move-se a `1.0x` (velocidade padrão do scroll).
3. **Primeiro Plano (Foreground):** Elementos flutuantes, formas 3D abstratas ou recortes de produtos que se movem ligeiramente mais rápido que o scroll real. Dá a impressão de que o objeto está passando na frente do conteúdo e saltando da tela. (Velocidade sugerida: `1.3x` do scroll real).

---

## 3. Implementação Técnica de Alta Performance

Rejeitamos o cálculo de posicionamento absoluto por JavaScript na thread principal (`window.addEventListener('scroll')` alterando propriedades CSS diretamente).

### Método A: CSS Puro (Preferencial para Fundos Simples)
Usando propriedades de transformação 3D nativas do CSS. Este método é processado inteiramente na GPU e consome zero ciclos de CPU.
```css
.parallax-container {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.parallax-bg {
  transform: translateZ(-1px) scale(2);
}
.parallax-fg {
  transform: translateZ(0.5px) scale(0.5);
}
```

### Método B: GSAP com ScrollTrigger (Preferencial para Animações Complexas)
Para animações complexas baseadas em scrubbing. O GSAP usa interpolações otimizadas baseadas em transformações matriciais de GPU.
```javascript
gsap.to(".parallax-element", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    scrub: true
  }
});
```

---

## 4. Boas Práticas vs. Anti-Patterns (Más Práticas)

### Boas Práticas
* **Prevenir o Clipping (Corte das Bordas):** Quando um elemento se move em Parallax, ele pode sair de sua área visível. Sempre adicione margens internas extras (`padding`) ou aumente ligeiramente a escala do asset para compensar o deslocamento geométrico.
* **Fallback para Mobile:** Telas sensíveis ao toque possuem comportamentos de scroll inerciais diferentes. Sempre simplifique ou remova o Parallax em viewports móveis (`max-width: 768px`).

### Anti-Patterns
* ❌ **Parallax em Textos Longos:** Mover blocos de texto corrido em velocidades diferentes dificulta drasticamente a leitura e prejudica a usabilidade. Textos longos devem sempre se mover a `1.0x`.
* ❌ **Layout Shifts Críticos:** Falha ao dimensionar os elementos dinâmicos na carga inicial da página, fazendo o conteúdo saltar quando o script do Parallax inicializa.

---

## 5. Checklist de Efeitos Parallax

- [ ] Os elementos de texto longo movem-se rigorosamente em velocidade padrão (`1.0x`)?
- [ ] O código utiliza aceleração por GPU (via `transform3d` ou manipulação otimizada de GSAP)?
- [ ] O deslocamento geométrico dos elementos de fundo não expõe bordas vazias ou cortes secos?
- [ ] Existe uma regra de fallback desativando ou reduzindo a escala do Parallax em dispositivos mobile?
- [ ] O efeito respeita o comando `@media (prefers-reduced-motion: reduce)`?

---

## 6. Referências Cruzadas
* Consulte [references/motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md) para regras de curva de timing e aceleração.
* Consulte [references/performance.md](file:///c:/Framework/references/performance.md) para controle do orçamento de renderização de renderizadores móveis.
