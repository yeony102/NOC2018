class ParticleSystem {
  
  constructor(den) {
    
    this.d = den;
    this.particles = [];
    
    loadPixels();
  
    for(let y=0; y<height; y+=this.d) {
      for(let x=0; x<width; x+=this.d) {

        let idx = [];

        for(let i=0; i<(this.d*this.d); i+=this.d) {

          idx[i] = 4*(x+(y+this.d)*width);

          for(let j=1; j<this.d; j++) {
            idx[i+j] = idx[i]+4*j;
          }

        }

        let avgCol=0;

        for(let i=0; i<idx.length; i++) {
          avgCol += pixels[idx[i]];
        }
        avgCol = avgCol/idx.length;

        if(avgCol<255) {
          this.particles.push(new Particle(x, y, avgCol, this.d));
        }

      }
    }

    console.log(this.particles.length);
    
  }
  
  display() {
    
    for(let particle of this.particles) {
      particle.display();
    }
    
  }
  
  // A function to apply a force to all Particles
  applyForce(f) {
    for(let particle of this.particles){
      particle.applyForce(f);
    }
  }

  applyRepeller(r) {
    for(let particle of this.particles){
      
      let force = r.repel(particle);
      particle.applyForce(force);
    }
  }
  
  applyRecover() {
    for(let particle of this.particles) {
      particle.recover();
    }
  }
  
  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }
}