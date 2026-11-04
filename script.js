(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');
  const year = document.querySelector('#year');
  const dropdown = document.querySelector('.nav-item.has-menu');
  const trigger = dropdown ? dropdown.querySelector('.nav-trigger') : null;

  if (year) year.textContent = String(new Date().getFullYear());

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  };

  const closeDropdown = () => {
    if (!dropdown || !trigger) return;
    dropdown.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      navigation.classList.toggle('open', !isOpen);
    });
    navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { closeMenu(); closeDropdown(); }));
  }

  if (dropdown && trigger) {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) closeDropdown();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { closeMenu(); closeDropdown(); }
  });

  // Contact form: no server needed. It opens the visitor's email app with the details filled in.
  const form = document.querySelector('[data-mailto-form]');
  if (form) {
    const interest = form.querySelector('#interest');
    const requested = new URLSearchParams(window.location.search).get('service');
    if (interest && requested && interest.querySelector(`option[value="${CSS.escape(requested)}"]`)) {
      interest.value = requested;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const value = (key) => String(data.get(key) || '').trim();
      const interestLabel = interest ? interest.options[interest.selectedIndex].text : '';
      const subject = `Website enquiry: ${interestLabel}${value('company') ? ` — ${value('company')}` : ''}`;
      const body = [
        `Name: ${value('name')}`,
        `Email: ${value('email')}`,
        `Company: ${value('company') || '—'}`,
        `Company size: ${value('size') || '—'}`,
        `Interested in: ${interestLabel}`,
        '',
        value('message'),
      ].join('\n');
      const address = form.getAttribute('data-mailto-form');
      window.location.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = `Your email app should now open with this message ready to send. If nothing happens, email us directly at ${address}.`;
      }
    });
  }
})();
