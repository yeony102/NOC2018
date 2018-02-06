class Spring {
	constructor(p, c) {
		this.pos = createVector(p.x, p.y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.center = createVector(c.x, c.y);
		
		this.rad = 30;
		this.col = random(30, 100);
    this.mass = map(this.col, 30, 100, 10, 1);
		this.isOn = true;
	}
	
	display() {
		// spring
		stroke(30);
		line(this.center.x, this.center.y, this.pos.x, this.pos.y);
		
		// spring head
		noStroke();
		fill(50, 100,this.col);
		ellipse(this.pos.x, this.pos.y, this.rad);
	}
	
	applyElasticForce() {
    
    // elastic force f= k*d (let's say k=1)
    let ef = p5.Vector.sub(this.center, this.pos);
    let ef_mag = map(ef.mag(), 0, width/2, 0, 10);
        
    ef.setMag(ef_mag);
    
    // a = f/m
    ef.div(this.mass)
    this.acc.add(ef);
    
  }
      
  applyDragForce(dragForce) {
    let df = p5.Vector.div(dragForce, this.mass);
    this.acc.add(df);
  }
    
  
  update() {
    
      if(this.isOn) {
        this.vel.add(this.acc);
//		this.vel.mult(0.995);
		this.pos.add(this.vel);
        this.acc.mult(0);
      }
		
	}
  
	
	dragging(x,y) {
		this.pos.x = x;
		this.pos.y = y;
	}
	
  
	isCatched() {
		let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
		if(d <= this.rad) {
			return true;
		} else {
			return false;
		}
	}
	
}