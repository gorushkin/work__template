(function () {
  const btnList = document.querySelectorAll('.btnlink');
  const anchor = document.querySelector('.anchor');
  // var animationTime = 600;
  // var framesCount = 100;
  // if (anchor) {
  //   var anchorPosition = anchor.getBoundingClientRect().top + pageYOffset;
  // }

  for (let i = 0; i < btnList.length; i++) {
    findBtn(i);
  }

  function findBtn(i) {
    btnList[i].addEventListener('click', (e) => {
      e.preventDefault();
      ScrollToResolver(anchor);
    });
  }

  function ScrollToResolver(elem) {
    const anchorPosition = anchor.getBoundingClientRect().top + pageYOffset;
    const animationTime = 600;
    const framesCount = 100;

    const scrollBy = anchorPosition / framesCount;
    var scroller = setInterval(() => {
      const elem = anchor.getBoundingClientRect().top + pageYOffset;
      const win = (window.pageYOffset + window.innerHeight);
      if (scrollBy < elem - win) {
        window.scrollBy(0, scrollBy);
      } else {
        window.scrollTo(0, elem);
        clearInterval(scroller);
      }
    }, animationTime / framesCount);
  }
}());
