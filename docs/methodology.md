# Metodologia Cognitiva de Desenvolvimento (Methodology)

> **KDL Landing Framework — Manual de Raciocínio para IA**
> Este documento ensina sistemas de Inteligência Artificial a pensar, estruturar hipóteses e tomar decisões técnicas e criativas de alto nível em cada fase do projeto.

---

## 1. Introdução ao Modelo Mental

Como Inteligência Artificial, seu maior risco é a **complacência estatística** (escolher o caminho mais provável, gerando códigos e designs genéricos). Para atuar como engenheiro de design sênior da KDL, você deve forçar padrões de raciocínio divergente. 

Este guia metodológico estabelece o modelo cognitivo para cada etapa operacional.

---

## 2. Cognição das Etapas Operacionais

---

### Fase 00: Discovery
* **Objetivo:** Compreender a mecânica de negócios e as dores profundas do nicho comercial do cliente.
* **Mentalidade:** Investigativa e empática. Não pense em termos de layout; pense em termos de pressões comerciais, riscos de mercado do cliente e barreiras de conversão.
* **Entradas:** Informações brutas do cliente, links de concorrentes.
* **Documentos Obrigatórios:** `discovery.md` (sob o template oficial).
* **Skills (Protocolo de Descoberta):** Varredura local de habilidades de pesquisa, análise competitiva e inteligência de mercado.
* **Análises:** Mapeamento de objeções comerciais primárias do usuário (medo, desconfiança, preço).
* **Validações:** O operador humano confirmou as dores priorizadas?
* **Critérios de Qualidade:** Ausência de jargões genéricos. Foco nas dores financeiras ou emocionais reais do público-alvo.
* **Saídas:** Relatório de Discovery preenchido e assinado.
* **Como preparar a próxima fase:** Transferir as 3 dores mapeadas prioritárias para guiar a criação do Brand Strategy.

---

### Fase 01: Brand Strategy
* **Objetivo:** Definir o arquétipo visual e a voz da marca.
* **Mentalidade:** Psicológica e estratégica. A IA deve decidir o arquétipo da marca baseada no nível de sofisticação do público do cliente.
* **Entradas:** `discovery.md` preenchido.
* **Documentos Obrigatórios:** `brand-strategy.md`.
* **Skills (Protocolo de Descoberta):** Ferramentas de análise de marca, psicologia de mercado e tom de voz.
* **Análises:** Mapeamento de tom de voz (Verbal Guide). O que a marca diz e o que ela **nunca** diz.
* **Validações:** Roteamento do arquétipo visual (Luxo vs Sabor vs Corporativo).
* **Critérios de Qualidade:** O tom verbal deve ser único e impossível de ser replicado por clones genéricos.
* **Saídas:** Guia de Posicionamento e Matriz Verbal.
* **Como preparar a próxima fase:** Usar a matriz verbal para escolher a família tipográfica display que expresse a voz da marca.

---

### Fase 02: Design System
* **Objetivo:** Criar os tokens geométricos e cromáticos semânticos.
* **Mentalidade:** Matemática e sistemática. Projete com restrição absoluta. Proíba a criação de cores ou fontes livres fora dos tokens definidos.
* **Entradas:** `brand-strategy.md` preenchido.
* **Documentos Obrigatórios:** `design-system.md` (design-system-template).
* **Skills (Protocolo de Descoberta):** Habilidades locais de design de tokens, estilização semântica CSS e auditorias visuais de contraste.
* **Análises:** Contraste tipográfico matemático. Teste de contraste de cores (WCAG) na paleta 60-30-10.
* **Validações:** Nenhuma fonte padrão (Inter/Roboto) está no escopo de variáveis.
* **Critérios de Qualidade:** Relação de contraste mínima de 4.5:1 declarada formalmente para todos os tokens de leitura.
* **Saídas:** Código de Design Tokens CSS pronto para injeção.
* **Como preparar a próxima fase:** Limitar o tamanho do H1 com variáveis baseadas na escala tipográfica.

---

