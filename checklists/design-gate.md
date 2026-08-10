# Portão de Validação Estética (Design Gate)

> **Verificação Obrigatória ao Final da Fase 06 (UI Architecture)**
> A IA executora não pode avançar para a fase de código sem que todos os itens deste checklist sejam inspecionados e aprovados.

---

## 1. Tipografia e Escrita
- [ ] **Restrição de Fontes:** Apenas duas fontes estão em uso no projeto (Display + Body)?
- [ ] **Banimento de Clichês:** Foram totalmente banidas as fontes padrão Inter, Roboto e Arial?
- [ ] **Orçamento de Linhas do H1:** O título principal do Hero (H1) quebra em no máximo 3 linhas no viewport de desktop?
- [ ] **Hierarquia Visual:** Existe contraste visível de tamanho, peso e espaçamento entre títulos (`h1`, `h2`) e o texto corrido?
- [ ] **Escaneabilidade:** Os títulos contêm palavras com negritos estratégicos ou cores de destaque para facilitar a leitura rápida?

---

## 2. Cores, Atmosfera Visual e Iluminação
- [ ] **Proporção 60-30-10:** A distribuição cromática respeita as regras de dominância (60% fundo, 30% contraste, 10% cor de acento em botões e CTAs)?
- [ ] **Contraste Mínimo:** Todos os textos de leitura têm contraste mínimo de 4.5:1 com o fundo?
- [ ] **Presença de Textura/Atmosfera:** O fundo da página contém texturas discretas (ex: ruído analógico, gradientes de malha ou vinheta nas bordas)?
- [ ] **Pontos de Iluminação (Ambient Glows):** Existem pontos de luz com blur sutil atrás de elementos principais para criar profundidade tridimensional?

---

## 3. Qualidade de Ativos (Logo & Imagens)
- [ ] **Logo Vetorial:** O logotipo está configurado em formato `.svg` limpo e minificado?
- [ ] **Introdução Cinematográfica:** O projeto prevê uma animação inicial de revelação suave para a logo no carregamento?
- [ ] **Imagens Reais Primeiro:** Foram coletados e priorizados os arquivos de fotos reais do cliente, banindo modelos corporativos clichês?
- [ ] **Upscaling Checklist:** As imagens enviadas pelo cliente com resolução inferior a `1920px` passaram por sugestão documentada de upscale ou melhoria automática?
- [ ] **Imagens Narrativas:** As imagens inseridas possuem papel no storytelling (apoiam diretamente o texto ao lado)?

---

## 4. Composição, Layout e Movimento (Movie Effects)
- [ ] **Quebra de Simetria:** O design evita o empilhamento simétrico de seções do tipo "imagem esquerda, texto direita"?
- [ ] **Grid Bento Perfeito:** Todos os cards do grid bento se encaixam geometricamente sem gerar buracos ou lacunas no layout?
- [ ] **Espaço Negativo (Respiro):** Existem áreas amplas de respiro visual ao redor dos títulos principais (mínimo de 96px de padding)?
- [ ] **Efeitos Dolly / Panning:** O planejamento de animações de scroll prevê efeitos sutis de aproximação (dolly) ou captura horizontal (panning) sem prejudicar a navegação?
- [ ] **Âncora de Diferenciação:** A âncora de diferenciação visual planejada está visível e funcional?

---

## 5. Score DFII (Design Feasibility & Impact Index)
- [ ] **Validação do Score:** O score DFII calculado é superior ou igual a **10**?
- [ ] **Ajustes de Complexidade:** Se o score foi inferior a 10, a complexidade visual do design foi reduzida ou a direção de arte foi alterada?

---

### Assinatura de Validação:
* **Status:** [ ] Aprovado | [ ] Reprovado (Necessita ajustes)
* **Responsável (IA executora):** [Assinatura do Agente]
* **Data da Validação:** [Data]
