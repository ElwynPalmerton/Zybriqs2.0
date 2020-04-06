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

function removeObjects(objArray, x, y) {
  for (let i = 0; i < objArray.length; i++) {
    let l = objArray[i];
    if (x > l.start.x &&
      x < l.start.x + 15 &&
      y > l.start.y &&
      y < l.start.y + 15) {

      objArray.splice(i, 1);
      if (objArray === liquids) {
        removeDragBoxSelector();
      }
      if (objArray === reverseLiquids) {
        removeAccelBoxSelector();
      }
      if (objArray === blocks) {
        removeBlocks();
      }
      showRemoveButtons();

    }
  }
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


function mouseClicked() {
  //if mouseX, mouseY is in the removeBox.
  let x = mouseX;
  let y = mouseY;
  if (removeButtonOn) {
    //Check all objects:

    //removeObjects(objArray);
    //   function removeObjects(objArray) {
    //     for (let i = 0; i < objArray.length; i++) {
    //       let l = objArray[i];
    //       if (x > l.start.x &&
    //         x < l.start.x + 15 &&
    //         y > l.start.y &&
    //         y < l.start.y + 15) {

    //         objArray.splice(i, 1);
    //         if (objArray === liquids) {
    //           removeDragBoxSelector();
    //         }
    //         if (objArray === reverseLiquids) {
    //           removeAccelBoxSelector();
    //         }
    //         if (objArray === blocks) {
    //           removeBlocks();
    //         }
    //         showRemoveButtons();

    //       }
    //     }
    //   }

    //   //Refactor this so that it passes in the correct object?
    //   removeObjects(liquids);
    //   removeObjects(reverseLiquids);
    //   removeObjects(blocks);
    // }
    removeObjects(liquids, x, y);
    removeObjects(reverseLiquids, x, y);
    removeObjects(blocks, x, y);
  }
}




function removeDragBoxSelector() {
  //Refactor this so that it passes in the correct object?
  //I just need to put the name into the Class definitation 
  //Then I can call colorSliders with the name as a variable
  //... instead of hard-coded.
  dragSelection = document.getElementById("DragSelect");
  dragSelection.removeChild(dragSelection.lastChild);
}

function removeAccelBoxSelector() {
  accelSelection = document.getElementById("AcceleratorSelect");
  accelSelection.removeChild(accelSelection.lastChild);
}


function removeBlocks() {
  initBlockColors.pop();
  blockColorsArray.pop();
  blockSelection = document.getElementById("BlockSelect");
  blockSelection.removeChild(blockSelection.lastChild);
}