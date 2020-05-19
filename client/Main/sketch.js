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
let dragCoefficient = 0.01;
const acceleratorCoefficient = 0.01;
const gravityConstant = 0.05;
let gForce = 0.12; //gForce = 0.12
const minMass = 0.5;
const maxMass = 2.0;
//Wind Variables:
const windC = 0.05;
let intensityInput = 50;
let directionInput = 0;

//Grid parameters   
var cnv;
const initWidth = 1000;
const initHeight = 800;
const minSize = 50;

//Interface variables
let infoPopup = false;
var drawButtonOn = false;
var removeButtonOn = false;
let zenMode = false;
let fullScreen = false;
var buttons = [];
var run = true;
var scl;

function initializeCanvas(startWidth, startHeight, calcScale) {
  //Remove any canvas children in the canvasContainer.

  scl = calcScale();
  cnv = createCanvas(startWidth * scl, startHeight * scl);

  let currentWidth = startWidth * scl;
  let btns = document.getElementsByClassName("buttons");

  // btns.style.width = currentWidth + "px";

  //cnv = createCanvas(startWidth, startHeight);
  let container = document.getElementById("canvasContainer");
  container.appendChild(cnv.elt);
}

function createResizeListener() {
  var resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(
      initializeCanvas(initWidth, initHeight, setScale),
      500
    );
    if (run === false) {
      drawElementsDuringSetup()
    }
  });
  //initializeCanvas(initWidth, initHeight, setScale);
  //Add the setTimeout trick in here.
}

///////SETUP///////


function setup() {

  colorMode(HSB);

  //setup canvas.
  initializeCanvas(initWidth, initHeight, setScale);
  createResizeListener();


  const urlParams = new URLSearchParams(window.location.search)
  savedZib = urlParams.get('savedZib');
  console.log(savedZib);

  let zibState = defaultObject2;

  if (savedZib) {
    zibState = loadData(savedZib);
    console.log("zibState in sketch(): ", zibState);
  }





  initializeObjects(defaultObject2);
  //Initialize the interface.
  makeButtons();
  createController();
  //Read the initial color values from the controller.
  readController();

}