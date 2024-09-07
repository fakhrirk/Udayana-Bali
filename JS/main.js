function showSideBar() {
  const slideBar = document.querySelector(".sidebar");
  slideBar.style.display = "flex";
}

function hideSideBar() {
  const slideBar = document.querySelector(".sidebar");
  slideBar.style.display = "none";
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var scrollToTopButton = document.getElementById("scrollToTop");
  var navbar = document.querySelector("header");

  if (document.body.scrollTop > navbar.offsetHeight || document.documentElement.scrollTop > navbar.offsetHeight) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

document.getElementById("scrollToTop").onclick = function () {
  scrollToTop();
};

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
