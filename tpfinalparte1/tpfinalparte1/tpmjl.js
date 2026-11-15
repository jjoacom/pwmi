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
      [alumnos[0], "Lautaro", "Che... el profe no esta en el aula."],
      [alumnos[2], "Joaquin", "Eso ya es raro. Seguro no corrigio los tps."],
      [alumnos[1], "Lautaro", "Mira el piso del aula. Hay un papel, revisalo."]
    ],
    [
      [alumnos[2], "Joaquin", "Si hablaba de archivos, este lugar tiene sentido."],
      [alumnos[0], "Lautaro", "No creo que haya venido hasta aca solo para leer."],
      [alumnos[3], "Joaquin", "Tiene que haber algun libro que nos ayude."]
    ],
    [
      [alumnos[0], "Lautaro", "La pista hablaba de pantallas. Tiene que haber algo aca."],
      [alumnos[2], "Joaquin", "Casi todas estan apagadas."],
      [alumnos[1], "Lautaro", "Esa de ahi sigue prendida. Revisemosla."]
    ],
    [
      [alumnos[2], "Joaquin", "Bueno... el historial decia Piola. Capaz vino para aca."],
      [alumnos[0], "Lautaro", "Espero que esto haya sido una pista y no una busqueda cualquiera."],
      [alumnos[3], "Joaquin", "Para... esa taza parece que quedo abandonada. "]
    ],
    [
      [alumnos[0], "Lautaro", "Llegamos justo. Todavia hay luces prendidas."],
      [alumnos[2], "Joaquin", "Entonces Cata debe seguir adentro."],
      [alumnos[1], "Lautaro", "Vamos a buscarla antes de que cierre todo."]
    ],
    [
      [extras[1], "Cata", "¿Estan buscando a M.J.L.?"],
      [alumnos[0], "Lautaro", "Hace horas. Venimos siguiendo todas las pistas que dejo."],
      [extras[2], "Cata", "Sabia que tarde o temprano iban a venir a buscarme."],
      [alumnos[2], "Joaquin", "Entonces vos sabes donde esta."],
      [extras[1], "Cata", "Si. La clave la tengo yo."],
      [extras[2], "Cata", "Vayan al Aula Multimedia. Ahi van a encontrar lo que falta."]
    ],
    [
      [alumnos[0], "Lautaro", "Bueno... llegamos al Aula Multimedia."],
      [alumnos[2], "Joaquin", "Despues de todo esto mas vale que haya algo aca."],
      [alumnos[1], "Lautaro", "Ahi dice algo."]
    ]
  ];

  dialogosMJL = [
    [
      [mjl[0], "M.J.L.", "Estuvieron rapidos."],
      [alumnos[0], "Lautaro", "Fuimos directo a buscar a Cata."],
      [mjl[1], "M.J.L.", "Bien. Siguieron la pista correcta sin perder tiempo."],
      [alumnos[2], "Joaquin", "Entonces... ¿aprobamos?"],
      [mjl[0], "M.J.L.", "Les voy a corregir sin preguntas."]
    ],
    [
      [mjl[0], "M.J.L.", "Tardaron bastante."],
      [alumnos[0], "Lautaro", "Recorrimos media facultad buscandolo."],
      [mjl[1], "M.J.L.", "Eso note. Dieron demasiadas vueltas."],
      [alumnos[2], "Joaquin", "Pero lo encontramos."],
      [mjl[0], "M.J.L.", "Encontrarme no alcanza."],
      [mjl[1], "M.J.L.", "Ahora van a tener que explicarme su codigo."]
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
