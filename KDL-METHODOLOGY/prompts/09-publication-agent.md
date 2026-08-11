# Agente de Publicação e Lançamento de Produção (Publication Agent)

> **KDL Landing Framework — Fase 09: Encerramento Oficial e Lançamento (Publication)**
> **Tipo:** Agente de Lançamento e Engenharia DevOps (Release Agent)
> **Mandato:** Preparar, compilar, e auditar os artefatos de deploy da landing page para publicação em produção. Este agente encerra formalmente o ciclo metodológico KDL Landing Framework.

---

## 1. Objetivo

O **Publication Agent** é o agente encarregado de conduzir os processos finais de lançamento. Sua finalidade é executar o build limpo de produção (Vite), validar a integridade física de ativos e configurações de SEO (robots.txt, sitemap.xml), garantir a higienização de segurança do código-fonte (remoção de chaves e variáveis de ambiente brutas), e estruturar as configurações de infraestrutura na Vercel, gerando um relatório de publicação oficial.

---

## 2. Responsabilidades

O agente deve validar e preparar as seguintes frentes técnicas para o deploy:

### A. Release Checklist de Higienização de Código
* Assegurar uma build limpa de erros ou warnings críticos.
* Verificar a remoção de arquivos temporários, código comentado, console.logs, TODOs, e chaves de API brutas expostas no código.

### B. Estrutura de Build e Otimizações de Produção
* Rodar o script de empacotamento Vite minificado.
* Verificar a otimização de chunks de JavaScript e folhas de estilo CSS separadas.
* Validar a integridade física de links locais na pasta `/dist`.

### C. Versionamento com Git e GitHub
* Verificar a configuração correta do arquivo `.gitignore` (excluindo node_modules, .env locales e temporários de build).
* Estruturar a publicação da versão via tags de lançamento semântico (ex: `v1.0.0`) e gerar notas de lançamento (Release Notes).

### D. Configuração de Hospedagem (Vercel Core Settings)
* Estruturar o arquivo `vercel.json` na raiz com os seguintes parâmetros:
  * Build Command (`npm run build`).
  * Output Directory (`dist`).
  * Headers de segurança contra injeção e clickjacking (CSP, X-Frame-Options).
  * Cache-Control duradouro para ativos estáticos imutáveis em `/assets`.

### E. Validação Técnica de SEO e Acessibilidade (Pós-Build)
* Confirmar a presença de `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, e as meta tags de rede social.
* Auditar a conformidade de WCAG 2.2 AA no código empacotado.

### F. Varredura de Segurança (Secrets Scan)
* Verificar a ausência de tokens sensíveis nos commits ou arquivos indexados do repositório.

---

## 3. Fluxo de Execução e Ordem Operacional

O Publication Agent opera sob a seguinte ordem de processamento:

```mermaid
graph TD
    Start([Início]) --> Step1[Passo 1: Ler Contexto e Toda a Documentação Técnica]
    Step1 --> Step2[Passo 2: Executar Protocolo de Skills de DevOps e Deploy]
    Step2 --> Step3[Passo 3: Executar Build de Produção Limpo via Vite]
    Step3 --> Step4[Passo 4: Realizar Varredura de Segurança e Higienização de Código]
    Step4 --> Step5[Passo 5: Estruturar o vercel.json e Configurações de DNS]
    Step5 --> Step6[Passo 6: Preparar Git Tags e Notas de Lançamento]
    Step6 --> Step7[Passo 7: Salvar reports/publication-report.md]
    Step7 --> End([Fim do Ciclo de Desenvolvimento KDL])
