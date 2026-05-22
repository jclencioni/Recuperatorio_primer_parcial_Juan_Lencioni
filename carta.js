class Carta{
    code
    value
    suit
    image


    constructor(code, value, suit, imagen){
        
        if(!code || !value || !suit || !imagen){
            throw new Error("Falta algun atributo.");
        }
        
        this.code = code;
        this.value = value
        this.suit = suit;
        this.image = imagen;
    
    }

    set code(valor){
        this.code=valor;
    }

    set value(valor){
        if(isNaN(valor) || valor < 0){
            throw new Error("El valor de la carta es incorrecto.");
        }
    
        this.value = valor;
    } 

    set suit(valor){
        this.suit = valor;
    }

    set imagen(valor){
        this.image = valor;
    }

    toJsonString(){
        return JSON.stringify(this);
    }   

    static guardarCarta(carta){
        let storage = JSON.parse(localStorage.getItem("misCartas"));
        if(storage.length > 0){
            var coincidencia = storage.filter( e => {
                return e.code == carta.code;
            })
            if(coincidencia.length > 0){
                alert("La carta ya se encuentra guardada previamente.")
            }else{
                storage.push(carta);
                localStorage.setItem("misCartas", JSON.stringify(storage));
                alert("Carta guardada correctamente.")
            }
        }else{
            storage.push(carta);
            localStorage.setItem("misCartas", JSON.stringify(storage));
        }
    }

    static createFromJsonString(json){
        var nuevaCarta = JSON.parse(json);
        return new Carta(nuevaCarta.code, nuevaCarta.value, nuevaCarta.suit, nuevaCarta.image)
    }

    createHTMLElement(){
        var div = document.createElement("div");
        div.setAttribute("class", "imagen-carta")
        var codeCarta = document.createElement("h3");
        codeCarta.appendChild(document.createTextNode(this.code));
        var imagenCarta = document.createElement("img");
        imagenCarta.setAttribute("src", this.image);
        var suitCarta = document.createElement("h4");
        suitCarta.appendChild(document.createTextNode(this.suit));
        var valueCarta = document.createElement("h4");
        valueCarta.appendChild(document.createTextNode(this.value));
        imagenCarta.addEventListener("click", () =>{ window.open(this.image, '_blank')})
        var botonCarta = document.createElement("button");
        botonCarta.appendChild(document.createTextNode("Guardar"));
        botonCarta.addEventListener("click", () => Carta.guardarCarta(this));
        div.appendChild(codeCarta);
        div.appendChild(imagenCarta);
        div.appendChild(suitCarta);
        div.appendChild(valueCarta);
        div.appendChild(botonCarta);
        return div;
    }


}