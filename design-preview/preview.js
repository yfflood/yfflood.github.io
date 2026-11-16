const conceptLinks = Array.from(document.querySelectorAll('[data-preview-design]'));

function selectDesign(design) {
  document.documentElement.dataset.design = design;
  for (const link of conceptLinks) {
    if (link.dataset.previewDesign === design) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

function syncDesign() {
  const design = new URLSearchParams(location.search).get('design');
  const link = conceptLinks.find((link) => link.dataset.previewDesign === design);
  selectDesign(link?.dataset.previewDesign ?? 'editorial');
}

for (const link of conceptLinks) {
  link.addEventListener('click', (event) => {
    if (location.protocol === 'file:' || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();

    const design = link.dataset.previewDesign;
    if (design === document.documentElement.dataset.design) return;

    const url = new URL(location.href);
    url.searchParams.set('design', design);
    history.pushState(null, '', url);
    selectDesign(design);
  });
}

window.addEventListener('popstate', syncDesign);
syncDesign();
