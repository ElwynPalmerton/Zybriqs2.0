//Zibriqs by Elwyn Palmerton
//
//import Mover from 'mover.js';
//
//Objects: Balls, liquids/reverseLiquid     //Add Blocks.
const balls = [];
let liquid, reverseLiquid;
var qty = 3;
const liquids = [];
const reverseLiquids = [];
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

//New vars from other template - move after intgration.
var drawButtonOn = false;
var removeButtonOn = false;
var buttons = [];

var run = true;

function setup() {
  //setup canvas.
  colorMode(HSB);
  cnv = createCanvas(1000, 600);
  let container = document.getElementById("canvasContainer");
  container.appendChild(cnv.elt);

  //Create all of the balls.
  for (let i = 0; i < qty; i++) {
    let ball = new Mover(random(width), height / 5, initBallColors[i]);
    balls.push(ball);
  }

  //This needs to be changed so that the liquids are added manually in setup.
  //...or initiated as defaults...
  //...or initiated as defaults automatically and then reset if the user chooses to start over.

  let liquidStart = createVector(200, 150);
  let liquidEnd = createVector(350, 300);
  liquid = new Liquid(
    liquidStart,
    liquidEnd,
    dragCoefficient,
    initDragColors[0]
  );
  liquids.push(liquid);

  let reverseLiquidStart = createVector(700, 300);
  let reverseLiquidEnd = createVector(850, 450);
  reverseLiquid = new Liquid(
    reverseLiquidStart,
    reverseLiquidEnd,
    -dragCoefficient,
    initAccelColors[0]
  );
  reverseLiquids.push(reverseLiquid);


  makeButtons();

  createController();
  readController();

}




function draw() {
  if (run) {

    let bgCol = color(230, 35, 35, 1)
    background(bgCol);

    if (mouseIsPressed) {
      readController();
    }

    for (let i = 0; i < qty; i++) {
      //Calculate wind.
      //---The first three lines which calculate wind speed do not (necessaril?) need to be in the loop.
      xOff += 0.01;
      var windSpeed = map(noise(xOff), 0, 1, -windC, windC);
      var wind = createVector(windSpeed, 0.0);
      balls[i].applyForce(wind);

      //Calculate gravity.
      var gravity = createVector(0, gForce); //This can be a global variable (unless it can be user modified?
      gravity.mult(balls[i].mass);
      balls[i].applyForce(gravity);

      //Calculate drag if it's in the liquid.   //Create Liquid and Reverse liquid in the same array.
      //It is only checking the first liquid, not the array.
      liquids.forEach((l) => {
        if (balls[i].isInside(l)) {
          balls[i].drag(l);
        }
      });

      //Calculate reverse drag
      //if it is in the reverseLiquid. //See above.
      reverseLiquids.forEach((rl) => {
        if (balls[i].isInside(rl)) {
          balls[i].drag(rl);
        }
      });

      //Check collides.
      for (let j = 0; j < blocks.length; j++) {
        balls[i].collides(blocks[j]);
      }

      //Update balls.
      balls[i].update();
      balls[i].checkEdges(width, height);

      //Display the balls, liquid, and reverseLiquid.
      balls[i].display(); //Create an array of ballCols and pass in ballCols[x[.]
    } //End for loop.

    //Color is just passed in to reverseLiquid so I can just create another set of sliders.
    //   // SO NICE that I refactored it so that I can do this!!!!

    liquids.forEach((liquid, i) => {
      liquid.display(); //Liquid and reverseLiquid should be in the same array. See above?
    });
    reverseLiquids.forEach((reverseLiquid) => {
      reverseLiquid.display();
    });

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].display();
    }
  } //end of if (run) loop.
} //End of draw loop.

//REMOVED from draw();
// //if (balls[i].isInside(liquid));
// if (mouseIsPressed) {
//   //Replace this with if (isInside) - after I make isInside.
//   balls[i].friction();
// }