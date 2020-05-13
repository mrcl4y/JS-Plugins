// First we want to detect if the URL is valid
if (window.location.href.search("quizizz.com/join/game/") == -1 && window.location.href.search("gameType=") == -1) {
    throw new Error("You aren't on a quizizz quiz. If you think this is an error please DM East_Arctica#9238 on discord!");
}
// Next we want to detect if it has been run before and debug is disabled.
if (window.QuizizzBot && !window.QuizizzBotDebug) {
    throw new Error("Already ran Quizizz bot! Advanced: Set Window.QuizizzBotDebug to bypass this.");
}
window.QuizizzBot = true

let offset = 33;

class Encoding {
    static encode(t, e, o = 2) {
        let s = this.encodeRaw(e, !0);
        return `${s}${this.encodeRaw(t, !1, e)}${String.fromCharCode(33 + s.length)}${o}`
    }

    static encodeRaw(t, e, o = "quizizz.com") {
        let s = 0;
        s = e ? o.charCodeAt(0) : o.charCodeAt(0) + o.charCodeAt(o.length - 1);
        let r = [];
        for (let o = 0; o < t.length; o++) {
            let n = t[o].charCodeAt(0),
                c = e ? this.safeAdd(n, s) : this.addOffset(n, s, o, 2);
            r.push(String.fromCharCode(c))
        }
        return r.join("")
    }

    static decode(t, e = !1) {
        if (e) {
            let e = this.extractHeader(t);
            return this.decodeRaw(e, !0)
        }
        {
            let e = this.decode(this.extractHeader(t), !0),
                o = this.extractData(t);
            return this.decodeRaw(o, !1, e)
        }
    }

    static decodeRaw(t, e, o = "quizizz.com") {
        let s = this.extractVersion(t);
        let r = 0;
        r = e ? o.charCodeAt(0) : o.charCodeAt(0) + o.charCodeAt(o.length - 1), r = -r;
        let n = [];
        for (let o = 0; o < t.length; o++) {
            let c = t[o].charCodeAt(0),
                a = e ? this.safeAdd(c, r) : this.addOffset(c, r, o, s);
            n.push(String.fromCharCode(a))
        }
        return n.join("")
    }

    static addOffset(t, e, o, s) {
        return 2 === s ? this.verifyCharCode(t) ? this.safeAdd(t, o % 2 == 0 ? e : -e) : t : this.safeAdd(t, o % 2 == 0 ? e : -e)
    }

    static extractData(t) {
        let e = t.charCodeAt(t.length - 2) - 33;
        return t.slice(e, -2)
    }

    static extractHeader(t) {
        let e = t.charCodeAt(t.length - 2) - 33;
        return t.slice(0, e)
    }

    static extractVersion(t) {
        if ("string" == typeof t && t[t.length - 1]) {
            let e = parseInt(t[t.length - 1], 10);
            if (!isNaN(e)) return e
        }
        return null
    }

    static safeAdd(t, e) {
        let o = t + e;
        return o > 65535 ? o - 65535 + 0 - 1 : o < 0 ? 65535 - (0 - o) + 1 : o
    }

    static verifyCharCode(t) {
        if ("number" == typeof t) return !(t >= 55296 && t <= 56319 || t >= 56320 && t <= 57343)
    }

    static generateIdentifier(t, e, o = 1, s = (new Date).getTime()) {
        let r = e;
        return "function" == typeof e && (r = e()), "".concat(t, ".").concat(r, "|").concat(o, ".").concat(s)
    }
}

// add the CSS thats for correct questions
document.head.insertAdjacentHTML('beforeend', `<style type="text/css">
correct-answer-x3Ca8B {
  color: lime !important;
}
</style>`);

// Cut up the url to find the gameType
let URL = window.location.href,
    GameType = URL.slice(URL.search("gameType=") + 9, URL.length),
    prevConx = localStorage.getItem("previousContext"),
    parsedConx = JSON.parse(prevConx),
    encodedRoomHash = parsedConx.game.roomHash,
    roomHash = Encoding.decode(encodedRoomHash.split("-")[1]),
    data = {
        roomHash: roomHash,
        type: GameType
    };


// Wait until the page is loaded before running this
function CheckLoaded() {
    setTimeout(function () {
        if (document.getElementsByClassName("current-question")[0] || document.getElementsByClassName("redemption-marker")[0]) {
            fetch("https://game.quizizz.com/play-api/v3/getQuestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(t => t.json()).then(t => {
                QuestionChangedLoop(t)
            })
        } else {
            CheckLoaded()
        }
    }, 10);
}

