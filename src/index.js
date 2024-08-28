const pageWrapper = document.querySelector(".pageWrapper");
const navComponent = document.querySelector("nav-component");

const oldContent = pageWrapper.innerHTML;

function render(page) {
  if (page === "main") {
    pageWrapper.innerHTML = oldContent;
    if (navComponent.hasAttribute("header-enabled")) {
      navComponent.setAttribute("header-title", "today");
    }
    return;
  }

  fetch(page + ".html")
    .then(response => response.text())
    .then(content => {
      pageWrapper.innerHTML = content;
    });

  if (navComponent.hasAttribute("header-enabled")) {
    navComponent.setAttribute("header-title", page);
  }
}
