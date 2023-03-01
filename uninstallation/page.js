window.addEventListener("load", () => {
    const button = document.querySelector("button");
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("focusout", () => {
        button.classList.remove("standStill");
    });
    textarea.addEventListener("focusin", () => {
        button.classList.add("standStill");
    });
    textarea.addEventListener("mouseleave", () => {
        button.classList.remove("standStill");
    });
    textarea.addEventListener("mouseenter", () => {
        button.classList.add("standStill");
    });

    button.onclick = () => {
        const pMessage = textarea.value;

        if (!pMessage) {
            toast("please fill fields");
            return;
        }

        // Set Data as JSON
        const data = {
            mail: "fromextensionwebsite@mail.de",
            type: "feedback",
            message: pMessage,
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
                        textarea.value = "";
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
