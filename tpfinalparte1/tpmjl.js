//link al video https://youtu.be/up1LSg5Znjs
//Lautaro Mella & Joaquin Maza
let pantalla = 0;
let fondos = [], pistas = [], alumnos = [], extras = [], mjl = [], caminaJoaquin = [], caminaLautaro = [], dialogos = [], dialogosMJL = [];
let dialogoActual = [0,0,0,0,0,0,0,0], enDialogo = [true,true,true,true,true,true,true,true];
let mostrarComoJugar = false;
let objetos = [[520,325,28,28],[710,215,62,18],[410,205,110,80],[495,300,48,42]];
let pistaAbierta = [false,false,false], pistaEncontrada = [false,false,false];
let terminalAbierta = false, archivoAbierto = "";
let notaPiolaAbierta = false, notaPiolaEncontrada = false;
let fueAPiola = false;
let musica, sonidoClick, sonidoPista;

function preload() {
  musica = loadSound("data/musica.mp3");
  sonidoClick = loadSound("data/sonidoClick.mp3");
  sonidoPista = loadSound("data/sonidoPista.mp3");

  let nombres = [
    ["pantalla0","aulavacia","biblioteca","computadoras","piolacafe","FacultadNoche","AulaCata","AulaMulti"],
    ["pista1","pista2","pista3","pista4"],
    ["alumno0","alumno1","alumno3","alumno4"],
    ["TazaCafe","Cata1","Cata2"],
    ["mjl1","mjl2"],
    ["camina0","camina1","camina2","camina3","camina4","camina5"],
    ["lau0","lau1","lau2","lau3","lau4"]
  ];

  let recursos = [fondos,pistas,alumnos,extras,mjl,caminaJoaquin,caminaLautaro];

  for (let i = 0; i < nombres.length; i++) {
    for (let j = 0; j < nombres[i].length; j++) recursos[i][j] = loadImage("data/" + nombres[i][j] + ".png");
  }
}

function setup() {
  createCanvas(800,450); textFont("monospace");

  musica.setVolume(0.07);
  sonidoClick.setVolume(0.35);
  sonidoPista.setVolume(0.45);

  dialogos = [
    [
      {personaje:alumnos[0],nombre:"Lautaro",texto:"Che... el profe no esta en el aula."},
      {personaje:alumnos[2],nombre:"Joaquin",texto:"Eso ya es raro. Seguro no corrigio los tps."},
      {personaje:alumnos[1],nombre:"Lautaro",texto:"Mira el piso del aula. Hay un papel, revisalo."}
    ],
    [
      {personaje:alumnos[2],nombre:"Joaquin",texto:"Si hablaba de archivos, este lugar tiene sentido."},
      {personaje:alumnos[0],nombre:"Lautaro",texto:"No creo que haya venido hasta aca solo para leer."},
      {personaje:alumnos[3],nombre:"Joaquin",texto:"Tiene que haber algun libro que nos ayude."}
    ],
    [
      {personaje:alumnos[0],nombre:"Lautaro",texto:"La pista hablaba de pantallas. Tiene que haber algo aca."},
      {personaje:alumnos[2],nombre:"Joaquin",texto:"Casi todas estan apagadas."},
      {personaje:alumnos[1],nombre:"Lautaro",texto:"Esa de ahi sigue prendida. Revisemosla."}
    ],
    [
      {personaje:alumnos[2],nombre:"Joaquin",texto:"Bueno... el historial decia Piola. Capaz vino para aca."},
      {personaje:alumnos[0],nombre:"Lautaro",texto:"Espero que esto haya sido una pista y no una busqueda cualquiera."},
      {personaje:alumnos[3],nombre:"Joaquin",texto:"Para... esa taza parece que quedo abandonada. "}
    ],
    [
      {personaje:alumnos[0],nombre:"Lautaro",texto:"Llegamos justo. Todavia hay luces prendidas."},
      {personaje:alumnos[2],nombre:"Joaquin",texto:"Entonces Cata debe seguir adentro."},
      {personaje:alumnos[1],nombre:"Lautaro",texto:"Vamos a buscarla antes de que cierre todo."}
    ],
    [
      {personaje:extras[1],nombre:"Cata",texto:"¿Estan buscando a M.J.L.?"},
      {personaje:alumnos[0],nombre:"Lautaro",texto:"Hace horas. Venimos siguiendo todas las pistas que dejo."},
      {personaje:extras[2],nombre:"Cata",texto:"Sabia que tarde o temprano iban a venir a buscarme."},
      {personaje:alumnos[2],nombre:"Joaquin",texto:"Entonces vos sabes donde esta."},
      {personaje:extras[1],nombre:"Cata",texto:"Si. La clave la tengo yo."},
      {personaje:extras[2],nombre:"Cata",texto:"Vayan al Aula Multimedia. Ahi van a encontrar lo que falta."}
    ],
    [
      {personaje:alumnos[0],nombre:"Lautaro",texto:"Bueno... llegamos al Aula Multimedia."},
      {personaje:alumnos[2],nombre:"Joaquin",texto:"Despues de todo esto mas vale que haya algo aca."},
      {personaje:alumnos[1],nombre:"Lautaro",texto:"Ahi dice algo."}
    ]
  ];

  dialogosMJL = [
    [
      {personaje:mjl[0],nombre:"M.J.L.",texto:"Estuvieron rapidos."},
      {personaje:alumnos[0],nombre:"Lautaro",texto:"Fuimos directo a buscar a Cata."},
      {personaje:mjl[1],nombre:"M.J.L.",texto:"Bien. Siguieron la pista correcta sin perder tiempo."},
      {personaje:alumnos[2],nombre:"Joaquin",texto:"Entonces... ¿aprobamos?"},
      {personaje:mjl[0],nombre:"M.J.L.",texto:"Les voy a corregir sin preguntas."}
    ],
    [
      {personaje:mjl[0],nombre:"M.J.L.",texto:"Tardaron bastante."},
      {personaje:alumnos[0],nombre:"Lautaro",texto:"Recorrimos media facultad buscandolo."},
      {personaje:mjl[1],nombre:"M.J.L.",texto:"Eso note. Dieron demasiadas vueltas."},
      {personaje:alumnos[2],nombre:"Joaquin",texto:"Pero lo encontramos."},
      {personaje:mjl[0],nombre:"M.J.L.",texto:"Encontrarme no alcanza."},
      {personaje:mjl[1],nombre:"M.J.L.",texto:"Ahora van a tener que explicarme su codigo."}
    ]
  ];
}

