
function $(id){
    return document.getElementById(id);
}

const contenedorCartas = $("cartas")
    

async function crearCartas(listaCartas){
    
    listaCartas.forEach(element => {

        var carta = Carta.createFromJsonString(JSON.stringify(element));
        var cartaCreada = carta.createHTMLElement(); 
        contenedorCartas.appendChild(cartaCreada);
    });
}

async function cargarTandaCartas() {
    const urlBase = "https://deckofcardsapi.com/api/deck/new/draw/?count=6";

    try {
        var respuesta = await fetch(urlBase);
        
        if (!respuesta.ok) {
            alert("Carta no encontrada");
        } else {
            var rta = await respuesta.json(); 
            var cartas = rta.cards;  
            console.log(cartas);
            await crearCartas(cartas);

        }
    } catch (error) {
        alert("Se perdió la conexion.")
    }
}

async function PaginaSiguiente(){
    contenedorCartas.innerHTML = "";
    await cargarTandaCartas();
}

async function PaginaAnterior(){
    contenedorCartas.innerHTML = "";
    await cargarTandaCartas();
}

$("siguiente").addEventListener("click", PaginaSiguiente);
$("anterior").addEventListener("click", PaginaAnterior);



cargarTandaCartas();


