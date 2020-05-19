if (document.location.href.search("https://edpuzzle.com/assignments/") != 0) {
    alert("You aren't on a edpuzle assignment. If you think this is an error please DM East_Arctica#9238 on discord!")
    throw new Error("You aren't on a edpuzle assignment. If you think this is an error please DM East_Arctica#9238 on discord!")
}

document.head.insertAdjacentHTML('beforeend', `<style type="text/css">
correct-answer-x3Ca8B {
  color: lime !important;
}
</style>`);

function Fix(s) {
    sEnd = s.lastIndexOf("&nbsp;")
    if (sEnd == s.length - 6) {
        s = s.substring(0, sEnd)
    }
    s = s.replace(/&nbsp;/g, " ")
    s = s.replace(/&#8203;/g, "‍")
    s = jQuery('<div>').html(String(s))[0].innerHTML
    s = s.replace(/\s+/g, ' ')
    return s
}

let start = document.location.href.search("/assignments/") + 13
let end = document.location.href.search("/watch")
let QuizID = document.location.href.slice(start, end)
let APIURL = "https://edpuzzle.com/api/v3/assignments/" + QuizID
let xhttp = new XMLHttpRequest;
xhttp.open("GET", APIURL, 0)
xhttp.send()
let QuizData = JSON.parse(xhttp.responseText)

let LastQuestion
function Start() {
    setTimeout(function() {
        if (document.getElementsByClassName('_2ck9StMwG9')[0]) {
            // A question is visible
            let Question = Fix(document.getElementsByClassName('_9FPn8OzVbH _2yXznYfjSY _1ywxTGela8 _1FldHIpVii _2_UfyNB01a')[0].innerHTML)
            if (Question !== LastQuestion) {
                LastQuestion = Question
                let Questions = QuizData.medias[0].questions
                for (let i = 0; i < Questions.length; i++) {
                    let ToCheck = Fix(Questions[i].body[0].html)
                    if (ToCheck == LastQuestion) {
                        if (Questions[i].choices) {
                            for (let x = 0; x < Questions[i].choices.length; x++) {
                                if (Questions[i].choices[x].isCorrect) {
                                    let Answer = Fix(Questions[i].choices[x].body[0].html)
                                    console.error(ToCheck)
                                    console.error(Answer)
                                    let Choices = document.getElementsByClassName('_1y6SsObDml')[0].children
                                    for (let y = 0; y < Choices.length; y++) {
                                        if (Fix(Choices[y].children[1].children[0].children[0].innerHTML) == Answer) {
                                            Choices[y].children[1].children[0].children[0].innerHTML = "<correct-answer-x3Ca8B><u>" + Choices[y].children[1].children[0].children[0].innerHTML + "</u></correct-answer-x3Ca8B>"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if(document.getElementsByClassName('_1y6SsObDml')[0]) {
            // A question is visible
            let Question = Fix(document.getElementsByClassName('_1y6SsObDml')[0].children[0].innerHTML)
            console.log(Question)
            if (Question !== LastQuestion) {
                LastQuestion = Question
                let Questions = QuizData.medias[0].questions
                for (let i = 0; i < Questions.length; i++) {
                    let ToCheck = Fix(Questions[i].body[0].text)
                    if (ToCheck == LastQuestion) {
                        if (Questions[i].choices) {
                            for (let x = 0; x < Questions[i].choices.length; x++) {
                                if (Questions[i].choices[x].isCorrect) {
                                    let Answer = Fix(Questions[i].choices[x].body[0].html)
                                    let Choices = document.getElementsByClassName('_1y6SsObDml')[0].children
                                    for (let y = 0; y < Choices.length; y++) {
                                        if (Fix(Choices[y].children[1].children[0].children[0].innerHTML) == Answer) {
                                            Choices[y].children[1].children[0].children[0].innerHTML = "<correct-answer-x3Ca8B><u>" + Choices[y].children[1].children[0].children[0].innerHTML + "</u></correct-answer-x3Ca8B>"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        Start()
    }, 10)
}
Start()