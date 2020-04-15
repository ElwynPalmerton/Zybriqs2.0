//Zibriqs by Elwyn Palmerton
//
//import Mover from 'mover.js';
//
//Objects: Balls, liquids/reverseLiquid     //Add Blocks.
const balls = [];
// let liquid, reverseLiquid;
var qty = 3;
const liquids = [];
const reverseLiquids = [];
const backgroundArray = [];
var blocks = [];
let objectType;
const dimAmt = 30;

//Force variabes;
let xOff = 0;
let friction; //Can this be a variable inside of the mover class???
const windC = 0.1;
const dragCoefficient = 0.01;
const gForce = 0.12;

//Grid parameters   --------  I need to re-think it this is how I want this to work.
var cnv;
const w = 8; //Width of grid in terms of square units.
const h = 6; //height of grid in terms of square units aka 8 x 10 grid.
const gridUnit = 100;
const minSize = 50;

//Interface variables
var drawButtonOn = false;
var removeButtonOn = false;
var buttons = [];
var run = true;

function setup() {
  //setup canvas.
  setScale();
  colorMode(HSB);
  let width = setScale();
  cnv = createCanvas(width, 600);
  let container = document.getElementById("canvasContainer");
  container.appendChild(cnv.elt);

  //Create all of the balls.
  for (let i = 0; i < qty; i++) {
    let ball = new Mover(random(width), height / 5, initBallColors[i]);
    balls.push(ball);
  }

  let bgObject = new backgroundObject(initBackgroundColor[0]);
  backgroundArray.push(bgObject);

  //Initialize the drag elements.

  let liquidStart = createVector(200, 150);
  let liquidEnd = createVector(350, 300);
  liquid = new Liquid(
    liquidStart,
    liquidEnd,
    dragCoefficient,
    initDragColors[0]
  );
  liquids.push(liquid);

  //Initialize the accelerator elements.

  let reverseLiquidStart = createVector(700, 300);
  let reverseLiquidEnd = createVector(850, 450);
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
  readController();

}