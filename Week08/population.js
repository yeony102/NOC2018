class Population {
  
  constructor(m, n) {
    this.mutation = m;
    this.popNum = n;
    this.drawings = [];
    this.generation = 1;
    
    for(let i=0; i<this.popNum; i++) {
      let xIdx = i%3;
      let yIdx = floor(i/3);
      let x = d_width * xIdx + 25*(xIdx+1);
      let y = d_height * yIdx + 25*(yIdx+1);
      this.drawings.push(new Drawing(new Triangles(), x, y));
    }
    
  }
  
  display() {
  	for(let i=0; i<this.popNum; i++) {
      push();
      translate(this.drawings[i].x, this.drawings[i].y);
      fill(360);
      rect(0, 0, d_width, d_height); 
      this.drawings[i].display();
      pop();
    }
    
  }
  
  select() {
    
    let r = floor(random(1, 10)); 
    
    for(let i=0; i<this.popNum; i++) {
      if(r <= this.drawings[i].score) {
        return i;
      } else {
        r -= this.drawings[i].score;
      }
    }
    
    
  }
  
  reproduce() {
    
    let children = [];
    
    for(let i=0; i<this.popNum; i++) {
      let childTris;
      let mum = this.select();
      let dad = this.select();
      
      let mumTris = this.drawings[mum].triangles;
      let dadTris = this.drawings[dad].triangles;
      
      childTris = mumTris.crossover(dadTris);
      childTris.mutate(this.mutation);
      
      children.push(childTris);
      
    } // for
    
    for(let i=0; i<this.popNum; i++) {
      let xIdx = i%3;
      let yIdx = floor(i/3);
      let x = d_width * xIdx + 25*(xIdx+1);
      let y = d_height * yIdx + 25*(yIdx+1);

      this.drawings[i] = new Drawing(children[i], x, y);
    } // for
    
    this.generation++;
    gen.html(this.generation);
  } // reproduce
  
  checkClick() {
    for(let i=0; i<this.popNum; i++) {
      this.drawings[i].isClicked();
    }
  }
  
}