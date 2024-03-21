import data from "./questPart2.json" assert { type: "json" };

const recupAnswerElementHTML = document.getElementsByClassName("answers");
const answerElement = Array.from(recupAnswerElementHTML);

const recupTips = document.getElementsByClassName("tips");
const tips = Array.from(recupTips);

const recupProgressBar = document.getElementsByClassName("progress-bar");
const progressBar = Array.from(recupProgressBar);

const recupQuestionDiv = document.getElementsByClassName("question");
const questionDiv = Array.from(recupQuestionDiv);

const recupThemeDiv = document.getElementsByClassName("theme");
const themeDiv = Array.from(recupThemeDiv);

const recupDifficulteDiv = document.getElementsByClassName("difficulte");
const difficuleDiv = Array.from(recupDifficulteDiv);

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Utilisation de la fonction pour récupérer test1 et test2
let oldDatas = getQueryParam('datas');

// Suppression du dernier caractère ';' si présent pour éviter un élément vide
if (oldDatas.endsWith(';')) {
    oldDatas = oldDatas.slice(0, -1);
}

// Diviser la chaîne pour obtenir chaque paire clé:valeur
let pairs = oldDatas.split(';');

// Créer un objet pour stocker les résultats
let oldUserStats = {};

// Itérer sur chaque paire, la diviser en clé et valeur, et ajouter au résultat
pairs.forEach(pair => {
    let [key, value] = pair.split(':');
    oldUserStats[key] = parseInt(value, 10); // Convertir la valeur en nombre
});

const nbTotalQuestion = 5;
let nbQuestionRep = 0;
let progressPercent;
let newUserStats = {};
let newTotalUserStats = {};

let recupAnswers;
let answers;
let recupAnswerCorrect;
let answerCorrect;
let recupQuestion;
let questionRep;
let recupQuestionTips;
let questionTipsRep;
let recupTheme;
let questionThemeRep;
let recupDifficulte;
let questionDifficulteRep;

let nbReponsesCorrectes = 0;
let nbReponsesIncorrectes = 0;
let reponseDonnee = false;
let randomNumber = Math.floor(Math.random() * 47);

function onResponse() {
    const answer = this.getAttribute("answer");

    this.style = "background-color: #fff; border-radius: 1em; min-height: 5em;"
    if (reponseDonnee) return; // Si une réponse a déjà été donnée, ne fait rien
    reponseDonnee = true; // Marque qu'une réponse a été donnée

    if(answer == data[randomNumber]["bonne_reponse"]){
        this.style = "background-color: rgba(138, 247, 138, 1); border-radius: 1em; min-height: 5em;";
        nbReponsesCorrectes++;
    }else{
        this.style = "background-color: rgba(246, 159, 159, 1); border-radius: 1em; min-height: 5em;";
        nbReponsesIncorrectes++;
    }

    console.log(typeof answer);
    console.log(typeof answerCorrect[0]);

    if (!newUserStats.hasOwnProperty(questionThemeRep[0])) newUserStats[questionThemeRep[0]] = 0
    if (!newTotalUserStats.hasOwnProperty(questionThemeRep[0])) newTotalUserStats[questionThemeRep[0]] = 0
    newTotalUserStats[questionThemeRep[0]] += 1

    if((answer == answerCorrect) && (tips[0].classList.contains("d-none"))){
        this.style = "background-color: rgba(138, 247, 138, 1); border-radius: 1em; min-height: 5em;"
        newUserStats[questionThemeRep[0]] += 1
    }else if((answer != answerCorrect[0]) && (tips[0].classList.contains("d-none"))){
        this.style = "background-color: rgba(246, 159, 159, 1); border-radius: 1em; min-height: 5em;"
    }else{
        this.style = "background-color: #f1f1f1; border-radius: 1em; min-height: 5em;"
    }

    tips[0].classList.remove("d-none");

    console.log("click");
}

function loadQuestion() {
    let i;
    /** Load Answers */
    recupAnswers = data[randomNumber]["reponses"];
    answers = [];

    for(i in recupAnswers)
        answers.push([i, recupAnswers[i]]);
    /** ------------ */

    /** Load Correct Answer */
    recupAnswerCorrect = data[randomNumber]["bonne_reponse"];
    answerCorrect = [];

    for(i in recupAnswerCorrect)
        answerCorrect.push([recupAnswerCorrect[i]]);
    /** ------------------- */

    /** Load Question */
    recupQuestion = data[randomNumber]["question"];
    questionRep = [];

    questionRep.push(recupQuestion);
    console.log(recupQuestion)
    /** ------------- */

    /** Load Tips */
    recupQuestionTips = data[randomNumber]["tips"];
    questionTipsRep = [];

    questionTipsRep.push(recupQuestionTips);
    console.log(recupQuestionTips)
    /** ------------- */

    /** Load Theme */
    recupTheme = data[randomNumber]["theme"];
    questionThemeRep = [];

    questionThemeRep.push(recupTheme);
    console.log(recupTheme)
    /** ------------- */

    /** Load Difficulte */
    recupDifficulte = data[randomNumber]["difficulte"];
    questionDifficulteRep = [];

    questionDifficulteRep.push(recupDifficulte);
    console.log(recupDifficulte)
    /** ------------- */

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
        <div class="indication">
            <div class="position-relative mt-2" style="min-height: 2rem;">
                <div class="col-2 col-lg-2 position-absolute top-0 start-0 badge bg-secondary text-primary" style="min-height: 2em;">
                    <div class="text position-absolute top-50 start-50 translate-middle">Tips</div>
                </div>
            </div>
        </div>
        <div class="contenu mb-4">
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

    newRep.forEach(element => {
        element.style.pointerEvents = "auto"; // Réactiver les événements de pointeur
        element.addEventListener("click", onResponse);
    });

    const recupNewButton = document.getElementsByClassName("btnSuivant");
    const newBtn = Array.from(recupNewButton);

    newBtn.forEach((element) => {
        element.addEventListener("click", onSuivant);

    });
}

loadQuestion();

function onSuivant() {
    randomNumber = Math.floor(Math.random() * 47);
    nbQuestionRep++;
    reponseDonnee = false; // Permet de répondre à la nouvelle question
    if (nbQuestionRep == nbTotalQuestion) {

        let ancienResultat = "";
        Object.entries(oldUserStats).forEach(([cle, valeur]) => {
            ancienResultat += `- ${cle} : ${valeur}/2\n`;
        });

        let nouveauResultat = "";
        Object.entries(newUserStats).forEach(([cle, valeur]) => {
            if(cle in newTotalUserStats) nouveauResultat += `- ${cle} : ${valeur}/${newTotalUserStats[cle]}\n`;
        });

        // Mettre à jour le contenu de la modal avec les résultats
        document.getElementById("correctAnswers").innerText = `Réponses correctes : ${nbReponsesCorrectes}`;
        document.getElementById("incorrectAnswers").innerText = `Réponses incorrectes : ${nbReponsesIncorrectes}`;
        document.getElementById("oldInfoAnswers").innerText = `Ancien résultats :\n ${ancienResultat}`;
        document.getElementById("newInfoAnswers").innerText = `Nouveau résultats :\n ${nouveauResultat}`;

        // Afficher la modal
        // Création de l'instance modal Bootstrap
        var resultModalElement = document.getElementById('resultModal');
        var resultModal = new bootstrap.Modal(resultModalElement, {
            backdrop: 'static', // Empêche la fermeture en cliquant à l'extérieur
            keyboard: false // Empêche la fermeture avec la touche Échap
        });
        resultModal.show();

    } else {
        loadQuestion();
    }
}

