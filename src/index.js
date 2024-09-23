const dropdown = document.querySelector(".dropdown");
const windowBarTitle = document.querySelector(".windowBarTitle");

windowBarTitle.addEventListener("click", () => {
  if (dropdown.classList.contains("toggleDropdown")) {
    return dropdown.classList.remove("toggleDropdown");
  }

  dropdown.classList.toggle("toggleDropdown");
});

dropdown.addEventListener("click", () => {
  return dropdown.classList.remove("toggleDropdown");
});

let allLoveLain = 0;
const timeDisplay = document.querySelector(".windowBarTime");
const dateDisplay = document.querySelector(".headerDate");

setDateAndTime(timeDisplay);

timeDisplay.addEventListener("click", () => {
  allLoveLain++;
  if (allLoveLain <= 3) return;

  timeDisplay.innerHTML = "Present day, present time";
  dateDisplay.innerHTML = "Hahahahahaha!";
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
