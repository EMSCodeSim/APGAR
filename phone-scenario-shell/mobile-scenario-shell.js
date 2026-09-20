(() => {
  'use strict';

  const PHONE_QUERY = '(max-width: 979px)';
  const mq = window.matchMedia(PHONE_QUERY);
  const VERSION = '2026.09.20.1';

  function isPhone() {
    return mq.matches;
  }

  function setShellClass() {
    document.body.classList.toggle('mobile-scenario-shell', isPhone());
    document.body.classList.toggle('mobile-simulator-v3', isPhone());
  }

  function activePanelButton() {
    return document.querySelector('.bottom-nav button.active[data-panel]');
  }

  function updateSheetCopy() {
    if (!isPhone()) return;
    const returnButton = document.getElementById('closeSheet');
    if (returnButton) {
      const label = returnButton.querySelector('span');
      if (label) label.textContent = 'Patient';
      returnButton.setAttribute('aria-label', 'Return to patient photo');
    }
    const active = activePanelButton();
    if (active) document.body.dataset.mobileClinicalPanel = active.dataset.panel || '';
    else delete document.body.dataset.mobileClinicalPanel;
  }

  function ensurePatientImage() {
    if (!isPhone()) return;
    const image = document.getElementById('patientImage');
    if (!image) return;
    image.style.removeProperty('display');
    image.style.removeProperty('visibility');
    image.style.removeProperty('opacity');
  }

  function wireNav() {
    const nav = document.querySelector('.bottom-nav');
    if (!nav || nav.dataset.phoneShellWired === '1') return;
    nav.dataset.phoneShellWired = '1';
    nav.addEventListener('click', () => window.setTimeout(updateSheetCopy, 0));
  }

  function wirePatientReturn() {
    const close = document.getElementById('closeSheet');
    if (!close || close.dataset.phoneShellWired === '1') return;
    close.dataset.phoneShellWired = '1';
    close.addEventListener('click', () => {
      if (!isPhone()) return;
      window.setTimeout(() => {
        document.getElementById('patientImage')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 40);
    });
  }

  function refresh() {
    setShellClass();
    updateSheetCopy();
    ensurePatientImage();
  }

  function initialize() {
    wireNav();
    wirePatientReturn();
    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }

  mq.addEventListener?.('change', refresh);
  window.addEventListener('ems-scenario-rendered', refresh);

  window.EMSCodeSimMobileScenarioShell = Object.freeze({
    version: VERSION,
    isPhone,
    refresh
  });
})();
