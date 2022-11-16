function drawElementsDuringSetup() {
  tempBG = color(230, 30, 30, 1);
  backgroundArray[0].displayDimmed();
  balls.forEach((ball) => {
    ball.displayDimmed();
  });

  liquids.forEach((liquid) => {
    liquid.displayDimmed();
  });

  reverseLiquids.forEach((reverseLiquid) => {
    reverseLiquid.displayDimmed();
  });

  for (let j = 0; j < blocks.length; j++) {
    blocks[j].displayDimmed();
  }

  if (drawButtonOn === true) {
    document.body.querySelector("canvas").style.cursor = "crosshair";
  }
}
