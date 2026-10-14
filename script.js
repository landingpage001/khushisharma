/* ==========================================================
   Khushi Sharma – Trading Learning Community
   ========================================================== */

// 👉 Apna Telegram channel link yahan ek baar daalo. Page ke saare buttons me apne aap lag jayega.
const TELEGRAM_URL = "https://t.me/YOUR_CHANNEL_USERNAME";

document.addEventListener("DOMContentLoaded", function () {
  // 1) Set Telegram link on every join button
  document.querySelectorAll(".js-telegram").forEach(function (btn) {
    btn.setAttribute("href", TELEGRAM_URL);
  });

  // 2) Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3) Gentle scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // 4) Sticky mobile CTA: show after hero, hide when a CTA section is on screen
  var sticky = document.getElementById("stickyCta");
  var hero = document.getElementById("hero");
  if (sticky && hero && "IntersectionObserver" in window) {
    var heroOut = false;
    var visibleCtas = new Set();
    var stickyLink = sticky.querySelector("a");

    function update() {
      var show = heroOut && visibleCtas.size === 0;
      sticky.classList.toggle("show", show);
      sticky.setAttribute("aria-hidden", show ? "false" : "true");
      if (stickyLink) stickyLink.setAttribute("tabindex", show ? "0" : "-1");
    }

    new IntersectionObserver(function (entries) {
      heroOut = !entries[0].isIntersecting;
      update();
    }, { threshold: 0 }).observe(hero);

    var ctaObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visibleCtas.add(e.target); else visibleCtas.delete(e.target);
      });
      update();
    }, { threshold: 0.2 });
    document.querySelectorAll(".cta-section").forEach(function (el) { ctaObs.observe(el); });
  }
});
