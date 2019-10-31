var btnList = document.querySelectorAll('.btnlink');
var anchor = document.querySelector('.anchor');
var animationTime = 600;
var framesCount = 100;
if (anchor) {
  var anchorPosition = anchor.getBoundingClientRect().top + pageYOffset;
}

for (var i = 0; i < btnList.length; i++ ) {
  findBtn(i);
}

function findBtn(i) {
  btnList[i].addEventListener('click', function(e) {
    e.preventDefault();
    ScrollToResolver(anchor);
  });
}

function ScrollToResolver(elem) {
  var anchorPosition = anchor.getBoundingClientRect().top + pageYOffset;
  var animationTime = 600;
  var framesCount = 100;

  var scrollBy = anchorPosition / framesCount;
  var scroller = setInterval(function() {
    var elem = anchor.getBoundingClientRect().top + pageYOffset;
    var win = (window.pageYOffset + window.innerHeight);
    if(scrollBy < elem - win ) {
      window.scrollBy(0, scrollBy);
    } else {
      window.scrollTo(0, elem);
      clearInterval(scroller);
    }
  }, animationTime / framesCount);
}
