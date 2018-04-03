class Triangles {
  constructor(v_, h_, b_) {
    if(v_) {
      this.num = h_.length;
      this.vertices = v_;
      this.h = h_;
      this.b = b_;

    } 
    else {
      this.num = floor(random(tri_min, tri_max));
      this.vertices = [];
      this.h = [];
      this.b = [];
      
      for(let i=0; i<3+(this.num-1); i++) {
        let x = floor(random(offset, d_width-offset));
        let y = floor(random(offset, d_height-offset));;
        this.vertices.push(new Vertex(x, y));
      } // for 1
      
      let h = floor(random(0, 361));
      for(let i=0; i<this.num; i++) {
        this.h.push(h);
        this.b.push(floor(random(0, 361)));
      } // for 2
    } // else
  } // constructor
  
  crossover(partner) {
    let newNum = floor((this.num + partner.num)/2);
    let newVertices = new Array(3+(newNum-1));
    let newH = new Array(newNum);
    let newB = new Array(newNum);
   
    for(let i=0; i<newVertices.length; i++) {
      let x1, y1, x2, y2;
      let newX, newY;
      if(i<this.vertices.length) {
        x1 = this.vertices[i].x;
        y1 = this.vertices[i].y;
      } else {
        x1 = partner.vertices[i].x;
        y1 = partner.vertices[i].y;
      }
      if(i<partner.vertices.length) {
        x2 = partner.vertices[i].x;
        y2 = partner.vertices[i].y;
      } else {
        x2 = this.vertices[i].x;
        y2 = this.vertices[i].y;
      }
      
      newX = floor((x1+x2)/2);
      newY = floor((y1+y2)/2);
      
      newVertices[i] = new Vertex(newX, newY);
    } // for
    
    	if(this.num >= partner.num) {
        for(let i=0; i<newNum; i++) {
          if(i<partner.num) {
          	if(i%2) {
              newH[i] = partner.h[i];
              newB[i] = partner.b[i];
            } else {
              newH[i] = this.h[i];
              newB[i] = this.b[i];
            }
          } else {
            newH[i] = this.h[i];
            newB[i] = this.b[i];
          } // else
        } // for
      } // if
      else {
        for(let i=0; i<newNum; i++) {
          if(i < this.num) {
            if(i%2) {
              newH[i] = partner.h[i];
              newB[i] = partner.b[i];
            } else {
              newH[i] = this.h[i];
              newB[i] = this.b[i];
            }
          } else {
            newH[i] = partner.h[i];
            newB[i] = partner.b[i];
          } // else
      } // else   
      
    } // for
      
    let newTri = new Triangles(newVertices, newH, newB);
   
    return newTri;
    
  } // crossover
  
  mutate(mutationRate) {
    
    for(let i=0; i<this.vertices.length; i++) {
      let r = random(1);
      if(r<mutationRate) {
        this.vertices[i].x = floor(random(offset, d_width-offset));
        this.vertices[i].y = floor(random(offset, d_height-offset));
      }
    }
    
    for(let i=0; i<this.num; i++) {
      let r = random(1);
      if(r<mutationRate) {
        this.h[i] = floor(random(0, 361));
      }
      r = random(1);
      if(r<mutationRate) {
        this.b[i] = floor(random(0, 361));
      }
    } // for
    
    
  } // mutate
  
}
  
class Vertex {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
  }
}