class Punto {
  constructor(fila,columna,id,colorPunto) {
    this.fila = fila; this.columna = columna; this.id = id; this.colorPunto = colorPunto;
  }

  mostrar(tablero) {
    let x = tablero.x + this.columna*tablero.tam + tablero.tam/2, y = tablero.y + this.fila*tablero.tam + tablero.tam/2;
    stroke(255); strokeWeight(2); fill(this.colorPunto); ellipse(x,y,27,27);
  }
}
