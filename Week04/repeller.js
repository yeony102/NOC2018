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
    let d = dir.mag();
    dir.normalize();
    if(d<50) {
 //     d = constrain(d, 1, 50);
      let force = -1 * this.power / (d*d);
      force = constrain(force, -20, -1);
      dir.mult(force);
      return dir;
    }
    else return 0;
  }
    

}