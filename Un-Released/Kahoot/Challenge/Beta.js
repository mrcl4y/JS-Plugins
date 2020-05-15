if (document.location.href.search("kahoot.it/challenge") == -1) {
    throw new Error("You aren't on a kahoot challenge. If you think this is an error please DM East_Arctica#9238 on discord!")
}
if (!window.KahootAnswerHighlighterExecuted === "KahootHighlighter!") {
    throw new Error("Already ran kahoot highlighter!");
}
window.KahootAnswerHighlighterExecuted = "KahootHighlighter!"
document.head.insertAdjacentHTML('beforeend', `<style type="text/css">
correct-answer-x3Ca8B {
  color: lime !important;
}
</style>`);
let ID = document.location.href.slice(document.location.href.search("kahoot.it/challenge")+20, document.location.href.length)
// Get the challenge data
let xhttp = new XMLHttpRequest
xhttp.open("GET", "https://kahoot.it/rest/challenges/" + ID + "?includeKahoot=true", false)
xhttp.send()
let QuizData = JSON.parse(xhttp.responseText)
let Questions = QuizData.kahoot.questions
function OnQuestion() {
    for (var i = 0; i < Questions.length; i++) {
        for (var x = 0; x < Questions[i].choices.length; x++) {
            if (Questions[i].choices[x].correct) {
                var a = document.getElementsByClassName('question-choices__QuestionChoices-vfgbd-0')[0].children
                for (let y = 0; y < a.length; y++) {
                    if (a[y].children[1].children[0].innerHTML == Questions[i].choices[x].answer) {
                        a[y].children[1].children[0].click()
                    }
                }
            }
        }
    }
}

// New Question Detection
var Old = ""
function CheckQuestion() {
    setTimeout(function() {
        if (document.getElementsByClassName('next-button__Button-sc-1wk6ntg-0 gyJMgf button__Button-c6mvr2-0 hotoYM')[0]) {
            document.getElementsByClassName('next-button__Button-sc-1wk6ntg-0 gyJMgf button__Button-c6mvr2-0 hotoYM')[0].click()
        }
        if (document.getElementsByClassName('scoreboard__Button-ryzpjh-4 iqbnVU button__Button-c6mvr2-0 kiknlR')[0]) {
            document.getElementsByClassName('scoreboard__Button-ryzpjh-4 iqbnVU button__Button-c6mvr2-0 kiknlR')[0].click()
        }
        if (document.getElementsByClassName("gXeTje")[0]) {
            if (document.getElementsByClassName("gXeTje")[0].children[0].children[1].children[0].innerHTML !== Old) {
                OnQuestion()
                Old = document.getElementsByClassName("gXeTje")[0].children[0].children[1].children[0].innerHTML
            }
        }
        CheckQuestion()
    }, 10)
}
CheckQuestion()