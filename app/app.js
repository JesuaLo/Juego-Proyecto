const COLORES = ["rojo", "purpura", "azul", "verde", "amarillo", "naranja"];
const LARGO = 6;


class Ficha {
    constructor(color){
        if (COLORES.includes(color)) {
            this.color = color;
        } else {
            throw RangeError('Color no permitido');
        }
        this.position = null;
        this.verificacion = null;
    }
}

Ficha.prototype.anadirPosicion = function (posicion) {
    this.position = posicion
}

class Fila{
    constructor() {
        this.combinacion = [];
    }

    
    static generarAleatoria(){
        let nuevaFila = new Fila
        for (let x = 0; x < LARGO; x++) {
            let index = Math.floor(Math.random()*(LARGO));
            nuevaFila.combinacion.push(new Ficha(COLORES[index]));
        }
        return nuevaFila;
    }
}

Fila.prototype.anadirFicha = function (ficha){
    this.combinacion.push(ficha);
}

Fila.prototype.contarColorCorrecto = function (color){
    this.combinacion.forEach(ficha => function(){
        let cantidad = 0
        if (ficha.color == color && ficha.verificacion === true) {
            cantidad++
        }
    }
    )
    return cantidad;
}

Fila.prototype.contarColor = function (color){
    this.combinacion.forEach(ficha => function(){
        let cantidad = 0
        if (ficha.color == color) {
            cantidad++
        }
    }
    )
    return cantidad;
}