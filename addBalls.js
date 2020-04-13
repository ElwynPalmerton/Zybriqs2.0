function addBalls() {
  const defaultBallColor = {
    h: random(360),
    s: 35,
    l: 100,
    a: 0.5
  };

  let ball = new Mover(random(width), height / 5, defaultBallColor);

  balls.push(ball);
  qty++;
  createController();
}

//If this is accomplished with a modifyOptions function then it does not
//...and should not happen here aat all.
function addOption(elt, number) {
  let newOption = document.createElement("option");
  newOption.value = number;
  newOption.textContent = number + 1;
  elt.appendChild(newOption);
}

function removeBalls() {
  balls.pop();
  qty--;
  createController();
}

function addDragBox() {

  createController();

}

function addAccelBox() {
  createController();
}


function addBlock() {
  createController();
}


}