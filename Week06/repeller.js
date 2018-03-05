class Repeller {
  
  constructor(x, y) {
    this.power = 100;
    this.position = createVector(x, y);
  }
  
  update() {
  	this.position.x = mouseX;
    this.position.y = mouseY;
  }
  
  repel(p) {
    let dir = p5.Vector.sub(this.position, p.position);
    let dm = dir.mag();
    dir.normalize();
    if(dm < 100) {
      let force = -1 * this.power / (dm*dm);
      force = constrain(force, -20, -1);
      dir.mult(force);
      return dir;
    }
    else return 0;
  }
    

}