const COLORES = ["rojo", "purpura", "azul", "verde", "amarillo", "naranja"];
const LARGO = 6;
const INTENTOS = 6;
console.log('holi');

var jugador;
var objetivo;
var ronda = 1;
var acc;

function preparacion(numero = INTENTOS) {
    for (let i = 1; i >= numero; i++ ) {
        document.getElementById("areaJuego").innerHTML += `<div id="intento${i}"></div>`
    }
    objetivo = Fila.generarAleatoria();
    jugador = new Fila();
    acc = new Acumulador;
}

//Clase auxiliar para contar las casillas no acertadas, pero que están en la combinación objetivo.
class Acumulador {
    constructor(){
        this.rojo = 0;
        this.purpura = 0;
        this.azul = 0;
        this.verde = 0;
        this.amarillo = 0;
        this.naranja = 0;
    }
}

Acumulador.prototype.setRojo = function (numero) {
    this.rojo = numero;
}

Acumulador.prototype.setPurpura = function (numero) {
    this.purpura = numero;
}

Acumulador.prototype.setAzul = function (numero) {
    this.azul = numero;
}

Acumulador.prototype.setVerde = function (numero) {
    this.verde = numero;
}

Acumulador.prototype.setAmarillo = function (numero) {
    this.amarillo = numero;
}

Acumulador.prototype.setNaranja = function (numero) {
    this.naranja = numero;
}


class Ficha {
    constructor(color){
        if (COLORES.includes(color)) {
            this.color = color;
        } else {
            throw RangeError('Color no permitido');
        }
        this.posicion = null;
        this.verificacion = '';
    }
}

Ficha.prototype.anadirPosicion = function (posicion) {
    this.posicion = posicion
}

Ficha.prototype.esAmarillo = function (fila, color) {
    
    switch (color) {
        case "rojo":
            if (fila.acumulador.rojo > 0){
                this.verificacion = 'casi';
                fila.acumulador.rojo--;
            }
            break;
        case "purpura":
            if (fila.acumulador.purpura > 0){
                this.verificacion = 'casi';
                fila.acumulador.purpura--;
            }
            break;
        case "azul":
            if (fila.acumulador.azul > 0){
                this.verificacion = 'casi';
                fila.acumulador.azul--;
            }
            break;
        case "verde":
            if (fila.acumulador.verde > 0){
                this.verificacion = 'casi';
                fila.acumulador.verde--;
            }
            break;
        case "amarillo":
            if (fila.acumulador.amarillo > 0){
                this.verificacion = 'casi';
                fila.acumulador.amarillo--;
            }
            break;
        case "naranja":
            if (fila.acumulador.naranja > 0){
                this.verificacion = 'casi';
                fila.acumulador.naranja--;
            }
            break;
        }
}

//Clase Fila y sus métodos

class Fila{
    constructor() {
        this.combinacion = [];
        this.acumulador = new Acumulador;
    }
    
    //Método para generar la fila aleatoria
    static generarAleatoria(){
        let nuevaFila = new Fila
        for (let x = 0; x < LARGO; x++) {
            let index = Math.floor(Math.random()*(LARGO));
            nuevaFila.anadirFicha(new Ficha(COLORES[index]));
            nuevaFila.combinacion[x].verificacion = 'correcto'
        }
        return nuevaFila;
    }
}

Fila.prototype.compararCorrectas =  function (fila){
    if (fila.combinacion.length == LARGO) {
        for (let i = 0; i < this.combinacion.length ; i++) {
            if (this.combinacion[i].color === fila.combinacion[i].color) {
                fila.combinacion[i].verificacion = 'correcto';
            }
        }
    }
}

Fila.prototype.anadirFicha = function (ficha){
    this.combinacion.push(ficha);
    ficha.anadirPosicion(this.combinacion.length);
}

Fila.prototype.sacarFicha = function (posicion){
    this.combinacion.forEach((ficha) => {
        if (ficha.posicion == posicion){
            this.combinacion.splice(posicion-1, 1);
        }
    })
}

Fila.prototype.contarColorCorrecto = function (color){
    let cantidad = 0
    this.combinacion.forEach((ficha) => {
        if (ficha.verificacion == 'correcto' && ficha.color == color) {
            cantidad++
        }
    }
)
return cantidad;
}

