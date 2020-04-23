//Zibriqs by Elwyn Palmerton
//
//import Mover from 'mover.js';
//
//Objects: Balls, liquids/reverseLiquid     //Add Blocks.
const balls = [];
var qty = 3; //I can remove this after I change setup to just respond to the initialization object.
const reverseLiquids = [];
const liquids = [];
const backgroundArray = [];
var blocks = [];
let objectType;

//Display variables:
const dimAmt = 30;

//Force variabes;
let xOff = 0;
let friction; //Can this be a variable inside of the mover class???
const windC = 0.05;
const dragCoefficient = 0.01;
const gForce = 0.12;
const minMass = 0.25;
const maxMass = 1.0;

//Grid parameters   --------  I need to re-think it this is how I want this to work.
var cnv;
const initWidth = 500;
const initHeight = 400;
const minSize = 50;

//Interface variables
var drawButtonOn = false;
var removeButtonOn = false;
var buttons = [];
var run = true;
var scl;

function initializeCanvas(startWidth, startHeight) {
  //Remove any canvas children in the canvasContainer.
  scl = setScale();
  cnv = createCanvas(startWidth * scl, startHeight * scl);

  let currentWidth = startWidth * scl;
  let btns = document.getElementsByClassName("buttons");

  // btns.style.width = currentWidth + "px";

  //cnv = createCanvas(startWidth, startHeight);
  let container = document.getElementById("canvasContainer");
  container.appendChild(cnv.elt);
}

function createResizeListener() {
  window.addEventListener("resize", () => {
    initializeCanvas(initWidth, initHeight);
    //Add the setTimeout trick in here.
  })
}

///////SETUP///////

function setup() {
  colorMode(HSB);

  //setup canvas.
  initializeCanvas(initWidth, initHeight);
  createResizeListener();

  //Create all of the balls.
  for (let i = 0; i < qty; i++) {
    let ball = new Mover(random(initWidth), initHeight / 5, initBallColors[i]);
    balls.push(ball);
  }

  let bgObject = new backgroundObject(initBackgroundColor[0]);
  backgroundArray.push(bgObject);

  //Initialize the drag elements.

  let liquidStart = createVector(100 * scl, 100 * scl);
  let liquidEnd = createVector(200 * scl, 200 * scl);
  liquid = new Liquid(
    liquidStart,
    liquidEnd,
    dragCoefficient,
    initDragColors[0]
  );
  liquids.push(liquid);

  //Initialize the accelerator elements.

  //Refactor this so that the initialization vectors.
  //... go in the initialization object.
  let reverseLiquidStart = createVector(300 * scl, 200 * scl);
  let reverseLiquidEnd = createVector(400 * scl, 300 * scl);
  reverseLiquid = new Liquid(
    reverseLiquidStart,
    reverseLiquidEnd,
    -dragCoefficient,
    initAccelColors[0]
  );
  reverseLiquids.push(reverseLiquid);



  //Initialize the interface.
  makeButtons();
  createController();
  //Read the initial color values from the controller.
  readController();
}