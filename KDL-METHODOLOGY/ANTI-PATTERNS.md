# KDL METHODOLOGY V2 — BIBLIOTECA DE ANTI-PATTERNS

> **PROPÓSITO**: Catálogo de travamentos de engenharia, UX, UI e Copywriting que identificam landing pages genéricas, amadoras ou com "cara de gerador de IA". A ocorrência de qualquer anti-pattern grave é motivo de **REPROVAÇÃO IMEDIATA**.

---

## 1. Anti-Padrões de Identidade e Aparição Visual

### 🚫 AP-01: AI-Looking Design (Design com Cara de IA)
- **SINTOMA**: Páginas com fundos roxos/azuis genéricos em dark mode, brilhos circulares centralizados (glows radiais roxos), bordas com gradiente neon sem motivo e elementos visuais sem conexão com o nicho do cliente.
- **POR QUE É RUIM**: Transmite sensação de site falso, gerado automaticamente por templates baratos de IA, destruindo a credibilidade da marca.
- **COMO DETECTAR**: Verificar se as cores da página foram escolhidas aleatoriamente sem referência direta à marca ou se parecem um kit pré-fabricado de SaaS genérico.
- **COMO CORRIGIR**: Construir a paleta HSL a partir do produto e da marca real do cliente. Substituir brilhos genéricos por iluminação fotográfica real ou cenográfica baseada no produto.

### 🚫 AP-02: Template Syndrome (Síndrome do Template Universal)
- **SINTOMA**: Todas as landing pages criadas possuem exatamente a mesma estrutura: Hero centralizado ➔ Logos em carrossel ➔ 3 cards idênticos ➔ Bento Grid 3x3 ➔ Tabela de preços ➔ FAQ ➔ Footer.
- **POR QUE É RUIM**: Elimina a personalidade do cliente e ignora a jornada de compra específica do produto.
- **COMO DETECTAR**: Comparar dois projetos de clientes de segmentos diferentes e perceber que possuem o mesmo esqueleto estrutural.
- **COMO CORRIGIR**: Criar a arquitetura da informação do zero (Fase 04/05) com base exclusiva no briefing, no tipo de oferta e na dor do cliente.

### 🚫 AP-03: Bento Grid Automático sem Propósito
- **SINTOMA**: Inserir um Bento Grid apenas porque é "tendência", preenchendo os quadros com ícones soltos e textos curtos irrelevantes.
- **POR QUE É RUIM**: Transforma uma ferramenta de arquitetura em poluição visual sem hierarquia.
- **COMO DETECTAR**: Quadros do Bento Grid com tamanhos idênticos ou com conteúdos que poderiam ser uma simples lista de texto.
- **COMO CORRIGIR**: Usar Bento Grid somente para sintetizar atributos visuais complexos (combinando imagens do produto, métricas gigantes e dados factuais de impacto em proporções assimétricas 60/40).

### 🚫 AP-04: Excesso de Cards Repetitivos
- **SINTOMA**: Padrão repetitivo de 3 ou 6 cartões retangulares iguais lado a lado com ícone no topo, título h3 e parágrafo de 2 linhas.
- **POR QUE É RUIM**: Torna a rolagem extremamente monótona e cansativa para o leitor.
- **COMO DETECTAR**: Verificar se mais de duas seções da página utilizam o mesmo modelo de grid de cartões.
- **COMO CORRIGIR**: Variar a composição: usar layouts divididos (split), listas com linha do tempo, citações de destaque, galerias integradas ou tabelas comparativas.

### 🚫 AP-05: Glassmorphism e Gradientes Gratuitos
- **SINTOMA**: Cartões com `backdrop-filter: blur()`, transparência excessiva e gradientes coloridos sem contraste adequado com o texto.
- **POR QUE É RUIM**: Prejudica drasticamente a legibilidade (WCAG 2.2 AA) e cria ruído estético.
- **COMO DETECTAR**: Testar legibilidade de texto branco sobre superfícies semitransparentes com imagens ao fundo.
- **COMO CORRIGIR**: Usar fundos sólidos ou com transparência mínima calibrada (`rgba`), garantindo contraste mínimo de 4.5:1.

---

## 2. Anti-Padrões de Copywriting e Conteúdo

### 🚫 AP-06: Copy Genérica de IA (Slogans Vazios)
- **SINTOMA**: Headlines com frases como *"Transformando experiências"*, *"Excelência que inspira"*, *"Descubra uma nova era"*, *"Inovação e paixão em cada detalhe"*.
- **POR QUE É RUIM**: Não comunica nada concreto sobre o produto, não trata objeções e soa falso.
- **COMO DETECTAR**: Perguntar: *"Esta frase poderia estar no site de uma padaria, de um banco ou de uma oficina mecânica?"* Se a resposta for sim, a copy é péssima.
- **COMO CORRIGIR**: Escrever focado na dor real e no benefício tangível do cliente (e.g., *"Hambúrguer artesanal grelhado na brasa de carvalho, entregue quente na sua porta em até 30 minutos"*).

