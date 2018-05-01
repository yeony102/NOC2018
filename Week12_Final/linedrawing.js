class Linedrawing {  // DNA Set

  constructor(n, maxlen, repro) {
    this.n = n;  // the number of lines
    this.maxlen = maxlen;  // the maximum length of lines

    this.fitness;

    this.lines = [];

    if(!repro) {
      for(let i=0; i<this.n; i++) {
        let l = random(10, this.maxlen);
        let p1 = new Point(random(width), random(height));
        let p2 = new Point(constrain(random(p1.x-l, p1.x+l), 0, width), constrain(random(p1.y-l, p1.y+l), 0, height));
        let b = floor(random(0, 231));
        let w = random(0.1, 1.0);

        this.lines.push(new Line(p1, p2, b, w));
      }
    }
  }

  display() {
    for(let i=0; i<this.n; i++) {
      this.lines[i].display();
    }
  }

  // Convert the current line image into a pixel array
  getPixels() {
    
    let px = [];
    loadPixels();

    for(let y=0; y<height; y++) {
      for(let x=0; x<width; x++) {

        let i = 4 * (x + (width*y));
        px.push(pixels[i]); 
      }
    }

    return px;
  }

  calculateFitness() {
    
    let px = this.getPixels();
    let pixelFitness = 0;

    // Get the difference between the image and the current pixel array

    let numOfPixels = px.length;

    for(let i=0; i<numOfPixels; i++) {
      let diff = abs(px[i] - figure[i]);
      diff = diff / 255;
      // console.log(diff);
      pixelFitness += (1 - diff);
    }
    
    // normalize
    this.fitness = (pixelFitness / numOfPixels); 
    // console.log(this.fitness);
  }

  transform(transformRate) {

    for(let i=0; i<this.n; i++) {
      let p1x = this.lines[i].p1.x;
      let p1y = this.lines[i].p1.y;
      let p2x = this.lines[i].p2.x;
      let p2y = this.lines[i].p2.y;

      let b = this.lines[i].b;
      let w = this.lines[i].w;

      let l = random(10, this.maxlen);

      p1x = constrain(random((p1x-transformRate), (p1x+transformRate)), 0, width);
      p1y = constrain(random((p1y-transformRate), (p1y+transformRate)), 0, height);
      p2x = constrain(random((p1x-l), (p1x+l)), 0, width);
      p2y = constrain(random((p1y-l), (p1y+l)), 0, height);

      this.lines[i].p1.x = p1x;
      this.lines[i].p1.y = p1y;
      this.lines[i].p2.x = p2x;
      this.lines[i].p2.y = p2y;

      this.lines[i].b = constrain(floor(random(b-20 , b+20)), 0, 230);
      this.lines[i].w = constrain(random(w-0.2, w+0.2), 0.1, 1.0);
      
    }

  }

  mutate(mutationRate) {

    for(let i=0; i<this.n; i++) {
      
      let r = random(0, 1);
      
      if(r<mutationRate) {

        let l = random(10, this.maxlen);
        let p1 = new Point(random(width), random(height));
        let p2 = new Point(constrain(random(p1.x-l, p1.x+l), 0, width), constrain(random(p1.y-l, p1.y+l), 0, height));

        let b = floor(random(0, 231));
        let w = random(0.1, 1.0);

        this.lines[i].p1.x = p1.x;
        this.lines[i].p1.y = p1.y;
        this.lines[i].p2.x = p2.x;
        this.lines[i].p2.y = p2.y;
        this.lines[i].b = b;
        this.lines[i].w = w;
      }

    }
  }

  mutateAndGrow(mutationRate, growSize) {

    // Mutate 
    for(let i=0; i<this.n; i++) {
      
      let r = random(0, 1);
      
      if(r<mutationRate) {

        let l = random(10, this.maxlen);
        let p1 = new Point(random(width), random(height));
        let p2 = new Point(constrain(random(p1.x-l, p1.x+l), 0, width), constrain(random(p1.y-l, p1.y+l), 0, height));

        let b = floor(random(0, 231));
        let w = random(0.1, 1.0);

        this.lines[i].p1.x = p1.x;
        this.lines[i].p1.y = p1.y;
        this.lines[i].p2.x = p2.x;
        this.lines[i].p2.y = p2.y;
        this.lines[i].b = b;
        this.lines[i].w = w;
      }

    }

    // Grow
    let okToGrow = random(0, 1);

    if(okToGrow < goodGrowthRate) {

      let newN = this.n + growSize;

      for(let i=0; i<growSize; i++) {
        let l = random(10, this.maxlen);
        let p1 = new Point(random(width), random(height));
        let p2 = new Point(constrain(random(p1.x-l, p1.x+l), 0, width), constrain(random(p1.y-l, p1.y+l), 0, height));

        let b = floor(random(0, 231));
        let w = random(0.1, 1.0);

        this.lines.push(new Line(p1, p2, b, w));
      }

      return true;
    }

    return false;
    
  }

}