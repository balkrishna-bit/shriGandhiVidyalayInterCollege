/* School Website JS */

function $(sel){
  return document.querySelector(sel);
}

function setMobileNavBehavior(){
  const btn = $('.menu-btn');
  const links = $('.nav-links');
  if(!btn || !links) return;

  btn.addEventListener('click', () => {
    links.classList.toggle('open');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });

  // Close nav when clicking a link (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if(window.innerWidth <= 860){
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function initForms(){
  const admissionsForm = $('#admissions-form');
  const contactForm = $('#contact-form');

  if(admissionsForm){
    admissionsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const notice = $('#admissions-notice');
      if(notice) {
        notice.classList.add('show');
        notice.textContent = 'Thanks! Your admission enquiry has been saved locally for this demo.';
      }
      // Demo-only: store last submission
      try{
        const payload = Object.fromEntries(new FormData(admissionsForm).entries());
        localStorage.setItem('lastAdmissionsEnquiry', JSON.stringify(payload));
      }catch(err){}
      admissionsForm.reset();
      // Scroll to notice
      if(notice) notice.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }

  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const notice = $('#contact-notice');
      if(notice) {
        notice.classList.add('show');
        notice.textContent = 'Message sent! (Demo: stored locally in your browser.)';
      }
      try{
        const payload = Object.fromEntries(new FormData(contactForm).entries());
        localStorage.setItem('lastContactMessage', JSON.stringify(payload));
      }catch(err){}
      contactForm.reset();
      if(notice) notice.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }
}

function highlightCurrentNav(){
  const page = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html':'home',
    'about.html':'about',
    'admissions.html':'admissions',
    'academics.html':'academics',
    'contact.html':'contact'
  };
  const activeKey = map[page] || 'home';
  const active = document.querySelector(`[data-nav="${activeKey}"]`);
  if(active){
    active.style.background = 'rgba(14,165,233,.14)';
    active.style.color = '#0f172a';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setMobileNavBehavior();
  initForms();
  highlightCurrentNav();
});

