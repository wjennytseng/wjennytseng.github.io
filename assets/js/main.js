(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Header background once the page scrolls
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Theme toggle (follows the system until the visitor chooses)
  const toggle = document.querySelector("[data-theme-toggle]");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : systemDark.matches;
  const labelToggle = () => toggle.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  labelToggle();
  systemDark.addEventListener("change", labelToggle);
  toggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    labelToggle();
  });

  // Mobile menu
  const menuBtn = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  const setMenu = open => {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    header.classList.toggle("is-open", open);
  };
  menuBtn.addEventListener("click", () => setMenu(menu.hidden));
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !menu.hidden) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  window.matchMedia("(min-width: 921px)").addEventListener("change", event => {
    if (event.matches) setMenu(false);
  });

  // Count-up for headline numbers
  const countUp = el => {
    const target = Number(el.dataset.count);
    if (reduceMotion || !target) return;
    const start = performance.now();
    const duration = 1400;
    const tick = now => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  };

  // Reveal on scroll
  const revealables = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        entry.target.querySelectorAll("[data-count]").forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealables.forEach(el => io.observe(el));

    // Highlight the section in view
    const links = [...document.querySelectorAll(".nav a")];
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach(section => spy.observe(section));
  } else {
    root.classList.add("reveal-all");
  }

  // Copy email
  const copyBtn = document.querySelector("[data-copy]");
  const copyStatus = document.querySelector(".copy-status");
  const copyLabel = copyBtn && copyBtn.querySelector("[data-copy-label]");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy);
        copyLabel.textContent = "Copied";
        copyStatus.textContent = "Email address copied to your clipboard.";
      } catch (e) {
        copyStatus.textContent = `My email is ${copyBtn.dataset.copy}`;
      }
      setTimeout(() => { copyLabel.textContent = "Copy email"; }, 2400);
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = String(new Date().getFullYear()); });
  window.__siteReady = true;
})();
