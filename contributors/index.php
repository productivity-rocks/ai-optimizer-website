<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatGPT Optimizer | Productivity Rocks</title>
    <link rel="stylesheet" href="../css/main.css?l=<?php echo uniqid() ?>">
    <link rel="stylesheet" href="page.css?l=2">
    <script src="../assets/js/general.js"></script>
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
    main a {
        color: initial;
        text-decoration: underline;
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
            <h3>Project Contributors</h3>

            <style>
                .contributors {
                    margin: 2rem 0;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    grid-auto-flow: row;
                    gap: 1rem;
                }
                .contributors .contributor img {
                    height: 100px;
                    width: 100px;
                    border-radius: 100%;
                }
            </style>

            <div class="contributors">
                <div class="contributor">
                    <img src="../../assets/img/contributors/jorit-vasconezgerlach.jpeg" alt="">
                    <h4>Jorit Vásconez Gerlach</h4>
                    <p>Founder & Creator</p>
                    <a href="https://github.com/jorit-vasconezgerlach"><p>@jorit-vasconezgerlach</p></a>
                </div>
                <div class="contributor">
                    <img src="../../assets/img/contributors/tbscode.jpeg" alt="">
                    <h4>Tim Schupp</h4>
                    <p>Contributed on Page Prompting</p>
                    <a href="https://github.com/tbscode"><p>@tbscode</p></a>
                </div>
            </div>
            <h4>If you're also willing to contribute please contact via <a href="mailto:ai.optimizer@productivity.rocks">ai@productivity.rocks</a></h4>
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
                    width: fit-content;
                    height: fit-content;
                    max-width: 90vw;
                    max-height: 90vh;
                    object-fit: contain;
                }
                `,
                ()=>{},
                'PopUp'
            )
        });
    </script>
</body>