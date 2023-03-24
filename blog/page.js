function likeBlog(blogUID) {

    // Set Data as JSON
    const data = {"uid": blogUID};

    // Create XHR Request
    var xhr = new XMLHttpRequest();
    // Setup XHR Request
    var xhrURL = "https://api.aachen-app.de/blog/like/?v=1.0";
    xhr.open("POST", xhrURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Accept", "application/json");
    // On XHR Request Change
    xhr.onreadystatechange = function () {
        // On XHR Ready
        if (xhr.readyState === 4) {
            // response
            var response = JSON.parse(xhr.responseText);
            // toast
            if(response['error']) {
                aachenAppToast(response['responseMsg'], {
                    textColor: '#222',
                    toastColor: '#fac520',
                    toastProgressColor: '#fbdf89'
                });
            } else {
                aachenAppToast(response['responseMsg'], {
                    textColor: '#222',
                    toastColor: '#fac520',
                    toastProgressColor: '#fbdf89'
                });
            }
        }
    };
    // Send XHR Request
    xhr.send(JSON.stringify(data));

}
window.addEventListener('load', ()=>{

    const likeButton = document.getElementById('likeButton');
    likeButton.onclick = ()=>{
        likeBlog(document.querySelector('article').getAttribute('uid'));
    }
    // Set Data as JSON
    const data = {"uid": document.querySelector('article').getAttribute('uid')};
    // Create XHR Request
    var xhr = new XMLHttpRequest();
    // Setup XHR Request
    var xhrURL = "https://api.aachen-app.de/blog/like/?v=1.0";
    xhr.open("POST", xhrURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Accept", "application/json");
    // On XHR Request Change
    xhr.onreadystatechange = function () {
        // On XHR Ready
        if (xhr.readyState === 4) {
            // response
            var response = JSON.parse(xhr.responseText);
            // toast
            if(response['responseMsg'] == 'Beitrag gefällt dir schon!') {
                likeButton.innerText = "Gefällt dir";
                likeButton.classList.add('liked');
            }
        }
    };
    // Send XHR Request
    xhr.send(JSON.stringify(data));

    const scrollToTop = document.getElementById('scrollToTop');
    scrollToTop.onclick = ()=>{
        window.scroll(0, 0);
    }
    const articleHeight = document.getElementById('content').scrollHeight + document.getElementById('landing').scrollHeight;
    window.addEventListener('scroll', ()=>{
        if(0 < window.scrollY) {
                    scrollToTop.style.display = 'block';
        } else {
                    scrollToTop.style.display = 'none';
        }
        var scrollToTopOffset = (window.scrollY / (articleHeight - window.innerHeight)) * 100 + '%';
        scrollToTop.style.setProperty('--pageScrollProgress', scrollToTopOffset);
    })
});