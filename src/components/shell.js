const nav = document.createElement("template");
const header = document.createElement("template");
const footer = document.createElement("template");

nav.innerHTML = /* HTML */ `
  <style>
    emoji {
      font-family: "SerenityOS-Emoji";
      font-size: 20px;
    }

    .windowBar {
      border-top: 2px solid black;
      border-bottom: 2px solid #1b35b4;
      background-color: #021fac;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      width: 100%;
      position: fixed;
      left: 0;
      color: white;
      font-weight: 500;
      font-size: 30px;
      z-index: 999;
    }

    .windowBarTime {
      margin-right: 10px;
    }

    .windowBarTitle {
      margin-left: 10px;
    }

    .dropdownWrapper {
      position: relative;
    }

    @keyframes growDown {
      from {
        transform: scaleY(0);
      }

      to {
        transform: scaleY(1);
      }
    }

    .dropdown {
      animation: growDown 70ms ease-in-out forwards;
      transform-origin: top center;
      display: none;
      border: 2px solid black;
      border-top: none;
      border-left: none;
      position: absolute;
      background-color: #bcb9bc;
      min-width: 195px;
      margin-top: 9px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }

    .dropdown a {
      color: black;
      padding: 9px 16px;
      text-decoration: none;
      font-size: 35px;
      display: flex;
      align-items: center;
      justify-content: flex-evenly;
      gap: 5px;
    }

    .dropdown a:hover {
      background-color: gray;
    }

    .toggleDropdown {
      display: block;
    }
  </style>

  <div class="windowBar">
    <div class="dropdownWrapper">
      <div class="windowBarTitle">
        <img src="assets/icon/navbar.png" width="26" style="vertical-align: text-top;" />
        Menu
      </div>
      <div class="dropdown">
        <a onclick="render('main')" style="border-bottom: 2px solid black;"><emoji>🫐</emoji> Main</a>
        <a style="color: gray"><emoji>🌈</emoji> Guestbook</a>
        <a style="color: gray"><emoji>🎶</emoji> Music</a>
        <a style="color: gray"><emoji>🐱</emoji> Cats</a>
        <a style="color: gray"><emoji>🧦</emoji> Button Wall</a>
        <a onclick="render('credits')" style="border-top: 2px solid black;"><emoji>ℹ️</emoji> Credits</a>
        <a href="https://github.com/orangebae/bae.nekoweb.org"><emoji>👨‍💻</emoji>Source Code</a>
      </div>
    </div>
    <div class="windowBarTime"></div>
  </div>
`;

header.innerHTML = /* HTML */ `
  <style>
    .headerWrapper {
      margin-top: 43px;
      display: flex;
      color: white;
      position: relative;
    }

    .header {
      background: rgb(112, 205, 73);
      background: linear-gradient(90deg, rgba(112, 205, 84, 1) 0%, rgba(0, 121, 215, 1) 69%);
      height: 100px;
      flex-grow: 1;
    }

    #headerDate {
      position: absolute;
      top: 8px;
      right: 40px;
      font-weight: 300;
      font-size: 30px;
    }

    #headerBoxes {
      position: absolute;
      bottom: 13px;
      right: 45px;
      font-size: 18px;
    }

    #headerBox {
      display: inline-block;
      background: #f3dbd0;
      height: 15px;
      width: 15px;
      margin-left: 15px;
    }

    .headerRight {
      background: #fcd600;
      height: 100px;
      width: 30px;
    }

    .headerBottom {
      border-bottom: 2px solid black;
      background: rgb(0, 121, 211);
      background: linear-gradient(90deg, rgba(0, 121, 215, 1) 35%, rgba(252, 214, 0, 1) 84%);
      height: 30px;
    }

    #headerBottomToday {
      color: #ffffff;
      font-family: Arial;
      left: 10px;
      top: 96px;
      font-size: 50px;
      position: absolute;
    }
  </style>
  <div class="headerWrapper">
    <div class="header">
      <div id="headerDate"></div>
      <div id="headerBoxes">
        <div id="headerBox"></div>
        <div id="headerBox" style="background: #ffd8ac"></div>
        <div id="headerBox" style="background: #e9bd2e"></div>
        <div id="headerBox" style="background: #ff7800"></div>
      </div>
    </div>
    <div class="headerRight"></div>
  </div>
  <div class="headerBottom">
    <div id="headerBottomToday">today</div>
  </div>
`;

footer.innerHTML = /* HTML */ `
  <style>
    .footerWrapper {
      position: absolute;
    }
    .footer {
      border-top: 2px solid black;
      border-bottom: 2px solid black;
      background-color: #bcb9bc;
      align-content: center;
      text-align: center;
      height: 40px;
      width: 100%;
      font-weight: 500;
      font-size: 25px;
      bottom: 0;
      left: 0;
      position: fixed;
    }
  </style>
  <div class="footerWrapper">
    <div class="footer">
      <slot name="footerSlot"></slot>
    </div>
  </div>
`;

class NavComponent extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["header-title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!oldValue) return;
    if (name === "header-title") {
      const headerTitle = this.shadowRoot.getElementById("headerBottomToday");
      headerTitle.innerHTML = newValue;
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const headerEnabled = this.hasAttribute("header-enabled");

    shadow.appendChild(nav.content);
    if (headerEnabled) shadow.appendChild(header.content);

    let allLoveLain = 0;
    const timeDisplay = shadow.querySelector(".windowBarTime");
    const dateDisplay = shadow.getElementById("headerDate");
    const dropdown = shadow.querySelector(".dropdown");
    const windowBarTitle = shadow.querySelector(".windowBarTitle");

    setDateAndTime(timeDisplay);

    windowBarTitle.addEventListener("click", () => {
      if (dropdown.classList.contains("toggleDropdown")) {
        return dropdown.classList.remove("toggleDropdown");
      }

      dropdown.classList.toggle("toggleDropdown");
    });

    dropdown.addEventListener("click", () => {
      return dropdown.classList.remove("toggleDropdown");
    });

    timeDisplay.addEventListener("click", () => {
      allLoveLain++;
      if (allLoveLain <= 3) return;
      if (headerEnabled) {
        timeDisplay.innerHTML = "Present day, present time";
        dateDisplay.innerHTML = "Hahahahahaha!";
        return;
      }

      timeDisplay.innerHTML = "Stop!";
    });

    function setDateAndTime() {
      const date = new Date();

      timeDisplay.innerHTML = new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        hourCycle: "h12"
      }).format(date);

      if (headerEnabled) {
        dateDisplay.innerHTML = new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full"
        }).format(date);
      }

      allLoveLain = 0;

      // run every 30 sec
      setTimeout(setDateAndTime, 30000);
    }
  }
}

class FooterComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(footer.content);
  }
}

customElements.define("nav-component", NavComponent);
customElements.define("footer-component", FooterComponent);
