let ballColorsArray = [];
let ballSlidersArray = [];

let initBallColors = [{
    h: 100,
    s: 35,
    l: 100,
    a: 0.5
  },
  {
    h: 200,
    s: 35,
    l: 100,
    a: 0.5
  },
  {
    h: 300,
    s: 35,
    l: 100,
    a: 0.5
  }
];

var currentSelection;

function colorSliders(name, initialValues, quantity) {
  //Create Div,
  //Create a heading with the name in it.
  //Create Selection Slider (There needs to be a name in it to attach an event listener (Using the name above);
  //Use name to assign an id to this selection field.
  //Create a set of sliders for each existing object.
  //Use name to assign an id to the sliders.
  //Assign initial values.

  //The values need to be assigned to the sliders and also returned from the sliders.

  //Create div and add name:

  let label = name.split(" ")[0];
  // let classLabel = label[0];

  //add the id to the div.    id = name + 'Div';   === ballDiv
  let sliderDiv = document.createElement("div");
  sliderDiv.classList.add(label + "Div");
  let nameElt = document.createElement("p");
  nameElt.textContent = name;
  sliderDiv.appendChild(nameElt);

  // Create the selection and four option elements options:
  let selections = document.createElement("select");
  selections.setAttribute("id", label + "Select");

  let optionAll = document.createElement("option");


  let blankOption = document.createElement("option");
  blankOption.value = "-";
  blankOption.textContent = "-";
  selections.appendChild(blankOption);

  let allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All";

  selections.appendChild(allOption);

  for (let i = 0; i < quantity; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selections.appendChild(option);
  }

  sliderDiv.appendChild(selections);

  let slideContainer = document.createElement("div");
  slideContainer.setAttribute("id", label + "Sliders");

  //Add HUE slider.
  let h = document.createElement("input");
  h.type = "range";
  h.min = "0";
  h.max = "360";
  h.value = initialValues.h;
  h.classList.add("slider");
  h.setAttribute("id", "hSlider");

  //Create SLIDE CONTAINER with the HSLA sliders.
  slideContainer.appendChild(h);

  //Add SATURATION slider.
  let s = document.createElement("input");
  s.type = "range";
  s.min = "0";
  s.max = "100";
  s.value = initialValues.s;
  s.classList.add("slider");
  s.setAttribute("id", "sSlider");

  slideContainer.appendChild(s);

  //Add LIGHTNESS slider.
  let l = document.createElement("input");
  l.type = "range";
  l.min = "0";
  l.max = "100";
  l.value = initialValues.l;
  l.classList.add("slider");
  l.setAttribute("id", "lSlider");

  slideContainer.appendChild(l);

  //Add ALPHA slider.
  let a = document.createElement("input");
  a.type = "range";
  a.min = "0";
  a.max = "1";
  a.step = "0.01"
  a.value = initialValues.a;
  a.classList.add("slider");
  a.setAttribute("id", "aSlider");

  this.h = h.value;
  this.s = s.value;
  this.l = l.value;
  this.a = a.value;

  slideContainer.appendChild(a);

  sliderDiv.appendChild(slideContainer);
  console.log(sliderDiv);
  return sliderDiv;
} //End of ColorSliders.


function setColors(hslaArray) {
  let tempColArray = [];

  hslaArray.forEach(c => {
    let pColor = color(c.h, c.s, c.l, c.a);
    tempColArray.push(pColor);
  });

  return tempColArray;
}



function addColorSliders() {
  //create a new instance of color sliders for each type of object
  //ballColorSliders = new ColorSliders
  //Break this out into a separate function addColorSlider.
  let ballSliderDiv = colorSliders(
    "Ball Colors",
    initBallColors[0],
    initBallColors.length
  );

  //Create blockSliderObject.
  //Create dragSliderObject.
  //Create acceleratorSliders

  //Put ballSliderObject in container1.
  let container1 = document.getElementById("sliderContainer1");
  container1.appendChild(ballSliderDiv);


  ballColorsArray = setColors(initBallColors);
  console.log("Ball Colors Array", ballColorsArray);

  // for (let i = 0; i < initBallColors.length; i++) {
  //   let c = initBallColors[i];
  //   let pColor = color(c.h, c.s, c.l, c.a);
  //   ballColorsArray.push(pColor);
  //   console.log(ballColorsArray);
  // }
}

function modifySliders(newColor) {
  //How do I select an element which is inside another element.
  //Also, I can put the colorSliders function in a different file since it is a freestanding function.
  //How do I change the value when the Option is selcted.
  let hSlider = document.getElementById("hSlider");
  let sSlider = document.getElementById("sSlider");
  let lSlider = document.getElementById("lSlider");
  let aSlider = document.getElementById("aSlider");

  hSlider.value = newColor.h;
  sSlider.value = newColor.s;
  lSlider.value = newColor.l;
  aSlider.value = newColor.a;
}

