let paginaActual = 1;
let indiceSerieInical = 1;

async function traerSeries(indPrimerSerie) {

    var listaSeries = [];
    const limite = indPrimerSerie + 6;

    for(let i = indPrimerSerie; i < limite; i++){
        const urlBase = "https://api.tvmaze.com/shows/";
        var urlBusqueda = urlBase + i;

        try {
            var respuesta = await fetch(urlBusqueda);
            if (!respuesta.ok) {
                alert("Serie no encontrada");
            } else {
                var rta = await respuesta.json();
                listaSeries.push(rta);                
            }
        } catch (error) {
            alert("Se perdió la conexion.")
        }
    }
    console.log(listaSeries);
    return listaSeries;
}

function mostrarSeries(seriesData) {
  const contenedor = document.getElementById('series');
  contenedor.innerHTML = '';
  console.log(seriesData);
  seriesData.forEach(s => {

    const serie = new Serie(
        s.id,
        s.url,
        s.name,
        s.language,
        s.genres, 
        s.image.medium
    );

    console.log(serie);
    contenedor.appendChild(serie.createHtmlElement());
  });
}

async function cargarPagina() {
  const contenedor = document.getElementById('series');
  contenedor.innerHTML = '<p>cargando series...</p>';
  
  const series = await traerSeries(indiceSerieInical);
  mostrarSeries(series);
}

async function paginaSig() {
  paginaActual++;
  indiceSerieInical += 6;
  await cargarPagina();
}

async function paginaAnt() {
  if (paginaActual > 1) {
    paginaActual--;
    indiceSerieInical -= 6;
    await cargarPagina();
  } else {
    alert('ya estas en la primera página');
  }
}

document.getElementById('siguiente').addEventListener('click', paginaSig);
document.getElementById('anterior').addEventListener('click', paginaAnt);

cargarPagina();



