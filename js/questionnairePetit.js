import data from "./questPart1.json" assert { type: "json" };


const recupAnswerElementHTML = document.getElementsByClassName("answers");
const answerElement = Array.from(recupAnswerElementHTML);

const recupTips = document.getElementsByClassName("tips");
const tips = Array.from(recupTips);

const recupButtonSuivant = document.getElementsByClassName("btnSuivant");
const buttonSuivant = Array.from(recupButtonSuivant);

const recupProgressBar = document.getElementsByClassName("progress-bar");
const progressBar = Array.from(recupProgressBar);

const recupQuestionDiv = document.getElementsByClassName("question");
const questionDiv = Array.from(recupQuestionDiv);

const recupThemeDiv = document.getElementsByClassName("theme");
const themeDiv = Array.from(recupThemeDiv);

const recupDifficulteDiv = document.getElementsByClassName("difficulte");
const difficuleDiv = Array.from(recupDifficulteDiv);


const nbTotalQuestion = 8;
let nbQuestionRep = 0;
let progressPercent;

/** Convert json data object to array */
    /** Load Answers */
    let recupAnswers = data[nbQuestionRep]["reponses"];
    let answers = [];

    for(var i in recupAnswers)
    answers.push([i, recupAnswers[i]]);
    /** ------------ */

    /** Load Correct Answer */
    let recupAnswerCorrect = data[nbQuestionRep]["bonne_reponse"];
    let answerCorrect = [];

    for(var i in recupAnswerCorrect)
    answerCorrect.push([recupAnswerCorrect[i]]);
    /** ------------------- */

    /** Load Question */
    let recupQuestion = data[nbQuestionRep]["question"];
    let questionRep = [];
    
    for(var i in recupQuestion)
    questionRep.push([recupQuestion[i]]);
    /** ------------- */

    /** Load Tips */
    let recupQuestionTips = data[nbQuestionRep]["tips"];
    let questionTipsRep = [];

    for(var i in recupQuestionTips)
        questionTipsRep.push([recupQuestionTips[i]]);
    /** ------------- */

    /** Load Difficulte */
    let recupTheme = data[nbQuestionRep]["theme"];
    let questionThemeRep = [];

    for(var i in recupTheme)
        questionThemeRep.push([recupTheme[i]]);
    /** ------------- */

    /** Load Difficulte */
    let recupDifficulte = data[nbQuestionRep]["difficulte"];
    let questionDifficulteRep = [];

    for(var i in recupDifficulte)
        questionDifficulteRep.push([recupDifficulte[i]]);
    /** ------------- */

/** --------------------------------- */


function onResponse() {
    const answer = this.getAttribute("answer");

    this.style = "background-color: #fff; border-radius: 1em; min-height: 5em;"

    console.log(typeof answer);
    console.log(typeof answerCorrect[0]);

    if((answer == answerCorrect) && (tips[0].classList.contains("d-none"))){
        this.style = "background-color: rgba(138, 247, 138, 1); border-radius: 1em; min-height: 5em;"
    }else if((answer != answerCorrect[0]) && (tips[0].classList.contains("d-none"))){
        this.style = "background-color: rgba(246, 159, 159, 1); border-radius: 1em; min-height: 5em;"
    }else{
        this.style = "background-color: #f1f1f1; border-radius: 1em; min-height: 5em;"
    }

    tips[0].classList.remove("d-none");
    
    console.log("click");
};

