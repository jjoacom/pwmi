class Cable {
  constructor(id,colorCable,punto1,punto2) {
    this.id = id; this.colorCable = colorCable; this.punto1 = punto1; this.punto2 = punto2;
    this.inicio = punto1; this.fin = punto2; this.camino = []; this.conectado = false;
  }

  comenzar(desde) {
    if (desde === this.punto1) { this.inicio = this.punto1; this.fin = this.punto2; }
    else { this.inicio = this.punto2; this.fin = this.punto1; }
    this.camino = [[this.inicio.fila,this.inicio.columna]];
  }

  agregar(fila,columna) {
    this.camino.push([fila,columna]);
  }

  ultimoPunto() {
    return this.camino[this.camino.length-1];
  }

  mostrar(tablero) {
    if (this.camino.length < 2) return;
    noFill(); stroke(this.colorCable); strokeWeight(12); strokeJoin(ROUND); strokeCap(ROUND); beginShape();

    for (let i = 0; i < this.camino.length; i++) {
      let fila = this.camino[i][0], columna = this.camino[i][1];
      let x = tablero.x + columna*tablero.tam + tablero.tam/2, y = tablero.y + fila*tablero.tam + tablero.tam/2;
      vertex(x,y);
    }

    endShape();
  }

  borrar() {
    this.camino = []; this.conectado = false;
  }
}
