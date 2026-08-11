# Portão de Validação de Acessibilidade e Qualidade (Quality Gate)

> **Verificação Obrigatória ao Final da Fase 08 (Final Audit)**
> O portão final de qualidade garante que a Landing Page atenda a critérios de usabilidade, compatibilidade, consistência de marca e inclusão social.

---

## 1. Acessibilidade Total (WCAG 2.2 AA)
- [ ] **Navegação por Teclado:** É possível navegar por toda a página (abrir menus, clicar em links, preencher formulários) usando apenas a tecla `Tab` e `Enter`?
- [ ] **Indicador de Foco:** O indicador de foco (outline visual) nos elementos ativos é perfeitamente visível e nítido durante a navegação por teclado?
- [ ] **Leitores de Tela:** Todas as imagens informativas possuem o atributo `alt` descritivo?
- [ ] **Aria-Labels:** Elementos interativos sem texto visível (como setas de carrossel ou ícones de redes sociais) possuem `aria-label` descritivos da ação?
- [ ] **Contraste de Leitura:** O texto dos campos de formulário e de alertas de erro possui contraste mínimo de 4.5:1 com o fundo?
- [ ] **Ordem Lógica do Foco:** A sequência de foco por teclado respeita o fluxo de leitura de cima para baixo e da esquerda para a direita do HTML semântico.

---

## 2. Compatibilidade, Responsividade e Layout (UX/UI Audit)
- [ ] **Múltiplos Navegadores:** A página foi testada e renderiza sem erros nos motores Blink (Chrome/Edge), WebKit (Safari) e Gecko (Firefox)?
- [ ] **Viewport Mobile:** O layout não apresenta quebras geométricas, textos cortados ou elementos sobrepostos em telas pequenas (320px de largura)?
- [ ] **Áreas de Toque:** Todos os elementos clicáveis têm tamanho superior a 48x48px no mobile para evitar cliques errados?
- [ ] **Evitar Transbordamento (Overflow):** O site não apresenta barras de rolagem horizontais em nenhum tamanho de tela testado.

---

## 3. Qualidade da Cópia e Storytelling (Copy Audit)
- [ ] **Humano e Direto:** A cópia final da página soa natural e passou pela auditoria anti-IA de clichês textuais?
- [ ] **Legibilidade:** Nenhum parágrafo de leitura excede 3 linhas de extensão?
- [ ] **Quebra de Objeções:** A página contém argumentos que quebram ativamente as principais barreiras comerciais levantadas no Discovery?
- [ ] **Consistência de Tom:** O tom verbal mantém a personalidade definida no Brand Strategy (luxo, corporativo, sensorial) do início ao fim da página?

---

## 4. Consistência Visual e Estética
- [ ] **Coesão com o Logotipo:** As bordas e cantos do layout (`border-radius`) e os espaçamentos respeitam a identidade derivada da marca/logotipo do cliente?
- [ ] **Movimento vestibular:** As animações respeitam a configuração `@media (prefers-reduced-motion: reduce)` do usuário?
- [ ] **Orçamento de Performance:** O site não apresenta travamentos geométricos (jank) no scroll de dispositivos móveis com Lenis ativo.

---

### Assinatura de Validação:
* **Status:** [ ] Aprovado | [ ] Reprovado (Ajustar usabilidade)
* **Responsável (IA executora):** [Assinatura do Agente]
* **Data da Validação:** [Data]
