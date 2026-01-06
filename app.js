// app.js — GSAP Scroll interactions implementing the brochure behavior
gsap.registerPlugin(ScrollTrigger);

// Utility: all scenes
const scenes = gsap.utils.toArray('.panel');

// Global snap so each major scene feels like one brochure page
ScrollTrigger.create({
  snap: 1 / (scenes.length - 1),
  duration: {min: 0.2, max: 0.6},
  ease: "power2.out"
});

/* ---------- SCENE 1: HERO — logo fades, grid expands -> transitions ---------- */
gsap.timeline({
  scrollTrigger: {
    trigger: "#scene-1",
    start: "top top",
    end: "+=100%",
    scrub: 0.9,
    pin: true
  }
})
.to(".logo-wrap", {opacity: 0, y: -36, duration: 0.7, ease: "power2.out"})
.to(".switch-grid", {scale: 1.12, y: -20, duration: 1.2, ease: "power2.out"}, 0)
.to(".switch-grid", {xPercent: -10, opacity: 1, duration: 1.2}, 0.6);

/* ---------- SCENE 2: OVERVIEW — image slides in from right, text fades in ---------- */
gsap.timeline({
  scrollTrigger: {
    trigger: "#scene-2",
    start: "top top",
    end: "+=100%",
    scrub: true,
    pin: true
  }
})
.fromTo(".overview-image img", {x: 200, opacity: 0}, {x: 0, opacity: 1, ease: "power2.out", duration: 1})
.to(".overview-text", {opacity: 1, y: 0, duration: 0.6, ease: "power1.out"}, 0.7);

/* ---------- SCENE 3: VARIANTS — horizontal controlled by vertical scroll ---------- */
(function(){
  const track = document.querySelector('.variants-track');
  const items = gsap.utils.toArray('.variant');
  const total = items.length;
  gsap.set(track, {width: (total * 100) + "%"});
  items.forEach((it)=> gsap.set(it, {width: (100/total) + "%"}));

  gsap.to(track, {
    xPercent: -100 * (total - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#scene-3",
      start: "top top",
      end: () => "+=" + (window.innerWidth * 1.0),
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      onUpdate: self => {
        const progress = self.progress;
        const idx = Math.round(progress * (total - 1));
        const caption = document.querySelector('.variant-caption');
        if(caption && items[idx]) caption.textContent = items[idx].dataset.color || '';
      },
      snap: {
        snapTo: 1 / (total - 1),
        duration: 0.35,
        ease: "power1.out"
      }
    }
  });
})();

/* ---------- SCENE 4: PANELS — layered cinematic parallax ---------- */
gsap.timeline({
  scrollTrigger: {
    trigger: "#scene-4",
    start: "top top",
    end: "+=120%",
    scrub: true,
    pin: true
  }
})
.fromTo(".depth-1", {x: -200, y: -10, scale: 0.98}, {x: -40, y:-20, scale:1.04, duration:1, ease:"power2.out"})
.fromTo(".depth-2", {x: 120, y: 10, scale:0.95, opacity:0.95}, {x: -20, y:0, scale:1, duration:1, ease:"power2.out"}, 0)
.fromTo(".depth-3", {x: 320, y: 30, scale:0.85, opacity:0.85}, {x: 40, y:10, scale:0.92, opacity:1, duration:1, ease:"power2.out"}, 0);

/* ---------- SCENE 5: SPECS — pinned + row-by-row reveal ---------- */
gsap.timeline({
  scrollTrigger: {
    trigger: "#scene-5",
    start: "top top",
    end: "+=120%",
    scrub: true,
    pin: true
  }
})
.fromTo(".spec-row", {y: 24, opacity: 0}, {y: 0, opacity: 1, stagger: 0.18, duration: 0.6, ease: "power2.out"});

/* ---------- SCENE 6: INSTALL — icons animate from different directions ---------- */
gsap.timeline({
  scrollTrigger: {
    trigger: "#scene-6",
    start: "top top",
    end: "+=100%",
    scrub: true,
    pin: true
  }
})
.fromTo(".icon-1", {x: -120, opacity: 0}, {x: 0, opacity: 1, duration: 0.7, ease: "power2.out"})
.fromTo(".icon-2", {y: 120, opacity: 0}, {y: 0, opacity: 1, duration: 0.7, ease: "power2.out"}, 0.12)
.fromTo(".icon-3", {x: 120, opacity: 0}, {x: 0, opacity: 1, duration: 0.7, ease: "power2.out"}, 0.24);

/* ---------- SCENE 7: SHOWROOM — objects move into place, logo fixed ---------- */
gsap.timeline({
  scrollTrigger: {
    trigger: "#scene-7",
    start: "top top",
    end: "+=120%",
    scrub: true,
    pin: true
  }
})
.fromTo(".showroom-stage > div", {y: 60, opacity: 0}, {y:0, opacity:1, stagger:0.16, duration:0.7, ease:"power2.out"})
.to(".fixed-logo", {opacity: 1, duration: 0.6}, 0);

/* ---------- SCENE 8: DEALERS — soft exit form fade ---------- */
gsap.timeline({
  scrollTrigger: {
    trigger: "#scene-8",
    start: "top top",
    end: "+=60%",
    scrub: true,
    pin: true
  }
})
.to(".dealers-inner > h2", {opacity: 1, y: 0, duration: 0.6, ease: "power2.out"})
.to(".dealer-form", {opacity: 1, y: 0, duration: 0.6, ease: "power2.out"}, 0.12);

/* ---------- Accessibility & keyboard navigation — arrow keys move between scenes ---------- */
(function keyboardNav(){
  const positions = scenes.map(s => Math.round(s.getBoundingClientRect().top + window.scrollY));
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if(key !== 'ArrowDown' && key !== 'ArrowUp') return;
    e.preventDefault();
    const current = window.scrollY;
    const idx = positions.reduce((closest, pos, i) => Math.abs(pos - current) < Math.abs(positions[closest] - current) ? i : closest, 0);
    let targetIndex = idx + (key === 'ArrowDown' ? 1 : -1);
    targetIndex = Math.max(0, Math.min(positions.length - 1, targetIndex));
    window.scrollTo({ top: positions[targetIndex], behavior: 'smooth' });
  });
})();

/* ---------- Refresh on resize ---------- */
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
