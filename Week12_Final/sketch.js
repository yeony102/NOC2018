let img;
let figure = [];

let dessin;
let max;

let dIdx;
let generation;
let reproGen;

let goodGrowthRate;
let goodGrowthNum;
let totalGrowthAttempt;

function preload() {
  img = loadImage('test2.png');
}

// Get the pixel array of the image 
function setFigure() {

  loadPixels();

  for(let y=0; y<height; y++) {
    for(let x=0; x<width; x++) {

      let i = 4 * (x + (width*y));
      figure.push(pixels[i]); 
    }
  }

}

function setup() {

  createCanvas(600, 420);  // the image size

  pixelDensity(1);

  background(255);

  image(img, 0, 0);

  setFigure();

  max = pow(2,12);  // the maximum number of lines before the repoGen generation
  dIdx = 0;
  generation = 1;
  reproGen = Math.log2(max);
  // sumFit = 0;

  goodGrowthNum = 1;
  totalGrowthAttempt = 2;
  goodGrowthRate = (goodGrowthNum/totalGrowthAttempt);

  
  dessin = new Scribbles(max, 50, 50, false);
  
}

function draw() {

  // Draw each candidate drawing and calculate its fitness 
  if(dIdx < dessin.drawings.length) {
    background(255);
    dessin.drawings[dIdx].display();
    dessin.drawings[dIdx].calculateFitness();

    dIdx++;

  } 

  // All candidate drawings for each generation have been drawn & the number of the next reproduced drawings is more than 1
  else if(dIdx >= dessin.drawings.length && generation < reproGen) {  

    generation++;
    dessin.reproduceDouble();

    if(generation == reproGen) { 
      console.log("reproduceDouble finished"); 
    }

    dIdx = 0;

  } 

  // There is only one reproduced image
  else if(generation >= reproGen ) {

    // Start mutation and growing
    dessin.modifyAndGrow(8);
    generation++;
  }

}