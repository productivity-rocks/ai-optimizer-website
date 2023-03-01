window.addEventListener('scroll', (e)=>{
  console.log(window.scrollY);
  if(window.scrollY > 150) {
    document.querySelector('header').classList.add('visible');
  } else {
    document.querySelector('header').classList.remove('visible');
  }
})
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectNotification = urlParams.get('redirectNotification');
  if (redirectNotification) {
    element = document.createElement('div');
    element.setAttribute('type', 'warn');
    document.querySelector('header').insertBefore(Object.assign(element, {
      classList: 'notify',
      innerText: redirectNotification,
    }), document.querySelector('header .content'))
  }

  followMouse(document.querySelector('#start .right img'));
  function followMouse(element) {
    // Items to animate
    styles = window.getComputedStyle(element);
    const cardInside = element;
    console.log(element.style.background);
    cardInside.style.position = 'relative';
    const cardOutside = Object.assign(document.createElement('div'), {
      style: `
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      width: calc(100% + 1rem);
      height: calc(100% + 1rem);
      `
    });
    const newEl = Object.assign(document.createElement('div'), {
      style: cardInside.style,
      classList: cardInside.classList.value
    });
    cardInside.style = '';
    cardInside.style.overflow = styles.overflow;
    cardInside.style.background = styles.background;
    console.log(newEl.style.background);
    cardInside.classList = '';
    cardInside.replaceWith(newEl);
    newEl.style.overflow = 'inherit';
    newEl.style.background = 'transparent';
    newEl.appendChild(cardInside);
    newEl.appendChild(cardOutside);

    // Track card on mousemove ib container
    cardOutside.addEventListener("mousemove", (e) => {
      // Get the center of the card
      const cardRect = cardOutside.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
    
      // Calculate the angle between the center of the card and the mouse pointer
      const angleX = (e.clientY - cardCenterY) / (cardRect.height / 2);
      const angleY = (e.clientX - cardCenterX) / (cardRect.width / 2);
    
      // Rotate the card to face the mouse
      cardInside.style.transform = `rotateX(${angleX * 15}deg) rotateY(${-angleY * 15}deg)`;
    });
    
    // Animate In
    // Test if mouse enters cardOutside
    cardOutside.addEventListener("mouseenter", (e) => {
      // Add the transition for a smooth transition
      cardInside.style.transition = "all 0.09s ease";
      // Jump to the wait funktion
      waitBeforeContinue();
    });
    // Wait funtion
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const waitBeforeContinue = async () => {
      // Wait before executing netxt command
      await delay(90);
      // Remove the transition style after transition in
      cardInside.style.transition = "none";
    };

    // Animate Out
    cardOutside.addEventListener("mouseleave", (e) => {
      cardInside.style.transition = "all 0.5s ease";
      cardInside.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  }

  document.querySelectorAll(".selectWrap").forEach((selectWrap) => {
    const select = selectWrap.querySelector("select");
    select &&
      (select.onfocusin = () => selectWrap.setAttribute("focus", "true"));
    select &&
      (select.onfocusout = () => selectWrap.setAttribute("focus", "false"));
    select && (select.onchange = () => select.blur());
    select && (select.onmouseout = () => select.blur());
  });

  // improve all detail fields
  (() => {
    const els = document.querySelectorAll(".detailsGroup");
    for (let i = 0; i < els.length; i++) {
      const details = new Details(els[i], {
        speed: 500,
        one_visible: true,
      });
    }
  })();

  // add following install button to #install section
  const secInstallation = document.querySelector("#installation");
  secInstallation.onclick = () => {window.open(window.location.href+"/for/chrome/")};
  secInstallation.style.zIndex = "1";
  secInstallation.style.cursor = "pointer";
  secInstallation.querySelectorAll("*").forEach((el) => {
    el.style.zIndex = "2";
    el.style.pointerEvents = "none";
  });
  // secInstallation.querySelector('.list').style.display = 'none';
  const followingInstallBtn = Object.assign(document.createElement("button"), {
    innerText: "install me",
    style: `
      padding: .4rem .6rem;
      font-size: 1.2rem;
      position: fixed;
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: top .2s ease-out, left .2s ease-out, rotate .2s ease-out, opacity .2s ease-out;
      transition-timing-function: ease-out;
      border: .2rem solid var(--greenLight);
      color: var(--greenLight);
      `,
  });
  secInstallation.appendChild(followingInstallBtn);
  // movement
  let mouseX = 0;
  let mouseY = 0;
  let mouseDeg = 0;
  window.addEventListener("mousemove", (event) => {
    mouseY = event.clientY  + "px";
    mouseX = event.clientX + "px";
    mouseDeg = event.movementX + "deg";
  });
  secInstallation.addEventListener("mouseenter", (event) => {
      followingInstallBtn.style.opacity = ".5";
  });
  secInstallation.addEventListener("mouseleave", (event) => {
      followingInstallBtn.style.opacity = "0";
  });
  const mouseMove = () => {
    followingInstallBtn.style.top = mouseY;
    followingInstallBtn.style.left = mouseX;
    followingInstallBtn.style.rotate = mouseDeg;
    window.requestAnimationFrame(mouseMove);
  };
  mouseMove();


  const contactForm = document.querySelector("#contactForm");

  contactForm.onsubmit = () => {
    const valueMail = contactForm.querySelector('[name="mail"]').value;
    const valueType = contactForm.querySelector('[name="type"]').value;
    const valueMessage = contactForm.querySelector('[name="message"]').value;

    if (!valueMail || !valueType || !valueMessage) {
      toast("Fill all fields!");
      return;
    }

    // Set Data as JSON
    const data = {
      mail: valueMail,
      type: valueType,
      message: valueMessage,
    };

    // Create XHR Request
    var xhr = new XMLHttpRequest();

    // Setup XHR Request
    var xhrURL = "https://productivity.rocks/tool/ai-optimizer/api/contact/";
    xhr.open("POST", xhrURL, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");

    // On XHR Request Change
    xhr.onreadystatechange = function () {
      // On XHR Ready
      if (xhr.readyState === 4) {
        try {
          // response
          var response = JSON.parse(xhr.responseText);
          if (response["error"]) {
            // not send
            toast("not send", { type: "Error: Try again!" });
          } else if (!response["error"]) {
            // send
            toast("Sent: We'll answer asap!");
            contactForm.reset();
          } else {
            throw new Error(`No information from server!`);
          }
        } catch (error) {
          console.log(error);
          toast("Server Error: We' fix it!", { type: "error" });
        }
      }
    };
    // Send XHR Request
    xhr.send(JSON.stringify(data));
  };
});

function toast(msg, data = {}) {
  let typeColor = "var(--hGreen), var(--sGreen), var(--lGreen)";
  if (data.type && data.type === "warn") {
    typeColor = "var(--hWarn), var(--sWarn), var(--lWarn)";
  } else if (data.type === "error") {
    typeColor = "var(--hError), var(--sError), var(--lError)";
  }

  var style = `
          bottom: -315px; right: 15px;
          transition: .8s  cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          z-index: 10000;
          position: fixed;

          font-family: sans-serif;
          width: 100%; max-width: 300px;
          color: white;
          box-shadow: hsla(${typeColor}, 1) 0px 30px 90px;
          padding: 0.8rem;
          border-radius: 5px;
          border: 1px solid hsl(${typeColor});
          background: var(--blue);
          `;
  if (document.getElementById("toast")) {
    document.getElementById("toast").remove();
  }
  var toast = Object.assign(document.createElement("div"), {
    id: "toast",
    style: style,
    innerText: msg,
    onclick: () => {
      if (data["callback"]) {
        data["callback"]();
      }
      document.getElementById("toast").remove();
    },
  });
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.bottom = "20px";
    setTimeout(() => {
      toast.style.bottom = "-315px";
      setTimeout(() => {
        toast.parentNode.removeChild(toast);
      }, 1000);
    }, 2000);
  }, 100);
}

