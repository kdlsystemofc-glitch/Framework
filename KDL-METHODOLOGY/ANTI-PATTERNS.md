# KDL METHODOLOGY V2 — BIBLIOTECA COMPLETA DE ANTI-PATTERNS

> **PROPÓSITO**: Catálogo exaustivo de travamentos de engenharia, UX, UI e Copywriting que identificam landing pages genéricas, amadoras ou com "cara de gerador de IA". A ocorrência de qualquer anti-pattern grave nesta biblioteca é motivo de **REPROVAÇÃO IMEDIATA**.

---

## Catálogo de Anti-Patterns (26 Padrões Proibidos)

### 🚫 AP-01: AI-Looking Design (Design com Cara de IA)
- **SINTOMA**: Fundos escuros/azuis em degradê genérico, orbes brilhantes de iluminação radial (glows purpura/azul neon) centralizados e bordas neon sem nexo com a marca.
- **POR QUE É RUIM**: Transmite sensação imediata de site falso gerado por IA, destruindo a autoridade da marca.
- **COMO DETECTAR**: Verificar se as cores parecem um tema padrão de SaaS gerado por IA sem relação com o produto real.
- **COMO CORRIGIR**: Construir paleta HSL fundamentada no produto real e na atmosfera genuína da marca.

### 🚫 AP-02: Template Syndrome (Síndrome do Template Universal)
- **SINTOMA**: Estrutura idêntica repetida em múltiplos projetos: Hero ➔ Logos ➔ 3 cards ➔ Bento ➔ FAQ ➔ Footer.
- **POR QUE É RUIM**: Destrói a singularidade comercial e a jornada de compra específica de cada produto.
- **COMO DETECTAR**: Comparar dois clientes de nichos diferentes e notar a mesma ossatura de seções.
- **COMO CORRIGIR**: Arquitetar o fluxo de informação do zero (Fases 04 e 05) com base exclusiva no briefing do cliente.

### 🚫 AP-03: Bento Grid Automático sem Propósito
- **SINTOMA**: Adicionar um Bento Grid apenas para parecer moderno, preenchendo os quadros com texto curto e ícones irrelevantes.
- **POR QUE É RUIM**: Transforma um recurso estrutural em ruído sem hierarquia clara.
- **COMO DETECTAR**: Quadros do Bento Grid idênticos ou com informações que seriam melhor apresentadas em lista.
- **COMO CORRIGIR**: Usar Bento Grid apenas para sintetizar dados visuais heterogêneos (fotos reais + métricas gigantes + atributos).

### 🚫 AP-04: Excesso de Cards Repetitivos
- **SINTOMA**: Fileiras Infinitas de cartões com ícone no topo, H3 e parágrafo de 2 linhas.
- **POR QUE É RUIM**: Causa monotonia visual profunda e fadiga de rolagem.
- **COMO DETECTAR**: Mais de duas seções da mesma página utilizando o mesmo layout de grade de cards.
- **COMO CORRIGIR**: Diversificar com composições divididas (split), listas assimétricas, destaques fotográficos ou linhas do tempo.

### 🚫 AP-05: Glassmorphism sem Propósito
- **SINTOMA**: Superfícies com transparência excessiva (`backdrop-filter: blur`) sem contraste tipográfico suficiente.
- **POR QUE É RUIM**: Prejudica gravemente a legibilidade (violando WCAG 2.2 AA) e cria sensação de sujeira visual.
- **COMO DETECTAR**: Dificuldade de ler o texto quando o fundo por trás do vidro possui variações de luz.
- **COMO CORRIGIR**: Usar fundos sólidos ou com opacidade calibrada em HSL, garantindo contraste mínimo de 4.5:1.

### 🚫 AP-06: Gradients Gratuitos
- **SINTOMA**: Gradientes de fundo chamativos aplicados em seções e botões sem alinhamento com a identidade da marca.
- **POR QUE É RUIM**: Polui a página e passa impressão de amadorismo visual.
- **COMO DETECTAR**: Presença de gradientes multitons sem função de iluminação ou direcionamento de atenção.
- **COMO CORRIGIR**: Priorizar cores sólidas em HSL ou gradientes sutis de iluminação cenográfica.

### 🚫 AP-07: Hero Genérico
- **SINTOMA**: Hero com título centralizado genérico, subtítulo de duas linhas e dois botões lado a lado sem foto do produto real.
- **POR QUE É RUIM**: Não prende a atenção nos primeiros 3 segundos e falha em transmitir a proposta de valor.
- **COMO DETECTAR**: Hero que se parece com a página padrão de qualquer tema gratuito do Bootstrap/Tailwind.
- **COMO CORRIGIR**: Construir um Hero sob medida com foto/vídeo real do produto em posição de destaque e headline de impacto.

