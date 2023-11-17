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

  const results = [{}, {}, {}, {}, {},{}, {}, {}, {}, {}] //inizializzazione dell'array contenente domande e risposte esatte

let punteggio = 0; //variabile globale del punteggio
let index = 0; //indice della domanda
const difficolta = parseInt(localStorage.getItem("storageName")); //prendo la variabile difficolta passata dai radioButton della pagina precedente
console.log(difficolta)
questions.length = difficolta; // impostiamo la lunghezza dell'array in base alla difficoltà selezionata
results.length = difficolta //anche l'array results avrà la stessa lunghezza di questions

// ------------------------- timer
let i = 59; //rappresenta i secondi rimanenti
const timer = function () {
  //timer diviso in due div per creare l'effetto grafico del tempo che diminuisce
  const timerPar = document.getElementById('timerPiccolo');
  const timerGrande = document.getElementById('timer');
  let gradiTimer = 360 -((i * 360) /60) // formula per definire a quanti gradi del cerchio corrisponde lo scorrere del tempo
  timerGrande.setAttribute('style', `background-image: conic-gradient(#7c4f7e 0deg, #7c4f7e ${gradiTimer}deg, #00ffff ${gradiTimer}deg, #00ffff 360deg)`) // settiamo il gradiente per l'effetto del timer
  // HTML del timer con i secondi che scorrono
  timerPar.innerHTML = `<p>Seconds</p>
  <p style="font-size:30px">${i}</p>
  <p>remaining</p>`;
  // allo scadere del tempo fa partire la funzione che cambia domanda
  if (i<=0) {
      premiTasti();
  }
  i--;
}
const interval1 = setInterval(timer, 1000); // intervallo di un secondo per simulare il timer

// ------------------- genera domande e risposte
//funzione che genera la domanda e le risposte, come parametri un array e un indice (inizializzato all'inizio pagina)
const generaDomanda = function (arr, indice) {
    const divRisposte = document.querySelector('.risposte'); //selezioniamo il div risposte
  // per ogni risposta sbagliata + 1 creiamo un bottone
    for (let i=0; i<=arr[indice].incorrect_answers.length; i++) {
        const risposte = document.createElement('button');
        risposte.classList.add('sbagliata'); // aggiungiamo la classe .sbagliata a tutti (che poi andremo a rimuovere)
        risposte.classList.add('bottoneRisposta'); // aggiungiamo la classe bottoneRisposta per lo stile
        divRisposte.appendChild(risposte); // mettiamo ogni bottone dentro al div risposte
    }
    results[index].domanda = arr[index].question; // inseriamo la domanda nell'array tisultati ogni volta che viene generata una nuova domanda
    results[index].risposta_esatta = arr[index].correct_answer; // allo stesso modo inseriamo la risposta corretta

    const domanda = document.getElementById('domanda'); // selezioniamo l'elemento con id domanda
    risposte = document.getElementsByClassName('bottoneRisposta'); // selezioniamo gli elementi con classe bottoneRisposta creati in precedenza
    domanda.innerHTML = arr[indice].question; //inseriamo la domanda (dall'indice dell'array) nell'h2
    // se le risposte sbagliate sono 3 la risposta corretta potrà andare in modo randomico in uno dei quattro bottoni
    if (arr[indice].incorrect_answers.length == 3) {
        rispIndex = Math.floor(Math.random()*4); // funzione per prendere un numero random tra 0 e 3

        risposte[rispIndex].innerHTML = arr[indice].correct_answer; //assegnazione risposta corretta
        risposte[rispIndex].classList.remove('sbagliata'); // rimuove la classe risposta bagliata perché la risposta inserita è quella giusta
        risposte[rispIndex].classList.add('corretta'); // aggiunge la classe corretta

        //assegnazione risposta sbagliata
        switch (rispIndex) { //in base al valore che rispIndex (risposta giusta) popoliamo gli altri bottoni
            case 0: risposte[1].innerHTML = arr[indice].incorrect_answers[0];
            risposte[2].innerHTML = arr[indice].incorrect_answers[1];
            risposte[3].innerHTML = arr[indice].incorrect_answers[2];
            break;

            case 1: risposte[0].innerHTML = arr[indice].incorrect_answers[0];
            risposte[2].innerHTML = arr[indice].incorrect_answers[1];
            risposte[3].innerHTML = arr[indice].incorrect_answers[2];
            break;

            case 2: risposte[0].innerHTML = arr[indice].incorrect_answers[0];
            risposte[1].innerHTML = arr[indice].incorrect_answers[1];
            risposte[3].innerHTML = arr[indice].incorrect_answers[2];
            break;

            case 3: risposte[0].innerHTML = arr[indice].incorrect_answers[0];
            risposte[2].innerHTML = arr[indice].incorrect_answers[1];
            risposte[1].innerHTML = arr[indice].incorrect_answers[2];
            break;
            default: console.log('errore');
        }
    } else { // se invece la risposta sbagliata è solo 1 allora faremo lo stesso procedimento ma con solo due bottoni
        rispIndex = Math.floor(Math.random()*2); // genera num casuale tra 0 e 1
        risposte[rispIndex].innerHTML = arr[indice].correct_answer; // assegna risposta corretta
        risposte[rispIndex].classList.remove('sbagliata');
        risposte[rispIndex].classList.add('corretta');
        switch (rispIndex) { // assegna risposta sbagliata
            case 0: risposte[1].innerHTML = arr[indice].incorrect_answers[0];
            break;
            case 1: risposte[0].innerHTML = arr[indice].incorrect_answers[0];
            break;
        }
    }
    index = index + 1;  //aggiorna l'indice della domanda
}

  generaDomanda(questions, index) //chiamiamo la funzione per popolare la pagina quando viene caricata
  