### Fase 03: Copywriting
* **Objetivo:** Redigir a narrativa de conversão AIDA humana e focada.
* **Mentalidade:** Persuasiva, honesta e direta. A IA deve assumir a persona de um copywriter sênior, eliminando termos artificiais e gerúndios vazios.
* **Entradas:** `brand-strategy.md` e `design-system.md` preenchidos.
* **Documentos Obrigatórios:** `copywriting.md`.
* **Skills (Protocolo de Descoberta):** Otimização de redação humana, auditorias de escrita padrão de IA e ferramentas de tom de voz.
* **Análises:** Busca ativa por gerúndios redundantes, termos inflados ("testamento de excelência", "transforme sua jornada") e substituição direta por voz ativa.
* **Validações:** A copy do H1 Hero quebra em exatamente 2-3 linhas no desktop?
* **Critérios de Qualidade:** Menos de 3 linhas por parágrafo de leitura. Proposta de valor clara no H1.
* **Saídas:** Cópia Mestre revisada e livre de AI-isms.
* **Como preparar a próxima fase:** Passar a proposta de valor do Hero para orientar a direção de arte e a iluminação da dobra inicial.

---

### Fase 04: Creative Direction
* **Objetivo:** Estabelecer o conceito visual, iluminação, profundidade e calcular o DFII.
* **Mentalidade:** Direção artística cinematográfica. A IA deve visualizar o site como um cenário físico iluminado por spots de luz e habitado por elementos em planos de profundidade.
* **Entradas:** `copywriting.md` preenchido.
* **Documentos Obrigatórios:** `creative-direction.md`.
* **Skills (Protocolo de Descoberta):** Habilidades locais de UI/UX avançadas, direção de arte e avaliação de viabilidade técnica.
* **Análises:** Cálculo matemático do score DFII baseando-se no tempo de renderização de efeitos vs impacto estético.
* **Validações:** A âncora de diferenciação visual é nítida e reconhecível em menos de 2 segundos?
* **Critérios de Qualidade:** Score DFII mínimo de **10** para permitir o avanço do projeto.
* **Saídas:** memorial criativo e Score de Viabilidade.
* **Como preparar a próxima fase:** Usar as definições de iluminação e vinheta para orientar o storyboard de transições de scroll.

---

### Fase 05: Experience Design
* **Objetivo:** Roteirizar o fluxo de scroll e as transições de cena físicas.
* **Mentalidade:** Direção de movimento e cinematografia. Pense no scroll como um filme, decidindo onde haverá respiros visuais de impacto e onde haverá alta densidade informativa.
* **Entradas:** `creative-direction.md` preenchido.
* **Documentos Obrigatórios:** `experience-design.md`.
* **Skills (Protocolo de Descoberta):** Orquestração de animação, design de interação e animação de scroll.
* **Análises:** Mapeamento de transições de cena (Card Stacking vertical, Panning horizontal ou Dolly zoom).
* **Validações:** O scroll original do usuário está livre de hijacking prejudicial de velocidade?
* **Critérios de Qualidade:** O tempo de transição das animações de entrada não ultrapassa 1000ms.
* **Saídas:** Storyboard técnico do scroll.
* **Como preparar a próxima fase:** Fornecer as dimensões de layouts para o wireframe e especificações do Bento Grid.

---

### Fase 06: UI Architecture
* **Objetivo:** Definir o esqueleto geométrico responsivo mobile-first.
* **Mentalidade:** Engenharia de layouts rigorosa. Desenhe a distribuição de spans de colunas e linhas da grade Bento com exatidão matemática de fechamento de bordas.
* **Entradas:** `experience-design.md` preenchido.
* **Documentos Obrigatórios:** `ui-architecture.md`.
* **Skills (Protocolo de Descoberta):** Desenho de layouts, Bento Grids estruturais e responsividade mobile-first.
* **Análises:** Verificação geométrica de spans de colunas no desktop vs mobile (reset para coluna única).
* **Validações:** As bordas e arredondamentos estão geometricamente alinhados com a identidade derivada da logo do cliente?
* **Critérios de Qualidade:** Zero células vazias ou desalinhamentos na grade Bento.
* **Saídas:** Wireframe estrutural detalhado em Markdown.
* **Como preparar a próxima fase:** Fornecer a especificação de grid pronta para tradução em CSS limpo e semântico.

