const breakpointsList = [
  {name: 'mobile', min: 0, max: 479},
  {name: 'wide-mobile', min: 480, max: 767},
  {name: 'tablet', min: 768, max: 991},
  {name: 'laptop', min: 992, max: 1199},
  {name: 'desktop', min: 1200, max: 1599},
  {name: 'desktop-full', min: 1600, max: 25000},
]

const showData = (name) => {
  const element = document.querySelector('.js-span');
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
  return name;
};

const createSpan = (name) => {
  const fragment = document.createDocumentFragment();
  const block = document.createElement('div');
  const span = document.createElement('span');
  block.classList.add('js_window');
  span.classList.add('js_span');
  span.textContent = name;
  block.innerHTML = '<p></p>';
  block.appendChild(span);
  fragment.appendChild(block);
  document.body.appendChild(fragment);
  console.log(span);
}

const screenName = findName(breakpointsList);

createSpan(screenName);
showData(screenName);

window.addEventListener('resize', windowSizeHandler);