### 🚫 AP-08: Copy Genérica de IA
- **SINTOMA**: Frases como *"Transformando experiências"*, *"Excelência que inspira"*, *"Descubra uma nova era"*.
- **POR QUE É RUIM**: Slogans vazios que não comunicam benefícios reais e afastam potenciais compradores.
- **COMO DETECTAR**: Substituir o nome da marca na headline por outra empresa e notar que a frase continua servindo.
- **COMO CORRIGIR**: Escrever copy humana, factual e específica sobre a dor e a transformação real do cliente.

### 🚫 AP-09: CTA Genérico
- **SINTOMA**: Botões de ação com textos fracos como *"Clique aqui"*, *"Saiba mais"*, *"Enviar"*.
- **POR QUE É RUIM**: Não gera impulso de ação e não deixa claro o resultado do clique.
- **COMO DETECTAR**: Botões com verbos genéricos sem conexão com a oferta comercial.
- **COMO CORRIGIR**: Utilizar CTAs diretos e de alto valor (ex: *"Garantir Meu Hambúrguer Artesanal"*, *"Reservar Mesa Agora"*).

### 🚫 AP-10: Excesso de Badges Decorativas
- **SINTOMA**: Múltiplas etiquetas decorativas flutuando sem contexto sobre cartões e títulos.
- **POR QUE É RUIM**: Polui o campo visual e reduz a importância dos elementos principais.
- **COMO DETECTAR**: Presença de badges com textos irrelevantes em mais de 3 pontos da mesma seção.
- **COMO CORRIGIR**: Remover badges desnecessárias e confiar na hierarquia tipográfica.

### 🚫 AP-11: Excesso de Pills
- **SINTOMA**: Pequenas caixas de texto com cantos arredondados (pills) precedendo todo e qualquer título de seção.
- **POR QUE É RUIM**: Vício de layout que automatiza a estética e polui a leitura.
- **COMO DETECTAR**: Todas as seções iniciam com uma pill decorativa em caixa alta.
- **COMO CORRIGIR**: Deixar os títulos H2/H3 ancorarem a seção de forma limpa e direta.

### 🚫 AP-12: Ícones Lucide Usados como Decoração
- **SINTOMA**: Adicionar ícones de linha fina em cima de cada parágrafo sem função explicativa real.
- **POR QUE É RUIM**: Transforma ícones informativos em entulho decorativo genérico.
- **COMO DETECTAR**: Ícones soltos sem relação direta com a frase ou conceito apresentado.
- **COMO CORRIGIR**: Utilizar ícones apenas quando sintetizarem uma ação ou dado funcional.

### 🚫 AP-13: Grid Previsível
- **SINTOMA**: Layouts engessados em colunas simétricas idênticas de ponta a ponta na página.
- **POR QUE É RUIM**: Deixa a navegação chata, previsível e sem ritmo estético.
- **COMO DETECTAR**: Ausência de variação entre larguras de seções e alinhamentos ao longo do scroll.
- **COMO CORRIGIR**: Intercalar seções de largura total (full-width), layouts assimétricos 60/40 e blocos centralizados.

### 🚫 AP-14: Seção "3 Benefícios" Automática
- **SINTOMA**: Inclusão mecânica de uma seção de 3 colunas intitulada *"Nossos Benefícios"* em todas as landings.
- **POR QUE É RUIM**: Abordagem preguiçosa que ignora os reais argumentos de vendas do produto.
- **COMO DETECTAR**: Presença constante do bloco de 3 colunas de benefícios logo após o Hero.
- **COMO CORRIGIR**: Apresentar os diferenciais através de storytelling visual e demonstrações práticas do produto.

### 🚫 AP-15: Números e Estatísticas Inventados
- **SINTOMA**: Inserir contadores fictícios como *"10.000 clientes satisfeitos"*, *"99% de aprovação"*.
- **POR QUE É RUIM**: Quebra a ética, expõe o cliente a riscos legais e destrói a verdade do projeto.
- **COMO DETECTAR**: Ausência do número no briefing oficial fornecido pelo cliente.
- **COMO CORRIGIR**: Usar apenas dados factuais verificáveis. Se não constar no briefing, declarar **`UNKNOWN`** ou omitir a seção.

### 🚫 AP-16: Depoimentos Inventados
- **SINTOMA**: Criar depoimentos falsos com avatares de banco de imagens e frases genéricas de elogio.
- **POR QUE É RUIM**: Fraude comercial grave que destrói a confiança do público.
- **COMO DETECTAR**: Fotos de depoimentos oriundas de bancos de imagens gratuitos e nomes sem verificação.
- **COMO CORRIGIR**: Usar apenas depoimentos reais com fotos/prints fornecidos pelo cliente ou omitir a seção.

### 🚫 AP-17: Imagens Stock Incompatíveis
- **SINTOMA**: Fotografias de pessoas e estabelecimentos estrangeiros que não correspondem à realidade do cliente.
- **POR QUE É RUIM**: Gera desconexão imediata com o público local e sensação de falsidade.
- **COMO DETECTAR**: Fotos de modelo americano/europeu em uma landing de negócio local no Brasil.
- **COMO CORRIGIR**: Utilizar estritamente os assets reais do cliente ou imagens de apoio contextualizadas ao nicho.

