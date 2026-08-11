# KDL METHODOLOGY V2 — WORKFLOW OPERACIONAL OFICIAL DA METODOLOGIA

> **MANUAL DE OPERAÇÃO DO ANTIGRAVITY**: Este documento contém o procedimento operacional completo para execução direta do Antigravity em qualquer projeto de cliente sob a KDL Methodology V2.

---

## Estrutura dos 8 Checkpoints Formais

O avanço no projeto é condicionado à aprovação nos **8 Checkpoints Formais**:

```
[CHECKPOINT A] ──► [CHECKPOINT B] ──► [CHECKPOINT C] ──► [CHECKPOINT D]
 Client Intelligence  Research Complete   Creative Direction  Design/Copy Ready
        │
        ▼
[CHECKPOINT E] ──► [CHECKPOINT F] ──► [CHECKPOINT G] ──► [CHECKPOINT H]
 Hero Visual Appr.    Full Page Visual     Responsive Appr.    Final Delivery
```

---

## FASE 01 — CLIENT INTELLIGENCE

### 1. Objetivo
Imersão total nos materiais reais do cliente para mapear factualidade, assets, proposta de valor, público-alvo (ICP) e limitações do projeto.

### 2. Entradas Obrigatórias
- Diretório oficial do cliente (`Clientes/<NomeDoCliente>/`).
- Arquivo de briefing ([`briefing/briefing.md`](file:///C:/kdl/Clientes/Lanchão%20da%20Vila/briefing/briefing.md) ou equivalente).
- Pasta de assets visuais (`Assets/` contendo logos, fotografias, vídeos, cardápios).
- Documentações e referências institucionais fornecidas pelo cliente.

### 3. Ações Obrigatórias
- Localizar e ler o briefing integralmente.
- **Inspecionar Visualmente** cada imagem e logo na pasta `Assets/` (analisar resolução, iluminação, enquadramento, formato, canal alfa/transparência).
- Classificar todas as informações coletadas na Matriz de Factualidade:
  - **`CONFIRMED`**: Informação explicitamente declarada no briefing ou confirmada pelo cliente.
  - **`DERIVED`**: Conclusão lógica derivada de fatos confirmados (exige justificativa explícita no relatório).
  - **`UNKNOWN`**: Informação ausente no briefing (estritamente PROIBIDO inventar).
- Mapear objetivo comercial principal, oferta, diferenciais, objeções do público e canais de conversão (WhatsApp, formulário, checkout).

### 4. Decisões a Serem Tomadas
- Quais assets do cliente possuem qualidade suficiente para Hero, backgrounds, cards ou galerias?
- Quais informações essenciais estão em status `UNKNOWN` e precisam de confirmação?
- Qual o foco comercial primário da landing page?

### 5. Ferramentas Utilizáveis
- Leitor de imagens/assets visuais, leitor de arquivos Markdown, scanner de diretórios.

### 6. Evidências Necessárias
- Relatório de imersão e auditoria visual de assets salvo em `01-discovery/discovery.md`.

### 7. Entregáveis Úteis
- Matriz de Factualidade (`CONFIRMED` / `DERIVED` / `UNKNOWN`).
- Inventário visual classificado de assets.

### 8. Critérios de Aprovação
- Briefing lido 100%. Todos os assets inspecionados visualmente. Fatos classificados sem invenções.

### 9. Critérios de Reprovação
- Inventar dados, métricas, anos de mercado ou depoimentos ausentes no briefing. Ignorar inspeção visual das fotos.

### 10. Checkpoint
- **`CHECKPOINT A — Client Understanding`**

### 11. Condições para Avançar
- Aprovação no Checkpoint A com factualidade 100% verificada.

### 12. Condições que Obrigam Retorno
- Descoberta de incongruências graves no briefing durante fases posteriores exige reanálise da Fase 01.

---

## FASE 02 — RESEARCH & INSPIRATION

### 1. Objetivo
Mapear a linguagem visual do segmento, analisar concorrentes reais, identificar padrões visuais saturados (para evitar) e extrair princípios de composição de referências de alto nível.

### 2. Entradas Obrigatórias
- Relatório aprovado da Fase 01 (`01-discovery/discovery.md`).
- Segmento/nicho do cliente e dados da concorrência.

### 3. Ações Obrigatórias
- Pesquisar referências de alto nível relevantes para o nicho (quando houver acesso a recursos/web).
- Aplicar a fórmula de desconstrução visual em cada referência útil:
  - **`REFERÊNCIA`** ➔ **`DECOMPOSIÇÃO`** ➔ **`PRINCÍPIO`** ➔ **`REINTERPRETAÇÃO`**
- Registrar para cada referência: o que funciona, por que funciona, princípio extraído, **o que NÃO copiar** e como aplicar ao cliente.
- Mapear padrões visuais saturados do mercado para garantir que a landing page não pareça mais do mesmo.
- **NÃO escolher a direção criativa final nesta fase**.

### 4. Decisões a Serem Tomadas
- Quais princípios de composição, ritmo e contraste serão adaptados?
- Quais clichês visuais do nicho devem ser ativamente evitado?

### 5. Ferramentas Utilizáveis
- Ferramentas de pesquisa web, leitores de referências visuais e manuais de inspiração.

### 6. Evidências Necessárias
- Tabela de decomposição de referências salva em `02-brand-strategy/research.md`.

### 7. Entregáveis Úteis
- Relatório de padrões saturados do nicho e matriz de reinterpretação visual.

### 8. Critérios de Aprovação
- Pelo menos 3 referências desconstruídas com princípios extraídos e proibição de cópia direta.

### 9. Critérios de Reprovação
- Copiar uma referência existente integralmente ou selecionar "templates" prontos.

### 10. Checkpoint
- **`CHECKPOINT B — Research Complete`**

### 11. Condições para Avançar
- Aprovação no Checkpoint B.

### 12. Condições que Obrigam Retorno
- Constatar que as referências selecionadas são incompatíveis com o posicionamento do cliente exige nova pesquisa.

---

## FASE 03 — CREATIVE DIRECTION

### 1. Objetivo
Estabelecer o conceito visual mestre único e transformá-lo em decisões de arte concretas e detalhadas seção por seção, antes de escrever qualquer código.

### 2. Entradas Obrigatórias
- Factualidade da Fase 01 e Referências da Fase 02.

### 3. Ações Obrigatórias
- **Gerar Obrigatoriamente 3 Rotas Conceituais Genuinamente Diferentes**:
  - **`ROTA A`**: Conceito visual, atmosfera, composição, fotografia, tipografia, paleta, motion, narrativa.
  - **`ROTA B`**: Alternativa conceitual antagônica com diferente tratamento estético e espacial.
  - **`ROTA C`**: Terceira abordagem explorando outro ângulo visual e emocional.
- Avaliar as 3 rotas contra os critérios de identidade, força visual, originalidade, assets disponíveis, conversão e viabilidade mobile.
- Selecionar **UMA** rota conceitual e registrar a justificativa técnica/criativa da escolha.
- **Detalhamento Seção por Seção Concreto**: Descrever em nível físico como cada seção será materializada (sem termos vagos como "design clean"). Exemplo: *"Hero 100svh, imagem do produto ocupando 55% da largura à direita com iluminação radial âmbar HSL(38, 92%, 50%), headline em 3 linhas com fonte display serifada 3.5rem..."*.

### 4. Decisões a Serem Tomadas
- Rota conceitual vencedora, atmosfera de iluminação/cor, tratamento de fotografias e estrutura de seções.

### 5. Ferramentas Utilizáveis
- Documentador de Direção de Arte e Matriz de Decisão Conceitual.

### 6. Evidências Necessárias
- Registro das 3 Rotas Conceituais e o detalhamento seção por seção em `05-creative-direction/creative-direction.md`.

### 7. Entregáveis Úteis
- Guia de atmosfera visual e especificações físicas de seção.

### 8. Critérios de Aprovação
- 3 rotas geradas, 1 selecionada com justificativa sólida e detalhamento seção por seção 100% concreto.

### 9. Critérios de Reprovação
- Aceitar descrições vagas ("experiência premium") ou gerar 3 rotas que sejam variações superficiais da mesma ideia.

### 10. Checkpoint
- **`CHECKPOINT C — Creative Direction Locked`**

### 11. Condições para Avançar
- Aprovação formal no Checkpoint C.

### 12. Condições que Obrigam Retorno
- Incompatibilidade entre os assets do cliente e a rota escolhida exige selecionar outra rota ou reajustar a Fase 03.

---

## FASE 04 — DESIGN SYSTEM & UX

### 1. Objetivo
Estruturar o Design System tailor-made (tokens HSL, tipografia, espaçamento, componentes) e a arquitetura de informação (UX) com base na Direção Criativa travada.

### 2. Entradas Obrigatórias
- Direção Criativa travada da Fase 03 (`05-creative-direction/creative-direction.md`).

### 3. Ações Obrigatórias
- Definir Paleta de Cores HSL usando a **Regra 60-30-10** (Dominante 60%, Secundária/Superfície 30%, Acento/CTA 10%).
- Definir Pares Tipográficos (Fonte Display para headlines + Fonte de Corpo de alta legibilidade com escala modular 1.25 a 1.33).
- Definir sistema de contêineres, grids assimétricos, raios de borda (border-radius), sombras direcionadas e espaçamentos verticais (mínimo 8rem em desktop).
- Definir regras de tratamento fotográfico (filtros CSS, opacidades, gradientes de suporte).
- Mapear a arquitetura de informação (UX) e os estados dos componentes (`:hover`, `:focus`, `:active`).

### 4. Decisões a Serem Tomadas
- Valores exatos de tokens HSL, tamanhos rem/vw, breakpoints (Desktop 1440px, Tablet 768px, Mobile 390px) e regras de motion.

### 5. Ferramentas Utilizáveis
- Calculadoras de contraste WCAG, geradores de tokens CSS, especificadores de Design System.

### 6. Evidências Necessárias
- Especificação de tokens e regras UX em `03-design-system/design-system.md`.

### 7. Entregáveis Úteis
- Tabela de Tokens CSS e especificações de componentes.

### 8. Critérios de Aprovação
- Tokens HSL com contraste WCAG 2.2 AA medido (min 4.5:1), tipografia clara e grid definido.

### 9. Critérios de Reprovação
- Criar componentes desnecessários ("porque todo site tem") ou definir cores sem contraste de leitura.

### 10. Checkpoint
- **`CHECKPOINT D — Design/Copy Ready`** (em conjunto com a Fase 05)

### 11. Condições para Avançar
- Aprovação no Checkpoint D.

### 12. Condições que Obrigam Retorno
- Quebra de legibilidade nos tokens exige retorno e ajuste na Fase 04.

---

## FASE 05 — COPY & CONVERSION

### 1. Objetivo
Redigir toda a copy da landing page com linguagem persuasiva humanizada, estrutura AIDA, ancoragem comercial rigorosa e zero clichês de IA.

### 2. Entradas Obrigatórias
- Factualidade da Fase 01 e Direção Criativa da Fase 03.

### 3. Ações Obrigatórias
- Redigir a copy seção por seção (Hero, Proposta de Valor, Bento Grid, Prova Social, Trata de Objeções, FAQ e CTAs).
- Aplicar a proibição estrita de clichês de IA (*"Transformando experiências"*, *"Excelência que inspira"*, etc.).
- Garantir que cada afirmação seja fundamentada no briefing.
- Definir objetivo comercial primário, CTA principal e CTAs secundários.

### 4. Decisões a Serem Tomadas
- Headline do Hero, argumentos de quebra de objeção, formato de prova social e mensagem dos botões de ação.

### 5. Ferramentas Utilizáveis
- Editor de copy humanizada e validador de factualidade.

### 6. Evidências Necessárias
- Matriz de copy completa seção por seção salva em `04-copywriting/copywriting.md`.

### 7. Entregáveis Úteis
- Texto final da landing page com marcação de H1, H2, H3 e CTAs.

### 8. Critérios de Aprovação
- Copy 100% humana, factual sem invenções, alinhada à oferta comercial e livre de clichês de IA.

### 9. Critérios de Reprovação
- Inventar depoimentos, estatísticas, anos de mercado ou usar copy genérica de IA.

### 10. Checkpoint
- **`CHECKPOINT D — Design/Copy Ready`**

### 11. Condições para Avançar
- Aprovação no Checkpoint D.

### 12. Condições que Obrigam Retorno
- Identificação de promessas falsas exige reescrita imediata na Fase 05.

---

## FASE 06 — IMPLEMENTATION (REGRA CRÍTICA: HERO FIRST)

### 1. Objetivo
Construir o código frontend da landing page (HTML5, CSS3 vanila e JS) de forma **incremental e iterativa**, validando o Hero em navegador real antes das demais seções.

### 2. Entradas Obrigatórias
- Design System (Fase 04) e Copy (Fase 05) aprovados.

### 3. Ações Obrigatórias
- **REGRA CRÍTICA — NÃO IMPLEMENTAR A PÁGINA INTEIRA DE UMA VEZ**:
  1. Implementar primeiro: **`FOUNDATION` + `HEADER` + `HERO`**.
  2. Executar servidor local de preview.
  3. **Abrir a página no navegador real** (Playwright/Chrome).
  4. Capturar screenshot em Desktop (1440px) e Mobile (390px).
  5. Analisar visualmente composição, iluminação, legibilidade e alinhamento do Hero.
  6. Corrigir eventuais problemas encontrados no código do Hero.
  7. **Somente após a aprovação visual do Hero (`CHECKPOINT E`), avançar para a implementação das demais seções**.
- Implementar as demais seções progressivamente.
- Otimizar imagens para WebP/SVG e organizar código semântico limpo.
- Garantir que nenhum caminho absoluto de disco local (e.g. `C:\Users\...`) ou metadado interno fique exposto no código final.

### 4. Decisões a Serem Tomadas
- Estrutura de arquivos frontend (`landing/index.html`, `styles.css`, `app.js`), técnicas de layout (Flexbox/Grid), curvas de animação e suporte a mídias.

### 5. Ferramentas Utilizáveis
- VS Code/Editor de código, servidor local HTTP, Playwright Browser Runner.

### 6. Evidências Necessárias
- Screenshots de validação do Hero (Desktop e Mobile) e arquivos de código-fonte em `landing/`.

### 7. Entregáveis Úteis
- Código frontend funcional (`landing/index.html`, `styles.css`, `app.js`).

### 8. Critérios de Aprovação
- Hero aprovado no navegador (Checkpoint E), código semântico limpo, zero caminhos locais expostos, imagens otimizadas.

### 9. Critérios de Reprovação
- Tentar implementar a página inteira de uma vez sem validar o Hero no navegador ou deixar caminhos locais vazando no código.

### 10. Checkpoint
- **`CHECKPOINT E — Hero Visual Approval`** (após o Hero)
- **`CHECKPOINT F — Full Page Visual Approval`** (após a página completa)

### 11. Condições para Avançar
- Aprovação no Checkpoint E para continuar o código, e aprovação no Checkpoint F para seguir para o Visual QA.

### 12. Condições que Obrigam Retorno
- Se o Hero não atingir o impacto estético desejado no navegador, refazer o código do Hero na Fase 06.

---

## FASE 07 — VISUAL QA & REFINEMENT

### 1. Objetivo
Inspecionar visualmente e interativamente a landing page renderizada em navegador real (Playwright/Chrome) nos 3 viewports oficiais e realizar ciclo contínuo de refinamento.

### 2. Entradas Obrigatórias
- Aplicação frontend compilada e executando em servidor local (Fase 06).

### 3. Ações Obrigatórias
- **Inspecionar a landing nos 3 Viewports Oficiais**:
  - **Desktop**: 1440x900
  - **Tablet**: 768x1024
  - **Mobile**: 390x844
- Executar o ciclo obrigatório:
  - **`RENDER`** ➔ **`INSPECT`** ➔ **`CRITIQUE`** ➔ **`FIX`** ➔ **`RENDER AGAIN`**
- Verificar detalhadamente: composição, hierarquia tipográfica, contraste HSL, recorte (crop) de fotografias, espaçamento, ritmo visual, ausência de rolagem horizontal (overflow), resposta de hover em CTAs e fluidez de motion.
- Aplicar decisões específicas de composição mobile quando necessário (crops portrait, botões de ação fixos no rodapé, ordem de blocos recalibrada).

### 4. Decisões a Serem Tomadas
- Ajustes finos de margem, tamanho de fonte rem/vw, opacidade de máscaras, comportamento de imagens e correções de layout.

### 5. Ferramentas Utilizáveis
- Playwright Browser Inspector, leitor de screenshots, analisador de layout.

### 6. Evidências Necessárias
- Screenshots comprovando aprovação nos 3 viewports salvos em `07-visual-qa/` ou relatório de inspeção.

### 7. Entregáveis Úteis
- Relatório de inspeção visual e correções aplicadas (`reports/VISUAL_QA.md`).

### 8. Critérios de Aprovação
- Zero overflow horizontal em mobile, contraste aprovado, composição impactante nos 3 viewports.

### 9. Critérios de Reprovação
- Landing empilhada de forma feia no mobile, texto ilegível, imagens esticadas ou quebra de layout.

### 10. Checkpoint
- **`CHECKPOINT G — Responsive Approval`**

### 11. Condições para Avançar
- Aprovação no Checkpoint G.

### 12. Condições que Obrigam Retorno
- Falhas graves de composição ou layout exigem retorno à Fase 06 (Código) para ajustes.

---

## FASE 08 — FINAL AUDIT & DELIVERY

### 1. Objetivo
Executar auditoria técnica e formal contra os Quality Gates medidos da Metodologia KDL V2, gerar os relatórios finais e preparar o pacote de publicação.

### 2. Entradas Obrigatórias
- Landing page 100% aprovada no Visual QA (Fase 07).

### 3. Ações Obrigatórias
- Executar testes medidos de auditoria:
  - **Links & CTAs**: Verificar se todos os links e botões possuem destino correto.
  - **Console & Erros**: Garantir zero erros de JavaScript ou 404 no console.
  - **Lighthouse Auditor**: Medir Performance (>=90), SEO (>=95), Acessibilidade (>=90) e Best Practices (>=90).
  - **HTML Semântico & Metadata**: Validar tags H1/H2/H3, Meta tags, OpenGraph e Favicon.
  - **Sanitização Final**: Garantir remoção total de metadados internos ou referências a KDL.
- Gerar o relatório final sintético `reports/FINAL_AUDIT.md` e o pacote de publicação `reports/publication-report.md`.

### 4. Decisões a Serem Tomadas
- Validação formal do pacote de entrega e declaração de prontidão para publicação.

### 5. Ferramentas Utilizáveis
- Lighthouse CLI / Runner, validador HTML/CSS, gerador de relatórios de entrega.

### 6. Evidências Necessárias
- Relatório formal `reports/FINAL_AUDIT.md` e `reports/publication-report.md`.

### 7. Entregáveis Úteis
- Diretório de produção pronto (`landing/`) e documentação de entrega.

### 8. Critérios de Aprovação
- Aprovação nos 7 Quality Gates Medidos, zero erros de console, factualidade 100% preservada.

### 9. Critérios de Reprovação
- Falha em qualquer Quality Gate, links quebrados ou dados factuais incorretos.

### 10. Checkpoint
- **`CHECKPOINT H — Final Delivery Approval`**

### 11. Condições para Avançar
- Aprovação final no Checkpoint H. Projeto concluído.

### 12. Condições que Obrigam Retorno
- Falha em qualquer auditoria técnica exige retorno à Fase 06 ou 07 para correção imediata.

---

## Tabela Resumo dos 8 Checkpoints Formais

| Checkpoint | Nome do Checkpoint | Fase Origem | Condição para Avançar |
| :--- | :--- | :--- | :--- |
| **A** | `Client Understanding` | Fase 01 | Briefing lido, assets inspecionados visualmente e factualidade 100% classificada |
| **B** | `Research Complete` | Fase 02 | Mapeamento de concorrência e 3 referências desconstruídas sem cópia |
| **C** | `Creative Direction Locked` | Fase 03 | 3 Rotas Conceituais geradas, 1 selecionada e detalhamento seção por seção concreto |
| **D** | `Design/Copy Ready` | Fases 04/05 | Tokens HSL (60-30-10) WCAG e Copy humanizada sem IA-isms aprovados |
| **E** | `Hero Visual Approval` | Fase 06 | **Hero renderizado, inspecionado no navegador (Desktop/Mobile) e aprovado** |
| **F** | `Full Page Visual Approval` | Fase 06 | Página completa construída e pronta para inspeção visual detalhada |
| **G** | `Responsive Approval` | Fase 07 | Inspeção visual no navegador aprovada nos viewports 1440px, 768px e 390px |
| **H** | `Final Delivery Approval` | Fase 08 | Auditoria dos 7 Quality Gates Medidos (Lighthouse + WCAG + SEO) aprovada |

*KDL Methodology V2 — Manual de Workflow Operacional.*
