let x = document.createElement("link");
x.rel = 'stylesheet';
x.type = 'text/css'
x.href = "https://cdn.jsdelivr.net/gh/EastArctica/JS-Plugins@master/Un-Released/Kahoot/KahootModal.css"
document.head.appendChild(x);

function parseURLParams(url) {
    let queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

let Params = parseURLParams(window.location.href)
let ID = Params.ks_id.toString()
let xhttp = new XMLHttpRequest()
xhttp.open('POST', 'https://redmenta.com/ajax.php', false);
xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhttp.send('action=ksEredmeny&ks_id=' + ID)

let div = document.createElement("div");
div.innerHTML =
    '<a class="element not_as_embeded" id="GetAnswers"><span class="icon-bookmark-4"></span> Get Answers </a>';
document.getElementsByClassName('not_as_embeded')[0].appendChild(div);
let Modal = document.createElement("div")
Modal.id = "mainModal"
Modal.className = "mainModal"
Modal.style = "position: fixed; z-index: 2147483647; left: 0px; top: 0px; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, 0.4); display: none;"
let ModalContent = document.createElement("div")
ModalContent.className = "modal-content"
ModalContent.id = "ModalContent"
let Close = document.createElement("span")
Close.className = "close"
Close.innerHTML = "&times;"
let btn = document.createElement("button")
btn.id = "ModalButton"
btn.innerText = "View Answers"
Close.onclick = function () {
    Modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == Modal) {
        Modal.style.display = "none";
    }
}
ModalContent.appendChild(Close)
Modal.appendChild(ModalContent)
document.body.prepend(Modal)
document.getElementById('GetAnswers').addEventListener('click', function () {
    Modal.style.display = "block";
})

ModalContent.insertAdjacentHTML('beforeend', xhttp.responseText)