CheckLoaded()

function OnChanged(t, type) {
    let e = 0;
    for (let o of Object.keys(t.questions)) {
        e++;
        let s = t.questions[o],
            r = s.structure.kind,
            n = s.structure.answer,
            c = Encoding.decode(n);
        let QuestionsGrid = document.getElementsByClassName("options-grid")[0]
        switch (type) {
            case "Media":
                console.log(s)
                if (document.getElementsByClassName("typed-option-input")[0]) {
                    if (s.structure.kind === "BLANK") {
                        let ToAlert = ""
                        for (let i = 0; i < s.structure.options.length; i++) {
                            if (ToAlert == "") {
                                ToAlert = s.structure.options[i].text
                            } else {
                                ToAlert = ToAlert + ", " + s.structure.options[i].text
                            }
                        }
                        alert(ToAlert)
                    }
                } else {
                    if (s.structure.query.media[0]) {
                        var SRC = document.getElementsByClassName("question-media")[0].children[0].src
                        var CutUpSRC = SRC.slice(0, SRC.search("/?w=") - 1)
                        if (s.structure.query.media[0].url == CutUpSRC) {
                            console.log(c)
                            if (c[0] == "[") {
                                c = c[1]
                            }
                            let CorrectAnswer = (s.structure.options[c].text.replace(/&nbsp;/g, " ")).replace(/  /g, " ")
                            let Questions = QuestionsGrid.children
                            // We will loop through the questions until we find one with a duplicate innerHTML as CorrectAnswer
                            for (let i = 0; i < Questions.length; i++) { // Note: We add the -1 because of the emoji div that is added Edit: Don't do that add detection for emoji div below.
                                if (!Questions[i].classList.contains("emoji")) {
                                    let ListedHTML = Questions[i].children[0].children[0].children[0].children[0]
                                    if (ListedHTML.innerHTML == CorrectAnswer) {
                                        ListedHTML.innerHTML = "<correct-answer-x3Ca8B><u>" + ListedHTML.innerHTML + "</u></correct-answer-x3Ca8B>"
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            case "Text":
                console.log(s)
                if (document.getElementsByClassName("typed-option-input")[0]) {
                    if (s.structure.kind === "BLANK") {
                        let ToAlert = ""
                        for (let i = 0; i < s.structure.options.length; i++) {
                            if (ToAlert == "") {
                                ToAlert = s.structure.options[i].text
                            } else {
                                ToAlert = ToAlert + ", " + s.structure.options[i].text
                            }
                        }
                        alert(ToAlert)
                    }
                } else {
                    if ((s.structure.query.text.replace(/&nbsp;/g, " ")).replace(/  /g, " ") == document.getElementsByClassName('resizeable question-text-color')[0].innerHTML.replace("<br>", "<br/>")) { // This is the current question
                        console.log(c)
                        if (c[0] == "[") {
                            c = c[1]
                        }
                        console.log((s.structure.options[c].text.replace(/&nbsp;/g, " ")).replace(/  /g, " "))
                        let CorrectAnswer = (s.structure.options[c].text.replace(/&nbsp;/g, " ")).replace(/  /g, " ")
                        let Questions = document.getElementsByClassName("options-grid")[0].children
                        // We will loop through the questions until we find one with a duplicate innerHTML as CorrectAnswer
                        for (let i = 0; i < Questions.length; i++) { // Note: We add the -1 because of the emoji div that is added Edit: Don't do that add detection for emoji div below.
                            if (!Questions[i].classList.contains("emoji")) {
                                let ListedHTML = Questions[i].children[0].children[0].children[0].children[0]
                                if (ListedHTML.innerHTML == CorrectAnswer) {
                                    ListedHTML.innerHTML = "<correct-answer-x3Ca8B><u>" + ListedHTML.innerHTML + "</u></correct-answer-x3Ca8B>"
                                }
                            }
                        }
                    }
                }
                break;
            case "Both":
                console.log(s)
                if (document.getElementsByClassName("typed-option-input")[0]) {
                    if (s.structure.kind === "BLANK") {
                        let ToAlert = ""
                        for (let i = 0; i < s.structure.options.length; i++) {
                            if (ToAlert == "") {
                                ToAlert = s.structure.options[i].text
                            } else {
                                ToAlert = ToAlert + ", " + s.structure.options[i].text
                            }
                        }
                        alert(ToAlert)
                    }
                } else {
                    if (s.structure.query.media[0]) {
                        let SRC = document.getElementsByClassName("question-media")[0].children[0].src
                        let CutUpSRC = SRC.slice(0, SRC.search("/?w=") - 1)
                        if (s.structure.query.media[0].url == CutUpSRC) {
                            if ((s.structure.query.text.replace(/&nbsp;/g, " ")).replace(/  /g, " ") == document.getElementsByClassName('resizeable question-text-color')[0].innerHTML) { // This is the current question
                                if (c[0] == "[") {
                                    let Answers = JSON.parse(c)
                                    for (let i = 0; i < Answers.length; i++) {
                                        let CorrectAnswer = (s.structure.options[Answers[i]].text.replace(/&nbsp;/g, " ")).replace(/  /g, " ")
                                        let Questions = document.getElementsByClassName("options-grid")[0].children
                                        console.log(CorrectAnswer)
                                        console.log(Answers)
                                        // We will loop through the questions until we find one with a duplicate innerHTML as CorrectAnswer
                                        for (let x = 0; x < Questions.length; x++) { // Note: We add the -1 because of the emoji div that is added
                                            // Edit: Don't do that add detection for emoji div below.
                                            if (!Questions[x].classList.contains("emoji")) {
                                                let ListedHTML = Questions[x].children[0].children[0].children[0].children[0]
                                                if (ListedHTML.innerHTML == CorrectAnswer) {
                                                    ListedHTML.innerHTML = "<correct-answer-x3Ca8B><u>" + ListedHTML.innerHTML + "</u></correct-answer-x3Ca8B>"
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    let CorrectAnswer = (s.structure.options[c].text.replace(/&nbsp;/g, " ")).replace(/  /g, " ")
                                    let Questions = document.getElementsByClassName("options-grid")[0].children
                                    // We will loop through the questions until we find one with a duplicate innerHTML as CorrectAnswer
                                    for (let i = 0; i < Questions.length; i++) { // Note: We add the -1 because of the emoji div that is added
                                        // Edit: Don't do that add detection for emoji div below.
                                        if (!Questions[i].classList.contains("emoji")) {
                                            let ListedHTML = Questions[i].children[0].children[0].children[0].children[0]
                                            if (ListedHTML.innerHTML == CorrectAnswer) {
                                                ListedHTML.innerHTML = "<correct-answer-x3Ca8B><u>" + ListedHTML.innerHTML + "</u></correct-answer-x3Ca8B>"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                break;
        }
    }
}


// Loop a check to see if the question has changed
let CurrentQuestionNum = -1

function QuestionChangedLoop(t) {
    setTimeout(function () {
        let NewNum = document.getElementsByClassName("current-question")[0]
        let RedemptionQues = document.getElementsByClassName("redemption-marker")[0]
        if (NewNum) {
            if (CurrentQuestionNum != NewNum.innerHTML) {
                // Run a check to see if its media, text, or both
                if (document.getElementsByClassName("question-media")[0]) {
                    // Media was detected, check if text is too
                    if (document.getElementsByClassName("question-text")[0]) {
                        // Detected text aswell, send it to the onchanged
                        setTimeout(function () {
                            OnChanged(t, "Both")
                        }, 650)
                    } else {
                        // Failed to detect text aswell, Media is all that we need to send
                        setTimeout(function () {
                            OnChanged(t, "Media")
                        }, 650)
                    }
                } else {
                    // Media wasn't detected, no need to check if text was because it has to be
                    setTimeout(function () {
                        OnChanged(t, "Text")
                    }, 650)
                }
                CurrentQuestionNum = NewNum.innerHTML
            }
        }
        if (RedemptionQues) {
            // Run a check to see if its media, text, or both
            if (document.getElementsByClassName("question-media")[0]) {
                // Media was detected, check if text is too
                if (document.getElementsByClassName("question-text")[0]) {
                    // Detected text aswell, send it to the onchanged
                    setTimeout(function () {
                        OnChanged(t, "Both")
                    }, 650)
                } else {
                    // Failed to detect text aswell, Media is all that we need to send
                    setTimeout(function () {
                        OnChanged(t, "Media")
                    }, 650)
                }
            } else {
                // Media wasn't detected, no need to check if text was because it has to be
                setTimeout(function () {
                    OnChanged(t, "Text")
                }, 650)
            }
        }
        QuestionChangedLoop(t)
    }, 10)
}