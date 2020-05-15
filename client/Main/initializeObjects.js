function initializeObjects(settings) {
  balls.splice(0);
  blocks.splice(0);
  liquids.splice(0);
  reverseLiquids.splice(0);
  backgroundArray.splice(0);

  for (let i = 0; i < settings.balls.length; i++) {
    let ball = new Mover(random(initWidth), initHeight / 5, settings.balls[i]);
    balls.push(ball);
  }

  //Create the background object using settings.backColor[0];
  //console.log(settings.backgroundColor[0]);
  //console.log("settings.backgroundColor", settings.backgroundColor);
  let bgObject = new backgroundObject(settings.backgroundColor[0]);
  backgroundArray.push(bgObject);

  //Initialize the drag elements.

  //Add (liquid) start and end to the default object.
  //Test to see if it works with a different object.

  for (let i = 0; i < settings.drag.length; i++) {
    let startY = settings.drag[i].start.y;
    let startX = settings.drag[i].start.x;
    let endX = settings.drag[i].end.x;
    let endY = settings.drag[i].end.y;

    let liquidStart = createVector(200 * scl, 200 * scl);
    let liquidEnd = createVector(400 * scl, 400 * scl);

    let liquid = new Liquid(
      liquidStart,
      liquidEnd,
      dragCoefficient,
      settings.drag[i].color
    );
    liquids.push(liquid);
  }

  //Add (reverseLiquid) start and end to the default object.
  //
  //Loop over setting.dragColor.length.
  //Create the object and push it to liquids.

  for (let i = 0; i < settings.accel.length; i++) {
    let startX = settings.accel[i].start.x;
    let startY = settings.accel[i].start.y;
    let endX = settings.accel[i].end.x;
    let endY = settings.accel[i].end.y;

    let reverseLiquidStart = createVector(startX * scl, startY * scl);
    let reverseLiquidEnd = createVector(endX * scl, endY * scl);

    let reverseLiquid = new Liquid(
      reverseLiquidStart,
      reverseLiquidEnd,
      -dragCoefficient,
      settings.accel[i].color
    );
    reverseLiquids.push(reverseLiquid);
  }

  for (let i = 0; i < settings.blocks.length; i++) {
    let startX = settings.blocks[i].start.x;
    let startY = settings.blocks[i].start.y;
    let endX = settings.blocks[i].end.x;
    let endY = settings.blocks[i].end.y;

    let blockStart = createVector(startX * scl, startY * scl);
    let blockEnd = createVector(endX * scl, endY * scl);

    let block = new Outline(blockStart, blockEnd, settings.blocks[i].color);
    blocks.push(block);
  }
}

function reInitialize() {
  let designPreset = document.querySelector("#designPresets");
  let objName = designPreset.value;

  switch (objName) {
    case "defaultObject":
      initializeObjects(defaultObject);
      break;
    case "defaultObject2":
      initializeObjects(defaultObject2);
      break;
    default:
      // Do nothing.
  }
}