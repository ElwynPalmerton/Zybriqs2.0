//Move this into its own file in utilities.

function drawElementsDuringSetup() {

  tempBG = color(230, 30, 30, 1)

  backgroundArray[0].displayDimmed();

  for (let j = 0; j < blocks.length; j++) {
    blocks[j].displayDimmed();
  }

  balls.forEach((ball) => {
    ball.displayDimmed();
  })

  liquids.forEach((liquid) => {
    liquid.displayDimmed(); //Liquid and reverseLiquid should be in the same array. See above?
    //liquid.displayRemoveButton();
  })

  reverseLiquids.forEach((reverseLiquid) => {
    reverseLiquid.displayDimmed();
  })
}