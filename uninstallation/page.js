window.addEventListener("load", () => {
    let mailSend = false;

    const button = document.querySelector("button");
    const textarea = document.querySelector("textarea");
    const mail = document.querySelector("input[type='email']");
    const featureTable = document.querySelector("table");

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
    
    textarea.addEventListener("input", ()=>{
        mail.style.display = 'block';
    })

    button.onclick = () => {
        let pMessage = textarea.value;
        let pMail = mail.value;

        if (!pMessage) {
            toast("Please Fill Fields");
            return;
        }

        if(pMail === undefined || pMail === '') {
            pMail = 'no-mail-provided@productivity.rocks';
            popup(`
                <h4>Really don't wan't to be contacted?</h4>
                <email></email>
                <div class="buttons">
                    <button class="outline noMail">No Mail</button>
                    <button class="prominent submit">Submit</button>
                </div>
            `, `
                #popup .gpto-popupHeader {
                    display: none;
                }
                #popup .gpto-popupContentWrap {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                }
                #popup input {
                    width: 100%;
                }
                #popup .buttons {
                    display: flex;
                    gap: .4rem;
                }
                #popup .buttons button {
                    height: 38px;
                    padding: 2px 10px;
                }
            `, popup=>{
                popup.querySelector('email').parentNode.replaceChild(document.querySelector('#email'), popup.querySelector('email'));

                popup.querySelector('.noMail').addEventListener('click', ()=>{
                    if(document.querySelector('#email').value && document.querySelector('#email').value.length > 0) {
                        pMail = document.querySelector('#email').value;
                    }
                    sendFeedback();
                    document.querySelector('#feedbackButton').style.display = 'none';
                    popup.remove()
                })
                popup.querySelector('.submit').addEventListener('click', ()=>{
                    if(document.querySelector('#email').value && document.querySelector('#email').value.length > 0) {
                        pMail = document.querySelector('#email').value;
                    }
                    sendFeedback();
                    document.querySelector('#feedbackButton').style.display = 'none';
                    popup.remove()
                })
            }, "Just Confirm")
        } else {
            sendFeedback();
        }

        function sendFeedback() {
            if(mailSend) {
                toast('Mail already sent!')
                return;
            }
            // Set Data as JSON
            const data = {
                mail: pMail,
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
                            toast("Not Send", { type: "Error: Try again!" });
                        } else if (!response["error"]) {
                            // send
                            toast("Sent: We'll answer asap!");
                            textarea.value = "";
                            mailSend = true;
                            featureTable.scrollIntoView({ behavior: "smooth" });
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
        }
    };
});
