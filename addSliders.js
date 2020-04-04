//These are read at the end of setup
//...and whenever the mouse is pressed.
//Can any of these variables go in the function?

let bgSlider;
let bgC;
let tempBG;



let ballSlider = {};
let ballC;

let liquidSlider = {};
let liquidC;

//Create 'presets' and pass them into the ColorSlider constructor.
//Add these into an object with name: 'classType.' - probably. Name is the name as passed in.
//Can these got in the function addSliders()?  --yes, I think so? 
//Make addSliders so that it can use these defaults or have another color object passed in.
const bgStartColor = {
  h: 230,
  s: 35,
  l: 35,
  a: 1.0
}

const ballStartColor = {
  h: 100,
  s: 35,
  l: 100,
  a: 0.5
}

const liquidStartColor = {
  h: 0,
  s: 62,
  l: 80,
  a: 0.5
}

const reverseLiquidStartColor = {
  h: 194,
  s: 94,
  l: 49,
  a: 0.6
}

const blockStartColor = {
  h: 194,
  s: 94,
  l: 49,
  a: 0.6
}

const blockBorderStartColor = {
  h: 90,
  s: 240,
  l: 120,
  a: 1
}

let ballColors = [];



//console.log(initBallColors);

function addSliders() {

  class ColorSlider {

    constructor(name, startColor, quantity) {
      //this.objSelector = createSelect();
      //console.log(this.objSelector.elt);
      //Create DIV
      let cDiv = document.createElement('div');
      this.name = createP(name);

      //Creates all of the option elements and appends them to the select element.

      cDiv.appendChild(this.name.elt);


      //Create an array of DIVS here, on for each item in the array. 

      this.hue = createSlider(0, 360, startColor.h, 1);
      this.saturation = createSlider(0, 100, startColor.s, 1);
      this.lightness = createSlider(0, 100, startColor.l, 1);
      this.alpha = createSlider(0, 1, startColor.a, 0.01);

      cDiv.appendChild(this.hue.elt);
      cDiv.appendChild(this.saturation.elt);
      cDiv.appendChild(this.lightness.elt);
      cDiv.appendChild(this.alpha.elt);

      let sliderContainer1 = document.getElementById('sliderContainer5');
      cDiv.classList.add('sliderGroup');
      //
      sliderContainer1.appendChild(cDiv); //Create a specific div in the html to append this to?
      //


      //Move this into a separate method.
      //return the div so that I can control when/where it is displayed in a separate function?  (Probably...?)
    }

    readSlider() {
      let newC = color(this.hue.value(),
        this.saturation.value(),
        this.lightness.value(),
        this.alpha.value());

      return newC;
    }


    createDimmed() {
      const dimAmt = 15;
      let newSaturation = this.saturation.value();

      let newC = color(this.hue.value(),
        newSaturation - dimAmt,
        this.lightness.value(),
        this.alpha.value());

      return newC;
    }

  } //End of Class ColorSlider.

  // The class slider does not need to be in this function (maybe be imported.)
  // addSliders can take a big color object to start and then the constructor calls below can be passed
  // the individuals color properties.


  bgSlider = new ColorSlider('Background Color', bgStartColor, 1);

  ballSlider = new ColorSlider('Ball Color', ballStartColor, qty);
  //ballSlider = new ColorSlider('Ball Color', initBallColors, initBallColors.length);

  liquidSlider = new ColorSlider('Liquid Color', liquidStartColor, 1);
  reverseLiquidSlider = new ColorSlider('Accelerator Color', reverseLiquidStartColor, 1);
  blockSlider = new ColorSlider('Block Color', blockStartColor, 1);
  blockBorderSlider = new ColorSlider('Block Border Color', blockBorderStartColor, 1);
}

function readSliders() {
  //These variables are the ones which are accessed when .display() is called.
  bgC = bgSlider.readSlider();
  ballC = ballSlider.readSlider();

  liquidC = liquidSlider.readSlider();
  reverseLiquidC = reverseLiquidSlider.readSlider();
  blockC = blockSlider.readSlider();
  blockBorderC = blockBorderSlider.readSlider();

  //Create Sliders as initialized from an array and updated on individual balls.
  //ballColors = ballSlider.readSliderArray();

  //Dimmed Background
  //drawElementsDuringSetup is at the bottom of listeners();
  tempBG = bgSlider.createDimmed();
  tempBallC = ballSlider.createDimmed();
  tempLiquidC = liquidSlider.createDimmed();
  tempReverseLiquidC = reverseLiquidSlider.createDimmed();
  tempBlockC = blockSlider.createDimmed();
  tempBlockBorderC = blockBorderSlider.createDimmed();

}