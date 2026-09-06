//Variables

let SpidermanFijo = [];
let SpidermanBalanceo = [];
let SpidermanSuelto = [];
let b = 0; 
let EstadoSpiderman;
let tiempoEstado;
let tiempoInicio;
let bg = [];
let posX;
let MarcaDeTiempo = 0;
let VelocidadAnimacion = 500; 
let anchoPersonaje = 100;  

//Preload

function preload() {
  cargarImagenes(0, 1, SpidermanFijo, 'Spiderman0', 'png');
  cargarImagenes(1, 8, SpidermanBalanceo, 'Spiderman0', 'png');
  cargarImagenes(8, 9, SpidermanSuelto, 'Spiderman0', 'png');
  cargarImagenes(0, 5, bg, 'fondo0', 'jpg');
}

// Funcion para carga de imagenes, en este caso BG y los Sprites
function cargarImagenes(inicioLoop, finLoop, lista, nombre, ext) {
  for (let i = inicioLoop; i < finLoop; i++) {
    lista.push(loadImage('/assets/'+nombre+i+'.'+ext));
  }
}


function setup() {
  createCanvas(600, 600);
  reset();
}
//Empieza Draw
function draw() {
  background(0);
  
 let anchoBg = 600;
  let x = (-millis()*0.15) % anchoBg;
  image(bg[0], x, 0, anchoBg, 600);
  image(bg[0], x + anchoBg, 0, anchoBg, 600);
  //image(bg[1], -tFondo*0.1, 0, 600, 600); //Aca quise loopear 3 fondos que representaban 3 distintos tipos de momento del dia pero no pude
  //image(bg[2], -tFondo*0.15, 0, 600, 600);
  
  let tiempoEnEstado = millis() - tiempoEstado;
  
  switch (EstadoSpiderman) {
  case 0:
    image(SpidermanFijo[0], posX, 50, 100, 150);
    if (tiempoEnEstado > 1000) cambiarEstado(1);
    break;
  case 1:
    if (millis() - MarcaDeTiempo > VelocidadAnimacion) {
      b++;
      if (b > SpidermanBalanceo.length - 1) b = 0;
      MarcaDeTiempo = millis();
    }
    image(SpidermanBalanceo[b], posX, 50, 100, 150);
    if (tiempoEnEstado > 25000) cambiarEstado(2);
    break;
  case 2:
    image(SpidermanSuelto[0], posX, 50, 100, 150);
    if (tiempoEnEstado > 2000) reset();
    break;
  }
  
posX = (50 + (millis() - tiempoInicio) * 0.02) % (width + anchoPersonaje) - anchoPersonaje;
}
//Termina Draw

//Funcion para controlar el cambio de estado
function cambiarEstado(nuevoEstado) {
  EstadoSpiderman = nuevoEstado;
  tiempoEstado = millis();
}


//Funcion para reiniciar el programa(?
function reset() {
  EstadoSpiderman = 0;
  tiempoEstado = millis();
  tiempoInicio = millis();
  posX = 50;
  b = 0;
  MarcaDeTiempo = millis();
}

function keyPressed(){
  if( key == 'r' ) reset();
}
