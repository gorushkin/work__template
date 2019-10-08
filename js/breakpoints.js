// (function() {
  const breakpointsList = [
  {name: 'mobile', min: 0, max: 479},
  {name: 'wide-mobile', min: 480, max: 767},
  {name: 'tablet', min: 768, max: 991},
  {name: 'laptop', min: 992, max: 1199},
  {name: 'desktop', min: 1200, max: 1599},
  {name: 'desktop-full', min: 1600, max: 25000},
]

const html = '<div class="row row--top"></div><div class="row row--mid"><span class="js_min value value--min center ">320px</span><span class="js_name name center">Desktop</span><span class="js_max value value--max center ">479px</span></div><div class="row row--bot"><div class="conrol center">0</div><div class="conrol center">50</div><div class="conrol center">100</div><div class="conrol center"></div></div>';
const htmlClassList = [
  'js_min', 'js_max', 'js_name',
]


const createVarList = (list) => {
  return list.map(n => {
    let q = {};
    q.class = n;
    q.var = document.querySelector('.' + n);
  return q;
  });
};

const showData = (name) => {
  const element = document.querySelector('.js_name');
  element.textContent = name;
}

const windowSizeHandler = () => {
  const screenWidth = document.documentElement.clientWidth;
  const screenName = findName(breakpointsList, screenWidth);
  showData(screenName);
}

const findName = (array) => {
  const size = document.documentElement.clientWidth
  const name = array.filter(n => n.min <= size && n.max > size)[0].name;
  console.log(name);
  return name;
};

const createSpan = (name) => {
  const fragment = document.createDocumentFragment();
  const block = document.createElement('div');
  block.classList.add('js_window');
  block.innerHTML = html;
  fragment.appendChild(block);
  document.body.appendChild(fragment);
  const span = document.querySelector('.js_name');
  span.textContent = name;
  const myList = createVarList(htmlClassList);
  // console.log(myList);
  // console.log(block);
}

const screenName = findName(breakpointsList);

createSpan(screenName);
showData(screenName);

window.addEventListener('resize', windowSizeHandler);

// })();