document.head.insertAdjacentHTML('beforeend', `<style type="text/css">
correct-answer-x3Ca8B {
  color: lime !important;
}
</style>`);
let xhttp = new XMLHttpRequest();
var gameId = "5eb1f1eb523ca6002204c5e4"
xhttp.open('GET', 'https://www.gimkit.com/api/games/fetch/' + gameId, false);
xhttp.send();
let Kit = JSON.parse(xhttp.responseText).kit
let Questions = Kit.questions
let NewQuestions = []
for (let i = 0; i < Questions.length; i++) {
    for (let x = 0; x < Questions[i].answers.length; x++) {
        if (Questions[i].answers[x].correct) {
            NewQuestions.push(JSON.parse(`{"Question": "${Questions[i].text}", "Answer": "${Questions[i].answers[x].text}"}`))
        }
    }
}
let LastQuestion = ""
function Loop() {
    setTimeout(function() {
        if (document.getElementsByClassName("sc-crNyjn gVmspl")[0]) {
            if (document.getElementsByClassName("sc-crNyjn gVmspl")[0].children[0].children[0].children[0].children[0].innerHTML != LastQuestion) {
                for (let i = 0; i < NewQuestions.length; i++) {
                    if (NewQuestions[i].Question == document.getElementsByClassName("sc-crNyjn gVmspl")[0].children[0].children[0].children[0].children[0].innerHTML) {
                        //console.log(NewQuestions[i].Answer)
                        for (let x = 0; x < document.getElementsByClassName("sc-fCPvlr ezDTjm")[0].children.length; x++) {
                            let a = document.getElementsByClassName("sc-fCPvlr ezDTjm")[0].children[x].children[0].children[0].children[0].children[0].children[0]
                            if (a.innerHTML == NewQuestions[i].Answer) {
                                console.log(a.innerHTML)
                                a.innerHTML = "<correct-answer-x3Ca8B><u>" + a.innerHTML + "</u></correct-answer-x3Ca8B>"
                            }
                        }
                    }
                }
                LastQuestion = document.getElementsByClassName("sc-crNyjn gVmspl")[0].children[0].children[0].children[0].children[0].innerHTML
            }
        }
        Loop()
    }, 10)
}
Loop()