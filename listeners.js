function listeners() {
  let startRect, endRect;
  noStroke();
  fill(200);

  function onMouseDown() {
    if (drawButtonOn) {
      isDrawing = true;
      startRect = createVector(mouseX, mouseY).copy();
    }
  }

  document.addEventListener("mousedown", onMouseDown);

  document.addEventListener("mousemove", () => {
    if (isDrawing === true) {
      endRect = createVector(mouseX, mouseY);
      //Pass in the background color variable here.
      background(50);
      //Make a separate function which displays everything to encapsulate this.
      //Draw the balls and liquids here.
      for (let j = 0; j < blocks.length; j++) {
        blocks[j].display();
      }
      if (endRect.x >= width) endRect.x = width - 1;
      if (endRect.x <= 0) endRect.x = 1;
      if (endRect.y >= height) endRect.y = height - 1;
      if (endRect.y <= 0) endRect.y = 1;
      //Check edges of the other rectangles and balls so that rectangles cannot overlap.
      //Make a minimum size for rectangles.
      makeRectangle(startRect, endRect); // args are vectors.
    }
  });

  document.addEventListener("mouseup", () => {
    //Maybe I need a preventDefault(); in here.
    isDrawing = false;
    if (
      startRect.x > 0 &&
      startRect.y > 0 &&
      startRect.x < width &&
      startRect.y < height &&
      endRect.x > 0 &&
      endRect.y > 0 &&
      endRect.x < width &&
      endRect.y < height
    ) {
      //Make a minimum size for rectangles using an if-then statement here (and a pop-up?)
      //Instead of "Outline" the class type should be a varible which is passed in from listeners.
      let block = new Outline(startRect, endRect);
      if (run === false) {
        //Only lets it add blocks when the program is paused.
        //Check block size before pushing.
        blocks.push(block);
      }
    }
  }); //End event listener.
}
