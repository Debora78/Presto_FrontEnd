// ANIMATION SCROLL
let navbar = document.querySelector("#navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});

// DATI NON PRIMITIVI - MUTABILI, STRUTTURALI E PESANTI

//JSON -> Javascript Object Notation

//FATCH ->passo una stringa ed accetta di base un parametro, cioè l'indirizzo dei dati che vogliamo prendere.
//La fetch è una chiamata asincrona poichè non sappiamo quanto pesa il file  e quindi quanto tempo ci metterà a prendere i dati.
//! Il risultato della funzione fetch() è il fatto se sono riuscito a prenderli, non sono riuscito a prenderli o se sto ancora cercando di prenderli E NON la ricezione dei dati
//accetta sia il percorso relativo o assoluto
//then() -> (è anche lui asincrono poicheè se fosso sincrono verrebbe eseguito prima della fetch()) ed accetta un unico parametro che è la callback (()=>), all'interno la callback accetta un parametro formale che per convenzione si chiama response o a volte resp.

//! In JS non esiste un tipo di dato chiamato JSON quindi devo trasformalo in un tipo di dato che JS conosce
//* response.json() è la funzione che mi permette di trasformare i file json in dati conosciuti da JS
//*La risposta di (response)=>response.json() è un'altra PROMISE 
//! Tutto ciò che riguarda ciò che deve accadere ai dati recuperati da fetch() deve essere scritto all'interno delle graffe del secondo .then() poichè data(parametro formale) esiste solo all'interno della funzione then().
fetch("./products.json").then( (response) => response.json() ).then( (data) => {
    // console.log(data); Controllo che arrivino i dati del file json

//tutte le informazioni che mi servono sono nella variabile data poiché tramite la funzione fetch() ho recuperato i dati e li ho messi dentro la variabile data    
    
let articlesWrapper = document.querySelector("#articlesWrapper");

//! Racchiudo la creazione delle cards in una funzione e la rendo generica passando un parametro formale
//*Di base la funzione accetta un array
function createCards(array) {
    articlesWrapper.innerHTML = ""; //svuoto il contenitore dalle cards vecchie per poi riempirlo con le nuove cards
    array.forEach((el)=>{
        let div = document.createElement("div");
        div.classList.add("col-12", "col-md-3", "mt-5");
        div.innerHTML = 
        `       <div class="card">
                  <img src=${el.img} class="card-img-top" alt="img delle cards">
                  <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    <p class="card-text">Categoria: ${el.categoria}.</p>
                    <p class="card-text">Prezzo: ${el.prezzo}.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
        `
        articlesWrapper.appendChild(div);
    })
    
}
    //! la prima volta che lancio la funzione per creare le cards passo l'array originale (data) con tutte le categorie
    createCards(data);


    //*CREAZIONE CATEGORIE DINAMICHE
    // Ho catturato il div a cui appenderò i miei pallini della checkbox per le categorie
    let filtroCategoriaWrapper = document.querySelector("#filtroCategoriaWrapper");

    function setCategory(){
        //la variabile categories contiene l'insieme delle mie categorie
        //la map() crea un clone del mio array in el mi ritorna tutti gli elementi e aggiungendo .categoria mi ritorna solo le categorie
        let categories = data.map((el) => el.categoria) 
        let uniqueCategories = [];

        categories.forEach( (singolaCategoria) => {
            if(!uniqueCategories.includes(singolaCategoria)){
                uniqueCategories.push(singolaCategoria);
            }
        });
        //! creo un radio button per ogni categoria
        uniqueCategories.forEach( (categoriaUnica) => {
            let div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoriaUnica}">
                <label class="form-check-label" for="${categoriaUnica}">
                    ${categoriaUnica}
                </label>
            `;
            filtroCategoriaWrapper.appendChild(div);
        });

    }

    setCategory();


    //* FILTRO PER CATEGORIA

    let formCheckInputs = document.querySelectorAll(".form-check-input")

    function filterByCategory(){
        //! Array.form() converte qualcosa di simile ad un array (es: insieme di coppie di valori)in un vero e proprio array (es: una nodelist ->in un array) per poter accedere ai metodi degli array
        let radioBtns = Array.from(formCheckInputs); 
        //* find() ritorna il primo elemento dell'array che soddisfa la condizione (condizione true)
        let btnChecked = radioBtns.find((radioBtn) => radioBtn.checked == true);  
        console.log(btnChecked.id);

        //*Con questo if() se l'utente scegli "Tutte le categorie " che ha come id "All"  allora mosta l'array originale con tutti i dati (data), altrimenti mostra le cards con i dati filtrati
        if (btnChecked.id == "All"){
            createCards(data)
            
        }else{
            let filtered = data.filter((el) => el.categoria == btnChecked.id);
            console.log(filtered);
            createCards(filtered);

        }

        //!Quando lancio la funzione per creare le card passo la variabile filtered che contiene i dati filtrati e non l'array originale (data ) così mi mostra solo le cards di una specifica categoria scelta con il checkbox
         createCards(filtered);

    }
        formCheckInputs.forEach( (radio) => {
            radio.addEventListener("input", () => {
                filterByCategory();
            })

            })


            //CREAZIONE PREZZO DINAMICO
          let inputRangePrice = document.querySelector("#inputRangePrice"); 
          let labelPrice = document.querySelector("#labelPrice"); 

          function setMinMaxPrice() {
            let mapped = data.map((el) => el.prezzo);
            console.log(mapped);

            //* Math.max() e Math.min() ritorna il valore piu grande di un insieme di valori ed accetta solo valori numerici e non array quindi utilizzo lo spread operator (...) per distruggere l'array e ricavare solo i singoli elementi all'interno dell'array
            let prezzoMax = Math.max(...mapped);
            let prezzoMin = Math.min(...mapped);
            // console.log(max, min);
            //InputRangePrice è un attributo e accedo tramite il punto alla proprietà max e min e lo associo alle variabili prezzoMax e prezzoMin che contengono i valori max e min di tutti i prezzi dei miei prodotti
            inputRangePrice.max = prezzoMax;
            inputRangePrice.min = prezzoMin;
            //Imposto la partenza della range bar con il prezzo max così all'utente compariranno tutte le card e non solo alcune come se impostassi la range bar al minimo o a metà
            inputRangePrice.value = prezzoMax;
            //* Imposto il testo del pallino della range bar con il prezzo massimo
            labelPrice.innerHTML = prezzoMax;
            
          }

          setMinMaxPrice();

          //FILTRO PER PREZZO
          function filterByPrice(){
            let filtered = data.filter((el) => el.prezzo <= inputRangePrice.value);
            //Lancio la funzione createCards con i dati filtrati (anche se la variabile si chiama uguale anche nelle altre funzioni essendo all'interno di questa funzione si riferisce alla funzione di creazione poiché ha uno scope locale)
            createCards(filtered);
          }
        //   inputRangePrice è un oggetto (elemento html portato in JS)
          inputRangePrice.addEventListener("input", () => {
            //*imposto il testo del pallino della range bar con il prezzo scelto dall'utente in quel momento rendendo dinamico il testo che si aggiorna in tempo reale ogni volta che scatta l'evento.
            labelPrice.innerHTML = inputRangePrice.value;
            filterByPrice();
          })


          //FILTRO PER PAROLA
          let inputWord = document.querySelector("#inputWord");
          
          function filterByWord(){
              let filtered = data.filter((el)=>el.name.includes.toLowerCase(inputWord.value.toLowerCase));
              createCards(filtered);
            }
            
            inputWord.addEventListener("input", () => {
              filterByWord()
            })



});
    
