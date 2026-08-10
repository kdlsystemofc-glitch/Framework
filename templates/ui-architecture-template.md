# Modelo de Especificação de Interface (UI Architecture Template)

> **Fase 06 do KDL Landing Framework**
> Este template descreve as decisões geométricas, estruturais e o comportamento de grids bento para guiar o código HTML/CSS final.

---

## 1. Estrutura Geométrica Geral (Grid & Flexbox Layout)

* **Largura Máxima de Container (Geral):** `max-w-6xl` (1200px) ou `max-w-7xl` (1440px) para seções normais.
* **Largura do Container Hero:** `max-w-5xl` (1024px) para garantir H1 em no máximo 2-3 linhas.
* **Espaçamento entre Cards (Gap):** `gap-6` (24px) ou `gap-8` (32px).

---

## 2. Mapa do Grid Bento Matemático (Bento Grid Schema)

Defina a matriz de colunas e linhas da seção Bento Grid, garantindo que não existam células vazias (dense grid).

### Estrutura da Matriz: 3 Colunas (Desktop)
* **Card 1 (Principal):**
  * *Dimensões:* `col-span-2` | `row-span-2`
  * *Conteúdo:* [Ex: Imagem em destaque do produto com máscara escura]
* **Card 2 (Métricas):**
  * *Dimensões:* `col-span-1` | `row-span-1`
  * *Conteúdo:* [Ex: Número gigante estatístico e texto curto descritivo]
* **Card 3 (Recurso 01):**
  * *Dimensões:* `col-span-1` | `row-span-1`
  * *Conteúdo:* [Ex: Texto de destaque com ícone em svg customizado]
* **Card 4 (Depoimento Rápido):**
  * *Dimensões:* `col-span-3` | `row-span-1`
  * *Conteúdo:* [Ex: Carrossel de frases de clientes com amplo espaço de leitura]

---

## 3. Comportamento Responsivo Mobile-First (Responsive Layout)

Descreva a adaptação geométrica para telas sensíveis ao toque (Mobile / Tablet).

* **Viewports Móveis (até 768px):**
  * Todos os `col-span` e `row-span` do Bento Grid são resetados para `col-span-1` (exibição em coluna única vertical).
  * O tamanho da fonte do Hero reduz proporcionalmente via clamp (`clamp(2rem, 8vw, 3rem)`).
  * O menu de navegação do topo encolhe em um menu flutuante compacto estilo glassmorphism.
* **Viewports Tablet (768px a 1024px):**
  * Grade Bento ajustada para 2 colunas.
