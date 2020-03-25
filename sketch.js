//Zone Moment by Elwyn Palmerton

//Objects: Balls, liquids/reverseLiquid     //Add Blocks.
const balls = [];
const qty = 3;
let liquid, reverseLiquid;


//Force variabes;
let xOff = 0;
let friction; //Can this be a variable inside of the mover class???
const windC = 0.1;
const dragCoefficient = 0.005;
const gForce = 0.12;

//Grid parameters   --------  I need to re-think it this is how I want this to work.
const w = 10; //Width of grid in terms of square units.
const h = 8; //height of grid in terms of square units aka 8 x 10 grid.
const gridUnit = 100;

//New vars from other template - move after intgration.
var drawButtonOn = false;
var run = false;
var blocks = [];

function setup() {
  colorMode(HSB);
  createCanvas(1000, 800);

  //Create all of the balls.
  for (let i = 0; i < qty; i++) {
    let ball = new Mover(random(width), height / 5);
    balls.push(ball);
  }

  //This needs to be changed so that the liquids are added manually in setup.
  //...or initiated as defaults...
  //...or initiated as defaults automatically and then reset if the user chooses to start over.
  liquid = new Liquid(gridUnit * 2, gridUnit * 2, gridUnit * 1.5, gridUnit * 1.5, dragCoefficient);
  reverseLiquid = new Liquid(gridUnit * 7, gridUnit * 4, gridUnit * 1.5, gridUnit * 1.5, -dragCoefficient);


  let brk = document.createElement('br');
  document.body.appendChild(brk);
  makePlayButton();
  makeBlockButton();

  addSliders();
  readSliders();
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
      if (balls[i].isInside(liquid)) {
        balls[i].drag(liquid);
      };

      //Calculate reverse drag if it is in the reverseLiquid.   //See above.
      if (balls[i].isInside(reverseLiquid)) {
        balls[i].drag(reverseLiquid);
      };

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
    liquid.display(liquidC); //Liquid and reverseLiquid should be in the same array. See above?
    reverseLiquid.display(liquidC);

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