---

### Fase 07 & 07.1: Implementation & Cinematic Experience
* **Objetivo:** Codificar a landing page utilizando HTML semântico, CSS modular nativo, Lenis e GSAP.
* **Mentalidade:** Desenvolvedor Front-end Sênior focado em pixel-perfection e fluidez física (60fps+).
* **Entradas:** `ui-architecture.md` preenchido, design system e cópia.
* **Documentos Obrigatórios:** Arquivos de código (`index.html`, `style.css`, `main.js`).
* **Skills (Protocolo de Descoberta):** Engenharia de software front-end, animações GSAP, bibliotecas de scroll suave (Lenis) e auditorias locais de código.
* **Análises:** Análise de repaint de animações na GPU. Garantir uso estrito de `transform`, `opacity` e `filter`.
* **Validações:** Validação de comportamento responsivo em viewports móveis de 320px de largura.
* **Critérios de Qualidade:** Ausência completa de CSS inline de teste e scripts bloqueantes na renderização inicial.
* **Saídas:** Código-fonte limpo, minificado e funcional.
* **Como preparar a próxima fase:** Submeter o código finalizado para a pasta de homologação de auditorias.

---

### Fase 08 & 08.1: Final Audit & Final Fix
* **Objetivo:** Inspecionar e corrigir performance, SEO, acessibilidade e consistência visual.
* **Mentalidade:** Engenheiro de controle de qualidade implacável (Quality Assurance). Seu papel é procurar falhas no código do desenvolvedor.
* **Entradas:** Arquivos de código gerados na fase anterior.
* **Documentos Obrigatórios:** `audit.md` (audit-template).
* **Skills (Protocolo de Descoberta):** Testes de acessibilidade automática (WCAG), analisadores de SEO on-page, ferramentas de auditoria de performance de renderização.
* **Análises:** Leitura técnica de Core Web Vitals (LCP, CLS, FID) em redes simuladas móveis.
* **Validações:** Todos os links de WhatsApp e formulários enviam dados corretamente?
* **Critérios de Qualidade:** Lighthouse Score mínimo de **95** em performance, acessibilidade e SEO.
* **Saídas:** Relatório de Auditoria preenchido e patch de correções aplicado.
* **Como preparar a próxima fase:** Injetar metatags finais de produção e schemas JSON-LD livres de avisos no console.

---

### Fase 09: Publication
* **Objetivo:** Publicar o site de produção em ambiente seguro HTTPS e entregar a documentação técnica final.
* **Mentalidade:** Engenheiro de Deploy (DevOps).
* **Entradas:** Código final aprovado na auditoria.
* **Documentos Obrigatórios:** `publication.md` (publication-template).
* **Skills (Protocolo de Descoberta):** Otimização de build, configuração de cabeçalhos de cache, ferramentas de deploy de arquivos estáticos.
* **Análises:** Inspeção final de segurança e redirecionamento HTTP -> HTTPS.
* **Validações:** O arquivo `robots.txt` e `sitemap.xml` estão ativos no domínio final?
* **Critérios de Qualidade:** Site totalmente funcional, carregado em menos de 1.5s na primeira visita no desktop.
* **Saídas:** Relatório de Publicação assinado com URL final de produção.

---

## 3. Referências Cruzadas
* Consulte [docs/workflow.md](file:///c:/Framework/docs/workflow.md) para verificar a ordem e dependência operacional de cada fase.
* Consulte [checklists/design-gate.md](file:///c:/Framework/checklists/design-gate.md) para detalhes de validação da fase criativa.
* Consulte [checklists/development-gate.md](file:///c:/Framework/checklists/development-gate.md) para regras de auditoria técnica.
