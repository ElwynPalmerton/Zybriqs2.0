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
      background(50);
      for (let j = 0; j < blocks.length; j++) {
        blocks[j].display();
      }
      if (endRect.x >= width) endRect.x = width - 1;
      if (endRect.x <= 0) endRect.x = 1;
      if (endRect.y >= height) endRect.y = height - 1;
      if (endRect.y <= 0) endRect.y = 1;
      //Check the edges of the container in here instead of on mouseup???
      //Check edges of the other rectangles so that rectangles cannot overlap.
      //Make a minimum size for rectangles.
      makeRectangle(startRect, endRect); // args are vectors.
    }
  });

  document.addEventListener("mouseup", () => {
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
      //Make a minimum size for rectangles.
      let block = new Outline(startRect, endRect);
      if (run === false) { //Only lets it add blocks when the program is paused.
        blocks.push(block);
      }

    }
  }); //End event listener.
}