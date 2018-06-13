(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 7.5 + 'px';
  }, false)
  if (typeof window.Android !== 'undefined') {
    if (typeof window.Android.hideTopBar !== 'undefined') {
      window.Android.hideTopBar()
    }
  }
})()