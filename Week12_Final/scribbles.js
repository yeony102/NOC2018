class Scribbles {  // Population

  constructor(max, maxlen, tr, repro) {
    this.max = max;   // the maximum number of the lines
    this.maxlen = maxlen;
    this.n = max/(pow(2,generation)); // the number of drawings
    this.transformRate = tr;

    this.drawings = [];

    if(!repro) {
      for(let i=0; i<this.n; i++) {
        this.drawings.push(new Linedrawing(pow(2,generation), maxlen, false));
      }
    }
  }

  display() {

    for(let i=0; i<this.drawings.length; i++) {
      this.drawings[i].display();
    }

  }

  select() {
    
    // Select the best and second best fitness
    let max1 = -1;
    let max2 = -1;
    let maxIdx1 = -1;
    let maxIdx2 = -1;

    for(let i=0; i<this.n; i++) {
      if(this.drawings[i].fitness > max1) {
        max2 = max1;
        maxIdx2 = maxIdx1;
        max1 = this.drawings[i].fitness;
        maxIdx1 = i;
      }
    }

    if(max2 < 0) {
      for(let i=0; i<this.n; i++) {
        if(i!=maxIdx1) {
          if(this.drawings[i].fitness > max2) {
            max2 = this.drawings[i].fitness;
            maxIdx2 = i;
          }
        }
      }
    }

    return [maxIdx1, maxIdx2];

    // Select by the probability 
/*    let r = floor(random(1, sumFit)); 
    // console.log("sumFit = " + sumFit);
    // console.log("r = " + r);

    for(let i=0; i<this.n; i++) {
      if(r <= this.drawings[i].fitness) {
        // console.log("selected index = " + i);
        return i;
      } else {
        r -= this.drawings[i].fitness;
      }
    } */
  }

  reproduceDouble() {

    let children = new Scribbles(max, this.maxlen, this.transformRate, true);  // drawing

    let newN = this.n/2;  // the number of drawings for the new generation

    let parent = this.select();
    let mum = parent[0];
    let dad = parent[1];

    for(let i=0; i<newN; i++) {

      let childDrawing = new Linedrawing(pow(2, generation), this.maxlen, true);

/*      let mum = this.select();
      let dad = this.select();

      if(mum==dad) {
        dad = mum-1;
        if(dad<0) {
          dad = mum+1;
        }
      }*/
      
      let mumDrawing = []; // this.drawings[mum].lines;
      let dadDrawing = []; // this.drawings[dad].lines;

      let n = this.drawings[mum].lines.length;

      // Copy the mum drawing's lines
      for(let i=0; i<n; i++) {

        let p1x = this.drawings[mum].lines[i].p1.x;
        let p1y = this.drawings[mum].lines[i].p1.y;
        let p2x = this.drawings[mum].lines[i].p2.x;
        let p2y = this.drawings[mum].lines[i].p2.y;
        let b = this.drawings[mum].lines[i].b;
        let w = this.drawings[mum].lines[i].w;

        let p1 = new Point(p1x, p1y);
        let p2 = new Point(p2x, p2y);

        mumDrawing.push(new Line(p1, p2, b, w));
      }

      // Copy the dad drawing's lines
      for(let i=0; i<n; i++) {

        let p1x = this.drawings[dad].lines[i].p1.x;
        let p1y = this.drawings[dad].lines[i].p1.y;
        let p2x = this.drawings[dad].lines[i].p2.x;
        let p2y = this.drawings[dad].lines[i].p2.y;
        let b = this.drawings[dad].lines[i].b;
        let w = this.drawings[dad].lines[i].w;

        let p1 = new Point(p1x, p1y);
        let p2 = new Point(p2x, p2y);

        dadDrawing.push(new Line(p1, p2, b, w));
      }

      for(let i=0; i<n; i++) {
        childDrawing.lines.push(mumDrawing[i]);
        childDrawing.lines.push(dadDrawing[i]);
      }
      
      // Transform each child drawing a little bit except the first one
      if(i!=0) {
        childDrawing.transform(this.transformRate);
      }
       
      children.drawings.push(childDrawing);
      
    }

    this.drawings = children.drawings;
    this.n = newN;

  }

  // Only mutate
  modify() {

    let nextDrawing = new Linedrawing(pow(2, reproGen), this.maxlen, true);

    // Copy the current drawing
    let n = this.drawings[0].lines.length;
    for(let i=0; i<n; i++) {
      let p1x = this.drawings[0].lines[i].p1.x;
      let p1y = this.drawings[0].lines[i].p1.y;
      let p2x = this.drawings[0].lines[i].p2.x;
      let p2y = this.drawings[0].lines[i].p2.y;

      let b = this.drawings[0].lines[i].b;
      let w = this.drawings[0].lines[i].w;

      let p1 = new Point(p1x, p1y);
      let p2 = new Point(p2x, p2y);

        nextDrawing.lines.push(new Line(p1, p2, b, w));
    }
    
    let mutationRate;
    let f = this.drawings[0].fitness;

    if(f < 0.8) {
      mutationRate = 0.001;
    } else if(f < 0.9) {
      mutationRate = 0.0005;
    } 
    else {
      mutationRate = 0.0001;
    }

    // Mutate
    nextDrawing.mutate(mutationRate);

    background(255);
    nextDrawing.display();

    nextDrawing.calculateFitness();

    if(nextDrawing.fitness > f) {
      // paste
      // console.log("Old Fitness: " + f);
      // console.log("New Fitness: " + nextDrawing.fitness);
      console.log("Updating: f = " + nextDrawing.fitness);
      this.drawings[0] = nextDrawing;
    }


  }

  // Mutate and add more random lines occasionally
  modifyAndGrow(growthSize) {

    let nextDrawing = new Linedrawing(pow(2, reproGen), this.maxlen, true);

    // Copy the current drawing
    let n = this.drawings[0].lines.length;
    for(let i=0; i<n; i++) {
      let p1x = this.drawings[0].lines[i].p1.x;
      let p1y = this.drawings[0].lines[i].p1.y;
      let p2x = this.drawings[0].lines[i].p2.x;
      let p2y = this.drawings[0].lines[i].p2.y;

      let b = this.drawings[0].lines[i].b;
      let w = this.drawings[0].lines[i].w;

      let p1 = new Point(p1x, p1y);
      let p2 = new Point(p2x, p2y);

        nextDrawing.lines.push(new Line(p1, p2, b, w));
    }
    
    let mutationRate;
    let gSize;
    let f = this.drawings[0].fitness;
    

    if(f < 0.8) {
      mutationRate = 0.001;
      gSize = growthSize;
    } else {
      mutationRate = 0.0005;
      gSize = growthSize/2;
    } 

    /*else {
      mutationRate = 0.0001;
    }*/

    let isGrown;
    isGrown = nextDrawing.mutateAndGrow(mutationRate, gSize);

    background(255);
    nextDrawing.display();

    nextDrawing.calculateFitness();

    // if the new drawing is better fit to the original image than the current one...
    if(nextDrawing.fitness > f) {

      this.drawings[0] = nextDrawing;

      if(isGrown) { // Growing worked well...?
        goodGrowthNum++;
        totalGrowthAttempt++;
        goodGrowthRate = (goodGrowthNum/totalGrowthAttempt); // Update the growing chance rate
        console.log("Gen " + generation + ", Updating: f = " + nextDrawing.fitness + ", Size +" + gSize);
      } else { 
        console.log("Gen " + generation + ", Updating: f = " + nextDrawing.fitness);
      }
    } 

    // if the new drawing isn't better... 
    else {
      if(isGrown) {  // Growing didn't work well...?
        totalGrowthAttempt++;
        goodGrowthRate = (goodGrowthNum/totalGrowthAttempt);  // Update the growing chance rate
      }
    }
  }

}