function draw() {
  background(0);

  if (pantalla === 0) dibujarPantallaInicio();
  else if (pantalla === 1) dibujarPantallaAula();
  else if (pantalla === 2) dibujarPantallaBiblioteca();
  else if (pantalla === 3) dibujarPantallaComputadoras();
  else if (pantalla === 4) dibujarPantallaPiola();
  else if (pantalla === 5) dibujarFinalMalo();
  else if (pantalla === 6) dibujarFacultadNoche();
  else if (pantalla === 7) dibujarAulaCata();
  else if (pantalla === 8) dibujarAulaMulti();
  else if (pantalla === 9) dibujarEncuentroMJL();
  else if (pantalla === 10) dibujarPruebaCodigo();
  else if (pantalla === 11) dibujarFinalBueno();
  else if (pantalla === 12) dibujarFinalInesperado();
  else if (pantalla === 13) dibujarCreditos();
}

function dibujarFondo(imagen) {
  imageMode(CORNER); image(imagen,0,0,width,height);
}

function dibujarPantallaInicio() {
  dibujarFondo(fondos[0]);

  fill(10,20,30,210); noStroke(); rect(560,0,240,height);
  fill(120,255,180); textAlign(LEFT,TOP); textSize(16); text("system_menu",590,55);

  dibujarBotonMenu(590,110,170,42,"< JUGAR />");
  dibujarBotonMenu(590,175,170,42,"< VER_CREDITOS />");
  dibujarBotonMenu(590,240,170,42,"< COMO_JUGAR />");

  fill(140); textSize(12);
  text("Operacion M.J.L.",590,330); text("La clave del codigo",590,348);

  if (mostrarComoJugar) dibujarVentanaInfo("COMO JUGAR",["1. Toca JUGAR para empezar.","2. Hace click para avanzar los dialogos.","3. Busca objetos clickeables.","4. Segui las pistas y toma decisiones."]);
}

function dibujarEscena(fondo,numDialogo,exploracion) {
  dibujarFondo(fondo);
  if (enDialogo[numDialogo]) dibujarEscenaDialogo(dialogos[numDialogo],dialogoActual[numDialogo]);
  else exploracion();
}

