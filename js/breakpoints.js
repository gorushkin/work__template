const breakpointsList = [
  {name: 'mobile', min: 0, max: 575},
  {name: 'wide-mobile', min: 576, max: 767},
  {name: 'tablet', min: 768, max: 991},
  {name: 'laptop', min: 992, max: 1199},
  {name: 'desktop-full', min: 1200, max: 2000},
]

const showData = (name) => {
  const element = document.querySelector('.js-span');
  element.innerHTML = name;
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
  const block = document.createDocumentFragment();
  const span = document.createElement('span');
  span.classList.add('js-span');
  span.innerHTML = name;
  block.appendChild(span);
  document.body.appendChild(block);
}

const screenName = findName(breakpointsList);

createSpan(screenName);
showData(screenName);

window.addEventListener('resize', windowSizeHandler);