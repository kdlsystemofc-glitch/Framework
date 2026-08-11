# Diretrizes de Uso de Skills Locais (Skills Guidelines)

> **"O poder de um agente de IA reside na orquestração dinâmica de suas capacidades. A estática limita; a descoberta contínua liberta."**

---

## 1. Introdução

O **KDL Landing Framework** é universal e imune à obsolescência tecnológica. Uma de suas principais inovações é a **Independência de Ferramentas Estáticas**. Não escrevemos prompts que dependem de nomes específicos de habilidades do Antigravity ou do Claude Code, pois novas ferramentas e melhorias de segurança são adicionadas constantemente.

Esta diretriz estabelece o modelo de comportamento que a IA deve seguir para escanear, selecionar, justificar e combinar suas habilidades ativas em cada fase do projeto.

---

## 2. O Protocolo de Descoberta Ativa (Discovery Protocol)

Antes de iniciar qualquer uma das 10 etapas de desenvolvimento (do Discovery à Publicação), o agente de IA executora deve realizar um passo obrigatório de **Varredura e Descoberta de Skills**.

### Passos do Protocolo:
1. **Varredura Física:** O agente executa comandos locais ou lê seus metadados de configuração para listar todos os arquivos de habilidades disponíveis nos diretórios de customização locais (como `.agents/skills` do workspace ou diretórios globais do usuário).
2. **Classificação Temática:** O agente agrupa as habilidades encontradas em categorias úteis para a fase atual do projeto (ex: Redação, Otimização de Performance, Análise de SEO, Animação de Código, Revisão Estética).
3. **Mapeamento de Relevância:** Seleção das habilidades que oferecem o maior ganho de qualidade para a tarefa em andamento.
4. **Registro de Justificativa:** A IA deve escrever, em seu plano de trabalho, uma justificativa em parágrafo descrevendo por que escolheu essas habilidades e como as combinará de forma harmônica.

---

## 3. Filosofia de Orquestração Dinâmica

O framework incentiva a fusão de múltiplas habilidades simultaneamente.

```text
               ┌──────────────────────┐
               │  Varredura de Skills  │
               └──────────┬───────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
      [UX & Copy]    [Performance]    [SEO & Code]
            │             │             │
            └─────────────┼─────────────┘
                          │
                          ▼
            ┌───────────────────────────┐
            │   Justificativa e Plano   │
            └───────────────────────────┘
```

* **Sem Limitações de Contexto Artificial:** O agente não deve restringir o uso de habilidades para economizar tokens de contexto se o uso dessas ferramentas for necessário para garantir a qualidade estética, a segurança de código ou a conformidade de acessibilidade (WCAG).
* **Prevenção de Sobreposição Conflitante:** Ao combinar mais de três habilidades complexas, a IA deve definir qual delas será a líder da fase (ex: `frontend-design` liderando o design visual, enquanto `gpt-taste` e `design-spells` adicionam as animações de suporte).

---

## 4. Boas Práticas vs. Anti-Patterns (Más Práticas)

### Boas Práticas
* **Inspeção de Instruções de Skills:** Quando uma habilidade relevante for selecionada, o agente deve ler seu arquivo principal de instruções (geralmente `SKILL.md` ou arquivo equivalente) antes de executar qualquer modificação no código.
* **Auto-Auditoria de Segurança:** Utilizar habilidades locais de scanner de segurança antes de subir código ou dependências de bibliotecas externas para produção.

### Anti-Patterns
* ❌ **Hardcoding de Nomes de Skills:** Escrever diretrizes como *"Use a skill gpt-taste para criar o bento grid"*. Se a skill mudar de nome ou for desativada, a instrução torna-se inútil. Em vez disso, use *"Utilize a habilidade de otimização de bento grids e layouts avançados disponível localmente"*.
* ❌ **Ignorar a Descoberta Ativa:** Assumir que as habilidades listadas no início do projeto são as únicas disponíveis até o fim da execução. O escaneamento deve ser executado no início de **cada fase**.

---

## 5. Checklist de Gestão de Habilidades

- [ ] A varredura de ferramentas locais foi executada no início desta fase de desenvolvimento?
- [ ] Foram listadas todas as capacidades ativas que podem aprimorar a entrega da etapa?
- [ ] A seleção das ferramentas foi documentada no plano com justificativa conceitual clara?
- [ ] O plano de codificação detalha qual habilidade tem a precedência ou controle principal?
- [ ] Os prompts e especificações gerados estão livres de referências rígidas a nomes específicos de ferramentas (garantindo universalidade)?

---

## 6. Referências Cruzadas
* Consulte [MANIFESTO.md](file:///c:/Framework/MANIFESTO.md) para alinhar a orquestração de IA com a governança da KDL.
* Consulte [checklists/development-gate.md](file:///c:/Framework/checklists/development-gate.md) para verificar se as ferramentas de auditoria locais foram ativadas no código de produção.