function dibujarEscenaConBoton(fondo,numDialogo,objetivo,x,y,w,texto) {
  dibujarFondo(fondo);

  if (enDialogo[numDialogo]) dibujarEscenaDialogo(dialogos[numDialogo],dialogoActual[numDialogo]);
  else {
    dibujarObjetivo(objetivo);
    dibujarBotonAccion(x,y,w,42,texto);
  }
}

function dibujarPantallaAula() {
  dibujarEscena(fondos[1],0,dibujarExploracionAula);
  if (pistaAbierta[0]) dibujarPistaAbierta(pistas[0]);
}

function dibujarPantallaBiblioteca() {
  dibujarEscena(fondos[2],1,dibujarExploracionBiblioteca);
  if (pistaAbierta[1]) dibujarPistaAbierta(pistas[1]);
}

function dibujarPantallaComputadoras() {
  dibujarEscena(fondos[3],2,dibujarExploracionComputadoras);
  if (terminalAbierta) dibujarTerminal();
}

function dibujarPantallaPiola() {
  dibujarEscena(fondos[4],3,dibujarExploracionPiola);
  if (notaPiolaAbierta) dibujarPistaAbierta(pistas[2]);
}

function dibujarFacultadNoche() {
  dibujarEscenaConBoton(fondos[5],4,"Objetivo: encontrar a Cata",555,375,205,"> BUSCAR_A_CATA");
}

function dibujarAulaCata() {
  dibujarEscenaConBoton(fondos[6],5,"Cata tiene la clave",535,375,225,"> IR_A_AULA_MULTI");
}

function dibujarAulaMulti() {
  dibujarFondo(fondos[7]);

  if (enDialogo[6]) dibujarEscenaDialogo(dialogos[6],dialogoActual[6]);
  else {
    dibujarObjetivo("Objetivo: revisar la ultima pista");

    if (!pistaEncontrada[2]) dibujarBotonAccion(555,375,205,42,"> REVISAR_PISTA");
    else dibujarBotonAccion(545,375,215,42,"> VOLVER_AL_AULA");
  }

  if (pistaAbierta[2]) dibujarPistaAbierta(pistas[3]);
}

function dibujarEncuentroMJL() {
  dibujarFondo(fondos[1]);

  let lista = fueAPiola ? dialogosMJL[1] : dialogosMJL[0];

  if (enDialogo[7]) dibujarEscenaDialogo(lista,dialogoActual[7]);
  else {
    if (fueAPiola) {
      dibujarObjetivo("M.J.L. quiere comprobar si entendieron el codigo");
      dibujarBotonAccion(545,375,215,42,"> EMPEZAR_PRUEBA");
    } else {
      dibujarObjetivo("M.J.L. va a corregir el trabajo");
      dibujarBotonAccion(545,375,215,42,"> VER_RESULTADO");
    }
  }
}

function dibujarPruebaCodigo() {
  dibujarFondo(fondos[1]);

  fill(0,0,0,190); noStroke(); rect(0,0,width,height);
  fill(18,22,28,245); stroke(120,255,180); strokeWeight(2); rect(100,55,600,340,12);

  noStroke(); fill(120,255,180); textAlign(CENTER,TOP); textSize(22);
  text("ULTIMA PRUEBA",400,80);

  fill(255); textSize(17);
  text("M.J.L.: ¿Que hace esta condicion?",400,125);

  fill(120,255,180); textSize(22);
  text("if (pantalla === 4)",400,165);

  dibujarBotonAccion(160,225,480,42,"A) Cambia pantalla a 4");
  dibujarBotonAccion(160,280,480,42,"B) Pregunta si pantalla es exactamente igual a 4");
  dibujarBotonAccion(160,335,480,42,"C) Carga la imagen numero 4");
}

function dibujarFinal(titulo,lineas,destacado) {
  dibujarFondo(fondos[1]);

  fill(0,0,0,200); noStroke(); rect(0,0,width,height);

  fill(120,255,180); textAlign(CENTER,CENTER); textSize(20);
  text("> resultado_final.exe",width/2,65);

  fill(255); textSize(32);
  text(titulo,width/2,120);

  fill(240); textSize(18);
  for (let i = 0; i < lineas.length; i++) text(lineas[i],width/2,180+i*35);

  fill(120,255,180); textSize(30);
  text(destacado,width/2,315);

  dibujarBotonAccion(190,365,190,42,"> VER_CREDITOS");
  dibujarBotonAccion(420,365,190,42,"> REINTENTAR");
}

