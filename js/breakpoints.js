(function() {
  const breakpointsList = [
  {name: 'mobile', min: 0, max: 479},
  {name: 'wide-mobile', min: 480, max: 767},
  {name: 'tablet', min: 768, max: 991},
  {name: 'laptop', min: 992, max: 1199},
  {name: 'desktop', min: 1200, max: 1599},
  {name: 'desktop-full', min: 1600, max: 25000},
]

const createVarList = (list) => {
  let result = {};
  list.forEach(element => {
    result[element] = document.querySelector('.' + element);
  });
  return result;
};

const html = '<div class="row row--top"><span class="left"></span><span class="js_dim mid"></span><span class="right"></span></div><div class="row row--mid"><span class="js_min value value--min">320px</span><span class="js_name name">Desktop</span><span class="js_max value value--max">479px</span></div><div class="row row--bot"><span class="conrol">0</span><span class="conrol">50</span><span class="conrol">100</span><span class="conrol"></span></div>';

const htmlClassList = [
  'js_min', 
  'js_max', 
  'js_name', 
  'js_menu',
  'js_dim',
]

let varList;

const showData = () => {
  const {name: screenName, min: minRes, max: maxRes, screenWidth} = findName(breakpointsList);
  // console.log(screenWidth);
  varList.js_name.textContent = screenName;
  varList.js_min.textContent = minRes;
  varList.js_max.textContent = maxRes;
  varList.js_dim.textContent = screenWidth;
}


// TODO: remove this 
// const windowSizeHandler = () => {
//   showData();
// }

const findName = (array) => {
  const size = document.documentElement.clientWidth
  const name = array.filter(n => n.min <= size && n.max >= size)[0];
  return {...name, screenWidth: size};
};

const createSpan = () => {
  const fragment = document.createDocumentFragment();
  const block = document.createElement('div');
  block.classList.add('js_window');
  // block.classList.add('js_window--min');
  block.innerHTML = html;
  fragment.appendChild(block);
  document.body.appendChild(fragment);
  varList = createVarList(htmlClassList);
  showData();
}


createSpan();
window.addEventListener('resize', showData);

})();