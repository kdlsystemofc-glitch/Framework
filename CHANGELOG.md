# Changelog

> **KDL Landing Framework — Histórico de Alterações**
> Todas as mudanças estruturais, melhorias metodológicas e atualizações da base de conhecimento são documentadas neste arquivo.

---

## [1.0.0] - 2026-07-30 — OFFICIAL STABLE RELEASE

### Adicionado
* **KDL Framework Software Product — Milestone 7: ECOSYSTEM PLATFORM & Release v1.0.0:**
  * `@kdl/sdk`: SDK mestre unificado exportando todos os 48 pacotes e aplicações do monorepo com funções utilitárias fortemente tipadas.
  * `@kdl/plugin-sdk`: SDK dedicado para desenvolvimento de Plugins de terceiros (`definePlugin`), contratos `IPlugin`, `PluginManifest`, ganchos de ciclo de vida (`onInit`, `onEnable`, `onDisable`, `onDestroy`), permissões e verificação de saúde (`PluginHealth`).
  * `@kdl/plugin-manager`: Gerenciador universal de plugins (`PluginManager`), oferecendo instalação, remoção, habilitação, desabilitação, atualização, validação, resolução de dependências e detecção de conflitos.
  * `@kdl/marketplace`: Arquitetura de catálogo de Marketplace indexando 9 categorias de extensão (`Plugin`, `Template`, `Theme`, `Provider`, `Command`, `Preset`, `Asset`, `Skill`, `Agent`).
  * `@kdl/extensions`: Registro e carregador de extensões de terceiros (`ExtensionRegistry`).
  * `@kdl/api`: Fachada de API pública unificada (`KDL`), oferecendo acesso estático e simplificado a todos os motores do Framework (`LandingEngine`, `AuditEngine`, `DeliveryEngine`, `DoctorEngine`, `CommandRegistry`, etc.).
  * `@kdl/hooks`: Sistema de 12 ganchos de ciclo de vida do Framework (`HookManager`) cobrindo `beforeBuild`/`afterBuild`, `beforeAudit`/`afterAudit`, `beforeGenerate`/`afterGenerate`, `beforePublish`/`afterPublish`, `beforeDeploy`/`afterDeploy`, `beforePluginLoad`/`afterPluginLoad`.
  * `@kdl/events-sdk`: SDK de eventos (`EventSDK`), permitindo que plugins e extensões escutem (`on`), emitam (`emit`), cancelem (`cancel()`) e modifiquem o payload de eventos.
  * **Conformidade com o Princípio Aberto/Fechado (Open/Closed Principle):** Núcleo imutável e 100% extensível por SDKs, Plugins, Providers, Hooks e Eventos.
  * **Relatórios Finais e Auditoria Master:**
    * `reports/sdk-report.md`: Relatório de arquitetura do Master SDK e Plugin SDK.
    * `reports/plugin-report.md`: Relatório de gerenciamento e ciclo de vida de plugins.
    * `reports/marketplace-report.md`: Relatório de arquitetura do Marketplace.
    * `reports/api-report.md`: Relatório da API Pública unificada, Hooks e Events SDK.
    * `reports/ecosystem-report.md`: Relatório de conformidade do Ecossistema.
    * `reports/final-framework-report.md`: **Relatório Final da Versão 1.0.0**, homologando a arquitetura completa do KDL Landing Framework.
    * **Suíte de Testes Final:** 114 especificações de teste unitário e integração executadas com **100% de aprovação (114/114 Passed)**.
