// function createRemoveButtons() {
//   var removeButtons = [];
//   for (let i = 0; i < liquids.length; i++) {
//     let rmvBtn = document.createElement('button');
//     rmvBtn.style.positon = "absolute";
//     cnv.elt.appendChild(rmvBtn);
//     rmvBtn.style.left = liquids[i].start.x + "px";
//     rmvBtn.style.top = liquids[i].start.y + "px";
//     removeButtons.push(rmvBtn);
//   }
//   console.log(liquids);
//   console.log(removeButtons);
// }


function showRemoveButtons() {
  drawElementsDuringSetup();

  liquids.forEach((liquid) => {
    liquid.displayRemoveButton(); //Liquid and reverseLiquid should be in the same array. See above?
    //liquid.displayRemoveButton();
  })



}

function mouseClicked() {
  //if mouseX, mouseY is in the removeBox.
  let x = mouseX;
  let y = mouseY;
  if (removeButtonOn) {
    //Check all objects:
    for (let i = 0; i < liquids.length; i++) {
      let l = liquids[i];
      if (x > l.start.x &&
        x < l.start.x + 15 &&
        y > l.start.y &&
        y < l.start.y + 15) {

        liquids.splice(i, 1);
        showRemoveButtons();

      }
    }
  }
}