//Zone Moment by Elwyn Palmerton

//Objects: Balls, liquids/reverseLiquid     //Add Blocks.
const balls = [];
const qty = 3;
let liquid, reverseLiquid;
const liquids = [];
const reverseLiquids = [];
let objectType;



//Force variabes;
let xOff = 0;
let friction; //Can this be a variable inside of the mover class???
const windC = 0.1;
const dragCoefficient = 0.01;
const gForce = 0.12;

//Grid parameters   --------  I need to re-think it this is how I want this to work.
var cnv;
const w = 10; //Width of grid in terms of square units.
const h = 8; //height of grid in terms of square units aka 8 x 10 grid.
const gridUnit = 100;
const minSize = 50;


//New vars from other template - move after intgration.
var drawButtonOn = false;
var removeButtonOn = false;
var buttons = [];

var run = true;
var blocks = [];

function setup() {
  colorMode(HSB);
  cnv = createCanvas(1000, 800);

  //Create all of the balls.
  for (let i = 0; i < qty; i++) {
    let ball = new Mover(random(width), height / 5);
    balls.push(ball);
  }

  //This needs to be changed so that the liquids are added manually in setup.
  //...or initiated as defaults...
  //...or initiated as defaults automatically and then reset if the user chooses to start over.

  let liquidStart = createVector(0, 0);
  let liquidEnd = createVector(minSize, minSize);

  liquid = new Liquid(liquidStart, liquidEnd, dragCoefficient);
  liquids.push(liquid);

  let reverseLiquidStart = createVector(700, 400);
  let reverseLiquidEnd = createVector(850, 550);
  reverseLiquid = new Liquid(reverseLiquidStart, reverseLiquidEnd, -dragCoefficient);
  reverseLiquids.push(reverseLiquid);


  let brk = document.createElement('br'); //These two line can just go in the HTML.
  document.body.appendChild(brk);
  //Put the addButtons functions in a separate function.
  makePlayButton();
  makeBlockButton();
  makeDragButton();
  makeReverseDragButton();
  makeRemoveButton();

  addSliders();
  readSliders();


  // $(document).mousedown(() => {
  //   console.log('jQuery works.');
  // })
}

/////PPP/////////
function keyPressed() {
  if (keyCode === 80) { //"P" - Makes all the balls move spasstically updward.
    console.log('pressed');
    let bounce = createVector(0, -1);

    for (let i = 0; i < qty; i++) {
      bounce.mult(balls[i].mass);
      balls[i].applyForce(bounce);
    }
  }
}

function draw() {
  if (run) {
    background(bgC);

    if (mouseIsPressed) { //Use eventListeners and e.preventDefault();
      readSliders();
    }

    for (let i = 0; i < qty; i++) { //Try implementing this with a for-of loop.
      //Calculate wind.    
      //---The first three lines which calculate wind speed do not (necessaril?) need to be in the loop.
      xOff += 0.01;
      var windSpeed = map(noise(xOff), 0, 1, -windC, windC);
      var wind = createVector(windSpeed, 0.00);
      balls[i].applyForce(wind);

      //Calculate gravity.
      var gravity = createVector(0, gForce); //This can be a global variable (unless it can be user modified?
      gravity.mult(balls[i].mass);
      balls[i].applyForce(gravity);

      //Calculate drag if it's in the liquid.   //Create Liquid and Reverse liquid in the same array.
      //It is only checking the first liquid, not the array.
      liquids.forEach(l => {
        if (balls[i].isInside(l)) {
          balls[i].drag(l);
        }
      })



      //Calculate reverse drag
      //if it is in the reverseLiquid. //See above.
      reverseLiquids.forEach(rl => {
        if (balls[i].isInside(rl)) {
          balls[i].drag(rl);
        };
      });

      //Check collides.
      for (let j = 0; j < blocks.length; j++) {
        balls[i].collides(blocks[j]);
      }

      //Update balls.
      balls[i].update();
      balls[i].checkEdges(width, height);

      //Display the balls, liquid, and reverseLiquid.
      balls[i].display(ballC); //Create an array of ballCols and pass in ballCols[x[.]


    } //End for loop.

    //Color is just passed in to reverseLiquid so I can just create another set of sliders.
    //   // SO NICE that I refactored it so that I can do this!!!!

    liquids.forEach((liquid) => {
      liquid.display(liquidC); //Liquid and reverseLiquid should be in the same array. See above?
    })
    reverseLiquids.forEach((reverseLiquid) => {
      reverseLiquid.display(reverseLiquidC);
    })

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].display(blockBorderC);
    }
  } //end of if (run) loop.
} //End of draw loop.


//REMOVED from draw();
// //if (balls[i].isInside(liquid));
// if (mouseIsPressed) {
//   //Replace this with if (isInside) - after I make isInside.
//   balls[i].friction();
// }