# Diretrizes de Otimização para Motores de Busca (SEO Guidelines)

> **"O melhor design do mundo é invisível se ninguém conseguir encontrá-lo. O SEO técnico é a base da visibilidade orgânica."**

---

## 1. Introdução

O SEO moderno vai muito além de repetir palavras-chave no texto. Motores de busca (como Google) priorizam a experiência de página (Page Experience), o carregamento rápido, a estrutura semântica impecável do HTML e a acessibilidade. 

Esta diretriz define as regras técnicas obrigatórias de SEO para todas as Landing Pages da KDL.

---

## 2. Estrutura Semântica do Documento

Um documento HTML bem estruturado permite que rastreadores de motores de busca (crawlers) compreendam a hierarquia de relevância do conteúdo.

### Regras de Tags HTML
1. **Um Único H1:** Cada Landing Page deve possuir exatamente **um único** elemento `<h1>` localizado na seção Hero. Ele deve conter a palavra-chave principal da proposta de valor.
2. **Hierarquia de Títulos Estrita:** Não salte níveis de títulos. Um `<h2>` deve ser seguido por `<h3>`, nunca diretamente por um `<h4>`. Se a estilização visual exigir tamanhos diferentes, utilize classes CSS para o tamanho da fonte, mantendo as tags HTML corretas estruturalmente.
3. **Tags HTML5 Semânticas:** Cada bloco da página deve ser envolto por tags que explicam seu conteúdo:
   * `<header>` para a navegação do topo.
   * `<main>` para o conteúdo principal (onde fica a landing page inteira).
   * `<section>` com um cabeçalho correspondente (`h2`-`h6`) para cada divisão lógica.
   * `<footer>` para os dados de copyright, contatos e links legais no final da página.

---

## 3. Metadados e Redes Sociais

Toda página deve conter metadados completos inseridos na tag `<head>` para garantir indexação correta e compartilhamento visual atraente nas redes sociais (Open Graph).

### Metadags Obrigatórias
```html
<!-- SEO Padrão -->
<title>Título da Landing Page - Nome da Marca</title>
<meta name="description" content="Meta descrição atraente com até 155 caracteres contendo a proposta de valor.">
<link rel="canonical" href="https://www.seudominio.com/">

<!-- Open Graph / Facebook / WhatsApp -->
<meta property="og:type" content="website">
<meta property="og:title" content="Título Altamente Atraente para Redes Sociais">
<meta property="og:description" content="Descrição rápida e focada em cliques rápidos.">
<meta property="og:image" content="https://www.seudominio.com/assets/images/og-share.jpg">
<meta property="og:url" content="https://www.seudominio.com/">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título do Twitter">
<meta name="twitter:description" content="Descrição do Twitter">
<meta name="twitter:image" content="https://www.seudominio.com/assets/images/og-share.jpg">
```

---

## 4. Dados Estruturados (JSON-LD Schema)

Para que o Google exiba rich snippets (como estrelas de avaliação, FAQs ou informações locais do negócio), é obrigatório embutir dados estruturados no formato JSON-LD no `<head>` da página.

### Exemplo de LocalBusiness Schema (Universal)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nome do Cliente",
  "image": "https://www.seudominio.com/assets/images/logo.png",
  "@id": "https://www.seudominio.com/#localbusiness",
  "url": "https://www.seudominio.com/",
  "telephone": "+55-11-99999-9999",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua do Cliente, 123",
    "addressLocality": "Cidade",
    "addressRegion": "SP",
    "postalCode": "01234-567",
    "addressCountry": "BR"
  }
}
</script>
```

---

## 5. Boas Práticas vs. Anti-Patterns (Más Práticas)

### Boas Práticas
* **Atributo `alt` em Todas as Imagens:** Toda tag `<img>` deve possuir uma descrição textual clara de seu conteúdo para acessibilidade e busca de imagens.
* **URLs Amigáveis:** Caso a landing page possua caminhos secundários, use slugs descritivos e curtos (ex: `/agendamento` e não `/index.php?page=123&track=yes`).

### Anti-Patterns
* ❌ **Keywords Stuffing:** Repetir a mesma palavra-chave dezenas de vezes no rodapé ou ocultar textos com a mesma cor do fundo para forçar a leitura do robô. O Google pune severamente essas práticas.
* ❌ **Falta de Responsividade das Metatags:** Deixar de configurar a tag viewport adequada, prejudicando a indexação no Google Mobile-First Indexing.
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

---

## 6. Checklist de SEO Técnico

- [ ] A página possui exatamente uma tag `<h1>`?
- [ ] A hierarquia de títulos (`h1`, `h2`, `h3`...) é estrita e sem saltos estruturais?
- [ ] A meta descrição está configurada, contendo menos de 155 caracteres e com chamada persuasiva?
- [ ] As tags de Open Graph (`og:title`, `og:image`, `og:description`) estão totalmente preenchidas?
- [ ] Foi inserido um script JSON-LD Schema válido e sem erros de sintaxe no `<head>`?
- [ ] Todas as imagens possuem atributos `alt` preenchidos de forma descritiva?

---

## 7. Referências Cruzadas
* Consulte [references/performance.md](file:///c:/Framework/references/performance.md) para otimização de velocidade de carregamento (essencial para SEO).
* Consulte [references/accessibility.md](file:///c:/Framework/references/accessibility.md) para garantir que a estrutura HTML atenda aos leitores de tela.
* Consulte [checklists/publication-gate.md](file:///c:/Framework/checklists/publication-gate.md) para validação pré-lançamento.
