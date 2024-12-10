const COLORES = ["rojo", "purpura", "azul", "verde", "amarillo", "naranja"];
const LARGO = 6;
const INTENTOS = 7;

var jugador;
var objetivo;
var ronda = 1;

function preparacion(numero = INTENTOS) {
    for (let i = 1; i >= numero; i++ ) {
        document.getElementById("areaJuego").innerHTML += `<div id="intento${i}"></div>`
    }
    objetivo = Fila.generarAleatoria();
    jugador = new Fila();
}


class Ficha {
    constructor(color){
        if (COLORES.includes(color)) {
            this.color = color;
        } else {
            throw RangeError('Color no permitido');
        }
        this.posicion = null;
        this.verificacion = false;
    }
}

Ficha.prototype.anadirPosicion = function (posicion) {
    this.posicion = posicion
}



//Clase Fila y sus métodos

class Fila{
    constructor() {
        this.combinacion = [];
    }
    
    
    static generarAleatoria(){
        let nuevaFila = new Fila
        for (let x = 0; x < LARGO; x++) {
            let index = Math.floor(Math.random()*(LARGO));
            nuevaFila.anadirFicha(new Ficha(COLORES[index]));
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
    this.combinacion.forEach((ficha) => {
        let cantidad = 0
        if (ficha.verificacion === true && ficha.color == color) {
            cantidad++
        }
    }
)
return cantidad;
}

Fila.prototype.contarColor = function (color){
    let cantidad
    this.combinacion.forEach(ficha => function(){
        if (ficha.color == color) {
            cantidad++
        }
    })
    return cantidad;
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

function mostrarIntento() {
    let sentencia = ''
    jugador.combinacion.forEach(function (ficha) {
        sentencia += `<div class="preview ${ficha.color}" onclick="sacarFicha(${ficha.posicion})"></div>`
    });
    document.getElementById('previews').innerHTML = sentencia
}

function jugar() {
    if (ronda <= INTENTOS) {
        objetivo.compararFilas(jugador);
        if (jugador.combinacion.length = LARGO) {
            let sentencia = `<div id="intento${ronda}">`
            jugador.combinacion.forEach(function (ficha) {
                if (ficha.verificacion == true){
                    sentencia += `<div class="boton correcto ${ficha.color}"></div>`
                } else if ((jugador.contarColor(ficha.color) - objetivo.contarColor(ficha.color)) > 0){
                    sentencia += `<div class="boton casi ${ficha.color}"></div>`
                }else {
                    sentencia += `<div class="boton ${ficha.color}"></div>`
                }
            });
            document.getElementById("areaJuego").innerHTML += `${sentencia}</div>`
            document.getElementById(`intento${ronda}`).innerHTML = sentencia
            ronda ++;
        } else {
            alert('Combinación inacabada')
        }
    } else {
        alert('Intentos acabado, empiece una nueva partida')
    }
}

preparacion();