# Diretrizes de Experiência Cinematográfica (Cinematic Experience)

> **"Trate o navegador como a lente de uma câmera. O scroll do usuário é o motor que move a câmera através do cenário, gerando efeitos de profundidade, foco e ritmo que conduzem o fluxo emocional."**

---

## 1. Introdução

Uma Landing Page cinematográfica se afasta do conceito tradicional de "site institucional" para se aproximar de um curta-metragem interativo. Em vez de simplesmente rolar blocos de texto chapados na tela, o usuário deve experimentar variações de profundidade, escalas tipográficas monumentais, transições de cena e um senso contínuo de progressão dramática.

Esta diretriz ensina a IA a projetar o ritmo, a atmosfera e as passagens de cena de uma Landing Page KDL.

---

## 2. O Ritmo da Lente (Escala e Contraste Visual)

Em um filme, diretores alternam entre **planos gerais** (grande angular) e **planos detalhe** (macro). Na web, traduzimos isso através do contraste tipográfico e do uso de espaço negativo.

### A Alternância de Contrastes (Scroll Rhythm)
* **Seção de Grande Impacto (Plano Geral):** Seções focadas em uma única palavra ou frase monumental (ex: `font-size: clamp(3rem, 10vw, 8rem)`), com muito espaço em branco ao redor. Serve para criar respiro e fixar uma ideia central na mente do usuário.
* **Seção de Alta Densidade (Plano Detalhe):** Seções como Bento Grids ou listas técnicas, onde as informações são agrupadas de forma compacta e rica em detalhes visuais e tipográficos.
* **A Regra do Respiro:** É proibido encadear duas seções de alta densidade sem um bloco de respiro visual ou uma transição limpa entre elas.

---

## 3. Transições de Cena e Efeitos de Câmera (Movie Effects)

O scroll do usuário não deve apenas empurrar uma seção para cima; ele deve desencadear transições visuais sofisticadas baseadas em movimentos reais de filmagem:

### A. Efeito Dolly (Zoom de Câmera)
Conforme o usuário rola o scroll, um elemento conceitual de produto ou textura de fundo aumenta ligeiramente de tamanho (`scale(1.0) -> scale(1.15)`) de forma desacelerada. Isso cria a ilusão física de que o usuário está caminhando em direção ao objeto.

### B. Panorâmica Horizontal (Scroll Direction Shift)
Em seções específicas (como uma galeria de fotos do produto do cliente), o scroll vertical do navegador é "capturado" e convertido em um movimento horizontal suave. O usuário rola para baixo, mas a câmera desliza horizontalmente de forma contínua, simulando uma panorâmica cinematográfica (camera panning).

### C. Composição de Camadas (Layer Composition)
Divida a cena em camadas que se sobrepõem e deslizam em velocidades distintas:
* **Background Layer:** A textura escura ou gradient mesh em movimento lento.
* **Midground Layer:** O H1 principal e as CTAs.
* **Foreground Layer:** Imagens de produtos de alta qualidade que flutuam e sobem rapidamente, cobrindo parcialmente os textos e gerando tridimensionalidade.

### D. Focagem de Câmera (CSS Blur Scrubbing)
Elementos que estão entrando no viewport surgem desfocados (`filter: blur(8px)`) e vão ganhando nitidez (`filter: blur(0px)`) conforme chegam ao centro da tela, emulando o ajuste de foco de uma lente física.

---

## 4. Direção de Arte da Atmosfera (A Vibe)

Toda landing page KDL deve possuir uma atmosfera própria baseada na identidade conceitual da marca.

* **Filtros e Texturas de Fundo:** O uso de gradientes simples é desencorajado. Use texturas de ruído analógico (noise overlay) ou gradientes de malha em movimento lento para dar "peso" físico à tela.
* **Máscaras Radiais de Escuridão:** Cantos escurecidos sutilmente nas bordas da página (vinheta) ajudam a direcionar o foco do usuário para o centro do conteúdo, exatamente como na fotografia cinematográfica.

---

## 5. Boas Práticas vs. Anti-Patterns (Más Práticas)

### Boas Práticas
* **Card Stacking com Limite Físico:** Garantir que o efeito de empilhamento de seções não quebre a leitura em dispositivos móveis, desativando ou simplificando o efeito em telas menores.
* **Foco no Conteúdo:** Animações e movimentos devem servir para destacar o texto e os CTAs, nunca para ofuscá-los.

### Anti-Patterns
* ❌ **Scrubbing Descontrolado:** Forçar o scroll do usuário a parar (scroll hijacking) de forma agressiva para exibir uma animação longa. O controle do scroll deve sempre pertencer ao usuário.
* ❌ **Falta de Coesão Estética:** Misturar estilos de transição diferentes (ex: uma seção gira, a outra corre para o lado, a terceira pisca). Escolha uma metáfora física (ex: empilhamento vertical) e mantenha-a em toda a página.

---

## 6. Checklist de Experiência Cinematográfica

- [ ] A página alterna logicamente entre seções de alto impacto visual (respiro) e seções de alta densidade informativa?
- [ ] O scroll do usuário controla diretamente a intensidade de pelo menos uma transição ou efeito visual (opacidade, blur ou escala)?
- [ ] Os efeitos Dolly e Panorâmica Horizontal estão configurados de forma suave e controlada?
- [ ] Existe uma vinheta ou máscara de iluminação sutil direcionando o foco do olhar?
- [ ] O efeito de transição de seções é desativado ou adaptado para telas mobile com segurança?
- [ ] O controle de scroll original do navegador foi respeitado (zero scroll hijacking prejudicial)?

---

## 7. Referências Cruzadas
* Consulte [references/parallax-guidelines.md](file:///c:/Framework/references/parallax-guidelines.md) para controle geométrico de profundidade.
* Consulte [references/motion-guidelines.md](file:///c:/Framework/references/motion-guidelines.md) para configurações técnicas de tempo e aceleração de GPU.
* Consulte [references/design-principles.md](file:///c:/Framework/references/design-principles.md) para alinhamento geométrico, qualidade de imagem e grids assimétricos.
