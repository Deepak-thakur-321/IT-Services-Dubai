
document.addEventListener('DOMContentLoaded', () => {

   /* Mobile menu */
   const mbt = document.getElementById('mbt');
   const mm = document.getElementById('mm');
   if (mbt && mm) {
      mbt.addEventListener('click', () => mm.classList.toggle('open'));
      mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));
   }

   /* Mobile accordion */
   document.querySelectorAll('.acc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
         btn.classList.toggle('open');
         btn.nextElementSibling.classList.toggle('open');
      });
   });

   /* Scroll reveal */
   const ro = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
         if (e.isIntersecting) {
            const idx = Array.from(e.target.parentElement?.children || []).indexOf(e.target);
            setTimeout(() => e.target.classList.add('in'), idx * 75);
            obs.unobserve(e.target);
         }
      });
   }, { threshold: 0.1 });
   document.querySelectorAll('.rv').forEach(el => ro.observe(el));

   /* Counter animation */
   function animateCounter(el) {
      const target = parseInt(el.dataset.target);
      const start = performance.now();
      const tick = now => {
         const p = Math.min((now - start) / 1800, 1);
         el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
         if (p < 1) requestAnimationFrame(tick);
         else el.textContent = target;
      };
      requestAnimationFrame(tick);
   }
   const co = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
         if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
      });
   }, { threshold: 0.5 });
   document.querySelectorAll('.counter').forEach(el => co.observe(el));

   /* Contact form */
   window.hs = function (ev) {
      ev.preventDefault();
      const btn = document.getElementById('sb');
      const ok = document.getElementById('fok');
      if (!btn || !ok) return;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(() => {
         btn.style.display = 'none';
         ok.classList.remove('hidden');
         ev.target.reset();
      }, 1400);
   };

});

// FAQ Toggle
function toggleFaq(btn) {
   const body = btn.nextElementSibling;
   const isOpen = body.classList.contains('open');
   /* close all */
   document.querySelectorAll('.faq-body').forEach(b => b.classList.remove('open'));
   document.querySelectorAll('.faq-btn').forEach(b => b.classList.remove('open'));
   /* open clicked if it was closed */
   if (!isOpen) {
      body.classList.add('open');
      btn.classList.add('open');
   }
}