### 🚫 AP-07: Dados, Depoimentos ou Estatísticas Inventadas
- **SINTOMA**: Adicionar números falsos como *"99% de satisfação"*, *"10.000 clientes felizes"* ou depoimentos com fotos de banco de imagem e nomes fictícios.
- **POR QUE É RUIM**: Quebra a ética, expõe a marca a riscos legais e destrói a factualidade.
- **COMO DETECTAR**: Buscar o dado no briefing. Se não constar no briefing ou em fontes oficiais verificáveis, foi inventado.
- **COMO CORRIGIR**: Se não houver dados factuais no briefing, marcar a informação como **`UNKNOWN`** ou utilizar prova social qualitativa real fornecida pelo cliente.

### 🚫 AP-08: Excesso de Pills e Badges Decorativas
- **SINTOMA**: Colocar pequenas "pills" ou etiquetas flutuantes sobre todos os títulos (ex: `[ ELEVE SEU NÍVEL ]`, `[ NOVIDADE ]`, `[ TECNOLOGIA ]`).
- **POR QUE É RUIM**: Poluição de elementos decorativos sem função informativa.
- **COMO DETECTAR**: Contar mais de 3 pills em uma única visualização de tela.
- **COMO CORRIGIR**: Eliminar pills desnecessárias e deixar o título principal (H1/H2) comunicar a mensagem com força tipográfica.

---

## 3. Anti-Padrões de UX, Layout e Engenharia

### 🚫 AP-09: Mobile Tratado como Desktop Reduzido
- **SINTOMA**: Simplesmente empilhar as colunas do desktop no mobile sem ajustar o tamanho dos títulos, a ordem dos elementos ou o recorte das fotos.
- **POR QUE É RUIM**: O leitor precisa rolar telas infinitas para encontrar a informação relevante, e os títulos ocupam a tela inteira sem respiro.
- **COMO DETECTAR**: Abrir no viewport mobile (375px) e observar fotos horizontais achatadas ou títulos que exigem rolagem de mais de 2 telas.
- **COMO CORRIGIR**: Criar composição mobile dedicada (ajuste de tamanhos rem/vw, ordem flex/grid customizada e crops de foto portrait).

### 🚫 AP-10: Scroll Hijacking e Animações Gratuitas
- **SINTOMA**: Alterar a velocidade natural de rolagem do mouse ou aplicar animações de entrada demoradas que travam a leitura da página.
- **POR QUE É RUIM**: Irrita o usuário, causa sensação de lentidão e prejudica a acessibilidade.
- **COMO DETECTAR**: Sentir resistência ao rolar a página ou precisar esperar elementos aparecerem para conseguir ler o conteúdo.
- **COMO CORRIGIR**: Usar animações sutis de fade/slide com curva de easing rápida e manter a rolagem natural e fluida.

### 🚫 AP-11: KDL Branding ou Artefatos Vazando para o Cliente
- **SINTOMA**: Textos ou marcas d'água da metodologia KDL, nomes de variáveis internas ou notas de desenvolvimento aparecendo na landing final do cliente.
- **POR QUE É RUIM**: Erro grave de entrega profissional.
- **COMO DETECTAR**: Fazer busca no código-fonte compilado por termos como `KDL`, `Mock`, `Prompt`, `Framework`.
- **COMO CORRIGIR**: Limpar completamente qualquer metadado interno antes da entrega final.

---

## 4. Matriz de Resumo de Ação Corretiva

| Anti-Pattern | Sintoma Principal | Severidade | Ação Obrigatória |
| :--- | :--- | :--- | :--- |
| **AP-01** | Visual genérico de IA / roxo neon | **Gravíssima (Reprovação)** | Reconstruir cores e atmosfera a partir da marca real |
| **AP-02** | Estrutura de template repetida | **Gravíssima (Reprovação)** | Desenhar arquitetura de informação sob medida |
| **AP-06** | Copy de IA ("Transformando experiências")| **Gravíssima (Reprovação)** | Reescrever com fatos concretos e dore/benefícios reais |
| **AP-07** | Números ou depoimentos inventados | **Gravíssima (Reprovação)** | Remover invenções e usar apenas dados factuais verificáveis |
| **AP-09** | Mobile apenas empilhado | **Grave** | Ajustar crops, fontes e ordem de seções no mobile |
| **AP-11** | Marca KDL/interna vazando | **Gravíssima (Reprovação)** | Sanitização total do código antes da entrega |

*KDL Methodology V2 — Biblioteca Oficial de Anti-Patterns.*
