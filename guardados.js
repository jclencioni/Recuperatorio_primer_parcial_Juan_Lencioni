let storage = JSON.parse(localStorage.getItem("misSeries"));

function $(id){
    return document.getElementById(id);
}

const contenedorGuardadas = $("guardadas")

function mostrarSeries(listaSeries){

    listaSeries.forEach(element => {
        var serieCreada = document.createElement("img");
        serieCreada.setAttribute("src", element.image);
        contenedorGuardadas.appendChild(serieCreada);
    });
}

mostrarSeries(storage);