function dibujarFinalBueno() {
  if (fueAPiola) dibujarFinal("FINAL BUENO",["Respondieron correctamente.","Encontraron a M.J.L.","Y pudieron explicar su codigo."],"APROBADOS");
  else dibujarFinal("FINAL BUENO",["Siguieron la pista correcta.","Llegaron rapido hasta M.J.L.","No hicieron falta mas preguntas."],"APROBADOS");
}

function dibujarFinalInesperado() {
  dibujarFinal("FINAL INESPERADO",["Encontraron a M.J.L.","Pero dieron demasiadas vueltas.","Y no pudieron explicar el codigo."],"RECURSAN");
}

function dibujarFinalMalo() {
  background(8,12,15);

  fill(120,255,180); textAlign(CENTER,CENTER); textSize(20);
  text("> operacion_mjl.exe",width/2,70);

  fill(255); textSize(34);
  text("FINAL MALO",width/2,125);

  fill(240); textSize(18);
  text("Siguieron buscando en Piola durante demasiado tiempo.",width/2,190);
  text("Cuando volvieron, la facultad ya estaba cerrada.",width/2,225);
  text("M.J.L. nunca fue encontrado.",width/2,260);

  fill(120,255,180); textSize(30);
  text("RECURSAN",width/2,315);

  dibujarBotonAccion(190,365,190,42,"> VER_CREDITOS");
  dibujarBotonAccion(420,365,190,42,"> REINTENTAR");
}

function dibujarCreditos() {
  background(8,12,15);

  fill(120,255,180); textAlign(CENTER,TOP); textSize(30);
  text("OPERACION M.J.L.",width/2,30);

  let frameJ = floor(frameCount/8)%caminaJoaquin.length;
  let frameL = floor(frameCount/8)%caminaLautaro.length;
  let xJ = (frameCount*2)%1100-150;
  let xL = (frameCount*2+550)%1100-150;

  dibujarCaminante(caminaJoaquin[frameJ],xJ,130,"JOAQUIN MAZA");
  dibujarCaminante(caminaLautaro[frameL],xL,270,"LAUTARO MELLA");

  dibujarBotonAccion(300,405,200,32,"> VOLVER_AL_INICIO");
}

function dibujarCaminante(sprite,x,y,nombre) {
  imageMode(CORNER); image(sprite,x,y,90,110);

  stroke(120,255,180); strokeWeight(2);
  line(x-70,y+60,x,y+60);

  fill(18,22,28); stroke(120,255,180);
  rect(x-195,y+40,125,40,6);

  noStroke(); fill(120,255,180); textAlign(CENTER,CENTER); textSize(13);
  text(nombre,x-132,y+60);
}

function dibujarEscenaDialogo(lista,indice) {
  let actual = lista[indice];

  fill(0,0,0,110); noStroke(); rect(0,0,width,height);
  image(actual.personaje,40,60,250,300);

  fill(20,24,32,235); stroke(120,255,180); strokeWeight(2);
  rect(170,300,590,120,12);

  noStroke(); fill(120,255,180); textAlign(LEFT,TOP); textSize(20);
  text(actual.nombre,195,320);

  fill(240); textSize(16);
  text(actual.texto,195,355,530,50);

  fill(170); textSize(12);
  text("click para continuar",610,395);
}

function dibujarObjetivo(texto) {
  fill(15,18,25,170); noStroke(); rect(0,0,width,42);
  fill(120,255,180); textAlign(LEFT,CENTER); textSize(16);
  text(texto,20,21);
}

function dibujarExploracionAula() {
  dibujarObjetivo("Objetivo: buscar una pista en el aula");

  let o = objetos[0], sobre = objetoHover(0);

  if (sobre) { fill(255,240,120); stroke(255,255,180); strokeWeight(2); }
  else { fill(245); stroke(180); strokeWeight(1); }

  rect(o[0],o[1],o[2],o[3],3);

  stroke(150);
  line(o[0]+6,o[1]+9,o[0]+21,o[1]+9);
  line(o[0]+6,o[1]+14,o[0]+19,o[1]+14);
  line(o[0]+6,o[1]+19,o[0]+17,o[1]+19);

  if (sobre) mostrarTextoObjeto(o,"Click para revisar");

  if (pistaEncontrada[0]) dibujarBotonAccion(550,375,210,42,"> IR_A_BIBLIOTECA");
}

