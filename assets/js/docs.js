// Docs page: install tabs (remembered in this browser), copying whole code blocks, and the
// contents menu on small screens. Copy buttons with data-copy and the scroll-spy are in main.js.
(() => {
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Tabs
  $$('[data-tabs]').forEach((box) => {
    const key = `fortis.docs.${box.dataset.tabs}`;
    const tabs = $$('[role="tab"]', box);
    const show = (name, save) => {
      if (!tabs.some((t) => t.dataset.tab === name)) return;
      tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
      $$('[data-panel]', box).forEach((p) => { p.hidden = p.dataset.panel !== name; });
      if (save) {
        try { localStorage.setItem(key, name); } catch { /* storage blocked */ }
      }
    };
    tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.tab, true)));
    let saved = null;
    try { saved = localStorage.getItem(key); } catch { /* storage blocked */ }
    if (saved) show(saved, false);
  });

  // Copy a whole block
  $$('[data-copy-from]').forEach((b) => b.addEventListener('click', async () => {
    const src = document.getElementById(b.dataset.copyFrom);
    if (!src) return;
    try { await navigator.clipboard.writeText(src.innerText.trim()); } catch { return; }
    const label = b.lastChild;
    const prev = label.textContent;
    b.classList.add('done');
    label.textContent = 'Copied';
    setTimeout(() => { b.classList.remove('done'); label.textContent = prev; }, 1600);
  }));

  // Contents menu on small screens
  const toc = document.querySelector('.docs-toc');
  const toggle = document.querySelector('.docs-toc-toggle');
  if (toc && toggle) {
    toggle.addEventListener('click', () => {
      const open = !toc.classList.contains('open');
      toc.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('a', toc).forEach((a) => a.addEventListener('click', () => {
      toc.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
})();
