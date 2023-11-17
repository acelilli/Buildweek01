// funzione per selezionare e deselezionare le stelle
const illuminaStelle = function () {
    const stelle = document.querySelectorAll('svg'); // seleziona tutti i tag svg (stelle)
    stelle.forEach((element, index) => { // per ogni stella aggungiamo un attributo valore (la prima avrà 1, la seconda 2 ecc.)
        let value = index + 1;
        element.setAttribute('data-value', `${value}`);
        // ad ogni stella aggiungiamo un event listener al click con una funzione
        element.addEventListener('click', function () {
            stelle.forEach((element, index) => { //
                if (index < value) { // se la stella cliccata ha un valore (value) minore delle stelle accese
                    element.classList.add('illuminaStelle'); // accendi tutte le stelle con valore minore
                } else { // altrimenti
                    element.classList.remove('illuminaStelle'); //spegni tutte le stelle con valore maggiore
                }
            });
        });
    });
}

illuminaStelle()

