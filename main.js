// ANIMATION SCROLL
let navbar = document.querySelector("#navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});

// CHIAMATE ASINCRONE
// setInterval(() => {
//   {

//Il setInterval() è una funzione intrinseca in JS che consente di eseguire un codice specifico ogni determinato intervallo di tempo è non blocca il funzionamento del mio sito.
//Accetta 2 parametri: la funzione da eseguire(callback) e il tempo di attesa in millisecondi.
//Indipendentemente dove inserisco la mia chiamata asincrona verrà sempre eseguita dopo il caricamento di tutto il codice JS

let numPiante = document.querySelector("#numPiante");
let numFiori = document.querySelector("#numFiori");
let numClienti = document.querySelector("#numClienti");

//Creo una funzione che contiene il setInterval per generalizzare al max la funzione e renderla riutilizzabile, passo dei parametri formali(finalNumber, element, speed) e quando invoco la funzione passo i parametri reali
function creatIntervalCustom(finalNumber, element, speed) {
  let counter = 0; //variabile di appoggio che contiene il numero di volte che il codice viene eseguito
  let intervalCustom = setInterval(() => {
    if (counter < finalNumber) {
      //finalNumber è il valore che deve raggiungere che cambia in base a quello di riferimento indicato dal paragrafo
      counter++;
      element.innerHTML = counter + "+"; //l'elemento è il paragrafo a cui si riferisce che deve cambiare
    } else {
      clearInterval(intervalCustom); //chiamata asincrona che blocca la chiamata asincrona setInterval()
    }
  }, speed); // Speed indica il tempo in millisecondi in cui il codice viene eseguito
}

//INTERSECTION OBSERVER

let isNotEntered = true; //! Creo questa variabile booleana per controllare quando l'utente entra nella sezione e fare in modo che le funzioni siano eseguite una sola volta
//* Il risultato di una classe è sempre un oggetto
//! entries è un array
let osservatore = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    //entry è il singolo elemento dell'array entries
    if (entry.isIntersecting && isNotEntered) {
      //le variabili che inizinano con is sono booleane
      //invocazione della funzione creatIntervalCustom quando l'utente si trova nella sezione
      creatIntervalCustom(100, numPiante, 25);
      creatIntervalCustom(100, numFiori, 25);
      creatIntervalCustom(500, numClienti, 5);
      isNotEntered = false; //! Imposto la variabile isNotEntered a false affinchè non entri più nella if

    }
  });
});

osservatore.observe(numPiante);
