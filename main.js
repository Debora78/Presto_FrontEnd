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

//!Array di ultimi prodotti
let products = [
  // 🌸 Fiori
  {
    nome: "Rosa Rossa",
    categoria: "fiore",
    prezzo: 5.99,
    img: "./media/rose_rosse.jpg"
  },
  {
    nome: "Tulipano Arancio",
    categoria: "fiore",
    prezzo: 3.50,
    img: "./media/tulipani_arancio.jpg"
  },
  {
    nome: "Girasole",
    categoria: "fiore",
    prezzo: 4.20,
    img: "./media/girasoli.jpg"
  },

  // 🌿 Piante
  {
    nome: "Ficus",
    categoria: "pianta",
    prezzo: 15.00,
    img: "./media/ficus.jpg"
  },
  {
    nome: "Aloe Vera",
    categoria: "pianta",
    prezzo: 7.99,
    img: "./media/aloe_vera.jpg"
  },
  {
    nome: "Aloe Ferox",
    categoria: "pianta",
    prezzo: 12.50,
    img: "./media/aloe_ferox.jpg"
  }
];

//! Catturo il contenitore (in questo caso è la row)
let cardsWrapper = document.querySelector("#cardsWrapper");
//!creo le colonne per le cards
products.forEach( (product, i) => { //la i l'indice del foreach che mi serve per avere un punto di riferimento

  if (i >= products.length - 3 ) {//la i è l'indice che cicla gli elementi dell'array.
    //*se l'indice (i) è maggiore della lunghezza dell'array - 3, allora creo la card.
    //! l'indice i è > di 0 ? no quindi non entra nella if e va avanti 

    let div = document.createElement("div")//creo il div che corrisponde alla colonna per ogni elemento dell'array
    div.classList.add("col-12", "col-md-3", "mt-5")//*Aggiungo la classe col-12, col-md-3, mt-5 (classi per la colonna)
   //*Inserisco il codice HTML dentro il div cioè la card
    div.innerHTML = `  
             <div class="card">
              <img src=${product.img} class="card-img-top" alt="img delle cards">
              <div class="card-body">
                <h5 class="card-title">${product.nome}</h5>
                <p class="card-text">Categoria: ${product.categoria}.</p>
                <p class="card-text">Prezzo: ${product.prezzo}.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
  `
  cardsWrapper.appendChild(div);//*appendo al contenitore il div con la card creata (l'appendchild() si mette sempre al contenitore
  }
    
  })

  
//  Messaggio di successo al click del bottone Subscribe
//DOMContentLoaded -> Evento che viene lanciato quando il DOM viene caricato
document.addEventListener("DOMContentLoaded", function () {
  const button1 = document.querySelector("#subscribe-button1");
  const message1 = document.querySelector("#success-message1");
  const emailInput1 = document.querySelector(".formNewsletterEmail1");
  const errorMessage1 = document.querySelector(".error-message1");

  button1.addEventListener("click", function () {
    //Verifica se l'input email non contiene spazi vuoti al suo interno (trim()elimina gli spazi vuoti)
    const email1 = emailInput1.value.trim();

    // Nascondi messaggi prima di ogni operazione
    message1.classList.add("d-none");
    errorMessage1.classList.add("d-none");

    // Verifica se l'email è vuota
    if (email1 === "") {
      errorMessage1.textContent = "Non hai inserito una email valida";
      errorMessage1.classList.remove("d-none"); // Mostra il messaggio di errore
      return; // Interrompe l'esecuzione del resto del codice
    }

    // Regex per validare la forma dell'email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Verifica se l'email rispetta il formato corretto
    if (!emailRegex.test(email1)) {
      errorMessage1.textContent = "Non hai inserito una email valida";
      errorMessage1.classList.remove("d-none"); // Mostra il messaggio di errore

      // Svuota il campo email per permettere un nuovo tentativo
      emailInput1.value = "";

      return; // Interrompe l'esecuzione del resto del codice
    }
   
    //Mostra il messaggio di successo
    message1.classList.remove("d-none");

    //Disabilita il bottone dopo averlo premuto
    button1.disabled = true;
    button1.innerText = "Registrato";
    
    //Pulisco il campo email dopo aver premuto il bottone
    emailInput1.value = "";
    

    //Rimuovi il messaggio dopo 3 secondi
    setTimeout(function () {
      message1.classList.add("d-none");
    }, 3000);
  });
});

 
  