//Hace contadores para cada color, para así saber cuantos aptos para la clase casi hay por color
Fila.prototype.setAcumuladores = function (fila){
    let countThis;
    COLORES.forEach((color) =>{
        countThis = this.contarColorCorrecto(color)
        let countFila = fila.contarColorCorrecto(color)
        let totalNoCorrectos = countFila - countThis;
        console.log(countFila, color)
        console.log(countThis, color)
        console.log(totalNoCorrectos, color)
        switch (color) {
            case "rojo":
                this.acumulador.setRojo(totalNoCorrectos);
                console.log(this.acumulador.rojo)
                break;
            case "purpura":
                this.acumulador.setPurpura(totalNoCorrectos);
                break;
            case "azul":
                this.acumulador.setAzul(totalNoCorrectos);
                break;
            case "verde":
                this.acumulador.setVerde(totalNoCorrectos);
                break;
            case "amarillo":
                this.acumulador.setAmarillo(totalNoCorrectos);
                break;
            case "naranja":
                this.acumulador.setNaranja(totalNoCorrectos);
                break;
        }
    })

}

//Aunque se llame comparar filas, lo que hace es mirar si cada ficha de la fila, es apta para la clase casi o no.
Fila.prototype.compararFilas = function (){
    this.combinacion.forEach((ficha) => {
        switch (ficha.color) {
            case "rojo":
                if (this.acumulador.rojo > 0 && ficha.verificacion != 'correcto'){
                    ficha.esAmarillo(this, "rojo");
                }
                break;
            case "purpura":
                if (this.acumulador.purpura > 0 && ficha.verificacion != 'correcto'){
                    ficha.esAmarillo(this, "purpura");
                }
                break;
            case "azul":
                if (this.acumulador.azul > 0 && ficha.verificacion != 'correcto'){
                    ficha.esAmarillo(this, "azul");
                }
                break;
            case "verde":
                if (this.acumulador.verde > 0 && ficha.verificacion != 'correcto'){
                    ficha.esAmarillo(this, "verde");
                }
                break;
            case "amarillo":
                if (this.acumulador.amarillo > 0 && ficha.verificacion != 'correcto'){
                    ficha.esAmarillo(this, "amarillo");
                }
                break;
            case "naranja":
                if (this.acumulador.naranja > 0 && ficha.verificacion != 'correcto'){
                    ficha.esAmarillo(this, "naranja");
                }
                break;
        }
    });

}

//Cuenta la cantidad total de fichas correctas en la fila, útil para saber cuando se ha acertado la combinación
Fila.prototype.contarCorrectas = function () {
    let totalCorrectas = 0;
    this.combinacion.forEach((ficha) =>{
        if (ficha.verificacion == 'correcto'){
            totalCorrectas++;
        } 
    })
    return totalCorrectas;
}

//Funciones para los botones
function meterColor(color) {
    ficha = new Ficha(`${color}`);
    if (jugador.combinacion.length >= LARGO) {
        alert("Maximo alcanzado");
    } else {
        jugador.anadirFicha(ficha);
    }
    ficha.anadirPosicion(jugador.combinacion.length);
    mostrarIntento();
}

function sacarFicha(posicion) {
    jugador.sacarFicha(posicion);
    let i = 1;
    jugador.combinacion.forEach((ficha) => {
        ficha.posicion = i;
        i++;
    })
    mostrarIntento();
}

//boton para reiniciar
function reiniciar(){
    location.reload();
}

function mostrarIntento() {
    let sentencia = ''
    jugador.combinacion.forEach((ficha) => {
        sentencia += `<div class="preview ${ficha.color}" onclick="sacarFicha(${ficha.posicion})"></div>`
    });
    document.getElementById('previews').innerHTML = sentencia
}

function jugar() {
    if (ronda <= INTENTOS) {
        objetivo.compararCorrectas(jugador);
        jugador.setAcumuladores(objetivo);
        jugador.compararFilas(objetivo);
        if (jugador.combinacion.length == LARGO) {
            let sentencia = `<div id="intento${ronda}">`
            jugador.combinacion.forEach(function (ficha) {
                sentencia += `<div class="solucion ${ficha.verificacion} ${ficha.color}"></div>`
            });
            document.getElementById("areaJuego").innerHTML += `${sentencia}</div>`
            document.getElementById(`intento${ronda}`).innerHTML = sentencia
            ronda ++;
        } else {
            alert('Combinación inacabada');
        }
    } else {
        alert('Intentos acabado, empiece una nueva partida');
    }
    if (jugador.contarCorrectas() == LARGO) {
        alert('HAS GANADO!')
    }
    if (ronda > INTENTOS) {
        alert('Intentos acabado, empiece una nueva partida');
    }
    jugador = new Fila();
    mostrarIntento();
}

preparacion();