# Diretrizes de Performance e Velocidade (Performance Guidelines)

> **"Cada 100ms de atraso no carregamento custa até 1% na taxa de conversão. Performance é design."**

---

## 1. Introdução

De nada adianta criar uma experiência visual espetacular e cinematográfica se a página demorar mais de 3 segundos para carregar no dispositivo móvel do usuário em uma rede 3G/4G lenta. O **KDL Landing Framework** trata a performance como prioridade absoluta, estabelecendo um orçamento de desempenho rígido.

Esta diretriz detalha as técnicas obrigatórias de otimização de ativos, CSS e renderização gráfica.

---

## 2. Orçamento de Core Web Vitals (Metas Rígidas)

Toda landing page KDL deve atingir as seguintes pontuações em testes móveis do Google PageSpeed Insights:

| Métrica | Nome Completo | Meta KDL (Mobile) | Ação de Engenharia |
| :--- | :--- | :--- | :--- |
| **LCP** | Largest Contentful Paint | **≤ 2.0s** | Carregamento imediato da imagem de Hero sem lazy load |
| **FID** | First Input Delay | **≤ 50ms** | Eliminação de bloqueios de scripts JS na thread principal |
| **CLS** | Cumulative Layout Shift | **0.0** | Definir dimensões fixas (`width`/`height`) em todas as imagens |
| **Lighthouse Score** | Pontuação Geral | **95+** | Minificação total, otimização de imagens e carregamento sob demanda |

---

## 3. Otimização Crítica de Ativos (Assets)

Imagens e fontes pesadas são os principais vilões de páginas lentas.

### A. Imagens Modernas e Dimensionamento
* **Formatos de Nova Geração:** É obrigatório converter todas as imagens para o formato WebP ou AVIF. Nunca use PNG ou JPEG puros no código de produção.
* **Responsive Images:** Use o elemento `<picture>` com diferentes resoluções de imagem para carregar arquivos menores em telas de celular.
  ```html
  <picture>
    <source srcset="assets/images/hero-mobile.webp" media="(max-width: 768px)">
    <img src="assets/images/hero-desktop.webp" alt="Descrição" width="1200" height="800">
  </picture>
  ```
* **Lazy Loading:** Insira o atributo `loading="lazy"` em todas as imagens da página que se localizam abaixo da primeira dobra (fora da seção Hero). A imagem da seção Hero **nunca** deve ter lazy load, para evitar atrasos na métrica LCP.

### B. Otimização de Fontes Web (Typography)
* **Preload de Fontes Críticas:** Insira tags de `preload` para carregar imediatamente os arquivos das fontes display e body que são utilizadas na primeira dobra da página.
  ```html
  <link rel="preload" href="assets/fonts/display-font.woff2" as="font" type="font/woff2" crossorigin>
  ```
* **Font-Display Swap:** Use `font-display: swap` no CSS `@font-face` para exibir uma fonte de fallback do sistema operacional enquanto a fonte customizada termina de carregar.

---

## 4. Otimização de Caminho de Renderização Crítica

* **CSS Crítico Embutido (Inline):** Para Landing Pages de página única, prefira embutir todo o CSS diretamente na tag `<style>` dentro do `<head>`. Isso economiza uma requisição HTTP de rede bloqueante de renderização.
* **JavaScript não bloqueante:** Scripts externos (como analytics, pixels de rastreamento ou bibliotecas de animação) devem sempre usar os atributos `defer` ou `async` para evitar travar a leitura do HTML da página.
  ```html
  <script src="https://www.google-analytics.com/analytics.js" async></script>
  ```

---

## 5. Boas Práticas vs. Anti-Patterns (Más Práticas)

### Boas Práticas
* **Minificação de Recursos:** Compactar arquivos HTML, CSS e JavaScript de produção eliminando comentários, espaços em branco e recuos de código.
* **Dimensões Fixas de Espaço:** Indique sempre os atributos `width` e `height` no HTML para que o navegador reserve o espaço geométrico da imagem antes de carregá-la, mantendo o CLS em zero.

### Anti-Patterns
* ❌ **Uso de Imagens Acima de 300KB:** Imagens não otimizadas salvas diretamente de câmeras fotográficas ou softwares de design. Nenhuma imagem da página deve ultrapassar 150KB.
* ❌ **Dependência Excessiva de Bibliotecas JS:** Importar frameworks inteiros ou pacotes pesados para realizar tarefas simples que o CSS moderno faz nativamente.

---

## 6. Checklist de Performance

- [ ] Todas as imagens abaixo da primeira dobra usam `loading="lazy"`?
- [ ] As imagens da seção Hero estão livres de lazy loading e possuem tag `preload` se apropriado?
- [ ] Todas as imagens estão em formato moderno (WebP ou AVIF) e abaixo de 150KB?
- [ ] Foi configurada a propriedade `font-display: swap` nas fontes personalizadas?
- [ ] Scripts de terceiros estão marcados com `defer` ou `async`?
- [ ] As tags `<img>` possuem atributos `width` e `height` explicitados para evitar Layout Shifts?

---

## 7. Referências Cruzadas
* Consulte [references/seo.md](file:///c:/Framework/references/seo.md) para correlacionar performance com ranking orgânico.
* Consulte [references/motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md) para otimizações de animações que consomem pouca CPU.
* Consulte [checklists/development-gate.md](file:///c:/Framework/checklists/development-gate.md) para inspeção final de código.
