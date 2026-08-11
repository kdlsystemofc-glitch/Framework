# Diretrizes de Design de Seção Hero (Hero Guidelines)

> **"A seção Hero é o trailer do seu filme. Se ele falhar em capturar a atenção em 3 segundos, o espectador irá embora. Ela deve ser a síntese perfeita de primeira impressão, impacto inicial e storytelling visual."**

---

## 1. Introdução

A seção Hero é a primeira dobra visível de uma Landing Page. Ela define a direção de arte do projeto, estabelece a proposta de valor e dita o tom da experiência que se segue. IAs costumam falhar ao criar seções Hero porque geram layouts simétricos genéricos (texto à esquerda, formulário/imagem genérica à direita) e empilham textos longos em containers estreitos.

Esta diretriz estabelece as regras e conceitos avançados para projetar seções Hero memoráveis, de alto contraste visual e legibilidade absoluta.

---

## 2. Conceitos Avançados da Seção Hero

### A. Primeira Impressão e Impacto Inicial
O impacto inicial é criado pela combinação de uma tipografia monumental e uma atmosfera imersiva. A primeira dobra deve se parecer com a abertura de um portal digital, fazendo com que o usuário pare o scroll e queira simplesmente contemplar a página por alguns segundos.

### B. O Protagonismo da Logo e Introdução Cinematográfica
A logo da marca do cliente não deve ser tratada como um simples elemento estático no canto superior esquerdo.
1. **Intros Cinematográficas (Initial Loading Animation):** Ao abrir o site, antes de renderizar o conteúdo, a logo deve passar por uma revelação elegante (ex: um efeito de traçado em SVG surgindo com stroke-dashoffset ou um fade sutil combinado com escala linear suave baseada em física de aceleração).
2. **Integração de Branding no Hero:** O cabeçalho de navegação (Header) deve utilizar `backdrop-filter: blur()` (efeito glassmorphism) e possuir um posicionamento cirúrgico de espaçamento que dê respiro e autoridade à logo.
3. **Resolução Vetorial Obrigatória:** A logo deve ser implementada no formato `.svg` limpo e minificado, garantindo nitidez matemática absoluta em qualquer densidade de pixels (Retina, telas 4K).

### C. Composição Tridimensional (Profundidade e Camadas)
Crie uma ilusão de profundidade física (3D) no Hero utilizando camadas separadas:
* **Background Layer:** Fundo escuro com gradiente de malha dinâmico (shifting mesh gradient), com neblina de fundo sutil.
* **Midground Layer:** O H1 principal e as CTAs.
* **Foreground Layer:** Elementos tridimensionais, recortes de produtos de altíssima definição ou formas geométricas orgânicas que flutuam ligeiramente acima ou abaixo do plano de texto, cruzando o layout.
* **Física de Flutuação (Floating Elements):** Elementos decorativos ou de produtos no primeiro plano devem possuir movimentos lentos baseados em funções senoidais de oscilação contínua via CSS, simulando suspensão física real no espaço.

### D. Iluminação, Contraste e Direção Artística
A iluminação define o clima emocional do site:
* **Máscaras Radiais de Brilho (Ambient Glows):** Posicione pontos de luz coloridos difusos (radial-gradients com grande blur) atrás dos elementos de produto ou textos principais.
* **Efeito Vinheta (Vignette):** Escureça os cantos externos da tela com gradientes radiais sobrepostos para forçar o foco do olhar do usuário no centro do H1 e nas CTAs.

---

## 3. A Regra de Ouro das 2 Linhas

O título principal (H1) **nunca** deve exceder 3 linhas de texto no viewport de desktop. O ideal de design premium é mantê-lo em exatamente **2 linhas**. 

### Como Garantir as 2 Linhas (Fórmula Técnica)
1. **Container Ultra-Largo:** O container que abriga o H1 deve utilizar largura estendida. Classes CSS como `max-w-5xl` ou `max-w-6xl` são obrigatórias se o H1 estiver centralizado.
2. **Escala de Fonte Fluida:** Utilize unidades de viewport com limites seguros (`clamp()`) para que a tipografia se adapte organicamente ao tamanho da tela.
   ```css
   h1 {
     font-size: clamp(2.5rem, 6vw, 5.5rem);
     line-height: 1.1;
     letter-spacing: -0.02em;
   }
   ```
