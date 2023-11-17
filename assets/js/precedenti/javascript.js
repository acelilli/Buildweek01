const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ];

let punteggio = 0; //variabile globale del punteggio
/*SCLAETTA JS
Timer
   */
let index = 0; //indice della domanda
// ---------------------------- timer 
let i = 59;   
const timer = function () {
    const timerPar = document.getElementById('timer');
    timerPar.innerText = i;
    if (i<= 0) {
        // clearInterval(interval1);
        premiTasti()
    }
    i--;   
}
const interval1 = setInterval(timer, 1000);   //lanciamo la funzione che già

// ------------------------- genera domande + risposte
//let indice = 2;
 const generaDomanda = function (arr, indice) { // array e indice perché 
  const domanda = document.getElementById('domanda');
  // const risposte = document.querySelectorAll('.bottoneRisposta');
  const divRisposte = document.querySelector('.risposte')

  for (let i = 0; i <= arr[indice].incorrect_answers.length; i++) {
    const risposte = document.createElement('button');
    risposte.classList.add('bottoneRisposta');
    divRisposte.appendChild(risposte);
  }

  //console.log(risposte); // controllo che prende i bottoni risposta
    risposte = document.getElementsByClassName('bottoneRisposta');
    domanda.innerHTML = arr[indice].question;

    if(arr[indice].incorrect_answers.length == 3) {
        rispIndex = Math.floor(Math.random()*4); // abbiamo dato a rispIndex un valore random
        risposte[rispIndex].innerHTML = arr[indice].correct_answer; // assegnazione risposta corretta
        risposte[rispIndex].classList.add('corretta');
        switch (rispIndex) { // In quale posizione si trova la risposta corretta?
            case 0:          // Se rispIndex = 0 allora caso 0
            risposte[1].innerHTML = arr[indice].incorrect_answers[0];
            risposte[2].innerHTML = arr[indice].incorrect_answers[1];
            risposte[3].innerHTML = arr[indice].incorrect_answers[2];
            break;
            case 1: 
            risposte[0].innerHTML = arr[indice].incorrect_answers[0];
            risposte[2].innerHTML = arr[indice].incorrect_answers[1];
            risposte[3].innerHTML = arr[indice].incorrect_answers[2];
            break;
            case 2: 
            risposte[0].innerHTML = arr[indice].incorrect_answers[0];
            risposte[1].innerHTML = arr[indice].incorrect_answers[1];
            risposte[3].innerHTML = arr[indice].incorrect_answers[2];
            break;
            case 3: 
            risposte[0].innerHTML = arr[indice].incorrect_answers[0];
            risposte[2].innerHTML = arr[indice].incorrect_answers[1];
            risposte[1].innerHTML = arr[indice].incorrect_answers[2];
            break;
        }
    } else {
        rispIndex = Math.floor(Math.random()*2);
        risposte[rispIndex].innerHTML = arr[indice].correct_answer;
        switch (rispIndex) { // In quale posizione si trova la risposta corretta?
            case 0:          // Se rispIndex = 0 allora caso 0
            risposte[1].innerHTML = arr[indice].incorrect_answers[0];
            break;
            case 1:
            risposte[0].innerHTML = arr[indice].incorrect_answers[0];    
    }}
    index = index + 1; //dentro genera domanda, così carica la prima poi le altre // va messo prima dell'azione click comunque
  }

  generaDomanda(questions, index)

const premiTasti = function () {
    // qui facciamo la funzione in cui, cliccando su una risposta ci genera una domanda random
    //Quando premo il tasto che fa?
    //cancella i pulsanti
    const pulsanti = document.querySelectorAll('.bottoneRisposta');
    pulsanti.forEach(element => {
    element.remove();
    })
    //parte genera domanda
    generaDomanda(questions, index)
     //aggiorna index domanda
     rendiCliccabile();
     segnaPunti();
    
        // parte il timer
        i = 59;
        interval1;
}

const rendiCliccabile = function() {
const pulsanti = document.querySelectorAll('.bottoneRisposta');
pulsanti.forEach(element => {
    element.addEventListener('click', premiTasti)
});
}

rendiCliccabile();

const segnaPunti = function () {
  const corretto = document.querySelector('.corretta');
  corretto.addEventListener('click', function () {
    punteggio ++;
    console.log(punteggio)
  })
}
segnaPunti()
