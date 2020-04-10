function addColorSliders2() {
  //Refactor this so that I can add different type of initialization conditions.
  //And get the thing ready with multiple defaults and have stuff loaded from a database.


  let ballSliderDiv = colorSliders(
    "Ball",
    initBallColors[0],
    initBallColors.length
  );

  let dragSliderDiv = colorSliders(
    "Drag",
    initDragColors[0],
    initDragColors.length
  );

  let accelSliderDiv = colorSliders(
    "Accelerator",
    initAccelColors[0],
    initAccelColors.length
  );

  let blockSliderDiv = colorSliders(
    "Block",
    initBlockColors[0],
    initBlockColors.length
  );


  let container2 = document.getElementById("sliderContainer2");
  container2.appendChild(dragSliderDiv);

  let container3 = document.getElementById("sliderContainer3");
  container3.appendChild(blockSliderDiv);

  let container4 = document.getElementById("sliderContainer4");
  container4.appendChild(accelSliderDiv);

  let container5 = document.getElementById("sliderContainer5");
  container4.appendChild(ballSliderDiv);



  //Really need to figure out a better workaround for this.
  let bSel = document.getElementById('BlockSelect');
  bSel.removeChild(bSel.lastChild);
}


function readColorSliders2(selection, slideSelector, objects) {
  //Needs the hsla array and the color array as arguments.
  //I need a field here which is modifyNumberOption.
  //console.log(selection.value);

  console.log('modify sliders');
  console.log("Objects", objects);
  // modifySliders2(objects[0].color);

  selection.addEventListener("change", () => {
    //Selection is the select element where selection.value is the object's number.
    //Even if the selection element does not change I still need the selection.value.
    //It could (should?) still be passed in to work that but it would be the same regardless fo object.


    //Sets the sliders equal to the current color setting.

    let hSlider = document.querySelector(slideSelector + " .hSlider");

    hSlider.addEventListener("input", () => {
      objects[selection.value].color.h = hSlider.value;
      //I can't reference liquid directly.
      //I have to pass it in as an argument.
    });


    //Move all of the querySelector lines up and put them together.
    let sSlider = document.querySelector(slideSelector + " .sSlider");
    sSlider.addEventListener("input", () => {
      objects[selection.value].color.s = sSlider.value;
    });

    let lSlider = document.querySelector(slideSelector + " .lSlider");
    lSlider.addEventListener("input", () => {
      objects[selection.value].color.l = lSlider.value;

    });

    let aSlider = document.querySelector(slideSelector + " .aSlider");
    aSlider.addEventListener("input", () => {
      objects[selection.value].color.a = aSlider.value;
    });

  });
}



function readAllSliders2() {



  //If I put all the color sliders in one div with an object select-option element.
  //Then I do not need the code below. but I need to call readColorSliders with
  //the currently selected object.
  //
  //let Selection = document.getElementId("objSelect");
  //let objTyp = selection.value;  
  //Select case:
  // Drag:
  //  readColorSliders2(selection, ".DragSliders", liquids);
  // Accelerator:
  //  readColorSliders2(selection, ".AcceleratorSliders", reverseLiquids);
  // Balls:
  //  readColorSliders2(selection, ".ballSliders", balls);
  // Blocks:
  //  readColorSliders2(selection, ".blockSliders", blocks);
  //
  //Put the new all-encompassing slider Card into a Div just below the Canvas and float: right:
  //


  let dragSel = document.getElementById("DragSelect");
  readColorSliders2(dragSel, ".DragSliders", liquids);

  let accelSel = document.getElementById("AcceleratorSelect");
  readColorSliders2(accelSel, ".AcceleratorSliders", reverseLiquids);

  let ballSel = document.getElementById("BallSelect");
  readColorSliders2(ballSel, ".BallSliders", balls);

  let blockSel = document.getElementById("BlockSelect"); //!!!!!!!!!!!!!!!!
  readColorSliders2(blockSel, ".BlockSliders", blocks);





}

// function createController() {
//   //modify the numbers for the lastSelected object number of that type.
//   //..create a variable for each - could I put this in the class?
//   //modify the sliders for the selected number.
//   //..this is already happening in readColorSliders2();
//   //read the sliders

//   function addOptions(objects) {

//     let numberSelector = document.getElementById("numberSelector");

//     while (numberSelector.options.length > 0) {
//       numberSelector.innerHTML = "";
//       numberSelector.options.remove(0);
//     }
//     // console.log("Number Selector", numberSelector);

//     // console.log(object);
//     for (let i = 0; i < objects.length; i++) {
//       let option = new Option(i + 1, i);
//       numberSelector.appendChild(option);
//     }
//   }

//   addOptions(balls);


//   let objectSelection = document.getElementById("objectSelector");

//   let numberSelector = document.getElementById('numberSelector');

//   objectSelection.addEventListener('change', () => {

//     let obj = objectSelection.value;
//     let objectArray = [];

//     if (obj === "Balls") {
//       addOptions(balls);
//       objectArray = balls;
//       //readColorSliders2(numberSelector, "#combinedSliders", balls);
//     } else if (obj === "Drag") {
//       addOptions(liquids);
//       objectArray = liquids;
//       //readColorSliders2(numberSelector, "#combinedSliders", liquids);
//     } else if (obj === "Accelerator") {
//       addOptions(reverseLiquids);
//       objectArray = reverseLiquids;
//       //readColorSliders2(numberSelector, "#combinedSliders", reverseLiquids);
//     } else if (obj === "Blocks") {
//       addOptions(blocks);
//       objectArray = blocks;
//       //readColorSliders2(numberSelector, "#combinedSliders", blocks);
//     }

//     console.log("Balls", balls);

//     // readColorSliders2(numberSelector, "#combinedSliders", balls);




//   })



//   // let blockSel = document.getElementById("BlockSelect"); //!!!!!!!!!!!!!!!!
//   // readColorSliders2(blockSel, ".BlockSliders", blocks);





//   //Call readSliders2();

// } //End of createController.