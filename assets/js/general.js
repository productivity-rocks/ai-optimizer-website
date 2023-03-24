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

// >> open popup
function popup(html, style, callback, name) {
    const popup = document.createElement("section");
    popup.id = "popup";
    popup.style.cssText =
        "top: 0; left: 0; position: fixed; height: 100vh; width: 100vw; z-index: 10000 !important; display: grid; place-items:center;";

    const popupBackground = document.createElement("div");
    popupBackground.style.cssText =
        "position: absolute; width: 100%; height: 100%; background: hsl(0deg 0% 12% / 50%); z-index: -1; cursor: pointer;";
    popupBackground.onclick = () => popup.remove();
    popup.appendChild(popupBackground);

    let noNameClass = (name) ? name : 'noName';
    const popupInnerContainer = document.createElement("div");
    popupInnerContainer.innerHTML = `
        <div class="gpt-optimizer gpto-popupHeader ${noNameClass}">
            <span>${name}</span>
            <button><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
        <div class="gpt-optimizer gpto-popupContentWrap">
            ${html}
        </div>`;
    popupInnerContainer.id = "toastHTML";
    popupInnerContainer.style.cssText =
        "max-height: 400px; max-width: 600px; width: 100%; min-height: 200px; height: fit-content; padding-bottom: 1rem; overflow-x: scroll; display: flex; flex-direction: column;";
    popupInnerContainer.className = "gpt-optimizer gpto-popupInner";
    popup.appendChild(popupInnerContainer);

    const styleElement = document.createElement("style");
    styleElement.innerHTML = style;
    popup.appendChild(styleElement);

    document.body.appendChild(popup);

    popup.querySelector(".gpto-popupInner > div:nth-child(1) > button").addEventListener("click", () => {
        popup.remove();
    });

    popup.close = ()=>{
        popup.remove();
    }

    callback(popup);
}