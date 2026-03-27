/* =========================
   GLOBAL + CONTACT JS
========================= */

document.addEventListener('DOMContentLoaded', () => {

   /* =========================
      MOBILE MENU
   ========================= */
   const mbt = document.getElementById('mbt');
   const mm = document.getElementById('mm');

   if (mbt && mm) {
      mbt.addEventListener('click', () => {
         mm.classList.toggle('open');
      });

      mm.querySelectorAll('a').forEach(a => {
         a.addEventListener('click', () => mm.classList.remove('open'));
      });
   }

   /* =========================
      MOBILE ACCORDION
   ========================= */
   document.querySelectorAll('.acc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
         btn.classList.toggle('open');
         btn.nextElementSibling.classList.toggle('open');
      });
   });


   const ro = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
         if (e.isIntersecting) {
            const idx = Array.from(e.target.parentElement?.children || []).indexOf(e.target);
            setTimeout(() => e.target.classList.add('in'), idx * 80);
            obs.unobserve(e.target);
         }
      });
   }, { threshold: 0.1 });

   document.querySelectorAll('.rv').forEach(el => ro.observe(el));


   /* =========================
      COUNTER ANIMATION
   ========================= */
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
         if (e.isIntersecting) {
            animateCounter(e.target);
            obs.unobserve(e.target);
         }
      });
   }, { threshold: 0.5 });

   document.querySelectorAll('.counter').forEach(el => co.observe(el));

   /* =========================
      CONTACT FORM (FINAL FIX)
   ========================= */

   const form = document.getElementById('contactForm');

   if (form) {

      function setError(id, errId, show) {
         const el = document.getElementById(id);
         const err = document.getElementById(errId);

         if (!el || !err) return;

         if (show) {
            el.classList.add('error');
            el.classList.remove('success');
            err.classList.remove('hidden');
         } else {
            el.classList.remove('error');
            el.classList.add('success');
            err.classList.add('hidden');
         }
      }

      const validators = {
         firstName: v => v.trim() !== '',
         lastName: v => v.trim() !== '',
         email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
         phone: v => /^[\+\d\s\-\(\)]{7,20}$/.test(v),
         subject: v => v !== '',
         message: v => v.trim().length >= 10,
      };

      // Blur validation
      Object.keys(validators).forEach(id => {
         const el = document.getElementById(id);
         if (!el) return;

         el.addEventListener('blur', () => {
            setError(id, id + 'Err', !validators[id](el.value));
         });
      });

      // Submit validation
      form.addEventListener('submit', function (e) {

         e.preventDefault(); // 🔥 STOP REFRESH

         let valid = true;

         Object.keys(validators).forEach(id => {
            const el = document.getElementById(id);
            const isValid = validators[id](el.value);

            setError(id, id + 'Err', !isValid);

            if (!isValid) valid = false;
         });

         if (!valid) {
            const firstErr = form.querySelector('.error');
            if (firstErr) {
               firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
         }

         // ✅ SUCCESS FLOW
         const btn = document.getElementById('submitBtn');
         const txt = document.getElementById('btnText');

         btn.disabled = true;
         txt.textContent = 'Sending...';

         setTimeout(() => {
            btn.classList.add('hidden');
            document.getElementById('successMsg').classList.remove('hidden');

            form.reset();

            form.querySelectorAll('.field').forEach(f => {
               f.classList.remove('error', 'success');
            });

            form.querySelectorAll('[id$="Err"]').forEach(e => {
               e.classList.add('hidden');
            });

         }, 1200);
      });
   }

});


function toggleFaq(btn) {
   const body = btn.parentElement.querySelector('.faq-body');

   btn.classList.toggle('open');
   body.classList.toggle('open');
}


/* =========================
   SERVICE TABS SWITCH
========================= */

function switchSvc(tab, btn) {

   document.querySelectorAll('.ptab').forEach(b => {
      b.classList.remove('active');
   });

   document.querySelectorAll('.tpanel').forEach(p => {
      p.classList.remove('active');
   });

   btn.classList.add('active');

   const panel = document.getElementById('svc-' + tab);
   if (panel) {
      panel.classList.add('active');
   }
}