function readSelector() {
  //Pass in the id for each type of object and call this one four times.
  //Pass in the ClassName based on which object we are reading.
  //This needs to be robust enough to work for each object type:
  let selection = document.getElementById("BallSelect"); //!!!!!!!!!!!!!!!!
  selection.addEventListener("change", () => {
    console.log(selection.value);
    if (selection.value === "All") {
      modifySliders(initBallColors[0]);
    } else {
      modifySliders(initBallColors[selection.value]);
      //currrentSelection = selection.value;
    }
  });
}


function readColorSliders(selection, hslaArray, colorArray) {
  //Needs the hsla array and the color array as arguments.
  selection.addEventListener("change", () => {
    // if (selection.value === "All") {
    //   console.log("All:", selection.value);
    //   modifySliders(initBallColors[0]);
    //   let hSlider = document.getElementById("hSlider");
    //   hSlider.addEventListener("input", () => {
    //     initBallColors[0].h = hSlider.value;
    //     let c = initBallColors[0];
    //     newColor = color(c.h, c.s, c.l, c.a);

    //     // ballColorsArray[0] = newColor;
    //     console.log(ballColorsArray);

    //   });

    //   let sSlider = document.getElementById("sSlider");
    //   sSlider.addEventListener("input", () => {
    //     initBallColors[selection.value].s = sSlider.value;
    //     let c = initBallColors[0];
    //     newColor = color(c.h, c.s, c.l, c.a);
    //     // ballColorsArray[0] = newColor;

    //   });

    //   let lSlider = document.getElementById("lSlider");
    //   lSlider.addEventListener("input", () => {
    //     initBallColors[0].l = lSlider.value;
    //     let c = initBallColors[0];
    //     newColor = color(c.h, c.s, c.l, c.a);
    //     // ballColorsArray[0] = newColor;

    //   });

    //   let aSlider = document.getElementById("aSlider");
    //   aSlider.addEventListener("input", () => {
    //     initBallColors[0].a = aSlider.value;
    //     let c = initBallColors[0];
    //     //I need to google the options for <input> sliders to set the increment
    //     //to something smaller than one (1). But setting min/max to 0-100 and dividing by 100
    //     //is a quick and dirty way to accomplish this.
    //     newColor = color(c.h, c.s, c.l, c.a / 100);
    //     // ballColorsArray[0] = newColor;

    //   });

    //I need to do this as below also.
    // } else {

    //Consolidate this into one function and run four times.

    modifySliders(initBallColors[selection.value]);
    //Put the passed in selector into the get elementsById argument.
    let hSlider = document.getElementById("hSlider");
    hSlider.addEventListener("input", () => {
      initBallColors[selection.value].h = hSlider.value;
      let c = initBallColors[selection.value];
      newColor = color(c.h, c.s, c.l, c.a);
      ballColorsArray[selection.value] = newColor;
    });

    let sSlider = document.getElementById("sSlider");
    sSlider.addEventListener("input", () => {
      initBallColors[selection.value].s = sSlider.value;
      let c = initBallColors[selection.value];
      newColor = color(c.h, c.s, c.l, c.a);
      ballColorsArray[selection.value] = newColor;
    });

    let lSlider = document.getElementById("lSlider");
    lSlider.addEventListener("input", () => {
      initBallColors[selection.value].l = lSlider.value;
      let c = initBallColors[selection.value];
      newColor = color(c.h, c.s, c.l, c.a);
      ballColorsArray[selection.value] = newColor;
    });

    let aSlider = document.getElementById("aSlider");
    aSlider.addEventListener("input", () => {
      initBallColors[selection.value].a = aSlider.value;
      let c = initBallColors[selection.value];

      let aNum = parseFloat(c.a);
      //I don't know why c.a is returning a string right here.
      //Maybe something to do with how I'm using step.
      //But using parseFloat seems like
      //an acceptable work-around for now.
      newColor = color(c.h, c.s, c.l, aNum);
      ballColorsArray[selection.value] = newColor;

    });

    //initBallColors[selection.value].h = hSlider.value;
    //console.log(initBallColors[selection.value].h);
    //currrentSelection = selection.value;
    // }
  });

}


function readAllSliders() {
  //read the sliders. and assign the correct values to ballColorsArray. (These are p5 values.);
  //The sliders do not incorporate any p5 functionality or use HSLA color. They only select values.
  //These values are used to assign values to the ballColorsArrray.

  let sel = document.getElementById("BallSelect"); //!!!!!!!!!!!!!!!!
  readColorSliders(sel, initBallColors, ballColorsArray);


  // modifySliders(initBallColors[0]);
  //let itemNumber = document.getElementById("BallSelect");
  //console.log("objectNumber", sel.value);
}