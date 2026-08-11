# Modelo de Design System e Tokens (Design System Template)

> **Fase 02 do KDL Landing Framework**
> Este template define os tokens visuais, as cores estruturais e a escala de fontes para manter a consistência estética e evitar estilos ad-hoc.

---

## 1. Tipografia e Escala de Fontes

### Fontes Selecionadas
* **Fonte Display (Títulos):** [Nome da Fonte Display]
  * *Justificativa de Tom:* [Ex: Uma serifa elegante para evocar sofisticação editorial]
  * *Origem / CDN:* [Link Google Fonts / Typekit]
* **Fonte Body (Parágrafos / Botões):** [Nome da Fonte Body]
  * *Justificativa de Tom:* [Ex: Uma sans-serif geométrica para alta legibilidade técnica]
  * *Origem / CDN:* [Link Google Fonts / Typekit]

### Escala de Tamanhos (Variáveis CSS)
```css
:root {
  --font-display: '[Nome da Fonte]', sans-serif;
  --font-body: '[Nome da Fonte]', sans-serif;

  --text-hero: clamp(2.5rem, 6vw, 5.5rem);
  --text-h2: clamp(2rem, 4vw, 3.5rem);
  --text-h3: clamp(1.25rem, 2.5vw, 2rem);
  --text-body: clamp(0.95rem, 1.2vw, 1.15rem);
  --text-caption: clamp(0.75rem, 1vw, 0.9rem);
}
```

---

## 2. Paleta de Cores Semântica (Proporção 60-30-10)

```css
:root {
  /* Fundo (60%) */
  --color-bg-main: #0c0d10;
  --color-bg-card: #15171e;
  
  /* Texto e Elementos de Contraste (30%) */
  --color-text-main: #f3f4f6;
  --color-text-muted: #9ca3af;
  --color-border: #272a34;
  
  /* Destaque / Conversão (10%) */
  --color-accent: #f59e0b;
  --color-accent-hover: #d97706;
  --color-accent-text: #0c0d10;
}
```

---

## 3. Espaçamento e Relação Geométrica (Layout Grid)

```css
:root {
  --grid-gap: clamp(16px, 2vw, 32px);
  --section-padding-y: clamp(80px, 10vw, 160px);
  --border-radius-card: 16px;
  --border-radius-button: 8px;
}
```

---

## 4. Filosofia de Movimento (Easing e Transições)

```css
:root {
  --transition-speed-fast: 200ms;
  --transition-speed-slow: 600ms;
  
  /* Curvas de timing com inércia física natural */
  --ease-in-out-custom: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```
* **Diretriz de Animação de Scroll:** [Ex: Cards da grade Bento surgirão com delay (stagger) de 100ms em translateY(30px) a opacity: 0]
