function mouseClicked() {
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
    if (
      x > l.start.x * scl &&
      x < l.start.x * scl + 15 &&
      y > l.start.y * scl &&
      y < l.start.y * scl + 15
    ) {
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
    liquid.displayRemoveButton();
  });
  reverseLiquids.forEach((r) => {
    r.displayRemoveButton();
  });

  blocks.forEach((r) => {
    r.displayRemoveButton();
  });
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