### 🚫 AP-18: Animação Gratuita
- **SINTOMA**: Elementos girando, quicando ou piscando sem propósito comunicativo.
- **POR QUE É RUIM**: Distrai o leitor, desacelera o carregamento e causa poluição visual.
- **COMO DETECTAR**: Animações que continuam acontecendo sem interação do usuário e sem valor informativo.
- **COMO CORRIGIR**: Manter animações restritas a entradas suaves de scroll e feedbacks de hover/clique.

### 🚫 AP-19: Scroll Hijacking
- **SINTOMA**: Bloquear ou alterar a velocidade natural da roda do mouse do usuário.
- **POR QUE É RUIM**: Causa profunda frustração de usabilidade e problemas de acessibilidade.
- **COMO DETECTAR**: Sentir o scroll pesado, travado ou pulando seções involuntariamente.
- **COMO CORRIGIR**: Manter a rolagem nativa do navegador fluida (usando apenas smoothing leve tipo Lenis quando justificado).

### 🚫 AP-20: Falta de Contraste
- **SINTOMA**: Texto cinza claro sobre fundo cinza escuro ou texto branco sobre fotos claras sem máscara.
- **POR QUE É RUIM**: Torna o texto ilegível para usuários e viola o padrão WCAG 2.2 AA.
- **COMO DETECTAR**: Medir a razão de contraste (deve ser no mínimo 4.5:1 para texto normal).
- **COMO CORRIGIR**: Ajustar a iluminação do fundo em HSL ou aplicar máscaras de gradiente escuro de suporte.

### 🚫 AP-21: Falta de Ritmo Visual
- **SINTOMA**: Transição entre seções com o mesmo fundo, mesmo espaçamento e mesma densidade de texto de ponta a ponta.
- **POR QUE É RUIM**: Deixa a experiência de leitura monótona e causa abandono da página.
- **COMO DETECTAR**: Sensação de que a página nunca muda de tom enquanto se rola a tela.
- **COMO CORRIGIR**: Alternar o tom dos fundos (claro/escuro), variar densidades e intercalar mídias.

### 🚫 AP-22: Excesso de Texto
- **SINTOMA**: Blocos gigantescos de parágrafos sem quebras de linha, destaques ou apoio visual.
- **POR QUE É RUIM**: Ninguém lê blocos massivos de texto em landing pages de vendas.
- **COMO DETECTAR**: Parágrafos com mais de 4 linhas contínuas sem negritos ou divisão.
- **COMO CORRIGIR**: Sintetizar a copy, usar negritos estratégicos, tópicos (bullet points) e elementos de apoio.

### 🚫 AP-23: Mobile Tratado como Desktop Reduzido
- **SINTOMA**: Exibir no mobile exatamente a mesma disposição do desktop, gerando rolagens infinitas de colunas espremidas.
- **POR QUE É RUIM**: Torna a navegação no celular cansativa e desconfortável para o polegar.
- **COMO DETECTAR**: Fotos horizontais achatadas e títulos ocupando 3 telas no mobile.
- **COMO CORRIGIR**: Recompor o layout para mobile (crops portrait, botões de ação fixos e tipografia recalibrada).

### 🚫 AP-24: Conteúdo Inventado
- **SINTOMA**: Adicionar serviços, preços ou garantias que não foram explicitamente fornecidos no briefing do cliente.
- **POR QUE É RUIM**: Compromete a veracidade comercial da empresa.
- **COMO DETECTAR**: Comparar o conteúdo publicado com o documento de briefing original.
- **COMO CORRIGIR**: Tratar faltas de informação com a marcação **`UNKNOWN`** ou consultar o cliente.

### 🚫 AP-25: KDL Branding Vazando para o Cliente
- **SINTOMA**: Presença do nome "KDL", marcas d'água internas ou notas de instrução de agentes na landing final do cliente.
- **POR QUE É RUIM**: Erro grave de confidencialidade e acabamento de entrega.
- **COMO DETECTAR**: Buscar o termo `KDL` no código final compilado ou no texto da página.
- **COMO CORRIGIR**: Fazer sanitização completa de metadados antes de disponibilizar o projeto.

### 🚫 AP-26: Páginas Visualmente Iguais entre Clientes
- **SINTOMA**: Uma hamburgueria e uma clínica odontológica com a mesma atmosfera estética, mesmas fontes e mesmo layout.
- **POR QUE É RUIM**: Prova de que a metodologia falhou em entregar originalidade tailor-made.
- **COMO DETECTAR**: Colocar os projetos lado a lado e notar que apenas as fotos e textos mudaram.
- **COMO CORRIGIR**: Reiniciar a Direção Criativa (Fase 03) a partir da marca e do público real do cliente.

*KDL Methodology V2 — Biblioteca Oficial de Anti-Patterns.*
