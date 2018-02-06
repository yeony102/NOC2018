class Plane {
  
  constructor(c) {
    this.w = width;
    this.h = height;
    this.coef = c;
    this.b = map(c, 0.001, 0.1, 100, 0);
  }
  
  setCoef(c) {
    this.coef = c;
    this.b = map(c, 0.001, 0.1, 100, 0);
  }
  
  display() {
    noStroke();
    fill(37, 0, this.b);
    rect(0, 0, this.w, this.h);
  }
  
   // drag force f = 1/2 * v^2 * coef * A (let's say A=1)
  calDrag(h) {
    let spd = h.vel.mag();
    let dragMag = this.coef * spd * spd;
    
    let dragForce = h.vel.copy();
    dragForce.setMag(-1*dragMag);
    
    return dragForce;
  }
}