function dibujarExploracionBiblioteca() {
  dibujarObjetivo("Objetivo: busca el libro Codigo Limpio");

  let o = objetos[1];

  if (objetoHover(1)) mostrarTextoObjeto(o,"Revisar libro");

  if (pistaEncontrada[1]) dibujarBotonAccion(535,375,225,42,"> IR_A_COMPUTADORAS");
}

function dibujarExploracionComputadoras() {
  dibujarObjetivo("Objetivo: revisar la computadora encendida");

  let o = objetos[2];

  if (objetoHover(2)) mostrarTextoObjeto(o,"Revisar computadora");
}

function dibujarExploracionPiola() {
  dibujarObjetivo("Objetivo: buscar alguna señal de M.J.L.");

  let o = objetos[3], sobre = objetoHover(3);

  imageMode(CORNER); image(extras[0],o[0],o[1],o[2],o[3]);

  if (sobre) {
    noFill(); stroke(120,255,180); strokeWeight(3);
    rect(o[0],o[1],o[2],o[3],5);
    mostrarTextoObjeto(o,"Revisar taza");
  }

  if (notaPiolaEncontrada) {
    fill(15,18,25,220); noStroke(); rect(175,340,450,95,10);

    fill(120,255,180); textAlign(CENTER,TOP); textSize(13);
    text("¿Que hacemos?",width/2,350);

    dibujarBotonAccion(195,385,195,35,"> VOLVER_A_LA_FACU");
    dibujarBotonAccion(410,385,195,35,"> SEGUIR_BUSCANDO");
  }
}

function mostrarTextoObjeto(o,texto) {
  noStroke(); fill(255,255,180); textAlign(CENTER,CENTER); textSize(12);
  text(texto,o[0]+o[2]/2,o[1]-15);
}

function objetoHover(indice) {
  let o = objetos[indice];
  return mouseSobreRect(o[0],o[1],o[2],o[3]);
}

function dibujarTerminal() {
  fill(0,0,0,190); noStroke(); rect(0,0,width,height);
  fill(10,18,15); stroke(120,255,180); strokeWeight(2); rect(130,70,540,310,8);

  fill(120,255,180); noStroke(); textAlign(LEFT,TOP); textSize(15);
  text("> terminal_mjl",155,90);

  if (archivoAbierto === "") {
    dibujarArchivo(175,150,190,55,"historial.txt");
    dibujarArchivo(435,150,190,55,"chat_cata.txt");

    fill(180); textSize(13);
    text("Selecciona un archivo",155,235);
  }

  else if (archivoAbierto === "historial") {
    fill(255); textSize(15); text("historial.txt",155,135);
    fill(120,255,180); textSize(16); text("ULTIMA BUSQUEDA:",155,180);
    fill(240); text("cafeteria abierta cerca de la facultad",155,215);

    dibujarBotonAccion(465,310,170,40,"> IR_A_CAFETERIA");
  }

  else if (archivoAbierto === "cata") {
    fill(255); textSize(15); text("chat_cata.txt",155,135);
    fill(120,255,180); textSize(16); text("M.J.L.:",155,180);
    fill(240); text("Cata sabe donde estoy.",155,215); text("Si preguntan por mi...",155,240);

    dibujarBotonAccion(465,310,170,40,"> BUSCAR_A_CATA");
  }

  dibujarBotonAccion(150,320,120,35,"> CERRAR");
}

function dibujarArchivo(x,y,w,h,nombre) {
  let hover = mouseSobreRect(x,y,w,h);

  if (hover) { fill(120,255,180); stroke(255); }
  else { fill(20,24,32); stroke(120,255,180); }

  strokeWeight(2); rect(x,y,w,h,5); noStroke();

  if (hover) fill(0);
  else fill(120,255,180);

  textAlign(CENTER,CENTER); textSize(14);
  text(nombre,x+w/2,y+h/2);
}

function dibujarPistaAbierta(imagenPista) {
  fill(0,0,0,170); noStroke(); rect(0,0,width,height);
  imageMode(CENTER); image(imagenPista,width/2,height/2-15,340,340);
  dibujarBoton(330,375,140,36,"CERRAR",8,15,false);
}

