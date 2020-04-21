// Credit to this guy for the JSON viewer
//https://github.com/summerstyle/jsonTreeViewer
function CheckjsonTree() {
   if (jsonTree) {
        clearTimeout(JsonChecker)
        var xhttp = new XMLHttpRequest()
        var URL = window.location.href
        var found = URL.search("https://kahoot.it/challenge/");
        if(found==0){found=true}
        if (found) {
            var Modal = document.createElement("div")
            Modal.id = "mainModal"
            Modal.className = "mainModal"
            Modal.style = "position: fixed; z-index: 2147483647; left: 0px; top: 0px; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, 0.4); display: none;"
            var ModalContent = document.createElement("div")
            ModalContent.className = "modal-content"
            var Close = document.createElement("span")
            Close.className = "close"
            Close.innerHTML = "&times;"
            var btn = document.createElement("button")
            btn.id = "ModalButton"
            btn.innerText = "View Data"
            btn.onclick = function() {
              Modal.style.display = "block";
            }
            Close.onclick = function() {
              Modal.style.display = "none";
            }
            window.onclick = function(event) {
              if (event.target == Modal) {
                Modal.style.display = "none";
              }
            }
            document.getElementsByClassName("styles__FullscreenButton-sc-1nym00s-1")[0].appendChild(btn)
            ModalContent.appendChild(Close)
            Modal.appendChild(ModalContent)
            document.getElementById("root").prepend(Modal)
            var ID = URL.slice(28, URL.length)
            var RestLink = "https://kahoot.it/rest/challenges/" + ID
            xhttp.open("GET", RestLink, false)
            xhttp.send()
            var Response = xhttp.response
            var data = JSON.parse(Response);
            var tree = jsonTree.create(data, ModalContent);
        }
   }
 }
var x = document.createElement("script")
x.src = "https://cdn.jsdelivr.net/gh/summerstyle/jsonTreeViewer@master/libs/jsonTree/jsonTree.js"
document.head.appendChild(x);

var x = document.createElement("link");
x.rel = 'stylesheet';
x.type = 'text/css'
x.href = "https://cdn.jsdelivr.net/gh/summerstyle/jsonTreeViewer@master/libs/jsonTree/jsonTree.css";
document.head.appendChild(x);

var x = document.createElement("link");
x.rel = 'stylesheet';
x.type = 'text/css'
x.href = "https://cdn.jsdelivr.net/gh/EastArctica/JS-Plugins@master/KahootModal.css"
document.head.appendChild(x);

var JsonChecker = setTimeout(CheckjsonTree, 10);
