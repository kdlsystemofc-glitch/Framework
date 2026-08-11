# Princípios Gerais de Design e Composição Visual (Design Principles)

> **"O design premium vive nos detalhes. Na escolha da fonte que ninguém percebe, na precisão da grade que todos sentem, e no controle do espaço que deixa a marca respirar. Criamos experiências dignas de Awwwards e Land-book."**

---

## 1. Introdução

Design Engineering de alto craft é a fusão de rigores matemáticos com sensibilidade artística. O **KDL Landing Framework** rejeita a criação de páginas amadoras e sem consistência visual. IAs de desenvolvimento costumam falhar ao criar designs porque aplicam estilos ad-hoc em cada componente, gerando desalinhamentos e paletas de cores desorganizadas.

Esta diretriz estabelece os princípios de tipografia, cor, composição assimétrica, grades geométricas, tratamento de logos e qualidade rígida de imagens que devem nortear toda landing page KDL.

---

## 2. Identidade Visual Própria por Cliente (Zero Clones)

Cada Landing Page desenvolvida sob este framework deve possuir sua própria personalidade e tom visual, alinhado perfeitamente com o segmento do comércio do cliente. É terminantemente proibido replicar exatamente a mesma direção artística de um projeto anterior.

### Mapeamento Estético por Segmento:
* **Gastronomia / Hamburguerias:** Cores quentes contrastando com fundos escuros (efeito brasa/fogo), tipografias display pesadas, arredondamento de bordas acentuado (friendly/organic), e imagens focadas em texturas (grelhados, molhos).
* **Médico / Clínicas de Luxo:** Tons sóbrios (bege editorial, verdes minerais ou azuis profundos), tipografias com serifa elegantes de grande contraste de escala, grids minimalistas com muito espaço negativo (silêncio visual).
* **Escritórios / Empresas:** Tons industriais, cinzas estruturados e pretos profundos, tipografia neo-grotesca condensada, layouts geométricos rígidos e composições Bento Grid de alta densidade técnica.

---

## 3. Rigor de Qualidade e Narrativa das Imagens

As imagens em uma landing page KDL não servem como meros preenchimentos de fundo. Elas fazem parte ativa do storytelling.

### A. Priorização Absoluta de Ativos Reais
* **Fotos Reais Primeiro:** É obrigatório utilizar prioritariamente fotos reais do estabelecimento, produtos, profissionais ou serviços do cliente.
* **Proibição de Clichês de Bancos de Imagens:** Se o cliente não possuir fotos reais, a IA executora deve buscar imagens abstratas, ilustrações 3D de alta qualidade ou renders conceituais, banindo fotos clássicas de modelos sorrindo em poses corporativas falsas.

### B. Protocolo de Melhoria Automática e Upscaling
* **Check de Resolução:** Toda imagem enviada pelo cliente deve passar por verificação de nitidez e ruído.
* **Sugestão de Upscale:** Se um ativo essencial (como o logotipo ou a foto do produto principal) possuir baixa resolução, a IA deve disparar um aviso obrigatório ao desenvolvedor recomendando o uso de ferramentas locais de super-resolução ou upscale via IA (com especificações de metas de no mínimo `2048px` na maior largura).

---

## 4. O Protagonismo da Logo e Elementos de Marca

A marca do cliente é a assinatura do projeto e deve possuir destaque intencional.

* **Branding Integrado:** A logo em formato `.svg` limpo deve ditar as proporções geométricas de alinhamento vertical da página. Se a logo possuir cantos retos e rígidos, os cards do Bento Grid e botões do site devem adotar `border-radius: 0px` ou cantos muito sutis (ex: `4px`), mantendo a coesão matemática.
* **Animação de Abertura:** A logo deve possuir prioridade de carregamento e receber uma transição de abertura fluida e elegante (ex: traçado progressivo ou revelação por máscara geométrica rápida).

---

## 5. Tipografia Estrutural e Expressiva

A tipografia é o elemento mais forte da identidade visual de uma página. Banimos o uso de fontes clichês de IA (Inter, Roboto, Arial, Helvetica).

### A Regra das Duas Fontes
* **1. Fonte Display (Expressiva):** Utilizada exclusivamente em cabeçalhos, títulos principais (`h1`, `h2`) e palavras-chaves de impacto. Deve expressar a personalidade da marca (ex: uma fonte geométrica ultra-negrita, uma serifa clássica refinada, ou uma monoespaçada industrial).
* **2. Fonte Body (Restrita):** Utilizada em parágrafos, botões, labels e informações técnicas. Deve ser extremamente limpa, legível e neutra.

---

## 6. Teoria das Cores e Variáveis Semânticas (Regra 60-30-10)

```css
:root {
  /* Fundo (60%) */
  --color-bg-primary: #0a0a0c;
  --color-bg-secondary: #121216;
  
  /* Contraste / Texto (30%) */
  --color-text-primary: #f3f4f6;
  --color-text-muted: #9ca3af;
  --color-border: #1e1e24;
  
  /* Acento / Conversão (10%) */
  --color-accent: #f59e0b;
  --color-accent-hover: #d97706;
}
```

---

## 7. Checklist de Princípios de Design

- [ ] A página adota uma direção artística própria e diferenciada para o nicho do cliente?
- [ ] Foram priorizadas imagens reais do cliente e sugeridos upscales para fotos de baixa qualidade?
- [ ] O logotipo está em formato vetorial SVG com nitidez matemática?
- [ ] Os botões e cantos de cards respeitam a geometria derivada do logotipo (cantos retos vs cantos arredondados)?
- [ ] A tipografia utiliza no máximo duas fontes, banindo os padrões Inter/Roboto?
- [ ] O layout apresenta composições assimétricas e amplo espaço negativo de respiro?

---

## 8. Referências Cruzadas
* Consulte [references/hero-guidelines.md](file:///c:/Framework/references/hero-guidelines.md) para regras de aplicação na primeira dobra.
* Consulte [references/cinematic-experience.md](file:///c:/Framework/references/cinematic-experience.md) para orquestração de ritmos de scroll.
* Consulte [checklists/design-gate.md](file:///c:/Framework/checklists/design-gate.md) para verificação visual final.
