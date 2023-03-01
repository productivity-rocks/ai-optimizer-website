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