//Watch out for this if I change the way that the thing is loaded with defaults.
// let bSel = document.getElementById('BlockSelect');
// bSel.removeChild(bSel.lastChild);

let ballColorsArray = [];
//let ballSlidersArray = [];

//let dragSlidersArray;
let dragColorsArray = [];
let blockColorsArray = [];
let accelColorsArray = [];

let initDragColors = [{
  h: 0,
  s: 62,
  l: 80,
  a: 0.5,
}, ];

let initAccelColors = [{
  h: 194,
  s: 94,
  l: 49,
  a: 0.6
}, ];

//const initBlockColors = [];

const initBlockColors = [{
  h: 90,
  s: 100,
  l: 100,
  a: 1.0,
}, ];

let initBallColors = [{
    h: 100,
    s: 35,
    l: 100,
    a: 0.5,
  },
  {
    h: 200,
    s: 35,
    l: 100,
    a: 0.5,
  },
  {
    h: 300,
    s: 35,
    l: 100,
    a: 0.5,
  },
];

function addColorSliders() {
  //create a new instance of color sliders for each type of object
  //ballColorSliders = new ColorSliders
  //Break this out into a separate function addColorSlider.
  let ballSliderDiv = colorSliders(
    "Ball Colors",
    initBallColors[0],
    initBallColors.length
  );

  let dragSliderDiv = colorSliders(
    "Drag Colors",
    initDragColors[0],
    initDragColors.length
  );

  let accelSliderDiv = colorSliders(
    "Accelerator Colors",
    initAccelColors[0],
    initAccelColors.length
  );

  let blockSliderDiv = colorSliders(
    "Block Colors",
    initBlockColors[0],
    initBlockColors.length
  );

  // document.getElementById(ballSliderDiv + " " + hSlider);

  //Create blockSliderObject.
  //Create dragSliderObject.
  //Create acceleratorSliders

  //Put ballSliderObject in container1.
  let container1 = document.getElementById("sliderContainer1");
  container1.appendChild(ballSliderDiv);

  let container2 = document.getElementById("sliderContainer2");
  container2.appendChild(dragSliderDiv);

  let container3 = document.getElementById("sliderContainer3");
  container3.appendChild(blockSliderDiv);

  let container4 = document.getElementById("sliderContainer4");
  container4.appendChild(accelSliderDiv);

  //Watch out for this if I change the way that the thing is loaded with defaults.
  // let bSel = document.getElementById('BlockSelect');
  // bSel.removeChild(bSel.lastChild);
  removeBlocks();

  ballColorsArray = setColors(initBallColors);
  dragColorsArray = setColors(initDragColors);
  blockColorsArray = setColors(initBlockColors);
  accelColorsArray = setColors(initAccelColors);

}



function readColorSliders(selection, hslaArray, colorsArray, slideSelector) {
  //Needs the hsla array and the color array as arguments.
  selection.addEventListener("change", () => {
    //modifySliders(initBallColors[selection.value]);
  
    let hSlider = document.querySelector(slideSelector + " .hSlider");


    hSlider.addEventListener("input", () => {
      hslaArray[selection.value].h = hSlider.value; //liquids[index].h = hSlider.value;
                //index here would be selection.value; ........I think?
                
      let c = hslaArray[selection.value]; //Then I don't need to do this.
      newColor = color(c.h, c.s, c.l, c.a); //Or this
      colorsArray[selection.value] = newColor; //Or this.
    });

    let sSlider = document.querySelector(slideSelector + " .sSlider");
    sSlider.addEventListener("input", () => {
      hslaArray[selection.value].s = sSlider.value;
      let c = hslaArray[selection.value];
      newColor = color(c.h, c.s, c.l, c.a);
      colorsArray[selection.value] = newColor;
    });

    let lSlider = document.querySelector(slideSelector + " .lSlider");
    lSlider.addEventListener("input", () => {
      hslaArray[selection.value].l = lSlider.value;
      let c = hslaArray[selection.value];
      newColor = color(c.h, c.s, c.l, c.a);
      colorsArray[selection.value] = newColor;
    });

    let aSlider = document.querySelector(slideSelector + " .aSlider");
    aSlider.addEventListener("input", () => {
      hslaArray[selection.value].a = aSlider.value;
      let c = hslaArray[selection.value];

      let aNum = parseFloat(c.a);
      //I don't know why c.a is returning a string right here.
      //Maybe something to do with how I'm using step.
      //But using parseFloat seems like
      //an acceptable work-around for now.
      newColor = color(c.h, c.s, c.l, aNum);
      colorsArray[selection.value] = newColor;
    });

    //initBallColors[selection.value].h = hSlider.value;
    //console.log(initBallColors[selection.value].h);
    //currrentSelection = selection.value;
    // }
  });
  //return colorsArray;
}

function readAllSliders() {
  //read the sliders. and assign the correct values to ballColorsArray. (These are p5 values.);
  //The sliders do not incorporate any p5 functionality or use HSLA color. They only select values.
  //These values are used to assign values to the ballColorsArrray.

  let sel = document.getElementById("BallSelect"); //!!!!!!!!!!!!!!!!
  readColorSliders(sel, initBallColors, ballColorsArray, ".BallSliders");
  //Should this just return a value which is assigned to ballColorsArrray?????

  let dragSel = document.getElementById("DragSelect"); //!!!!!!!!!!!!!!!!
  readColorSliders(dragSel, initDragColors, dragColorsArray, ".DragSliders");

  let blockSel = document.getElementById("BlockSelect"); //!!!!!!!!!!!!!!!!
  readColorSliders(
    blockSel,
    initBlockColors,
    blockColorsArray,
    ".BlockSliders"
  );

  let accelSel = document.getElementById("AcceleratorSelect"); //!!!!!!!!!!!!!!!!
  readColorSliders(accelSel, initAccelColors, accelColorsArray, ".AcceleratorSliders");

  //When does dragColorsArray get assigned initially??
  // modifySliders(initBallColors[0]);
  //let itemNumber = document.getElementById("BallSelect");
  //console.log("objectNumber", sel.value);
}