const premiTasti = function () { //lancia le funzioni necessarie al momento del click su una delle risposte
  setTimeout(function () { // delay di 0.5 secondi per mostrare feedback sulla risposta (giusta/sbagliata)

    const pulsanti = document.querySelectorAll('.bottoneRisposta'); // rimuove i bottoni precedentemente creati per far spazio ai nuovi
    pulsanti.forEach(element => { 
        element.remove(); // per ogni pulsante che trova elimina completamente l'elemento
    })
  // se indice della domanda è inferiore al numero delle domande continuerà a generare domande aumentando l'indice ad ogni click
    if (index < questions.length) {
    //chiamata funzioni necessarie
   generaDomanda(questions, index)
    rendiCliccabile()
    segnaPunti()
    sbagliate()
    aggiornaDomanda(questions)

    //parte il timer
    i=59;
    interval1; 

  } else { // se le domande sono finite elimina il timer e genera la terza pagina (con la funzione generaRisultati)
    clearInterval(interval1);
    generaRisultati()
  }
},500) // mezzo secondo di delay
}

//funzione che aggiunge l'eventListener ad ogni bottone, al click fa partire la funzione premiTasti
const rendiCliccabile = function () {
  const pulsanti = document.querySelectorAll('.bottoneRisposta');
  pulsanti.forEach(element => {

  element.addEventListener('click', premiTasti)});
  element.addEventListener('click', function () {
    results[index - 1].risposta_data = element.innerText; // al click, il testo che clicchi va dentro a risposta data
  })

}
rendiCliccabile()

// funzione che aggiunge un punto ogni volta che clicchiamo sul bottone con la classe .corretta
const segnaPunti = function () {
  const corretto = document.querySelector('.corretta');
  corretto.addEventListener('click', function () {
    punteggio ++;
    corretto.classList.remove('pink');
    corretto.setAttribute('style', 'background-color:green') // il bottone se premuto cambierà colore di bg in verde
  })
}

segnaPunti()

// funzione che fa cambiare il bg delle risposte sbagliate una volta premute
const sbagliate = function() {
  const sbagliata = document.querySelectorAll('.sbagliata');
  sbagliata.forEach(el => {
    el.addEventListener('click', function() {
      el.setAttribute('style', 'background-color:red')
      // el.innerHTML = '<p>Pollo!</p>'
    })
  })
}
sbagliate()

// funzione che cambia il num della domanda mostrato a fine pagina
const aggiornaDomanda = function (arr) {
  const par = document.getElementById('nDomanda');
  par.innerHTML = 'question ' + index + '<span class="pink"> /' + difficolta + '</span>';
}
aggiornaDomanda(questions);

