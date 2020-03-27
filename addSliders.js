//These are read at the end of setup
//...and whenever the mouse is pressed.
//Can any of these variables go in the function?

let bgSlider;
let bgC;

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

function addSliders() {

  class ColorSlider {

    constructor(name, startColor) {

      let cDiv = document.createElement('div');

      this.name = createP(name);
      this.hue = createSlider(0, 360, startColor.h, 1);
      this.saturation = createSlider(0, 100, startColor.s, 1);
      this.lightness = createSlider(0, 100, startColor.l, 1);
      this.alpha = createSlider(0, 1, startColor.a, 0.01);

      cDiv.appendChild(this.name.elt);
      cDiv.appendChild(this.hue.elt);
      cDiv.appendChild(this.saturation.elt);
      cDiv.appendChild(this.lightness.elt);
      cDiv.appendChild(this.alpha.elt);
      document.body.appendChild(cDiv); //Create a specific div in the html to append this to?

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

  }
 
  //The class slider does not need to be in this function (maybe be imported.)
  //addSliders can take a big color object to start and then the constructor calls below can be passed
  //the individuals color properties.


  bgSlider = new ColorSlider('Background Color', bgStartColor);
  ballSlider = new ColorSlider('Ball Color', ballStartColor);
  liquidSlider = new ColorSlider('Liquid Color', liquidStartColor);
}

function readSliders() {
  //These variables are the ones which are accessed when .display() is called.
  bgC = bgSlider.readSlider();
  ballC = ballSlider.readSlider();
  liquidC = liquidSlider.readSlider();

}