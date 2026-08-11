# Portão de Validação de Código (Development Gate)

> **Verificação Obrigatória ao Final da Fase 07 (Implementation)**
> Nenhuma linha de código é enviada para produção sem atender aos requisitos técnicos de arquitetura e qualidade KDL.

---

## 1. Estrutura e Limpeza do Código
- [ ] **Sem Código Morto:** Foram removidas todas as classes CSS órfãs, estilos inline de teste e funções JavaScript que não estão sendo chamadas?
- [ ] **Organização Modular:** O arquivo de estilos CSS está organizado de forma lógica, agrupando variáveis, estilos de layout e estilos específicos de seção?
- [ ] **HTML Semântico:** O HTML utiliza tags estruturais semânticas corretas (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)?
- [ ] **Evitar Div-Soup:** Não há empilhamento excessivo de tags `<div>` vazias ou sem propósito estrutural?

---

## 2. Padrões de CSS e Styling
- [ ] **Variáveis Semânticas:** Todas as cores, tamanhos de fontes e espaçamentos são referenciados exclusivamente através das variáveis CSS definidas no Design System?
- [ ] **Responsividade Mobile-First:** O layout se adapta perfeitamente a dispositivos móveis a partir de regras de grid/flexbox e tamanhos tipográficos dinâmicos (`clamp()`)?
- [ ] **Overflow Control:** O container principal do site possui controle contra barras de rolagem horizontais indesejadas (`overflow-x: hidden`)?

---

## 3. Implementação de Movimento e Animações
- [ ] **Propriedades Aceleradas por GPU:** Todas as animações do CSS/GSAP modificam estritamente as propriedades `transform` (translates, scales, rotates), `opacity` e `filter`?
- [ ] **Sem Reflows:** Nenhuma animação ou transição utiliza propriedades como `width`, `height`, `margin` ou `top` que forçam o redesenho geométrico da tela?
- [ ] **Acessibilidade vestibular:** O código CSS respeita a media query `@media (prefers-reduced-motion: reduce)` desativando transições bruscas?
- [ ] **Loops Controlados:** Não existem animações em loop infinito que fiquem consumindo processamento (CPU/GPU) em segundo plano quando fora do viewport do usuário?

---

## 4. Otimização Crítica de Ativos (Assets)
- [ ] **Formatos Modernos:** Todas as imagens da página estão no formato WebP ou AVIF?
- [ ] **Tamanho dos Ativos:** Nenhuma imagem do site ultrapassa o tamanho limite de 150KB?
- [ ] **Dimensões do CLS:** Todas as tags `<img>` possuem atributos explicitados de `width` e `height`?
- [ ] **Preload de Fontes:** As fontes críticas do Hero possuem links de `preload` declarados no topo do HTML?

---

### Assinatura de Aprovação da Fase:
* "Certifico que o código-fonte gerado atende a todos os requisitos de limpeza, semântica e performance KDL."
* **Status:** [ ] Aprovado | [ ] Reprovado (Necessita refatoração)
* **Responsável (IA executora):** [Assinatura do Agente]
* **Data da Validação:** [Data]