// funzione che genera la pagina dei risultati in base al risultato ottenuto
const generaRisultati = function () {
  const par = document.getElementById('nDomanda');
  par.remove(); //rimuove il conteggio delle domande a fondo pagina
  const timer = document.getElementById('timer'); // rimuove il timer
  timer.remove();

  const contenitore = document.getElementById('container') 
  contenitore.setAttribute('style', 'margin-top:2em') // diamo un po di margine al contenitore principale

  const titolo = document.getElementById('domanda');
  titolo.innerText = 'Results' //al posto della domanda mettiamo il titolo della pagina

  const sottoTitolo = document.getElementById('sottoTitolo') // aggiungiamo un sottotitolo
  sottoTitolo.innerText = 'The summary of your answers:'

  const corpoCentrale = document.querySelector('.risposte');
  corpoCentrale.classList.add('centraleFlex') //aggiungiamo la classe centraleFlex per dividere il contenuto in tre parti

  // prima parte del corpo centrale (risposte giuste)
  const div1 = document.createElement('div')
  const corrette = document.createElement('h2');
  div1.appendChild(corrette);
  corpoCentrale.appendChild(div1);
  corrette.innerHTML = 'Correct' +'<br>' + '<strong>'+ Math.round((punteggio/questions.length)*100) +'</strong>' + '%' // calcoliamo la percentuale di risposte giuste dato il punteggio
  const par1 = document.createElement('p')
  par1.innerHTML = punteggio + '/' + questions.length + ' questions';
  div1.appendChild(par1);

  //seconda parte del corpo centrale con un indicatore grafico per le risposte giuste e sbagliate
  const div2 = document.createElement('div'); // cerchio più grande che diventa azzurro o rosa a seconda della percentuale delle risposte giuste o sbagliate
  const div2Piccolo = document.createElement('div'); // cerchio più piccolo che riprende il colore dello sfondo
  div2.appendChild(div2Piccolo);
  div2Piccolo.classList.add('cerchioPiccolo'); // cerchio piccolo che conterrà la scritta
  corpoCentrale.appendChild(div2)
  div2.classList.add('cerchio');
  const gradi = ((punteggio * 360)/ questions.length) //prendiamo il punteggio e calcoliamo a quanti gradi su 360 totali corrisponde in percentuale 
  div2.setAttribute('style', `background-image: conic-gradient(#00ffff 0deg, #00ffff ${gradi}deg, #d20094 ${gradi}deg, #d20094 360deg)`) // settiamo l'attributo background-image in modo da mostrare un gradiente celeste fino ai gradi calcolati sopra e il resto rosa 
  const par2 = document.createElement('p');
  const parBlu = document.createElement('p');
  const parPiccolo = document.createElement('p');

  parBlu.setAttribute('style', 'color:#00ffff; margin-top: -1em');
  parPiccolo.setAttribute('style', 'font-size:12px; margin-top:2em');
  div2Piccolo.appendChild(par2)
  div2Piccolo.appendChild(parBlu)
  div2Piccolo.appendChild(parPiccolo)
  let pass = (questions.length/100)*60;
  if (punteggio >= pass) { // popolerà i paragrafi in un modo se il punteggio è meggiore del 60%
    par2.innerHTML = '<strong> Congratulations! </strong>' 
    parBlu.innerHTML ='<strong>You passed the exam.</strong>'
    parPiccolo.innerHTML = "We'll send you the certificate in few minutes, check your email (including promotions / spam folders)"
  } else { //...altrimenti in un altro modo
    par2.innerHTML = '<strong>Non erano questi gli accordi!</strong>'
    parBlu.innerHTML ="<strong>You didn't pass the exam.</strong>"
  }
  // terza parte del corpo centrale (risposte sbagliate)
  const div3 = document.createElement('div')
  const sbagliate = document.createElement('h2')
  let rispSbagliate = questions.length - punteggio;
  sbagliate.innerHTML = 'Wrong' +'<br>' + '<strong>'+  Math.round((rispSbagliate/questions.length)*100) +'</strong>' + '%';
  corpoCentrale.appendChild(div3);
  div3.appendChild(sbagliate)
  const par3 = document.createElement('p');
  par3.innerHTML = rispSbagliate + '/' + questions.length + ' questions';
  div3.appendChild(par3);

  // creiamo il link alla quarta pagina 
  const rateUs = document.createElement('a');
  rateUs.classList.add('rateUs');
  rateUs.setAttribute('href', './finale.html');
  rateUs.innerHTML = 'Rate us';
  const footer = document.querySelector('footer');
  footer.remove; // eliminiamo il footer
  const container = document.querySelector('#container');
  container.appendChild(rateUs)

// -------------- Riepilogo risposte date--------
const divRiepilogo = document.createElement('div')
divRiepilogo.classList.add('divRiepilogo')
container.appendChild(divRiepilogo)
const riepilogo = document.createElement('h3')
riepilogo.innerHTML = 'Riepilogo delle domande:';
divRiepilogo.appendChild(riepilogo)
  for (let i=0; i<results.length; i ++) {
    const res1 = document.createElement('p');
    const res2 = document.createElement('p');
    const res3 = document.createElement('p');
    res1.innerHTML = '<strong>Question ' +(i+1) +': </strong>' +results[i].domanda;
    res1.innerText = results[i].domanda;
    res2.innerHTML = '<strong>Your answer:</strong> ' + results[i].risposta_data;
    res3.innerHTML = '<strong> Correct answer:</strong> ' + results[i].risposta_esatta + '<br> <hr>';
    divRiepilogo.appendChild(res1);
    divRiepilogo.appendChild(res2);
    divRiepilogo.appendChild(res3);
  }
  console.log(results)
}