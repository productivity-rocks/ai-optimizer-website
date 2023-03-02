<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatGPT Optimizer | Productivity Rocks</title>
    <link rel="stylesheet" href="../../css/main.css?l=<?php echo uniqid() ?>">
    <link rel="stylesheet" href="page.css?l=2">
    <script src="../../assets/js/general.js"></script>
    <script src="page.js"> </script>
</head>

<style>
    body {
        background: var(--white);
    }
    header {
        background-color: var(--blue);
    }
    #help {
        padding: 8rem 5%;
        background: var(--white);
    }
    ol li {
        margin-top: .6rem;
    }
    .stepsGif {
        max-width: 400px;
        border-radius: 15px;
        margin-top: 1.2rem;
        cursor: zoom-in;
    }
    h3 {
        font-size: 1.6rem;
    }
</style>

<body>
    <header>
        <div class="content">
            <h1>ChatGPT Optimizer</h1>
            <a href="https://productivity.rocks/tool/ai-optimizer/for/chrome/">Download for Chrome</a>
        </div>
    </header>
    <main>
        <section id="help">
            <h3>Save console in Chrome</h3>
            <img class="stepsGif" src="imgs/steps.gif">
            <ol>
                <li>Left-click anywhere on the page.</li>
                <li>Select "inspect" in the context menu that appears.</li>
                <li>A popup window should open.</li>
                <li>In the popup, find the tabs "Element" and "Network" and select "Console".</li>
                <li>The console should now display a list of messages.</li>
                <li>Left-click any message in the list.</li>
                <li>Click on "Save as..." in the context menu that appears.</li>
                <li>Choose your filename and location in the save dialog that appears.</li>
                <li>Finally, click "save" to download the log file.</li>
            </ol>
        </section>
    </main>

    <script>
        const gif = document.querySelector('.stepsGif')
        gif.addEventListener('click', ()=>{
            let cloneGif = gif.cloneNode(true)
            cloneGif.className = ''
            cloneGif = cloneGif.outerHTML
            popup(
                `${cloneGif}`,
                `
                popup img {
                    width: 100%;
                    height: 100%;
                    max-width: 90vw;
                    max-height: 90vh;
                    object-fit: contain;
                }
                `,
                ()=>{},
                'PopUp'
            )
        });

        function popup(html, css, callback, name) {
            // create popup
            const popup = document.createElement("section");
            popup.id = "popup";
            popup.innerHTML = html;
            Object.assign(popup.style, {
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                background: 'rgba(0,0,0,0.8)',
                zIndex: 1000001,
                display: 'grid',
                placeItems: 'center',
            })
            // style
            const style = Object.assign(document.createElement('style'), {innerText: css.replace('popup', '#popup')})
            // animation
            popup.style.opacity = 0;
            popup.style.transition = '.2s ease-in-out';
            setTimeout(() => {popup.style.opacity = 1}, 1);
            // append
            document.body.appendChild(style)
            document.body.appendChild(popup)
            // close
            popup.addEventListener('click', (e)=>{
                if(e.target == popup) {
                    popup.remove()
                }
            })
            popup.addEventListener('mousemove', (e)=>{
                if(e.target == popup) {
                    popup.style.background = 'rgba(0,0,0,0.9)';
                    popup.style.cursor = 'zoom-out';
                } else {
                    popup.style.background = 'rgba(0,0,0,0.8)';
                    popup.style.cursor = 'default';
                }
            })
        }
    </script>
    <style>
        /* >> Popup Message << */
/* .gpt-optimizer.gpto-popupInner {
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 30px 90px;
    padding: 0.4rem 0.8rem;
    border: 1px solid #434754;
    border-radius: 10px;
    background: #212123;
}

.gpt-optimizer.gpto-popupInner .gpto-popupHeader {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.2rem;
    justify-content: space-between;
    font-weight: 500;
    padding: 8px 0px;
    border-bottom: 1px solid rgb(67, 71, 84);
    margin-bottom: 1rem;
}

.gpt-optimizer.gpto-popupInner .gpto-popupHeader.noName {
    border-bottom: none;
    justify-content: end;
    margin-bottom: -1rem;
}

.gpt-optimizer.gpto-popupInner .gpto-popupHeader.noName span {
    display: none;
}

.gpt-optimizer.gpto-popupInner .gpto-popupHeader svg {
    height: 1.2rem;
    width: 1.2rem;
}

.gpt-optimizer.gpto-popupInner .gpto-popupContentWrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: auto 0;
} */
    </style>
</body>