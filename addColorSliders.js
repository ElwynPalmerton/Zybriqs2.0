function addColorSliders2() {
  //Refactor this so that I can add different type of initialization conditions.
  //And get the thing ready with multiple defaults and have stuff loaded from a database.


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


  let container2 = document.getElementById("sliderContainer2");
  container2.appendChild(dragSliderDiv);

  let container3 = document.getElementById("sliderContainer3");
  container3.appendChild(blockSliderDiv);

  let container4 = document.getElementById("sliderContainer4");
  container4.appendChild(accelSliderDiv);

  let container5 = document.getElementById("sliderContainer5");
  container4.appendChild(ballSliderDiv);



  console.log('in addColorSliders: ', blockSliderDiv);

  //Really need to figure out a better workaround for this.
  let bSel = document.getElementById('BlockSelect');
  bSel.removeChild(bSel.lastChild);
}


function readColorSliders2(selection, slideSelector, objects) {
  //Needs the hsla array and the color array as arguments.
  selection.addEventListener("change", () => {

    modifySliders(initBallColors[selection.value]);

    let hSlider = document.querySelector(slideSelector + " .hSlider");

    hSlider.addEventListener("input", () => {
      objects[selection.value].color.h = hSlider.value;
      //I can't reference liquid directly.
      //I have to pass it in as an argument.
    });

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

  let dragSel = document.getElementById("DragSelect");
  readColorSliders2(dragSel, ".DragSliders", liquids);

  let accelSel = document.getElementById("AcceleratorSelect");
  readColorSliders2(accelSel, ".AcceleratorSliders", reverseLiquids);

  let ballSel = document.getElementById("BallSelect");
  readColorSliders2(ballSel, ".BallSliders", balls);

  let blockSel = document.getElementById("BlockSelect"); //!!!!!!!!!!!!!!!!
  readColorSliders2(blockSel, initBlockColors, blockColorsArray, ".BlockSliders");



}