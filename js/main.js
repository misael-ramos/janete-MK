/* ============================================================
   CONFIGURAÇÃO — edite aqui
   ============================================================ */
const WHATSAPP = "5581900000000"; // número da Janete com DDI+DDD, só dígitos
const MSG_PADRAO = "Olá, Janete! Vim pelo site e quero saber mais sobre os produtos Mary Kay.";

/* ---------- Header muda ao rolar ---------- */
const header = document.getElementById("header");
addEventListener("scroll", () => {
  header.classList.toggle("rolado", scrollY > 40);
}, {passive:true});

/* ---------- Menu mobile ---------- */
const nav = document.getElementById("nav");
document.getElementById("menuBtn").addEventListener("click", () => nav.classList.toggle("aberta"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("aberta")));

/* ---------- Reveal no scroll (IntersectionObserver) ---------- */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visivel");
      obs.unobserve(e.target);
    }
  });
}, {threshold:.15});
document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

/* ---------- Efeito ripple nos botões ---------- */
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const r = document.createElement("span");
    r.className = "ripple";
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + "px";
    r.style.left = (e.clientX - rect.left - size/2) + "px";
    r.style.top  = (e.clientY - rect.top  - size/2) + "px";
    btn.appendChild(r);
    setTimeout(() => r.remove(), 650);
  });
});

/* ---------- Botões que abrem o WhatsApp ---------- */
function abrirWhats(msg) {
  open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
}
document.querySelectorAll(".js-whats").forEach(el => {
  el.addEventListener("click", e => { e.preventDefault(); abrirWhats(MSG_PADRAO); });
});
document.querySelectorAll(".js-comprar").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    const p = el.dataset.produto;
    abrirWhats(`Olá, Janete! Quero comprar o produto: ${p}. Pode me passar mais detalhes?`);
  });
});
