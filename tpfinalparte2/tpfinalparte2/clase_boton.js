class Boton {
  constructor(x,y,w,h,texto) {
    this.x = x; this.y = y; this.w = w; this.h = h; this.texto = texto;
  }

  mostrar() {
    if (this.estaSobre()) fill(120,255,180); else fill(20,70,50);
    stroke(120,255,180); strokeWeight(2); rect(this.x,this.y,this.w,this.h,8);
    if (this.estaSobre()) fill(10,20,15); else fill(255);
    noStroke(); textAlign(CENTER,CENTER); textSize(15); text(this.texto,this.x+this.w/2,this.y+this.h/2);
  }

  estaSobre() {
    return mouseX >= this.x && mouseX <= this.x+this.w && mouseY >= this.y && mouseY <= this.y+this.h;
  }
}

function crearBotones() {
  return [
    new Boton(300,215,200,45,"EMPEZAR"),
    new Boton(300,270,200,45,"INSTRUCCIONES"),
    new Boton(300,325,200,40,"CREDITOS"),
    new Boton(20,340,140,40,"VOLVER"),
    new Boton(300,235,200,40,"REINTENTAR"),
    new Boton(300,285,200,40,"VOLVER"),
    new Boton(300,335,200,40,"INICIO"),
    new Boton(285,245,230,45,"ABRIR ARCHIVOS")
  ];
}
