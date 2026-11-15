
// link del Video: https://youtu.be/HmgD-Cm9y2U Mella Maza
let pantalla = 0;
let aulapc, tablero, botones, sonidoError, sonidoCorrect, sonidoCable, musica;

function preload() {
  aulapc = loadImage("data/aulapc.png");
  sonidoError = loadSound("data/error.wav");
  sonidoCorrect = loadSound("data/correct.wav");
  sonidoCable = loadSound("data/cablemoviendose.wav");
  musica = loadSound("data/musica.wav");
}

function setup() {
  createCanvas(800,400);
  botones = crearBotones();
  tablero = new Tablero();
}

function draw() {
  if (pantalla === 0) dibujarAula();
  else if (pantalla === 1) dibujarInicio();
  else if (pantalla === 2) dibujarInstrucciones();
  else if (pantalla === 3) tablero.mostrar();
  else if (pantalla === 4) dibujarGanaste();
  else if (pantalla === 5) dibujarPerdiste();
  else if (pantalla === 6) dibujarCreditos();
  else if (pantalla === 7) dibujarArchivos();
}

function dibujarAula() {
  image(aulapc,0,0,800,400);
  fill(0,180); noStroke(); rect(0,0,800,55);
  fill(120,255,180); textAlign(CENTER,CENTER); textSize(18); text("Busca algo extraño en la sala de computadoras",400,27);
}

function dibujarInicio() {
  image(aulapc,0,0,800,400);
  fill(10,15,20,235); noStroke(); rect(175,35,450,345,15);
  fill(120,255,180); textAlign(CENTER,CENTER); textSize(29); text("TERMINAL M.J.L.",400,85);
  fill(255); textSize(15); text("La computadora no puede iniciar.",400,135); text("Reconecta el sistema para acceder a los archivos.",400,160);
  botones[0].mostrar(); botones[1].mostrar(); botones[2].mostrar();
}

function dibujarInstrucciones() {
  background(10,15,20);
  fill(120,255,180); textAlign(CENTER,CENTER); textSize(28); text("INSTRUCCIONES",400,45);
  fill(255); textSize(15);
  text("Conecta cada punto con el punto del mismo color.",400,95);
  text("Podes empezar desde cualquiera de los dos extremos.",400,125);
  text("Los cables no pueden cruzarse ni tocar otros cables.",400,155);
  text("Si te equivocas, el cable se borra.",400,185);
  text("Podes tocar un cable conectado para volver a hacerlo.",400,215);
  text("Si cometes 3 errores, perdes.",400,245);
  botones[3].mostrar();
}

function dibujarMensaje(titulo,texto1,texto2) {
  background(10,15,20);
  fill(120,255,180); textAlign(CENTER,CENTER); textSize(34); text(titulo,400,100);
  fill(255); textSize(17); text(texto1,400,155); text(texto2,400,185);
}

function dibujarGanaste() {
  dibujarMensaje("ACCESO CONCEDIDO","La terminal de M.J.L. volvio a funcionar.","Se encontraron archivos ocultos en el sistema.");
  botones[7].mostrar();
}

function dibujarPerdiste() {
  dibujarMensaje("SISTEMA BLOQUEADO","Cometiste demasiados errores.","La conexion fallo.");
  botones[4].mostrar(); botones[5].mostrar(); botones[6].mostrar();
}

function dibujarCreditos() {
  background(10,15,20);
  fill(120,255,180); textAlign(CENTER,CENTER); textSize(28); text("OPERACION M.J.L.",400,90);
  fill(255); textSize(18); text("JOAQUIN MAZA",400,165); text("LAUTARO MELLA",400,200);
  botones[3].mostrar();
}

function dibujarArchivos() {
  background(10,15,20);
  fill(120,255,180); textAlign(CENTER,CENTER); textSize(30); text("ARCHIVOS PERDIDOS",400,75);
  fill(20,35,30); stroke(120,255,180); strokeWeight(2); rect(185,120,430,175,10);
  fill(120,255,180); noStroke(); textAlign(LEFT,TOP); textSize(16);
  text("> historial_MJL.txt",220,150); text("> registro_terminal.txt",220,185); text("> ubicacion_desconocida.txt",220,220); text("> pista_recuperada.txt",220,255);
  botones[6].mostrar();
}

function mousePressed() {
  if (pantalla === 0 && tablero.pcSobre()) {
    pantalla = 1;
    if (!musica.isPlaying()) musica.loop();
  }

  else if (pantalla === 1) {
    if (botones[0].estaSobre()) cambiarJuego(3);
    else if (botones[1].estaSobre()) pantalla = 2;
    else if (botones[2].estaSobre()) pantalla = 6;
  }

  else if ((pantalla === 2 || pantalla === 6) && botones[3].estaSobre()) pantalla = 1;
  else if (pantalla === 3) tablero.presionar();
  else if (pantalla === 4 && botones[7].estaSobre()) pantalla = 7;

  else if (pantalla === 5) {
    if (botones[4].estaSobre()) cambiarJuego(3);
    else if (botones[5].estaSobre()) cambiarJuego(1);
    else if (botones[6].estaSobre()) cambiarJuego(0);
  }

  else if (pantalla === 7 && botones[6].estaSobre()) cambiarJuego(0);
}

function mouseDragged() {
  if (pantalla === 3) tablero.arrastrar();
}

function mouseReleased() {
  if (pantalla === 3) tablero.soltar();
}

function cambiarJuego(nuevaPantalla) {
  tablero.reiniciar(); pantalla = nuevaPantalla;
}