function dibujarBotonMenu(x,y,w,h,texto) {
  dibujarBoton(x,y,w,h,texto,10,18,false);
}

function dibujarBotonAccion(x,y,w,h,texto) {
  dibujarBoton(x,y,w,h,texto,8,13,true);
}

function dibujarBoton(x,y,w,h,texto,radio,tamTexto,transparente) {
  let hover = mouseSobreRect(x,y,w,h);

  if (hover) { fill(120,255,180); stroke(255); }
  else {
    if (transparente) fill(18,22,28,230);
    else fill(18,22,28);

    stroke(120,255,180);
  }

  strokeWeight(2); rect(x,y,w,h,radio); noStroke();

  if (hover) fill(0);
  else fill(120,255,180);

  textAlign(CENTER,CENTER); textSize(tamTexto);
  text(texto,x+w/2,y+h/2);
}

function dibujarVentanaInfo(titulo,lineas) {
  fill(0,0,0,180); noStroke(); rect(0,0,width,height);
  fill(18,22,28); stroke(120,255,180); strokeWeight(2); rect(160,90,480,240,14);

  noStroke(); fill(120,255,180); textAlign(CENTER,TOP); textSize(22);
  text(titulo,400,115);

  fill(240); textSize(15);

  for (let i = 0; i < lineas.length; i++) text(lineas[i],400,160+i*32);

  dibujarBoton(330,280,140,34,"CERRAR",8,16,false);
}

function avanzarDialogo(indice,lista) {
  dialogoActual[indice]++;

  if (dialogoActual[indice] >= lista.length) {
    dialogoActual[indice] = lista.length-1;
    enDialogo[indice] = false;
  }
}

function clickDialogo(indice,lista) {
  if (enDialogo[indice]) {
    reproducirClick();
    avanzarDialogo(indice,lista);
    return true;
  }

  return false;
}

function cambiarPantalla(x,y,w,h,nuevaPantalla) {
  if (mouseSobreRect(x,y,w,h)) {
    reproducirClick();
    pantalla = nuevaPantalla;
    return true;
  }

  return false;
}

function clickObjeto(indice) {
  return objetoHover(indice);
}

function abrirPista(indiceObjeto,indicePista) {
  if (clickObjeto(indiceObjeto)) {
    reproducirPista();
    pistaAbierta[indicePista] = true;
    pistaEncontrada[indicePista] = true;
    return true;
  }

  return false;
}

function cerrarPista(indice) {
  if (mouseSobreRect(330,375,140,36)) {
    reproducirClick();
    pistaAbierta[indice] = false;
    return true;
  }

  return false;
}

function manejarFinal() {
  if (cambiarPantalla(190,365,190,42,13)) return true;

  if (mouseSobreRect(420,365,190,42)) {
    reproducirClick();
    reiniciarJuego();
    return true;
  }

  return false;
}

function iniciarMusica() {
  userStartAudio();
  if (!musica.isPlaying()) musica.loop();
}

function reproducirClick() {
  if (sonidoClick.isPlaying()) sonidoClick.stop();
  sonidoClick.play();
}

function reproducirPista() {
  if (sonidoPista.isPlaying()) sonidoPista.stop();
  sonidoPista.play();
}

