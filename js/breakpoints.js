(function() {
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
  'js_min', 'js_max', 'js_name', 'js_menu',
]

let varList;

const createVarList = (list) => {
  let result = {};
  list.forEach(element => {
    result[element] = document.querySelector('.' + element);
  });
  return result;
};

const showData = (name) => {
  varList.js_name.textContent = name;
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

const createSpan = () => {
  const fragment = document.createDocumentFragment();
  const block = document.createElement('div');
  block.classList.add('js_window');
  block.innerHTML = html;
  fragment.appendChild(block);
  document.body.appendChild(fragment);
  varList = createVarList(htmlClassList);
  const screenName = findName(breakpointsList);
  showData(screenName);
}


createSpan();

window.addEventListener('resize', windowSizeHandler);

})();