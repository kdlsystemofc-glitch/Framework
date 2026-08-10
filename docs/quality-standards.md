# Padrões de Qualidade e Excelência (Quality Standards)

> **KDL Landing Framework — Guia Operacional**
> Este documento estabelece as metas rígidas de conformidade visual, técnica e narrativa. Define os níveis Mínimo, Ideal e de Excelência, bem como as regras de rejeição de publicação.

---

## 1. Tabela Geral de Padrões KDL

Toda landing page KDL deve se enquadrar em uma das faixas de qualidade técnica e visual. O objetivo padrão de toda entrega é a **Excelência**.

| Dimensão | Padrão Mínimo (Aceitável) | Padrão Ideal (Esperado) | Padrão de Excelência |
| :--- | :--- | :--- | :--- |
| **Qualidade Visual** | Sem desalinhamentos; contraste legível. | Direção criativa clara e âncora visual ativa. | Nível Awwwards; iluminação e profundidade 3D ricas. |
| **Qualidade Técnica** | HTML5 semântico e CSS modular native. | Zero código morto; JS assíncrono não-bloqueante. | Código minificado; performance de GPU otimizada. |
| **UX & Usabilidade** | Fluxo AIDA básico estruturado. | Escaneabilidade fluida; parágrafos curtos. | Storytelling emocional ativo; zero fricção de conversão. |
| **Performance** | Lighthouse 90+ em redes móveis. | Lighthouse 95+; LCP ≤ 2.5s; CLS = 0.0. | Lighthouse 98+; LCP ≤ 2.0s; FID ≤ 50ms. |
| **Acessibilidade** | WCAG 2.1 AA contraste de textos. | WCAG 2.2 AA; outline de foco personalizado. | Navegação por teclado impecável; suporte total a movimento reduzido. |
| **Imagens** | Imagens WebP comprimidas e limpas. | Apenas fotos reais do cliente otimizadas. | Ativos com upscale de alta definição; imagens integradas à narrativa. |
| **Marca & Logo** | Logo SVG estático legível no topo. | Logo SVG animado; proporções geométricas coesas. | Intro cinematográfica da logo; integração completa com Hero. |
| **Responsividade** | Sem quebras visuais em mobile (360px). | Mobile-first clamp fluid tipografia (320px). | Layout responsivo premium de 320px a 4K sem jank. |

---

## 2. Padrões por Categoria

### A. Qualidade Visual e Direção Artística
* **Mínimo:** Cores contrastantes e alinhamento geométrico básico.
* **Ideal:** Presença de conceito de estilo explícito e uma âncora de diferenciação visual nítida.
* **Excelência:** Atmosfera de profundidade imersiva (vinhetas, neblina de fundo), transições de scroll fluidas e composições assimétricas que quebram o padrão quadrado e chato de templates convencionais.

### B. Qualidade de Copywriting
* **Mínimo:** Gramática perfeita, fluxo AIDA funcional.
* **Ideal:** Eliminação de 100% de clichês textuais gerados por IA e parágrafos limitados a 3 linhas.
* **Excelência:** Copy que reflete o tom verbal do arquétipo de marca (luxo, corporativo, sensorial) e ganchos narrativos que quebram ativamente objeções do usuário.

### C. Performance de Renderização
* **Mínimo:** Carregamento de imagens com lazy loading abaixo da dobra.
* **Ideal:** Formatos modernos (WebP/AVIF), preload de fontes e zero Layout Shifts (CLS = 0.0).
* **Excelência:** CSS crítico embutido no `<head>`, scripts de terceiros deferidos e consumo zero de CPU de animações quando fora da tela.

---

## 3. Critérios de Rejeição de Publicação (Hard Gates)

Se o projeto apresentar qualquer um dos itens abaixo durante a auditoria da Fase 08, ele **deve ser rejeitado** e enviado de volta para a fase de correção (Fase 08.1), impossibilitando o deploy:

1. ❌ **Lighthouse Performance inferior a 90** em conexões simuladas móveis.
2. ❌ **Cumulative Layout Shift (CLS) superior a 0.1** (elementos pulando na tela durante o carregamento).
3. ❌ **Presença de fontes clichês de IA (Inter, Roboto, Arial)** como padrão de texto da página.
4. ❌ **Uso de fotos genéricas de banco de imagens corporativas clichês** (modelos posando em escritórios falsos) se houver fotos reais disponíveis ou se nenhuma tentativa de abstração visual foi feita.
5. ❌ **Logotipo distorcido, em baixa resolução ou sem formato vetorial (.svg)**.
6. ❌ **Mais de uma tag `<h1>`** declarada no documento HTML.
7. ❌ **Inacessibilidade por Teclado:** Elementos ativos que não podem ser focados ou operados via tecla `Tab`.
8. ❌ **Quebra geométrica horizontal (horizontal scrollbar)** ativa no desktop ou mobile.

---

## 4. Referências Cruzadas
* Consulte [checklists/quality-gate.md](file:///c:/Framework/checklists/quality-gate.md) para auditorias de conformidade AA.
* Consulte [checklists/development-gate.md](file:///c:/Framework/checklists/development-gate.md) para conferência técnica de código.
* Consulte [docs/workflow.md](file:///c:/Framework/docs/workflow.md) para saber como aplicar os portões operacionais.
