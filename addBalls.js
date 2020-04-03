function addBalls() {
  let ball = new Mover(random(width), height / 5);
  balls.push(ball);
  qty++;

  //Modify the initialBallColor;
  initBallColors[initBallColors.length] = initBallColors[initBallColors.length - 1]
  ballColorsArray = setColors(initBallColors);

  //Add the option.
  //This needs to be generalized into another function to apply to other objects.

  ballSelections = document.getElementById("BallSelect");

  let newBallNumber = ballColorsArray.length - 1;
  let newOption = document.createElement("option");
  newOption.value = newBallNumber;
  newOption.textContent = newBallNumber;
  ballSelections.appendChild(newOption);


}

function removeBalls() {
  balls.pop();
  qty--;
  initBallColors.pop();
  ballColorsArray.pop();

  ballSelections = document.getElementById("BallSelect");
  ballSelections.removeChild(ballSelections.lastChild);
}