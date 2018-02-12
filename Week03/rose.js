class Rose {
  
  constructor(d, n, l, step, h, type) {
    
    this.d0 = d;
    this.n0 = n;
    this.d = d;
    this.n = n;
    this.l = l;
    this.step = step;
    this.inc = true;
    this.c = h;
    this.type = type;
    
    this.monitor = false;
  }
  
  display() {
    let k = this.n/this.d;
  
    beginShape();
      stroke(this.c, 100, 90);
      strokeWeight(1);
      noFill();
      for(let a=0; a<TWO_PI*this.d; a+=0.01) {
        let r = this.l * cos(k*a);
        let x = r * cos(a);
        let y = r * sin(a);
        vertex(x, y);
      }
    endShape();

    if(this.inc) {
      if(this.n<(this.n0+num)) {
        this.n += this.step;
        if(this.type == 0)  this.d += this.step;
        this.c += (360/(num/this.step));
      } else this.inc = false;
    } else {
      if(this.n>this.n0) {
        this.n -= this.step;
        if(this.type == 0)  this.d -= this.step;
        this.c -= (360/(num/this.step));
      } else this.inc = true;
    }
    if(this.c > 360) this.c = 0;
    else if(this.c < 0) this.c = 360;
  }
  
}
