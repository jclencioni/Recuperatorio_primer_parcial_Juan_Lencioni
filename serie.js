class Serie {

    id;
    url;
    name;
    language;
    genres;
    image;

    constructor(id, url, name, language, genres, image) {
    this.id = id;      
    this.url = url;    
    this.name = name;      
    this.language = language;  
    this.genres = genres;  
    this.image = image;  
    }

    toJsonString(){
        return JSON.stringify(this);
    } 

    static createFromJsonString(json){
        const datos = JSON.parse(json);
        return new Serie(datos.id, datos.url, datos.language, datos. genres, datos.image);
    }

    static guardarSerie(serie){
        
        let series = localStorage.getItem("misSeries");
        let storage = series ? JSON.parse(series) : [];
        if(storage.length > 0){
            var coincidencia = storage.filter( e => {
                return e.id == serie.id;
            })
            if(coincidencia.length > 0){
                alert("La serie ya se encuentra guardada previamente.")
            }else{
                storage.push(serie);
                localStorage.setItem("misSeries", JSON.stringify(storage));
                alert("Carta guardada correctamente.")
            }
        }else{
            storage.push(serie);
            localStorage.setItem("misSeries", JSON.stringify(storage));
        }
    }

    createHtmlElement() {
        const div = document.createElement('div');
        div.className = 'tarjeta-serie';

        var nombreSerie = document.createElement("h3");
        nombreSerie.appendChild(document.createTextNode(this.name));

        var idiomaSerie = document.createElement("h3");
        idiomaSerie.appendChild(document.createTextNode(this.language));

        var generoSerie = document.createElement("h3");
        var generos = `${this.genres}`;
        generoSerie.appendChild(document.createTextNode(generos));
       
        var imagenSerie = document.createElement("img");
        imagenSerie.setAttribute("src", this.image);
        imagenSerie.addEventListener("click", () =>{ window.open(this.url, '_blank')})

        const btnGuardar = document.createElement('button');
        btnGuardar.textContent = 'Guardar';
        btnGuardar.addEventListener('click', () => {
            Serie.guardarSerie(this); 
            alert(`Serie "${this.name}" guardada`);
        });
        btnGuardar.setAttribute("class", "btn-guardar")
        

        div.appendChild(nombreSerie);
        div.appendChild(idiomaSerie);
        div.appendChild(generoSerie);
        div.appendChild(imagenSerie);
        div.appendChild(btnGuardar);

        return div;

    }


}