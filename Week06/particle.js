class Particle {
  
  constructor(x, y, c, d) {
    
    this.acceleration = createVector();
    this.velocity = createVector()
    this.velocity.mult(0.5);
    this.position = createVector(x, y);
    this.origin = createVector(x, y);

    this.c = c;
    this.d = d;
  }
  
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.95);
  }

  recover() {
    let dir = p5.Vector.sub(this.origin, this.position);
    let m = dir.mag();
    
    if(m>2) {
      dir.normalize();
      dir.mult(2*(m/40));
      this.position.add(dir);
    }
    else {
      this.position = this.origin.copy();
    }
  }
  
  display() {
    noStroke();
    fill(this.c);
    rect(this.position.x, this.position.y, this.d/2, this.d/2);
  }
  
}