// details (for faq)
class Details {
  constructor(el, settings) {
    this.group = el;
    this.details = this.group.querySelectorAll("details");
    this.toggles = this.group.querySelectorAll("summary");
    this.contents = this.group.querySelectorAll(".detailsContent");

    // Set default settings if necessary
    this.settings = Object.assign(
      {
        speed: 300,
        one_visible: false,
      },
      settings
    );

    // Setup inital positions
    for (let i = 0; i < this.details.length; i++) {
      const detail = this.details[i];
      const toggle = this.toggles[i];
      const content = this.contents[i];

      // Set transition-duration to match JS setting
      detail.style.transitionDuration = this.settings.speed + "ms";

      // Set initial height to transition from
      if (!detail.hasAttribute("open")) {
        detail.style.height = toggle.clientHeight + "px";
      } else {
        detail.style.height = toggle.clientHeight + content.clientHeight + "px";
      }
    }

    // Setup click handler
    this.group.addEventListener("click", (e) => {
      if (e.target.tagName === "SUMMARY") {
        e.preventDefault();

        let num = 0;
        for (let i = 0; i < this.toggles.length; i++) {
          if (this.toggles[i] === e.target) {
            num = i;
            break;
          }
        }

        if (!e.target.parentNode.hasAttribute("open")) {
          this.open(num);
        } else {
          this.close(num);
        }
      }
    });
  }

  open(i) {
    const detail = this.details[i];
    const toggle = this.toggles[i];
    const content = this.contents[i];

    // If applicable, hide all the other details first
    if (this.settings.one_visible) {
      for (let a = 0; a < this.toggles.length; a++) {
        if (i !== a) this.close(a);
      }
    }

    // Update class
    detail.classList.remove("is-closing");

    // Get height of toggle
    const toggle_height = toggle.clientHeight;

    // Momentarily show the contents just to get the height
    detail.setAttribute("open", true);
    const content_height = content.clientHeight;
    detail.removeAttribute("open");

    // Set the correct height and let CSS transition it
    detail.style.height = toggle_height + content_height + "px";

    // Finally set the open attr
    detail.setAttribute("open", true);
  }

  close(i) {
    const detail = this.details[i];
    const toggle = this.toggles[i];

    // Update class
    detail.classList.add("is-closing");

    // Get height of toggle
    const toggle_height = toggle.clientHeight;

    // Set the height so only the toggle is visible
    detail.style.height = toggle_height + "px";

    setTimeout(() => {
      // Check if still closing
      if (detail.classList.contains("is-closing"))
        detail.removeAttribute("open");
      detail.classList.remove("is-closing");
    }, this.settings.speed);
  }
}