function loadQuestion() {
    /** Load Element */
        /** Load Answers */
        recupAnswers = data[nbQuestionRep]["reponses"];
        answers = [];

        for(var i in recupAnswers)
        answers.push([i, recupAnswers[i]]);
        /** ------------ */

        /** Load Correct Answer */
        recupAnswerCorrect = data[nbQuestionRep]["bonne_reponse"];
        answerCorrect = [];

        for(var i in recupAnswerCorrect)
        answerCorrect.push([recupAnswerCorrect[i]]);
        /** ------------------- */

        /** Load Question */
        recupQuestion = data[nbQuestionRep]["question"];
        questionRep = [];
        
        questionRep.push(recupQuestion);
        console.log(recupQuestion)
        /** ------------- */

        /** Load Tips */
        recupQuestionTips = data[nbQuestionRep]["tips"];
        questionTipsRep = [];

        questionTipsRep.push(recupQuestionTips);
        console.log(recupQuestionTips)
        /** ------------- */

        /** Load Theme */
        recupTheme = data[nbQuestionRep]["theme"];
        questionThemeRep = [];

        questionThemeRep.push(recupTheme);
        console.log(recupTheme)
        /** ------------- */

        /** Load Difficulte */
        recupDifficulte = data[nbQuestionRep]["difficulte"];
        questionDifficulteRep = [];

        questionDifficulteRep.push(recupDifficulte);
        console.log(recupDifficulte)
        /** ------------- */
    /** ------------ */

    questionDiv[0].innerHTML = `
        <div class="text position-absolute top-50 start-50 translate-middle text-black col-10">${questionRep[0]}</div>
    `

    themeDiv[0].innerHTML = `
        <div class="text position-absolute top-50 start-50 translate-middle">${questionThemeRep[0]}</div>
    `

    difficuleDiv[0].innerHTML = `
        <div class="text position-absolute top-50 start-50 translate-middle">${questionDifficulteRep[0]}</div>
    `

    //id random
    answerElement[0].innerHTML= "";

    tips[0].innerHTML = `
    <div class="contenuTIPS container-fluid row mb-40 mt-10">
        <div class="position-relative mt-2" style="min-height: 2rem;">
            <div class="col-2 col-lg-2 position-absolute top-0 start-0 badge bg-secondary text-primary" style="min-height: 2em;">
                <div class="text position-absolute top-50 start-50 translate-middle">Tips</div>
            </div>
        </div>
        <div class="col-10 m-auto">${questionTipsRep[0]}</div>
    </div>
    <div class="position-relative">
        <button type="button" class="btnSuivant btn btn-primary col-1 position-absolute bottom-100 end-0 mb-1" style="background-color: #494949;">
            Suivant
        </button>
    </div>
    `
    tips[0].classList.add("d-none");

    answers.forEach((element) => {
        console.log(element);
        if(element[0] === "A"){
            answerElement[0].innerHTML += `
                <div class="col-6">
                    <div class="reponse col-11 col-lg-10 m-auto text-center position-relative text-black" answer=${element[0]} style="background-color: #f1f1f1; border-radius: 1em; min-height: 5em;">
                        <div class="text position-absolute top-50 start-50 translate-middle col-10">${element[1]}</div>
                    </div>
                </div>
            `
        }else if(element[0] === "B"){
            answerElement[0].innerHTML += `
                <div class="col-6">
                    <div class="reponse col-11 col-lg-10 m-auto text-center position-relative text-black" answer=${element[0]} style="background-color: #f1f1f1; border-radius: 1em; min-height: 5em;">
                        <div class="text position-absolute top-50 start-50 translate-middle col-10">${element[1]}</div>
                    </div>
                </div>
            `
        }else if(element[0] === "C"){
            answerElement[0].innerHTML += `
                <div class="col-6">
                    <div class="reponse col-11 col-lg-10 m-auto text-center position-relative text-black" answer=${element[0]} style="background-color: #f1f1f1; border-radius: 1em; min-height: 5em;">
                        <div class="text position-absolute top-50 start-50 translate-middle col-10">${element[1]}</div>
                    </div>
                </div>
            `
        }else{
            answerElement[0].innerHTML += `
                <div class="col-6">
                    <div class="reponse col-11 col-lg-10 m-auto text-center position-relative text-black" answer=${element[0]} style="background-color: #f1f1f1; border-radius: 1em; min-height: 5em;">
                        <div class="text position-absolute top-50 start-50 translate-middle col-10">${element[1]}</div>
                    </div>
                </div>
            `
        }
    });

    progressPercent = nbQuestionRep/nbTotalQuestion *100;
    progressBar[0].style = `width: ${progressPercent}%`;

    const recupNewAnswer = document.getElementsByClassName("reponse");
    const newRep = Array.from(recupNewAnswer);

    newRep.forEach((element) => {
        element.addEventListener("click", onResponse);
        
    });

    const recupNewButton = document.getElementsByClassName("btnSuivant");
    const newBtn = Array.from(recupNewButton);

    newBtn.forEach((element) => {
        element.addEventListener("click", onSuivant);
        
    });
}


loadQuestion();
const recupReponseAll = document.getElementsByClassName("reponse");
const reponseAll = Array.from(recupReponseAll);



function onSuivant() {
    nbQuestionRep++;
    // id random

    answers = ["a", "c", "d", "b"]
    loadQuestion();

    console.log(reponseAll);
}





buttonSuivant.forEach((element) => {
    element.addEventListener("click", onSuivant);
})

reponseAll.forEach((element) => {
    element.addEventListener("click", onResponse);
    
})

