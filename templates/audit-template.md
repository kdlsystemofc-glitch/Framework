# Modelo de Relatório de Auditoria Final (Audit Template)

> **Fase 08 do KDL Landing Framework**
> Este template é preenchido pela IA executora ao final do desenvolvimento para certificar as métricas de performance, SEO, acessibilidade e conversão.

---

## 1. Testes de Performance (Core Web Vitals)
*Os testes devem ser rodados simulando conexões móveis de velocidade média (Mobile Moto G4).*

* **Pontuação Lighthouse Geral:** [ ] / 100
* **Largest Contentful Paint (LCP):** [ ] segundos (Meta KDL: ≤ 2.0s)
* **First Input Delay (FID):** [ ] milissegundos (Meta KDL: ≤ 50ms)
* **Cumulative Layout Shift (CLS):** [ ] (Meta KDL: 0.0)

### Falhas de Velocidade Identificadas:
1. [Ex: Imagem do card 2 sem dimensões explícitas no HTML]
2. [Ex: Arquivo de fonte Display sem tag de preload configurada]

---

## 2. Testes de Acessibilidade (WCAG 2.2 AA)

- [ ] **Teclado:** O foco visual percorre toda a página na tecla `Tab` de forma lógica?
- [ ] **Contrastes:** Todos os textos principais possuem relação mínima de contraste de 4.5:1?
- [ ] **Aria-Labels:** Os botões compostos por ícones puros possuem rótulos descritivos?
- [ ] **Movimento Reduzido:** O CSS desativa animações sob a regra `prefers-reduced-motion: reduce`?

---

## 3. Auditoria de SEO Técnico

- [ ] A página contém exatamente **um único** H1?
- [ ] O documento HTML utiliza as tags semânticas corretas (`<header>`, `<main>`, `<section>`, `<footer>`)?
- [ ] O JSON-LD Schema de negócio local foi injetado e está sem erros no validador do Google?
- [ ] As tags Open Graph (`og:image`, `og:title`) estão configuradas e com caminhos corretos?

---

## 4. Auditoria de Qualidade Visual e Conversão

- [ ] **Copy Check:** A página passou pela auditoria anti-IA de clichês textuais?
- [ ] **DFII Verification:** O design implementado corresponde à direção criativa planejada?
- [ ] **Bento Grid:** Não existem vazios, grades quebradas ou colunas desalinhadas no layout?
- [ ] **Touch Target:** Todos os botões clicáveis no mobile possuem tamanho de toque superior a 48x48px?

---

## 5. Plano de Correções Imediatas (Patch Plan)
*Descreva as alterações aplicadas para corrigir as falhas acima.*

* **Correção 1:** [Ex: Convertidas imagens residuais para formato WebP]
* **Correção 2:** [Ex: Adicionado padding extra nos cantos dos botões de carrossel]
* **Status Final após Correção:** [ ] Aprovado para Publicação | [ ] Reprovado (Reescrever)
