# Diretrizes de Acessibilidade e Inclusão (Accessibility Guidelines)

> **"A web deve ser acessível a todos. Um design premium que exclui pessoas com deficiência não é de alta qualidade; é incompleto."**

---

## 1. Introdução

Projetar uma experiência cinematográfica e com forte impacto de movimento não pode comprometer a usabilidade da página para pessoas cegas, com baixa visão, restrições motoras ou cognitivas. O **KDL Landing Framework** exige conformidade estrita com o padrão internacional **WCAG 2.2 nível AA**.

Esta diretriz estabelece os requisitos técnicos e conceituais de acessibilidade para as interfaces KDL.

---

## 2. Estrutura de Navegação e Foco do Teclado

Muitos usuários com restrições motoras não utilizam o mouse, navegando pelas páginas exclusivamente pela tecla `Tab` do teclado.

### A. Indicador de Foco (Outline)
* **Nunca oculte o outline de foco:** Ocultar a borda de foco (`outline: none` ou `outline: 0`) sem fornecer uma estilização alternativa visível é proibido.
* **Estilização Premium do Foco:** Crie uma borda de foco personalizada, de alto contraste e elegante, que se destaca quando o usuário navega por botões e links.
  ```css
  *:focus-visible {
    outline: 3px solid var(--color-accent);
    outline-offset: 4px;
    border-radius: 4px;
  }
  ```

### B. Ordem Lógica do Foco
A sequência em que o leitor de tela ou a navegação por teclado passa pelos elementos deve seguir exatamente a estrutura lógica visual da esquerda para a direita e de cima para baixo. Evite o uso de propriedades CSS como `order` no Flexbox/Grid que bagunçam a ordem visual em relação ao HTML original.

---

## 3. Contraste de Cores e Hierarquia Textual

### A. Relação de Contraste Mínima
* **Texto Normal (abaixo de 18pt/24px):** Deve possuir uma relação de contraste de cor com o fundo de no mínimo **4.5:1**.
* **Texto Grande (18pt/24px ou mais):** Deve possuir uma relação de contraste de cor com o fundo de no mínimo **3:1**.
* **Elementos Gráficos Críticos (Ícones e Bordas de Input):** Contraste mínimo de **3:1** contra o fundo.

### B. Descrição e Rótulos (Aria-Attributes)
* **Atributo `aria-label` para Botões sem Texto:** Botões que contêm apenas ícones (ex: botão de fechar, setas de carrossel, menu hambúrguer) devem obrigatoriamente possuir um `aria-label` descrevendo a ação.
  ```html
  <button aria-label="Abrir menu de navegação" class="menu-btn">
    <svg>...</svg>
  </button>
  ```
* **Relações de Formulário:** Todo elemento de entrada de dados (`<input>`, `<select>`) deve possuir uma tag `<label>` associada através do atributo `for`.

---

## 4. Controle de Elementos em Movimento

Elementos dinâmicos em scroll ou loops infinitos podem causar tontura, náusea e desconforto para pessoas com distúrbios vestibulares.

* **Redução de Movimento:** É obrigatório aplicar fallbacks do CSS que desligam transições e animações quando o usuário ativa o modo de movimentos reduzidos no sistema operacional (`prefers-reduced-motion: reduce`).
* **Controles para Mídias:** Caso a landing page contenha um vídeo de fundo em loop automático na seção Hero, forneça um botão visível e acessível de pausar/reproduzir.
  ```html
  <button aria-label="Pausar vídeo de fundo" onclick="toggleHeroVideo()">Pausar</button>
  ```

---

## 5. Boas Práticas vs. Anti-Patterns (Más Práticas)

### Boas Práticas
* **Uso correto do atributo `alt`:** Imagens meramente decorativas (formas geométricas abstratas, sombras) devem conter `alt=""` para serem ignoradas pelos leitores de tela. Imagens informativas devem conter a descrição clara.
* **Tamanho de Toque Apropriado (Touch Targets):** Garantir que elementos clicáveis em dispositivos móveis tenham uma área mínima de toque de **48x48 pixels** para evitar cliques errados.

### Anti-Patterns
* ❌ **Textos em Imagens:** Colocar textos informativos importantes diretamente rasterizados dentro de imagens de fundo, impossibilitando a leitura por robôs e softwares de leitura.
* ❌ **Uso exclusivo de cor para passar informação:** Indicar erros em campos de formulário colorindo a borda apenas de vermelho. Sempre combine cor com um texto explicativo e um ícone de aviso.

---

## 6. Checklist de Acessibilidade

- [ ] Todos os elementos clicáveis têm tamanho superior a 48x48px no mobile?
- [ ] O contraste tipográfico respeita a relação de 4.5:1 para texto normal?
- [ ] A navegação por teclado (tecla Tab) passa por todos os elementos interativos em ordem lógica?
- [ ] Todos os botões que contêm apenas ícones possuem atributo `aria-label` descritivo?
- [ ] Existe regra CSS desativando animações pesadas sob `@media (prefers-reduced-motion: reduce)`?
- [ ] As tags de formulário estão corretamente ligadas a `<label>` explicativas?

---

## 7. Referências Cruzadas
* Consulte [references/motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md) para detalhes sobre a integração da media query de movimento reduzido.
* Consulte [references/seo.md](file:///c:/Framework/references/seo.md) para correlacionar semântica de HTML com acessibilidade técnica.
* Consulte [checklists/quality-gate.md](file:///c:/Framework/checklists/quality-gate.md) para verificação prática das diretrizes AA.
