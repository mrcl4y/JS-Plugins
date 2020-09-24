    var Modal = document.createElement("div")
    Modal.id = "mainModal"
    Modal.className = "mainModal"
    Modal.style = "position: fixed; z-index: 2147483647; left: 0px; top: 0px; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, 0.4); display: none;"
    var ModalContent = document.createElement("div")
    ModalContent.className = "modal-content"
	ModalContent.id = "ModalContent"
    var Close = document.createElement("span")
    Close.className = "close"
    Close.innerHTML = "&times;"
    var btn = document.createElement("button")
    btn.id = "ModalButton"
    btn.innerText = "View Answers"
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
    document.getElementsByTagName("body")[0].prepend(btn)
    ModalContent.appendChild(Close)
    Modal.appendChild(ModalContent)
    document.getElementsByClassName("ln6A3-okfu huR8eWL_Re")[0].appendChild(Modal)


if(document.location.href.includes("edpuzzle.com/assignments/")){let start=document.location.href.search("/assignments/")+13
let end=document.location.href.search("/watch")
let QuizID=document.location.href.slice(start,end)
let APIURL="https://edpuzzle.com/api/v3/assignments/"+QuizID
let xhttp=new XMLHttpRequest;xhttp.open("GET",APIURL,0)
xhttp.setRequestHeader("x-edpuzzle-web-version",__EDPUZZLE_DATA__.version)
xhttp.setRequestHeader("x-edpuzzle-referrer",document.location.href)
xhttp.send()
QuizData=JSON.parse(xhttp.responseText)}else{let start=document.location.href.search("/media/")+7
let end=document.location.href.length
let QuizID=document.location.href.slice(start,end)
let APIURL="https://edpuzzle.com/api/v3/media/"+QuizID
let xhttp=new XMLHttpRequest;xhttp.open("GET",APIURL,0)
xhttp.setRequestHeader("x-edpuzzle-web-version",__EDPUZZLE_DATA__.version)
xhttp.setRequestHeader("x-edpuzzle-referrer",document.location.href)
xhttp.send()
QuizData=JSON.parse(xhttp.responseText)}
for (let i = 0; i < QuizData.questions.length; i++) {
    ModalContent.insertAdjacentHTML( 'beforeend', `"Question: ${QuizData.questions[i].body[0].html}<br>`)
    for (let x = 0; x < QuizData.questions[i].choices.length; x++) {
        if (QuizData.questions[i].choices[x].isCorrect) {
            ModalContent.insertAdjacentHTML( 'beforeend', `<b>Answer:</b> ${QuizData.questions[i].choices[x].body[0].html} <br><br>`)
        }
    }
}
