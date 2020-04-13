function addOptions(objects) {

  let numberSelector = document.getElementById("numberSelector");

  while (numberSelector.options.length > 0) {
    numberSelector.innerHTML = "";
    numberSelector.options.remove(0);
  }
  // console.log("Number Selector", numberSelector);

  // console.log(object);
  for (let i = 0; i < objects.length; i++) {
    let option = new Option(i + 1, i);
    numberSelector.appendChild(option);
  }
}


function createController() {
  //modify the numbers for the lastSelected object number of that type.
  //..create a variable for each - could I put this in the class?
  //modify the sliders for the selected number.
  //..this is already happening in readColorSliders2();
  //read the sliders

  //addOptions(balls);
  // modifySliders2(balls[0].color);

  let objectSelect = document.getElementById('objectSelector');
  let numberSel = document.getElementById('numberSelector');



  let obj = objectSelect.value;
  let objArray = getObjectArray(obj);
  addOptions(objArray);

  if (objArray.length > 0) {
    console.log(objArray[numberSel.value].color);
    modifySliders2(objArray[numberSel.value].color);
  } else {
    modifySliders2();
  }



  // objectSelection.addEventListener('change', () => {

  //   let obj = objectSelection.value;

  //   let objArray = getObjectArray(obj);
  //   addOptions(objArray);
  //   if (objArray.length > 0) {
  //     modifySliders2(objArray[numberSelector.value].color);
  //   }

  // })


} //End of createController.


function readSliders3(objectNumber) {
  //console.log("objectNumber in readSliders3", objectNumber);

  let numberSelector = document.getElementById('numberSelector');
  let objectSelector = document.getElementById('objectSelector');


  let hSlider = document.querySelector(".combinedSliders .hSlider");

  hSlider.addEventListener("input", () => {
    objectNumber = numberSelector.value;
    objectNumber = numberSelector.value;
    let objects = getObjectArray(objectSelector.value);
    objects[objectNumber].color.h = hSlider.value;
  });


  let sSlider = document.querySelector(".combinedSliders .sSlider");

  sSlider.addEventListener("input", () => {
    objectNumber = numberSelector.value;
    objectNumber = numberSelector.value;
    let objects = getObjectArray(objectSelector.value);
    objects[objectNumber].color.s = sSlider.value;
  });

  let lSlider = document.querySelector(".combinedSliders .lSlider");

  lSlider.addEventListener("input", () => {
    objectNumber = numberSelector.value;
    objectNumber = numberSelector.value;
    let objects = getObjectArray(objectSelector.value);
    objects[objectNumber].color.l = lSlider.value;
  });

  let aSlider = document.querySelector(".combinedSliders .aSlider");

  aSlider.addEventListener("input", () => {
    objectNumber = numberSelector.value;
    objectNumber = numberSelector.value;
    let objects = getObjectArray(objectSelector.value);
    objects[objectNumber].color.a = aSlider.value;
  });

  //Remove event listeners down here.
}

function readController() {
  //Gets the type of object being modified.
  let objectSelector = document.getElementById('objectSelector');
  let objects = getObjectArray(objectSelector.value);

  //Gets the number of the object
  let objectNumber = 0;
  objectNumber = numberSelector.value;

  readSliders3(objectNumber, objects)

}




function modifySliders2(newColor) {

  if (newColor === undefined) {
    newColor = {
      h: 180,
      s: 50,
      l: 50,
      a: .5
    }
  }

  console.log('In modify Sliders');
  //How do I select an element which is inside another element.
  //Also, I can put the colorSliders function in a different file since it is a freestanding function.
  //How do I change the value when the Option is selcted.
  let hSlider = document.querySelector(".combinedSliders .hSlider");
  let sSlider = document.querySelector(".combinedSliders .sSlider");
  let lSlider = document.querySelector(".combinedSliders .lSlider");
  let aSlider = document.querySelector(".combinedSliders .aSlider");

  hSlider.value = newColor.h; //modifySliders should set the sliders equal to color on each object.
  sSlider.value = newColor.s;
  lSlider.value = newColor.l;
  aSlider.value = newColor.a;
}

function updateSliders() {

  createController();

  let objectSelector = document.getElementById('objectSelector');

  let objects = getObjectArray(objectSelector.value);

  let objectNumber = 0;
  objectNumber = numberSelector.value;
  if (objects.length > 0) {
    modifySliders2(objects[objectNumber].color);
  } else {
    modifySliders2();
  }

}

function updateSliders2() {

  //createController();

  let objectSelector = document.getElementById('objectSelector');

  let objects = getObjectArray(objectSelector.value);

  let objectNumber = 0;
  objectNumber = numberSelector.value;
  if (objects.length > 0) {
    modifySliders2(objects[objectNumber].color);
  } else {
    modifySliders2();
  }

}


function getObjectArray(obj) {
  let objArray = [];
  if (obj === "Balls") {
    objArray = balls;
    //readColorSliders2(numberSelector, "#combinedSliders", balls);
  } else if (obj === "Drag") {
    objArray = liquids;
    //readColorSliders2(numberSelector, "#combinedSliders", liquids);
  } else if (obj === "Accelerator") {
    objArray = reverseLiquids;
    //readColorSliders2(numberSelector, "#combinedSliders", reverseLiquids);
  } else if (obj === "Blocks") {
    objArray = blocks;
    //readColorSliders2(numberSelector, "#combinedSliders", blocks);
  }
  return objArray;
}