# Janete Belo — Consultora Independente Mary Kay

Landing page de alta conversão para a consultora Mary Kay **Janete Belo**, com identidade visual premium (preto + dourado), animações modernas e todos os CTAs direcionados ao WhatsApp.

![Identidade](https://img.shields.io/badge/identidade-JB%20preto%20%2B%20dourado-C9A468)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS%20puro-informational)

## Estrutura do projeto

```
janete-belo-site/
├── index.html              # Estrutura da página (seções e conteúdo)
├── css/
│   └── style.css           # Todo o estilo: tokens de design, botões, animações, responsivo
├── js/
│   └── main.js             # Interações: WhatsApp, ripple, reveal no scroll, menu mobile
├── assets/
│   └── img/
│       ├── produtos/       # Fotos dos produtos (ver LEIA-ME.md da pasta)
│       └── depoimentos/    # Fotos das clientes dos depoimentos (opcional)
└── README.md
```

## Como rodar localmente

Não há build nem dependências — é HTML, CSS e JS puros.

1. Baixe/clon​e o projeto
2. Abra o `index.html` no navegador, ou sirva com um servidor local:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .
```

3. Acesse `http://localhost:8000`

## Configuração obrigatória antes de publicar

Abra o `js/main.js` e edite as duas primeiras constantes:

```js
const WHATSAPP = "5581900000000"; // número da Janete: DDI + DDD + número, só dígitos
const MSG_PADRAO = "Olá, Janete! Vim pelo site e quero saber mais sobre os produtos Mary Kay.";
```

Todos os botões do site (comprar, consultoria, botão flutuante, footer) usam esse número. Os botões **Comprar** enviam automaticamente o nome do produto na mensagem.

## Como trocar as imagens

Os quadros com o monograma "JB" são placeholders. Para trocar:

1. Coloque a foto em `assets/img/produtos/` (ex.: `serum.jpg`)
2. No `index.html`, dentro da `div.produto__foto`, substitua o `<span class="produto__marca">JB</span>` por:

```html
<img src="assets/img/produtos/serum.jpg" alt="Sérum Ativador de Juventude">
```

O CSS já cuida do enquadramento (`object-fit: cover`) e do zoom suave no hover. O mesmo vale para a foto da consultora na seção "Conheça sua consultora" (`div.consultora__foto`).

## Como editar produtos, preços e textos

Tudo é conteúdo direto no `index.html`:

- **Produtos**: cada card é um `<article class="produto">`. Duplique um bloco para adicionar produto novo. O atributo `data-produto` do botão define o nome enviado no WhatsApp.
- **Preço "de/por"**: use `<span class="de">` (riscado) e `<span class="por">`.
- **Selo** ("Mais vendido", "Kit completo"): o `<span class="produto__selo">` é opcional — remova se não quiser.
- **Depoimentos**: cada um é um `<article class="depoimento">`.

## Identidade visual (tokens)

As cores e fontes ficam centralizadas no topo do `css/style.css` em variáveis CSS — mude ali e o site inteiro acompanha:

| Token | Valor | Uso |
|---|---|---|
| `--preto` | `#0D0B08` | Fundo principal |
| `--dourado` | `#C9A468` | Destaques, botões, logo |
| `--dourado-claro` | `#E8CF9E` | Brilhos e hovers |
| `--creme` | `#F5EFE3` | Seções claras |
| `--fonte-display` | Marcellus | Títulos (luxo) |
| `--fonte-corpo` | Outfit | Textos e botões |

Isso torna o projeto fácil de **adaptar para outros segmentos**: trocando os tokens e o conteúdo, a mesma base vira o site de outro negócio.

## Recursos de conversão e animação

- Botões com brilho dourado animado, ripple no clique e seta deslizante
- CTAs 100% integrados ao WhatsApp com mensagem pré-preenchida por produto
- Botão flutuante de WhatsApp com pulso
- Prova social no hero e stats de credibilidade
- Reveal suave das seções no scroll (IntersectionObserver)
- Header com blur que aparece ao rolar
- Monograma JB animado ao fundo do hero + linha dourada que se desenha
- Responsivo (menu hambúrguer no mobile) e com suporte a `prefers-reduced-motion`

## Publicação

Por ser um site estático, pode ser publicado gratuitamente em:

- **GitHub Pages** — suba o repositório e ative Pages na branch `main`
- **Netlify / Vercel** — arraste a pasta ou conecte o repositório
- **Cloudflare Pages**

---

Feito com HTML, CSS e JavaScript puros — sem frameworks, sem build, carregamento leve.
