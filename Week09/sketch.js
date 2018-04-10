// Yeonhee Lee 
// Used Daniel Shiffman's Toy Neural Network
// Inspired by Daniel Shiffman's colour picker and Daniel was inspired by Jabril's SEFD Science

// Daniel Shiffman
// http://codingtra.in

// Color Predictor
// https://youtu.be/KtPpoMThKUs

// Inspired by Jabril's SEFD Science
// https://youtu.be/KO7W0Qq8yUE
// https://youtu.be/iN3WAko2rL8

let state = 0;
let h, s, b;
let brain;

// let cText = "black";

let colours = ['reddish', 'orangish', 'yellowish', 'greenish', 'bluish', 'purplish']; 

let clk;
let isthiscolour, container01, container02, container03;
let yesBtn, noBtn, dontCareBtn;
let redBtn, orgBtn, yllwBtn, grnBtn, blBtn, pplBtn;

isthiscolour = document.querySelector('#isthiscolour');
container01 = document.querySelector('#container01');
container02 = document.querySelector('#container02');
container03 = document.querySelector('#container03');
  
yesBtn = document.querySelector('#yes');
noBtn = document.querySelector('#no');
dontCareBtn = document.querySelector('#dontcare');
  
redBtn = document.querySelector('#red');
orgBtn = document.querySelector('#orange');
yllwBtn = document.querySelector('#yellow');
grnBtn = document.querySelector('#green');
blBtn = document.querySelector('#blue');
pplBtn = document.querySelector('#purple');


let isSpinning = false;

let iPredict;


function randomColour() {
	h = random(360);
  s = random(100, 360);
  b = random(200, 360);
}


function setup() {

  createCanvas(600, 405);
  colorMode(HSB, 360);
  frameRate(10);
  
	brain = new NeuralNetwork(3, 3, colours.length);

  for (let i = 0; i < 10000; i++) {
    let training_h = random(360);
    let training_s = random(100, 360);
    let training_b = random(200, 360);
    let targets = trainColor(training_h);
    let inputs = [training_h / 360, training_s / 260, training_b / 160];
    brain.train(inputs, targets);
    //console.log(i);
    if(i==9999) isSpinning = true;
  }
  
 console.log(isSpinning);

}

function draw() {
  
  if(isSpinning) {
   	 randomColour();
  }
  
  background(h, s, b);
}

container01.addEventListener('click', isThisColour, false);


function isThisColour(e) {
      // background colour is decided
  e.preventDefault();
  
  isSpinning = false;
  
  let cPredict = colorPredictor(h, s, b);
   
    isthiscolour.innerHTML = "Is this color... <br/>" + cPredict + '?';
    container01.classList.remove("show");
    container01.classList.add("hide");
    container02.classList.remove("hide");
    container02.classList.add("show");
  
  	yesBtn.addEventListener('click', theColourIsCorrect, false);
    noBtn.addEventListener('click', theColourIsWrong, false);
    dontCareBtn.addEventListener('click', iDontCare, false);
  
}

function theColourIsCorrect(e) {
  
  console.log("YES is clicked.");
  console.log(iPredict);
  let idx = iPredict;

  teachColour(idx);
  
  reset();
  
}

function theColourIsWrong(e) {
  
  //e.preventDefault();
  console.log("No is clicked");
  container02.classList.remove("show");
  container02.classList.add("hide");
  container03.classList.remove("hide");
  container03.classList.add("show");
  
  redBtn.addEventListener('click', function() {
    correctBrain(0)
  }, false);
  orgBtn.addEventListener('click', function() {
    correctBrain(1)
  }, false);
  yllwBtn.addEventListener('click', function() {
    correctBrain(2)
  }, false);
  grnBtn.addEventListener('click', function() {
    correctBrain(3)
  }, false);
  blBtn.addEventListener('click', function() {
    correctBrain(4)
  }, false);
  pplBtn.addEventListener('click', function() {
    correctBrain(5)
  }, false);
  
}

function correctBrain(i) {
  
  teachColour(i);
  
  container01.classList.remove("hide");
  container01.classList.add("show");
  container03.classList.remove("show");
  container03.classList.add("hide");
  
  isSpinning = true;
}

function teachColour(idx) {
  
  console.log("OK. This colour is " + colours[idx] + ". Train the brain...");
  
  // train()
  let targets = [];
  for(let i=0; i<colours.length; i++) {
    if(i == idx) targets[i] = 1;
    else targets[i] = 0;
  }
  console.log(targets);
  
  let inputs = [h / 360, s / 260, b / 160];
  brain.train(inputs, targets);
  
} 

function iDontCare(e) {
  console.log("I don't give a shit.");
  reset();
}

function reset() {
  container01.classList.remove("hide");
  container01.classList.add("show");
  container02.classList.remove("show");
  container02.classList.add("hide");
  
	isSpinning = true;  
}

function trainColor(h_) {

  if((h_ >= 0 && h_ < 13) || (h_ >= 327 && h_ < 360)) {
    return [1, 0, 0, 0, 0, 0];
  } else if(h_ >= 13 && h_ < 42) {
    return [0, 1, 0, 0, 0, 0];
  } else if(h_ >= 42 && h_ < 70) {
    return [0, 0, 1, 0, 0, 0];
  } else if(h_ >= 70 && h_ < 167) {
    return [0, 0, 0, 1, 0, 0];
  } else if(h_ >= 167 && h_ < 264) {
    return [0, 0, 0, 0, 1, 0];
  } else if(h_ >= 264 && h_ < 327) {
    return [0, 0, 0, 0, 0, 1];
  } else {
    console.log("error!");
      return [1, 0, 0, 0, 0, 0];
  }
  
}

function colorPredictor(h, s, b) {
  // console.log(floor(r + g + b));
  let inputs = [h / 360, s / 260, b / 160];
  console.log(inputs);
  let outputs = brain.predict(inputs);
  console.log(outputs);
  
  let res = Math.max(...outputs);
  console.log(res);
  
  for(let i=0; i<colours.length; i++) {
    if(outputs[i] == res) {
       console.log("predicted colour: ", colours[i]);
      iPredict = i;
      return colours[i];
    }
  }
  
}

