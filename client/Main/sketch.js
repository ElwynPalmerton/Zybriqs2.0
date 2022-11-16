//Zibriqs by Elwyn Palmerton

const balls = [];
var qty = 3;
const reverseLiquids = [];
const liquids = [];
const backgroundArray = [];
var blocks = [];
let objectType;

//Display variables:
const dimAmt = 30;

//Force variabes;
let xOff = 0;
let friction;
let dragCoefficient = 0.01;
const acceleratorCoefficient = 0.01;
const gravityConstant = 0.05;
let gForce = 0.12;
const minMass = 0.5;
const maxMass = 2.0;
const windC = 0.05;
let intensityInput = 50;
let directionInput = 0;

//Grid parameters
var cnv;
const initWidth = 1000;
const initHeight = 800;
const minSize = 24;

//Interface variables
let infoPopup = true;
var drawButtonOn = false;
var removeButtonOn = false;
let zenMode = false;
let fullScreen = false;
var buttons = [];
var run = true;
var scl;
var gridActive = false;

function initializeCanvas(startWidth, startHeight, calcScale) {
  scl = calcScale();
  cnv = createCanvas(startWidth * scl, startHeight * scl);
  let currentWidth = startWidth * scl;
  let btns = document.getElementsByClassName("buttons");
  let container = document.getElementById("canvasContainer");
  container.appendChild(cnv.elt);
}

function createResizeListener() {
  document.addEventListener("fullscreenchange", exitHandler);
  document.addEventListener("webkitfullscreenchange", exitHandler);
  document.addEventListener("mozfullscreenchange", exitHandler);
  document.addEventListener("MSFullscreenChange", exitHandler);

  function exitHandler() {
    if (fullScreen === false) {
      fullScreen = true;
    } else if (fullScreen === true) {
      fullScreen = false;
      initializeCanvas(initWidth, initHeight, setScale3);
      if (run === false) {
        drawElementsDuringSetup();
      }
    }
  }
}

function setup() {
  colorMode(HSB);
  initializeCanvas(initWidth, initHeight, setScale3);
  createResizeListener();
  const urlParams = new URLSearchParams(window.location.search);
  savedZib = urlParams.get("savedZib");
  let zibState = Object.assign({}, defaultObject2);

  if (savedZib) {
    let savedZybObject = loadData(savedZib);
    zibState = Object.assign({}, savedZybObject);
  } else {
    loadSessionState();
  }

  initializeObjects(defaultObject2);
  makeButtons();
  createController();
  readController();

  function addSessionUpdateListener() {
    let body = document.body;
    body.addEventListener("mouseup", () => {
      submitSession();
    });
  }
  addSessionUpdateListener();
}
