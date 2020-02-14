(function () {
  const lang_locale = 'ru';
  const price = /{{.*price.*}}/g;
  const currency = /{{\s*currency\s*}}/g;
  const ifel = /{%.?if.*else.?%}/;
  const ef = /{%.?endif.?%}/;

  function price_rnd() {
    return Math.round(Math.random() * 90 + 10);
  }
  window.onload = function () {
    a = document.getElementsByTagName('*');
    for (i = 0; i < a.length; i++) {
      if (a[i].tagName != 'SCRIPT') {
        for (j = 0; j < a[i].childNodes.length; j++) {
          b = a[i].childNodes[j];
          if (b.nodeType == 3) {
            if (ifel.test(b.textContent)) {
              b.textContent = b.textContent.replace(ifel, '');
            }
            if (ef.test(b.textContent)) {
              b.textContent = b.textContent.replace(ef, '');
            }
            if (currency.test(b.textContent)) {
              b.textContent = b.textContent.replace(currency, '$');
            }
            if (price.test(b.textContent)) {
              b.textContent = b.textContent.replace(price, price_rnd());
            }
          }
        }
      }
    }
  };
}());
