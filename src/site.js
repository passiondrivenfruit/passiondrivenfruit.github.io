// Language menu, game card rail and screenshot gallery. The page works without it: links stay links.
(() => {
  // Language menu: close when clicking elsewhere or pressing Escape.
  document.addEventListener("click", (e) => {
    for (const menu of document.querySelectorAll("details.lang-menu[open]")) if (!menu.contains(e.target)) menu.open = false;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") for (const menu of document.querySelectorAll("details.lang-menu[open]")) { menu.open = false; menu.querySelector("summary").focus(); }
  });

  const rail = document.querySelector(".card-rail");
  if (!rail) return;
  const rtl = document.documentElement.dir === "rtl";

  // Arrows appear only when the cards overflow (wide screens with few games need none).
  const prev = document.querySelector(".rail-arrow.prev");
  const next = document.querySelector(".rail-arrow.next");
  const step = () => (rail.querySelector(".card-slot")?.getBoundingClientRect().width ?? 300) + 24;
  const update = () => {
    const overflow = rail.scrollWidth - rail.clientWidth > 4;
    const pos = Math.abs(rail.scrollLeft);
    prev.hidden = next.hidden = !overflow;
    prev.disabled = pos < 4;
    next.disabled = pos > rail.scrollWidth - rail.clientWidth - 4;
  };
  prev.addEventListener("click", () => rail.scrollBy({ left: rtl ? step() : -step(), behavior: "smooth" }));
  next.addEventListener("click", () => rail.scrollBy({ left: rtl ? -step() : step(), behavior: "smooth" }));
  rail.addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();

  // Gallery: a card opens its screenshots unless the click was on a link inside it.
  const dialog = document.querySelector("dialog.gallery");
  const track = dialog.querySelector(".gallery-track");
  const count = dialog.querySelector(".gallery-count");
  let total = 0;
  const current = () => Math.round(Math.abs(track.scrollLeft) / Math.max(1, track.clientWidth));
  const show = (i) => {
    const target = Math.max(0, Math.min(total - 1, i));
    track.scrollTo({ left: (rtl ? -1 : 1) * target * track.clientWidth, behavior: "smooth" });
  };
  const label = () => { count.textContent = total ? `${current() + 1} / ${total}` : ""; };
  track.addEventListener("scroll", label, { passive: true });
  dialog.querySelector(".gallery-nav.prev").addEventListener("click", () => show(current() - 1));
  dialog.querySelector(".gallery-nav.next").addEventListener("click", () => show(current() + 1));
  dialog.querySelector(".gallery-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); }); // backdrop
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(current() + (rtl ? -1 : 1));
    if (e.key === "ArrowLeft") show(current() + (rtl ? 1 : -1));
  });

  const open = (card) => {
    const shots = (card.dataset.shots || "").split(",").filter(Boolean);
    if (!shots.length) return;
    dialog.querySelector("#gallery-title").textContent = card.dataset.title;
    track.replaceChildren(...shots.map((src, i) => {
      const fig = document.createElement("figure");
      const img = new Image();
      img.src = src; img.alt = `${card.dataset.title} ${i + 1}`; img.decoding = "async";
      fig.append(img);
      return fig;
    }));
    total = shots.length;
    dialog.showModal();
    track.scrollLeft = 0;
    label();
    track.focus();
  };
  for (const card of document.querySelectorAll(".game-card")) {
    card.addEventListener("click", (e) => { if (!e.target.closest("a")) open(card); });
    card.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target === card) { e.preventDefault(); open(card); }
    });
  }
})();