function mousePressed() {
  userStartAudio();

  if (pantalla === 0) {
    if (mostrarComoJugar) {
      if (mouseSobreRect(330,280,140,34)) {
        reproducirClick();
        mostrarComoJugar = false;
      }
      return;
    }

    if (mouseSobreRect(590,110,170,42)) {
      reproducirClick();
      iniciarMusica();
      pantalla = 1;
      return;
    }

    if (cambiarPantalla(590,175,170,42,13)) return;

    if (mouseSobreRect(590,240,170,42)) {
      reproducirClick();
      mostrarComoJugar = true;
      return;
    }
  }

  if (pantalla === 1) {
    if (pistaAbierta[0]) { cerrarPista(0); return; }
    if (clickDialogo(0,dialogos[0])) return;
    if (abrirPista(0,0)) return;
    if (pistaEncontrada[0] && cambiarPantalla(550,375,210,42,2)) return;
  }

  if (pantalla === 2) {
    if (pistaAbierta[1]) { cerrarPista(1); return; }
    if (clickDialogo(1,dialogos[1])) return;
    if (abrirPista(1,1)) return;
    if (pistaEncontrada[1] && cambiarPantalla(535,375,225,42,3)) return;
  }

  if (pantalla === 3) {
    if (terminalAbierta) {
      if (archivoAbierto === "" && mouseSobreRect(175,150,190,55)) {
        reproducirClick();
        archivoAbierto = "historial";
        return;
      }

      if (archivoAbierto === "" && mouseSobreRect(435,150,190,55)) {
        reproducirClick();
        archivoAbierto = "cata";
        return;
      }

      if (mouseSobreRect(150,320,120,35)) {
        reproducirClick();

        if (archivoAbierto !== "") archivoAbierto = "";
        else terminalAbierta = false;

        return;
      }

      if (archivoAbierto === "historial" && mouseSobreRect(465,310,170,40)) {
        reproducirClick();
        terminalAbierta = false;
        archivoAbierto = "";
        fueAPiola = true;
        pantalla = 4;
        return;
      }

      if (archivoAbierto === "cata" && mouseSobreRect(465,310,170,40)) {
        reproducirClick();
        terminalAbierta = false;
        archivoAbierto = "";
        pantalla = 6;
        return;
      }

      return;
    }

    if (clickDialogo(2,dialogos[2])) return;

    if (clickObjeto(2)) {
      reproducirClick();
      terminalAbierta = true;
      archivoAbierto = "";
      return;
    }
  }

  if (pantalla === 4) {
    if (notaPiolaAbierta) {
      if (mouseSobreRect(330,375,140,36)) {
        reproducirClick();
        notaPiolaAbierta = false;
        notaPiolaEncontrada = true;
      }

      return;
    }

    if (clickDialogo(3,dialogos[3])) return;

    if (!notaPiolaEncontrada && clickObjeto(3)) {
      reproducirPista();
      notaPiolaAbierta = true;
      return;
    }

    if (notaPiolaEncontrada && cambiarPantalla(195,385,195,35,6)) return;
    if (notaPiolaEncontrada && cambiarPantalla(410,385,195,35,5)) return;
  }

  if (pantalla === 5) {
    if (manejarFinal()) return;
  }

  if (pantalla === 6) {
    if (clickDialogo(4,dialogos[4])) return;
    if (cambiarPantalla(555,375,205,42,7)) return;
  }

  if (pantalla === 7) {
    if (clickDialogo(5,dialogos[5])) return;
    if (cambiarPantalla(535,375,225,42,8)) return;
  }

  if (pantalla === 8) {
    if (pistaAbierta[2]) {
      if (cerrarPista(2)) pistaEncontrada[2] = true;
      return;
    }

    if (clickDialogo(6,dialogos[6])) return;

    if (!pistaEncontrada[2] && mouseSobreRect(555,375,205,42)) {
      reproducirPista();
      pistaAbierta[2] = true;
      return;
    }

    if (pistaEncontrada[2] && cambiarPantalla(545,375,215,42,9)) return;
  }

  if (pantalla === 9) {
    let lista = fueAPiola ? dialogosMJL[1] : dialogosMJL[0];

    if (clickDialogo(7,lista)) return;

    if (mouseSobreRect(545,375,215,42)) {
      reproducirClick();

      if (fueAPiola) pantalla = 10;
      else pantalla = 11;

      return;
    }
  }

  if (pantalla === 10) {
    if (cambiarPantalla(160,225,480,42,12)) return;
    if (cambiarPantalla(160,280,480,42,11)) return;
    if (cambiarPantalla(160,335,480,42,12)) return;
  }

  if (pantalla === 11 || pantalla === 12) {
    if (manejarFinal()) return;
  }

  if (pantalla === 13) {
    if (mouseSobreRect(300,405,200,32)) {
      reproducirClick();
      reiniciarJuego();
      return;
    }
  }
}

function reiniciarJuego() {
  pantalla = 0;
  dialogoActual = [0,0,0,0,0,0,0,0];
  enDialogo = [true,true,true,true,true,true,true,true];
  pistaAbierta = [false,false,false];
  pistaEncontrada = [false,false,false];
  terminalAbierta = false;
  archivoAbierto = "";
  notaPiolaAbierta = false;
  notaPiolaEncontrada = false;
  mostrarComoJugar = false;
  fueAPiola = false;
}

function mouseSobreRect(x,y,w,h) {
  return mouseX >= x && mouseX <= x+w && mouseY >= y && mouseY <= y+h;
}
