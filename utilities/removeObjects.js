function mouseClicked() {
  //if mouseX, mouseY is in the removeBox.
  let x = mouseX;
  let y = mouseY;
  if (removeButtonOn) {

    removeObjects(liquids, x, y);
    removeObjects(reverseLiquids, x, y);
    removeObjects(blocks, x, y);
  }
}

function removeObjects(objArray, x, y) {
  for (let i = 0; i < objArray.length; i++) {
    let l = objArray[i];
    if (x > l.start.x &&
      x < l.start.x + 15 &&
      y > l.start.y &&
      y < l.start.y + 15) {

      objArray.splice(i, 1);

      createController();
      updateSliders2();

      showRemoveButtons();

    }
  }
}

function showRemoveButtons() {
  drawElementsDuringSetup();
  liquids.forEach((liquid) => {
    liquid.displayRemoveButton(); //Liquid and reverseLiquid should be in the same array. See above?
  })
  //liquid.displayRemoveButton();
  reverseLiquids.forEach((r) => {
    r.displayRemoveButton();
  })

  blocks.forEach((r) => {
    r.displayRemoveButton();
  })
}




function removeAll() {
  liquids.forEach((l) => {
    removeDragBoxSelector();
  });

  reverseLiquids.forEach((l) => {
    removeAccelBoxSelector();
  });

  blocks.forEach((l) => {
    removeBlocks();
  });

  balls.forEach((l) => {
    removeBalls();
  });

  removeBalls();
}

//Refactor this so that it passes in the correct object?