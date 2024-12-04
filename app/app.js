const COLORES = ["rojo", "purpura", "azul", "verde", "amarillo", "naranja"];
const LARGO = 6;
const INTENTOS = 7;

function preparacion(numero = INTENTOS) {
    for (let i = 1; i >= numero; i++ ) {
        document.getElementById("areaJuego").innerHTML += `<div id="intento${i}"></div>`
    }
}

preparacion();

class Ficha {
    constructor(color){
        if (COLORES.includes(color)) {
            this.color = color;
        } else {
            throw RangeError('Color no permitido');
        }
        this.position = null;
        this.verificacion = false;
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

Fila.prototype.compararFilas =  function (fila){
    for (let i = 0; i < this.combinacion.length ; i++) {
        if (this.combinacion[i].color === fila.combinacion[i].color) {
            fila.combinacion[i].verificacion = true;
        }
    }
}

Fila.prototype.anadirFicha = function (ficha){
    this.combinacion.push(ficha);
    ficha.anadirPosicion(this.length-1);
}

Fila.prototype.contarColorCorrecto = function (color){
    this.combinacion.forEach(ficha => function(){
        let cantidad = 0
        if (ficha.verificacion === true) {
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
    })
    return cantidad;
}

function meterColor() {
    
}