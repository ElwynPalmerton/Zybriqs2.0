function addBalls() {
  const defaultBallColor = {
    h: 100,
    s: 35,
    l: 100,
    a: 0.5
  };



  let ball = new Mover(random(width), height / 5);
  balls.push(ball);
  qty++;

  //Modify the initialBallColor;
  initBallColors[initBallColors.length] =
    initBallColors[initBallColors.length - 1] || defaultBallColor;
  let d = defaultBallColor;
  let dColor = color(d.h, d.s, d.l, d.a);
  ballColorsArray[ballColorsArray.length] =
    ballColorsArray[ballColorsArray.length - 1] || dColor;

  //Add the option.
  //This needs to be generalized into another function to apply to other objects.

  ballSelect = document.getElementById("BallSelect");
  let newBallNumber = ballColorsArray.length - 1;
  addOption(ballSelect, newBallNumber);
}

function addOption(elt, number) {
  let newOption = document.createElement("option");
  newOption.value = number;
  newOption.textContent = number;
  elt.appendChild(newOption);
}

function removeBalls() {
  balls.pop();
  qty--;
  initBallColors.pop();
  ballColorsArray.pop();

  //This removes the option from the drop-down in the Div for the Ball Color Sliders.
  ballSelections = document.getElementById("BallSelect");
  ballSelections.removeChild(ballSelections.lastChild);
}

function addDragBox() {
  //init drag colors
  //dragColorsArray

  let defaultDragColor = {
    h: 0,
    s: 62,
    l: 80,
    a: 0.5
  };

  let d = defaultDragColor;

  let defaultColor = color(d.h, d.s, d.l, d.a);

  initDragColors[initDragColors.length] =
    initDragColors[initDragColors.length - 1] || defaultDragColor;
  dragColorsArray[dragColorsArray.length] =
    dragColorsArray[dragColorsArray.length - 1] || defaultColor;

  //dragColorsArray[dragColorsArray.length] = dragColorsArray[dragColorsArray.length - 1] || defaultColor;

  dragSelections = document.getElementById("DragSelect");
  let dragCount = dragColorsArray.length - 1;
  addOption(dragSelections, dragCount);
}

function addAccelBox() {
  //init drag colors
  //dragColorsArray

  let defaultAccelColor = {
    h: 194,
    s: 94,
    l: 49,
    a: 0.6
  };

  let d = defaultAccelColor;

  let defaultColor = color(d.h, d.s, d.l, d.a);

  initAccelColors[initAccelColors.length] =
    initAccelColors[initAccelColors.length - 1] || defaultAccelColor;
  accelColorsArray[accelColorsArray.length] =
    accelColorsArray[accelColorsArray.length - 1] || defaultColor;

  //dragColorsArray[dragColorsArray.length] = dragColorsArray[dragColorsArray.length - 1] || defaultColor;

  accelSelections = document.getElementById("AcceleratorSelect");
  let accelCount = accelColorsArray.length - 1;
  addOption(accelSelections, accelCount);
}

function addBlock() {
  //init drag colors
  //dragColorsArray

  let defaultBlockColor = {
    h: 90,
    s: 100,
    l: 100,
    a: 1.0
  };

  let d = defaultBlockColor;

  let defaultColor = color(d.h, d.s, d.l, d.a);

  initBlockColors[initBlockColors.length] =
    initBlockColors[initBlockColors.length - 1] || defaultBlockColor;
  blockColorsArray[blockColorsArray.length] =
    blockColorsArray[blockColorsArray.length - 1] || defaultColor;

  //dragColorsArray[dragColorsArray.length] = dragColorsArray[dragColorsArray.length - 1] || defaultColor;

  blockSelections = document.getElementById("BlockSelect");
  let blockCount = blockColorsArray.length - 1;
  addOption(blockSelections, blockCount);
}