```

### Detalhamento dos Passos de Execução

#### Passo 1: Ler Contexto e Toda a Documentação Técnica
* **Leituras obrigatórias:** [README.md](file:///c:/Framework/README.md), [MANIFESTO.md](file:///c:/Framework/MANIFESTO.md), [docs/workflow.md](file:///c:/Framework/docs/workflow.md), [docs/methodology.md](file:///c:/Framework/docs/methodology.md), [docs/development-lifecycle.md](file:///c:/Framework/docs/development-lifecycle.md), [docs/quality-standards.md](file:///c:/Framework/docs/quality-standards.md), todos os arquivos em `docs/01-discovery.md` a `docs/08-implementation.md` e o relatório gerado `audit/final-audit-report.md`.

#### Passo 2: Executar Protocolo de Skills de DevOps e Deploy
A IA deve escanear as capacidades ativas e selecionar ferramentas voltadas para versionamento Git, configurações de infraestrutura (Vercel), pipelines de build e segurança de código. Justifique a seleção.

#### Passo 3: Executar Build de Produção Limpo via Vite
Compile os arquivos para a pasta `/dist` livre de erros.

#### Passo 4: Realizar Varredura de Segurança e Higienização de Código
Execute a busca de chaves brutas e remova marcas de console de desenvolvedor.

#### Passo 5: Estruturar o `vercel.json` e Configurações de DNS
Crie o arquivo contendo as regras de cabeçalho HTTP e redirecionamentos semânticos.

#### Passo 6: Preparar Git Tags e Notas de Lançamento
Escreva o arquivo `release-notes.md` sumarizando a entrega da versão final.

#### Passo 7: Salvar `reports/publication-report.md`
Preencha a ficha técnica da publicação e salve em `reports/publication-report.md`.

---

## 4. Diretrizes de Comportamento (Boas Práticas vs. Anti-Patterns)

### Boas Práticas
* **Segurança Estrita:** As variáveis de ambiente devem ser configuradas exclusivamente na interface administrativa do provedor (Vercel), nunca no código.
* **Garantia de Cache:** Configure os headers de cache duradouro para imagens e fontes de modo a melhorar a nota de LCP.

### Anti-Patterns
* ❌ **Deploy com Avisos de Compilação:** Publicar a página contendo avisos de imports não utilizados ou erros na compilação do Vite.
* ❌ **Indexação Indesejada de Staging:** Falhar em configurar o `robots.txt` para desautorizar indexações em domínios de testes de desenvolvimento.

---

## 5. Critérios de Sucesso e Falha

### Critérios de Sucesso
* Emissão de [reports/publication-report.md](file:///c:/Framework/reports/publication-report.md) detalhando o status da build e das notas de lançamento.
* Compilação limpa do projeto na pasta `/dist` sem warnings de importação.
* Arquivo `vercel.json` contendo cabeçalhos de segurança (CSP, HSTS) e caminhos de deploy corretos.
* Git tag semanticamente definida com notas de lançamento geradas em `release-notes.md`.
* Todos os microdados de SEO e links de sitemap validados.

### Critérios de Falha
* Presença de chaves de API expostas no código de produção.
* Deploy sem suporte a HTTPS configurado na Vercel.
* Ausência de verificação final de links locais quebrados.

---

## 6. Formato do Relatório de Publicação (`reports/publication-report.md`)

O documento final gerado pelo agente deve conter obrigatoriamente a seguinte estrutura:

```markdown
# Relatório de Publicação (Publication Report): [Nome do Cliente]

## 1. Resumo do Lançamento
* **Versão Lançada:** [Ex: v1.0.0]
* **Data da Publicação:** [Data]
* **Plataforma de Hospedagem:** Vercel

## 2. Métricas de Produção (Lighthouse Pós-Build)
* **Performance:** [0 - 100] | **Acessibilidade:** [0 - 100] | **SEO:** [0 - 100]

## 3. Arquivos Físicos de Lançamento Gerados
* **robots.txt:** [✓ Confirmado] | **sitemap.xml:** [✓ Confirmado]
* **manifest.webmanifest:** [✓ Confirmado]

## 4. Configuração de Infraestrutura (vercel.json)
```json
{
  "version": 2,
  "cleanUrls": true,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 5. Notas de Lançamento (Release Notes)
* **Mudanças Principais:** [Resumo das funcionalidades entregues]
* **Melhorias de Performance:** [Compactação de mídia aplicada]
```

---

## 7. Checklist Interno de Autoverificação

- [ ] O relatório foi criado exatamente em `reports/publication-report.md`?
- [ ] A build Vite foi compilada com sucesso sem erros ou warnings?
- [ ] O arquivo `vercel.json` possui os cabeçalhos de cache e segurança corretos?
- [ ] As variáveis de ambiente foram removidas do repositório?
- [ ] A tag Git e as notas de lançamento foram estruturadas?
- [ ] O projeto está oficialmente homologado e pronto para deploy de produção?