3. **Restrição de Caracteres:** A cópia do H1 deve ser curta e impactante (geralmente entre 35 e 60 caracteres).

---

## 4. Padrões de Layout Hero

Banimos o layout simétrico empilhado padrão de IA. O framework recomenda três composições estruturais:

### A. O Centro Cinematográfico (Cinematic Center)
* **Estrutura:** Texto perfeitamente centralizado com largura estendida. Duas chamadas para ação (CTAs) alinhadas lado a lado. Um asset de fundo (imagem conceitual, gradient mesh ou vídeo sutil) ocupando toda a tela com uma máscara escura (radial fade/backdrop filter) para garantir o contraste.
* **Uso ideal:** Segmentos de luxo, produtos de alta tecnologia, clínicas premium.

### B. Assimetria Artística (Artistic Asymmetry)
* **Estrutura:** O H1 é alinhado à esquerda, mas com grande deslocamento (ex: `padding-left: 10%`). Um elemento visual flutuante tridimensional ou imagem abstrata se sobrepõe ao texto a partir do canto inferior direito.
* **Uso ideal:** Escritórios de advocacia modernos, estúdios de design, marcas de moda.

### C. Split Editorial (Editorial Split)
* **Estrutura:** Divisão em duas colunas assimétricas (ex: 60% texto, 40% imagem) com amplo uso de espaço negativo. O H1 utiliza fontes com serifas sofisticadas ou displays ultracondensados.
* **Uso ideal:** Restaurantes gourmet, consultorias de negócios, marcas de arquitetura.

---

## 5. Boas Práticas vs. Anti-Patterns (Más Práticas)

### Boas Práticas (Padrões KDL)
* **Botões de CTA com Alto Contraste:** Se o fundo é escuro, o botão principal deve ser claro (branco ou cor de acento vibrante) com texto escuro e legível.
* **Imagens de Fundo com Tratamento de Cor:** Aplicar filtros CSS como `grayscale()`, `contrast()` e blends como `mix-blend-mode: luminosity` para evitar que a imagem compita com o texto.
* **Navegação Flutuante Integrada:** O cabeçalho (nav) deve ser uma barra flutuante minimalista (estilo glassmorphism) integrada à dobra inicial.

### Anti-Patterns (Erros de IA)
* ❌ **Títulos de 5+ Linhas:** Texto espremido em uma coluna de 30% da largura.
* ❌ **Badges Flutuantes Infantis:** Selos redondos de "Garantido" ou "Melhor Escolha" flutuando sem contexto sobre o H1.
* ❌ **Imagens Stock Clichês:** Fotos de pessoas sorrindo em escritórios genéricos sem tratamento artístico.
* ❌ **Botões Invisíveis:** Botões com bordas finas (ghost buttons) e texto de baixo contraste sobre fundos complexos.

---

## 6. Checklist da Seção Hero

A IA executora deve validar os seguintes pontos no código da seção Hero:

- [ ] O H1 quebra em no máximo 2 ou 3 linhas no desktop?
- [ ] O container do título tem largura superior a `max-w-4xl`?
- [ ] O contraste de cor entre o texto e o fundo respeita a norma WCAG (mínimo de 4.5:1)?
- [ ] A logo em formato SVG possui uma animação inicial de revelação elegante e fluida?
- [ ] Foram definidos pontos de iluminação (ambient glows) e vinheta nas bordas para focar o olhar?
- [ ] Elementos decorativos no primeiro plano (foreground) possuem física de oscilação lenta (floating motion)?
- [ ] O layout foge da estrutura clássica e chata de 50/50 simétrico?

---

## 7. Referências Cruzadas
* Consulte [references/design-principles.md](file:///c:/Framework/references/design-principles.md) para regras de tipografia, qualidade de imagem e paleta de cores.
* Consulte [references/copywriting.md](file:///c:/Framework/references/copywriting.md) para estratégias de redação de propostas de valor.
* Consulte [references/motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md) para animações de entrada (intro sequences) e física do movimento.
