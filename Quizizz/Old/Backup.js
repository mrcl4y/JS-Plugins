// Old code i don't want to use anymore, it used to handle correct answer detection
/*

    console.log("c")
    let Question = s.structure.query
    let QuestionText = Question.text
    if (c[0] == "[") { // Detect if the question is multiple choice
        var IsMCQ = true
    }

    if (IsMCQ) {
        console.log("d")
        let newc = c.slice(1, c.length - 1)
        newc = newc.split(",");
        // c has been turned into an array :)
        console.log(`<b>Answers:</b><br>`)
        for (let i = 0; i < newc.length; i++) {
            console.log(s.structure.options[Number(newc[i])].text || s.structure.options[Number(newc[i])].media[0].url)
        }
    } else {
        console.log("e")
        if (s.structure.options[c].media[0]) {
            for (let i = 0; i < QuestionsGrid.children.length; i++) {
                if (!QuestionsGrid.children[i].classList.contains("emoji")) {
                    var QText = QuestionsGrid.children[i].children[0].children[0].children[0].children[0]
                    if (QuestionsGrid.children[i].children[0].children[0].innerHTML) {
                        if (QText.innerHTML.search(s.structure.options[c].text) !== -1) {
                            console.log(QText.innerHTML)
                            QText.innerHTML = "<correct-answer-x3Ca8B><u><p>This one is correct, it used to be an image.</p></u></correct-answer-x3Ca8B>"
                            console.log(QText.innerHTML)
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < QuestionsGrid.children.length; i++) {
                if (!QuestionsGrid.children[i].classList.contains("emoji")) {
                    var QText = QuestionsGrid.children[i].children[0].children[0].children[0].children[0]
                    if (QuestionsGrid.children[i].children[0].children[0].innerHTML) {
                        if (QText.innerHTML.search(s.structure.options[c].text) !== -1) {
                            console.log(QText.innerHTML)
                            QText.innerHTML = ("<correct-answer-x3Ca8B><u>") + QText.innerHTML + ("</u></correct-answer-x3Ca8B>")
                            console.log(QText.innerHTML)
                        }
                    }
                }
            }
        }
    }
}

*/

// This detection is really bad so I made a new version
// Edit: The new version(getting game data) sucked too so I made another one(getting quiznumber text)
/*
if (document.getElementsByClassName('resizeable question-text-color')[0]) {
    if (LastQuestion !== document.getElementsByClassName('resizeable question-text-color')[0].innerHTML) {
        OnChanged(t, "Text")
        LastQuestion = document.getElementsByClassName('resizeable question-text-color')[0].innerHTML
    }
}
if (document.getElementsByClassName('question-media')[0]) {
    if (LastQuestion !== document.getElementsByClassName('question-media')[0].children[0].src) {
        OnChanged(t, "Image")
        LastQuestion = document.getElementsByClassName('question-media')[0].children[0].src
    }
}
*/



/*

let QuestionsGrid = document.getElementsByClassName("options-grid")[0]
var QText = QuestionsGrid.children[0].children[0].children[0].children[0].children[0]
QText.innerHTML = QText.innerHTML.replace("<p>", "<u><correct-answer-x3Ca8B>")
QText.innerHTML = QText.innerHTML.replace("</p>", "</correct-answer-x3Ca8B></u>")
*/