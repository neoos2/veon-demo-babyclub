// Homepage behaviour: mobile menu, age switch filtering the growth table, sticky mobile CTA, English scale light-up.
// Everything is progressive: without JS all programs are visible and anchors work.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- mobile menu ---------- */
const menu = document.querySelector<HTMLElement>("[data-menu]");
const openBtn = document.querySelector<HTMLButtonElement>("[data-menu-open]");
const closeBtn = document.querySelector<HTMLButtonElement>("[data-menu-close]");

function setMenu(open: boolean, focusBack = true): void {
  if (!menu || !openBtn) return;
  menu.classList.toggle("is-open", open);
  openBtn.setAttribute("aria-expanded", String(open));
  document.documentElement.classList.toggle("menu-open", open);
  document.querySelectorAll<HTMLElement>("main, footer, .header__bar").forEach((el) => { el.inert = open; });
  if (open) {
    menu.querySelector<HTMLElement>("[data-menu-close]")?.focus();
  } else if (focusBack) {
    openBtn.focus();
  }
}
openBtn?.addEventListener("click", () => setMenu(true));
closeBtn?.addEventListener("click", () => setMenu(false));
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false, false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu?.classList.contains("is-open")) setMenu(false);
});
window.matchMedia("(min-width: 1100px)").addEventListener("change", (m) => {
  if (m.matches) setMenu(false, false);
});

/* ---------- header line after scroll ---------- */
const header = document.querySelector<HTMLElement>("[data-header]");
const hero = document.getElementById("top");
if (header && hero && "IntersectionObserver" in window) {
  const sentinel = document.createElement("span");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.className = "scroll-sentinel";
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => header.classList.toggle("is-scrolled", !e.isIntersecting)).observe(sentinel);
}

/* ---------- age switch ---------- */
const AGE_LONG: Record<string, string> = {};
document.querySelectorAll<HTMLButtonElement>(".age-step").forEach((b) => {
  AGE_LONG[b.dataset.age ?? ""] = b.querySelector(".visually-hidden")?.textContent ?? "";
});
const switchButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("#age [data-age]"));
const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-ages]"));
const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-pgroup]"));
const status = document.querySelector<HTMLElement>("[data-age-status]");

function plural(n: number): string {
  const d = n % 10, h = n % 100;
  if (d === 1 && h !== 11) return "напрям";
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return "напрями";
  return "напрямів";
}

function selectAge(age: string): void {
  switchButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.age === age)));
  let shown = 0;
  rows.forEach((r) => {
    const list = r.dataset.ages ?? "any";
    const match = age === "all" || list === "any" || list.split(" ").includes(age);
    const wasHidden = r.hidden;
    r.hidden = !match;
    r.classList.toggle("is-match", age !== "all" && list !== "any" && match);
    if (match) {
      shown++;
      if (!reduce && wasHidden) {
        r.classList.remove("is-entering");
        void r.offsetWidth;
        r.classList.add("is-entering");
      }
    }
  });
  groups.forEach((g) => { g.hidden = !g.querySelector("[data-ages]:not([hidden])"); });
  if (status) {
    status.textContent = age === "all"
      ? "Показано всі напрями."
      : `${AGE_LONG[age]}: ${shown} ${plural(shown)}. Напрями без підтвердженого віку показано завжди.`;
  }
}

switchButtons.forEach((b) => b.addEventListener("click", () => {
  const age = b.dataset.age ?? "all";
  selectAge(b.getAttribute("aria-pressed") === "true" && age !== "all" ? "all" : age);
}));

// hero steps: jump to #age with the age already chosen
document.querySelectorAll<HTMLAnchorElement>("[data-age-pick]").forEach((a) => {
  a.addEventListener("click", () => selectAge(a.dataset.agePick ?? "all"));
});

/* ---------- sticky mobile CTA ---------- */
const cta = document.querySelector<HTMLElement>("[data-sticky-cta]");
const centersEl = document.getElementById("centers");
if (cta && hero && centersEl && "IntersectionObserver" in window) {
  document.documentElement.classList.add("has-sticky");
  // hidden while the hero is on screen, and while any in-flow call to action, #centers or the footer is visible
  let pastHero = false;
  const inView = new Set<Element>();
  const update = () => cta.classList.toggle("is-shown", pastHero && inView.size === 0);
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(hero);
  const flowCtas = document.querySelectorAll("#main .btn, #centers, footer");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) { if (e.isIntersecting) inView.add(e.target); else inView.delete(e.target); }
    update();
  }, { rootMargin: "0px 0px -40px 0px" });
  flowCtas.forEach((el) => io.observe(el));
}

/* ---------- English scale lights up once ---------- */
const enScale = document.querySelector<HTMLElement>("[data-en-scale]");
if (enScale) {
  if (reduce || !("IntersectionObserver" in window)) {
    enScale.classList.add("is-lit");
  } else {
    enScale.classList.add("is-armed");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { enScale.classList.add("is-lit"); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(enScale);
  }
}
