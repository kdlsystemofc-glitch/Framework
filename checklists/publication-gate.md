# Portão de Validação de Publicação (Publication Gate)

> **Última Verificação Antes do Deploy em Produção (Fase 09)**
> Este checklist certifica que a infraestrutura, o SEO técnico e os scripts de monitoramento estão corretos antes de abrir o site para tráfego.

---

## 1. Configurações Finais de SEO Técnico
- [ ] **Título e Descrição:** As tags `<title>` e `<meta name="description">` estão preenchidas e abaixo do limite de caracteres recomendado (60 e 155 caracteres respectivamente)?
- [ ] **Metatags Sociais (Open Graph):** As tags Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) estão configuradas e apontando para a URL e arquivos de produção corretos?
- [ ] **Dados Estruturados:** O script JSON-LD Schema de negócio local foi validado e está livre de erros de sintaxe estrutural?
- [ ] **Favicon:** Foi gerado e configurado o conjunto de favicons para exibição correta em navegadores desktop e ícones de atalho mobile?

---

## 2. Monitoramento e Integrações
- [ ] **Scripts de Rastreamento:** Os pixels de conversão (ex: Meta Pixel, Google Analytics, Google Tag Manager) estão inseridos nos locais corretos do HTML e com atributos assíncronos (`async/defer`)?
- [ ] **Formulários de Lead:** Os formulários foram testados em ambiente de homologação e estão enviando os dados de lead com sucesso para o banco de dados, e-mail ou webhook de destino?
- [ ] **Links de Saída:** Todos os links externos (incluindo links de WhatsApp ou redes sociais) foram clicados e abrem corretamente em novas abas (`target="_blank" rel="noopener noreferrer"`)?

---

## 3. Infraestrutura e Assets
- [ ] **Segurança HTTPS:** O certificado SSL está ativo no domínio de destino e a página redireciona o tráfego HTTP para HTTPS automaticamente?
- [ ] **Compressão e Cache:** O servidor de hospedagem está configurado para comprimir recursos (Gzip/Brotli) e aplicar políticas corretas de cache para ativos estáticos (fontes, imagens)?
- [ ] **Limpeza de Arquivos:** Foram deletados do servidor de produção todos os arquivos de desenvolvimento temporários, mockups de imagens antigas e scripts de teste?

---

### Assinatura de Aprovação de Publicação:
* "Certifico que a Landing Page atende a todos os requisitos de SEO técnico, rastreamento comercial e infraestrutura para ir ao ar em produção."
* **Status:** [ ] Aprovado para Deploy | [ ] Reprovado (Necessita ajustes de infraestrutura)
* **Responsável (IA executora):** [Assinatura do Agente]
* **Data da Validação:** [Data]
