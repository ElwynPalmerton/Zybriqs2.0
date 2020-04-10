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

  addOptions(balls);
  modifySliders2(balls[0].color);


  let objectSelection = document.getElementById("objectSelector");
  let numberSelector = document.getElementById('numberSelector');

  objectSelection.addEventListener('change', () => {

    let obj = objectSelection.value;

    let objArray = getObjectArray(obj);
    addOptions(objArray);
    modifySliders(objArray[0].color);

  })

  // let blockSel = document.getElementById("BlockSelect"); //!!!!!!!!!!!!!!!!
  // readColorSliders2(blockSel, ".BlockSliders", blocks);
  //let numberSelector = document.getElementById('numberSelector');


  // numberSelector.addEventListener('change', () => {
  //   objectNumber = numberSelector.value;
  //   modifySliders2();
  // })

  //number = 0;
  // readSliders3(objectNumber, balls);

} //End of createController.


function readSliders3(objectNumber, objects) {
  console.log("objectNumber in readSliders3", objectNumber);

  let numberSelector = document.getElementById('numberSelector');
  let hSlider = document.querySelector(".combinedSliders .hSlider");

  hSlider.addEventListener("input", () => {
    objectNumber = numberSelector.value;
    numberSelector.addEventListener('change', () => {
      objectNumber = numberSelector.value;
    })
    objects[objectNumber].color.h = hSlider.value;

  });
}

function readController() {

  let objectNumber = 0;

  let numberSelector = document.getElementById('numberSelector');
  numberSelector.addEventListener('change', () => {

    objectNumber = numberSelector.value;
  })

  let objectSelector = document.getElementById('objectSelector');


  console.log(objectNumber);

  console.log(objectSelector);
  let objects = getObjectArray(objectSelector.value);

  readSliders3(objectNumber, objects)

}


function modifySliders2(newColor) {
  //How do I select an element which is inside another element.
  //Also, I can put the colorSliders function in a different file since it is a freestanding function.
  //How do I change the value when the Option is selcted.
  let hSlider = document.querySelector(".combinedSliders .hSlider");
  let sSlider = document.querySelector(".combinedSliders .sSlider");
  console.log(sSlider);
  let lSlider = document.querySelector(".combinedSliders .lSlider");
  let aSlider = document.querySelector(".combinedSliders .aSlider");

  hSlider.value = newColor.h; //modifySliders should set the sliders equal to color on each object.
  sSlider.value = newColor.s;
  lSlider.value = newColor.l;
  aSlider.value = newColor.a;
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