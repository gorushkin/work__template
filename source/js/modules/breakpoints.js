(function () {
  const breakpoints = () => {
    const breakpointsList = [{
      name: 'mobile',
      min: 0,
      max: 479,
    },
    {
      name: 'wide-mobile',
      min: 480,
      max: 767,
    },
    {
      name: 'tablet',
      min: 768,
      max: 991,
    },
    {
      name: 'laptop',
      min: 992,
      max: 1199,
    },
    {
      name: 'desktop',
      min: 1200,
      max: 1599,
    },
    {
      name: 'desktop-full',
      min: 1600,
      max: 25000,
    },
    ];

    const createVarList = (list) => list.reduce((acc, n) => {
      const element = {
        [n]: document.querySelector(`.${n}`),
      };
      return {
        ...acc,
        ...element,
      };
    }, {});

    const html = '<div class="row row--top"><span class="left"></span><span class="js_dim mid"></span><span class="right"></span></div><div class="row row--mid"><span class="js_min value value--min">320px</span><span class="js_name name">Desktop</span><span class="js_max value value--max">479px</span></div><div class="row row--bot js_control"><span class="conrol">0</span><span class="conrol">50</span><span class="conrol">100</span><span class="conrol js_hide">100</span></div>';

    const htmlClassList = [
      'js_min',
      'js_max',
      'js_name',
      'js_menu',
      'js_dim',
      'js_window',
      'js_hide',
      'js_control',
    ];

    let varList;

    const showData = () => {
      const {
        name: screenName,
        min: minRes,
        max: maxRes,
        screenWidth,
      } = findName(breakpointsList);
      varList.js_name.textContent = screenName;
      varList.js_min.textContent = minRes;
      varList.js_max.textContent = maxRes;
      varList.js_dim.textContent = screenWidth;
    };

    const findName = (array) => {
      const size = document.documentElement.clientWidth;
      const name = array.filter((n) => n.min <= size && n.max >= size)[0];
      return {
        ...name,
        screenWidth: size,
      };
    };

    const createSpan = () => {
      const fragment = document.createDocumentFragment();
      const block = document.createElement('div');
      // TODO: заменить на константы 'js_window', 'div'
      block.classList.add('js_window');
      block.innerHTML = html;
      fragment.appendChild(block);
      document.body.appendChild(fragment);
      varList = createVarList(htmlClassList);
      showData();
    };

    createSpan();

    const windowSizeToggle = (e) => {
      e.preventDefault();
      varList.js_window.classList.toggle('js_window--min');
    };

    const onWheel = (e) => {
      const delta = e.deltaY;
      if (delta < 0) {
        varList.js_hide.innerHTML = Math.min(100, +varList.js_hide.innerHTML + 10);
      } else {
        varList.js_hide.innerHTML = Math.max(5, +varList.js_hide.innerHTML - 10);
      }
      const index = varList.js_hide.innerHTML;
      varList.js_window.style.opacity = index / 100;
      e.preventDefault();
    };

    window.addEventListener('resize', showData);
    varList.js_name.addEventListener('click', windowSizeToggle);
    varList.js_window.addEventListener('wheel', onWheel);
  };

  window.addEventListener('load', breakpoints);
}());
