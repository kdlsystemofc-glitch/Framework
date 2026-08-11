# KDL METHODOLOGY V2 — GUIA DE IMPLEMENTAÇÃO DIRETA, ASSETS E MOTION

> **REGRA FUNDAMENTAL**: O Antigravity implementa DIRETAMENTE o projeto final dentro do diretório do cliente (`landing/`). Não são gerados artefatos intermediários ou schemas para outro motor interpretar.

---

## 1. Escolha Consciente da Stack de Tecnologia

A escolha da stack deve ser guiada estritamente pela necessidade do projeto:
- **HTML5 Semântico + CSS3 Vanila + JS (Padrão Recomendado)**: Ideal para a imensa maioria das landing pages de altíssima performance, com zero sobrecarga de frameworks e velocidade de carregamento imbatível.
- **Vite + React / Tailwind**: Permitido quando a landing page exigir interações complexas de estado, calculadoras dinâmicas ou integração com APIs em tempo real.
- **Proibição**: É proibido adicionar stacks pesadas ou frameworks complexos sem um benefício técnico ou comercial justificável.

---

## 2. Tratamento Consciente de Assets Reais

Os assets fotográficos e visuais reais do cliente localizados em `Assets/` devem ser tratados como matéria-prima nobre:

- **Preservação de Originais**: É estritamente **PROIBIDO alterar, sobrescrever ou deletar os arquivos originais** localizados na pasta `Assets/` do cliente.
- **Tratamento em Código/Build**:
  - Uso de propriedades CSS modernas (`object-fit: cover`, `object-position`, `aspect-ratio`).
  - Aplicação de máscaras de corte (máscaras SVG, `clip-path`), sobreposições de iluminação (`backdrop-filter`, gradientes de suporte HSL).
  - Otimização para formatos leves de alta performance (`WebP` / `SVG`).
  - Carregamento diferido (`loading="lazy"`) em imagens secundárias e pré-carregamento (`rel="preload"`) apenas na imagem mestre do Hero.

---

## 3. Seleção Consciente da Stack de Motion

O movimento deve ser selecionado de acordo com a necessidade conceitual:

1. **CSS Transitions / Keyframes (Padrão)**: Suficiente para hovers, fades sutis e mudanças de estado de componentes.
2. **GSAP + ScrollTrigger**: Utilizado quando o projeto exigir animações orquestradas complexas de rolagem, revelação de elementos em linha do tempo ou efeitos paralaque calibrados.
3. **Lenis Smooth Scroll**: Utilizado apenas quando a experiência cinematográfica de rolagem adicionar valor percebido real à marca.
4. **WebGL / Three.js / Shaders**: Permitido exclusivamente quando o conceito visual da marca exigir interação 3D real (ex: produto 3D interativo).
5. **Prefers-Reduced-Motion**: Todo o código de motion deve respeitar obrigatoriamente a media query `@media (prefers-reduced-motion: reduce)`, desativando animações para usuários que preferem movimento reduzido.

---

## 4. O Sistema de Implementação em Duas Etapas (Etapa A vs Etapa B)

Para evitar implementar páginas inteiras sem validação visual prévia, a Fase 06 obedece obrigatoriamente a duas etapas:

```
[ETAPA A — HERO FIRST]
Construir Foundation + Header + Hero
       │
       ▼
Executar Servidor Local de Preview
       │
       ▼
Abrir em Navegador Real (Playwright/Chrome)
       │
       ▼
Capturar Screenshots (Desktop 1440px & Mobile 390px)
       │
       ▼
Análise Visual & Correção de Código
       │
       ▼
[CHECKPOINT E — HERO VISUAL APPROVAL] ➔ SOMENTE APÓS APROVAÇÃO ➔ AVANÇAR
       │
       ▼
[ETAPA B — FULL PAGE]
Construir Demais Seções + Footer + Motion
       │
       ▼
[CHECKPOINT F — FULL PAGE VISUAL APPROVAL]
```

---

## 5. Proibição Absoluta de Placeholders e Vazamento de Caminhos

Na entrega final do projeto (`landing/`), fica terminantemente vetada a presença de:
- ❌ Textos de marcação temporária (`Lorem ipsum`, *"Texto temporário aqui"*, *"TODO visual"*).
- ❌ Links fictícios ou vazios (`#`, `javascript:void(0)`).
- ❌ Imagens de placeholder genéricas (`placeholder.com`, imagens cinzas).
- ❌ Dados fictícios apresentados como se fossem reais.
- ❌ Links quebrados (erros 404).
- ❌ Caminhos de disco local expostos no código (`C:\Users\...`, `file://...`).
- ❌ Marcas d'água ou referências internas à metodologia KDL no código do cliente.

*KDL Methodology V2 — Guia de Implementação e Assets.*
