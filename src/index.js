const dropdown = document.querySelector(".navbarMenuDropdown");
const navbarMenu = document.querySelector(".navbarMenu");

navbarMenu.addEventListener("click", () => {
  return dropdown.style.display === "block" ? (dropdown.style.display = "") : (dropdown.style.display = "block");
});

dropdown.addEventListener("click", () => {
  return (dropdown.style.display = "");
});

let allLoveLain = 0;
const timeDisplay = document.querySelector(".navbarTime");
const dateDisplay = document.querySelector(".headerDate");

setDateAndTime(timeDisplay);

timeDisplay.addEventListener("click", () => {
  allLoveLain++;
  if (allLoveLain <= 3) return;

  timeDisplay.innerHTML =
    "\u0050\u0072\u0065\u0073\u0065\u006e\u0074\u0020\u0064\u0061\u0079\u002c\u0020\u0070\u0072\u0065\u0073\u0065\u006e\u0074\u0020\u0074\u0069\u006d\u0065";
  dateDisplay.innerHTML = "\u0048\u0061\u0068\u0061\u0068\u0061\u0068\u0061\u0068\u0061\u0068\u0061!";
});

function setDateAndTime() {
  const date = new Date();

  timeDisplay.innerHTML = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12"
  }).format(date);

  dateDisplay.innerHTML = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full"
  }).format(date);

  allLoveLain = 0;

  // run every 30 sec
  setTimeout(setDateAndTime, 30000);
}

const pageWrapper = document.querySelector(".pageWrapper");

const oldContent = pageWrapper.innerHTML;

function render(page) {
  if (page === "main") {
    pageWrapper.innerHTML = oldContent;
    return;
  }

  fetch(page + ".html")
    .then(response => response.text())
    .then(content => {
      pageWrapper.style.animation = "growDown 70ms ease-in-out";
      pageWrapper.innerHTML = content;
    });
}
