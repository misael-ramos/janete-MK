/* ============================================================
   CONFIGURAÇÃO — edite aqui
   ============================================================ */
const WHATSAPP  = "5581900000000"; // número da Janete: DDI+DDD+número, só dígitos
const MSG_PADRAO = "Olá, Janete! Vim pelo site e quero saber mais sobre os produtos Mary Kay.";

/* ============================================================
   HEADER — fundo ao rolar
   ============================================================ */
const header = document.getElementById("header");
addEventListener("scroll", () => {
  header.classList.toggle("rolado", scrollY > 40);
}, {passive: true});

/* ============================================================
   MENU MOBILE
   ============================================================ */
const nav = document.getElementById("nav");
document.getElementById("menuBtn").addEventListener("click", () => nav.classList.toggle("aberta"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("aberta")));

/* ============================================================
   REVEAL NO SCROLL
   ============================================================ */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visivel"); obs.unobserve(e.target); }
  });
}, {threshold: .15});

function observarReveal() {
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}
observarReveal();

/* ============================================================
   RIPPLE NOS BOTÕES
   ============================================================ */
function adicionarRipple(btn) {
  btn.addEventListener("click", e => {
    const r    = document.createElement("span");
    r.className = "ripple";
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + "px";
    r.style.left  = (e.clientX - rect.left - size / 2) + "px";
    r.style.top   = (e.clientY - rect.top  - size / 2) + "px";
    btn.appendChild(r);
    setTimeout(() => r.remove(), 650);
  });
}
function ativarRipples() {
  document.querySelectorAll(".btn").forEach(adicionarRipple);
}
ativarRipples();

/* ============================================================
   WHATSAPP
   ============================================================ */
function abrirWhats(msg) {
  open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
}
document.querySelectorAll(".js-whats").forEach(el => {
  el.addEventListener("click", e => { e.preventDefault(); abrirWhats(MSG_PADRAO); });
});

/* ============================================================
   PRODUTOS DINÂMICOS (carregados do painel admin)
   ============================================================ */
const CHAVE_STORAGE = "jb_produtos_v1";

function carregarProdutos() {
  try { return JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || []; }
  catch { return []; }
}

function criarCardProduto(p) {
  const article = document.createElement("article");
  article.className = "produto reveal";

  const fotoHTML = p.foto
    ? `<img src="${p.foto}" alt="${p.nome}" loading="lazy">`
    : `<span class="produto__marca" aria-hidden="true">JB</span>`;

  const seloHTML = p.selo
    ? `<span class="produto__selo">${p.selo}</span>`
    : "";

  const precoDe = p.precoDe
    ? `<span class="de">R$ ${p.precoDe}</span>`
    : "";

  article.innerHTML = `
    <div class="produto__foto">
      ${seloHTML}
      ${fotoHTML}
    </div>
    <div class="produto__corpo">
      ${p.categoria ? `<small class="produto__categoria">${p.categoria}</small>` : ""}
      <h3>${p.nome}</h3>
      <p>${p.descricao || ""}</p>
      <div class="produto__rodape">
        <div class="produto__preco">
          ${precoDe}
          <span class="por">R$ ${p.preco}</span>
        </div>
        <button class="btn btn--escuro js-comprar" data-produto="${p.nome}">
          <span>Comprar</span>
        </button>
      </div>
    </div>`;

  // Ripple e WhatsApp no botão do card recém-criado
  adicionarRipple(article.querySelector(".btn"));
  article.querySelector(".js-comprar").addEventListener("click", e => {
    e.preventDefault();
    abrirWhats(`Olá, Janete! Quero comprar: ${p.nome}. Pode me passar mais detalhes?`);
  });

  return article;
}

function renderizarProdutosDinamicos() {
  const produtos = carregarProdutos().filter(p => p.ativo);
  if (produtos.length === 0) {
    // Sem produtos no admin → mantém os cards estáticos do HTML
    // Ativa WhatsApp nos botões estáticos
    document.querySelectorAll(".js-comprar").forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        abrirWhats(`Olá, Janete! Quero comprar: ${el.dataset.produto}. Pode me passar mais detalhes?`);
      });
    });
    return;
  }

  // Há produtos no admin → substitui o grid inteiro
  const grid = document.querySelector(".produtos__grid");
  if (!grid) return;
  grid.innerHTML = "";
  produtos.forEach(p => grid.appendChild(criarCardProduto(p)));

  // Observar os novos elementos no reveal
  observarReveal();
}

// Adicionar estilo de categoria inline (pequeno, não vale arquivo extra)
const s = document.createElement("style");
s.textContent = `.produto__categoria{
  display:block;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--dourado-escuro);margin-bottom:.15rem;font-weight:500}`;
document.head.appendChild(s);

renderizarProdutosDinamicos();
