function addBalls() {
  const defaultBallColor = {
    h: random(360),
    s: 35,
    l: 100,
    a: 0.5
  };

  let ball = new Mover(random(width), height / 5, defaultBallColor);

  balls.push(ball);
  qty++;
  createController();
}

//If this is accomplished with a modifyOptions function then it does not
//...and should not happen here aat all.
function addOption(elt, number) {
  let newOption = document.createElement("option");
  newOption.value = number;
  newOption.textContent = number + 1;
  elt.appendChild(newOption);
}

function removeBalls() {
  balls.pop();
  qty--;
  createController();
}

function addDragBox() {

  createController();

  // dragSelections = document.getElementById("DragSelect");
  // let dragCount = liquids.length - 1;
  // addOption(dragSelections, dragCount);
}

function addAccelBox() {
  createController();

  // accelSelections = document.getElementById("AcceleratorSelect");
  // let accelCount = reverseLiquids.length - 1;
  // addOption(accelSelections, accelCount);
}


function addBlock() {
  createController();
  // blockSelections = document.getElementById("BlockSelect");
  // let blockCount = blocks.length - 1;
  // addOption(blockSelections, blockCount);
}



// function addBlock() {
//   //init drag colors
//   //dragColorsArray

//   let defaultBlockColor = {
//     h: 20,
//     s: 94,
//     l: 49,
//     a: 0.6
//   };

//   let d = defaultBlockColor;

//   let defaultColor = color(d.h, d.s, d.l, d.a);

//   initBlockColors[initBlockColors.length] = initBlockColors[initBlockColors.length - 1] || defaultBlockColor;
//   blockColorsArray[blockColorsArray.length] = blockColorsArray[blockColorsArray.length - 1] || defaultColor;

//   //dragColorsArray[dragColorsArray.length] = dragColorsArray[dragColorsArray.length - 1] || defaultColor;

//   blockSelections = document.getElementById("BlockSelect");
//   let blockCount = blockColorsArray.length - 1;
//   addOption(blockSelections, blockCount);
// }