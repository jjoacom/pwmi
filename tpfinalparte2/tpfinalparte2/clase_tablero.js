class Tablero {
  constructor() {
    this.filas = 8; this.columnas = 10; this.tam = 38; this.x = 210; this.y = 70;
    this.pcX = 265; this.pcY = 185; this.pcW = 90; this.pcH = 65;
    this.cables = []; this.puntos = []; this.ocupado = []; this.cableActual = null; this.errores = 0;
    this.crearJuego();
  }

  crearJuego() {
  let colores = [color(230,70,70), color(70,140,255), color(80,230,110), color(245,210,70)];
  let extremos = [      
    [0,1,5,6],
    [0,8,5,7],
    [7,1,2,4],
    [7,8,3,7]
  ];

  this.puntos = [];
  this.cables = [];

  for (let i = 0; i < extremos.length; i++) {
    let e = extremos[i];
    let p1 = new Punto(e[0],e[1],i,colores[i]);
    let p2 = new Punto(e[2],e[3],i,colores[i]);

    this.puntos.push(p1,p2);
    this.cables.push(new Cable(i,colores[i],p1,p2));
  }

  this.vaciarGrilla();
}
  pcSobre() {
    return mouseX >= this.pcX && mouseX <= this.pcX+this.pcW && mouseY >= this.pcY && mouseY <= this.pcY+this.pcH;
  }

  vaciarGrilla() {
    this.ocupado = [];

    for (let f = 0; f < this.filas; f++) {
      this.ocupado[f] = [];
      for (let c = 0; c < this.columnas; c++) this.ocupado[f][c] = -1;
    }
  }

  mostrar() {
    background(10,15,20);
    fill(120,255,180); textAlign(CENTER,CENTER); textSize(20); text("RECONEXION DE TERMINAL",400,25);
    fill(255); textSize(13); text("Errores: " + this.errores + " / 3",400,48);

    this.mostrarGrilla();

    for (let i = 0; i < this.cables.length; i++) this.cables[i].mostrar(this);
    for (let i = 0; i < this.puntos.length; i++) this.puntos[i].mostrar(this);
  }

  mostrarGrilla() {
    stroke(60,100,80); strokeWeight(1);

    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        fill(15,30,25); rect(this.x+c*this.tam,this.y+f*this.tam,this.tam,this.tam);
      }
    }
  }

  obtenerCasilla() {
    let columna = floor((mouseX-this.x)/this.tam), fila = floor((mouseY-this.y)/this.tam);

    if (fila >= 0 && fila < this.filas && columna >= 0 && columna < this.columnas) return [fila,columna];

    return null;
  }

  presionar() {
    let casilla = this.obtenerCasilla();
    if (casilla === null) return;

    let fila = casilla[0], columna = casilla[1];

    for (let i = 0; i < this.cables.length; i++) {
      let cable = this.cables[i];
      let tocaPunto1 = cable.punto1.fila === fila && cable.punto1.columna === columna;
      let tocaPunto2 = cable.punto2.fila === fila && cable.punto2.columna === columna;

      if (tocaPunto1 || tocaPunto2) {
        if (cable.conectado) {
          this.borrarCamino(cable);
          return;
        }

        this.cableActual = cable;

        if (tocaPunto1) cable.comenzar(cable.punto1);
        else cable.comenzar(cable.punto2);

        this.ocupado[fila][columna] = cable.id;

        if (!sonidoCable.isPlaying()) sonidoCable.loop();

        return;
      }
    }
  }

  arrastrar() {
    if (this.cableActual === null) return;

    let casilla = this.obtenerCasilla();
    if (casilla === null) return;

    let fila = casilla[0], columna = casilla[1];
    let ultimo = this.cableActual.ultimoPunto();
    let ultimaFila = ultimo[0], ultimaColumna = ultimo[1];

    if (fila === ultimaFila && columna === ultimaColumna) return;

    let distancia = abs(fila-ultimaFila) + abs(columna-ultimaColumna);

    if (distancia !== 1) return;

    if (this.esPuntoIncorrecto(fila,columna,this.cableActual.id)) {
      this.errorCable();
      return;
    }

    if (this.ocupado[fila][columna] !== -1 && this.ocupado[fila][columna] !== this.cableActual.id) {
      this.errorCable();
      return;
    }

    if (fila === this.cableActual.fin.fila && columna === this.cableActual.fin.columna) {
      this.cableActual.agregar(fila,columna);
      this.ocupado[fila][columna] = this.cableActual.id;
      this.cableActual.conectado = true;

      if (sonidoCable.isPlaying()) sonidoCable.stop();

      sonidoCorrect.play();

      this.cableActual = null;

      if (this.todosConectados()) pantalla = 4;

      return;
    }

    this.cableActual.agregar(fila,columna);
    this.ocupado[fila][columna] = this.cableActual.id;
  }

  soltar() {
    if (this.cableActual === null) return;

    this.borrarCamino(this.cableActual);
    this.cableActual = null;

    if (sonidoCable.isPlaying()) sonidoCable.stop();
  }

  errorCable() {
    if (this.cableActual === null) return;

    this.borrarCamino(this.cableActual);
    this.cableActual = null;
    this.errores++;

    if (sonidoCable.isPlaying()) sonidoCable.stop();

    sonidoError.play();

    if (this.errores >= 3) pantalla = 5;
  }

  borrarCamino(cable) {
    for (let i = 0; i < cable.camino.length; i++) {
      let fila = cable.camino[i][0], columna = cable.camino[i][1];

      if (this.ocupado[fila][columna] === cable.id) this.ocupado[fila][columna] = -1;
    }

    cable.borrar();
  }

  esPuntoIncorrecto(fila,columna,id) {
    for (let i = 0; i < this.puntos.length; i++) {
      let punto = this.puntos[i];

      if (punto.fila === fila && punto.columna === columna && punto.id !== id) return true;
    }

    return false;
  }

  todosConectados() {
    for (let i = 0; i < this.cables.length; i++) {
      if (!this.cables[i].conectado) return false;
    }

    return true;
  }

  reiniciar() {
    if (sonidoCable.isPlaying()) sonidoCable.stop();

    this.cableActual = null;
    this.errores = 0;
    this.crearJuego();
  }
}
