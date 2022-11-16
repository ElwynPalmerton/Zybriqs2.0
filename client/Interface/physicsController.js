function readPhysicsSliders() {
  readGravitySlider();
  readWindSliders();
  readDragSlider();
}

function readDragSlider() {
  let dragSlider = document.getElementById("drag");

  dragSlider.addEventListener("input", () => {
    let dragFactor = map(dragSlider.value, 0, 100, 0, dragCoefficient * 3);

    liquids.forEach((l) => {
      l.c = dragFactor;
    });
  });
}

function readAcceleratorSlider() {
  let acceleratorSlider = document.getElementById("accelerator");

  acceleratorSlider.addEventListener("input", () => {
    let acceleratorFactor = map(
      acceleratorSlider.value,
      0,
      100,
      0,
      -acceleratorCoefficient * 5
    );
    console.log(acceleratorFactor);
    reverseLiquids.forEach((rl) => {
      rl.c = acceleratorFactor;
    });
  });
}

function readGravitySlider() {
  const gravityFactor = 8;
  let gravity = document.getElementById("gravity");

  gravity.addEventListener("input", () => {
    let gFactor = gravity.value / 100;
    gForce = gravityConstant * gFactor * gravityFactor;
  });
}

function readWindSliders() {
  let windForceSlider = document.getElementById("windForce");
  let windVarianceSlider = document.getElementById("variance");
  let windDirectionSlider = document.getElementById("direction");

  windForceSlider.addEventListener("input", () => {
    intensityInput = windForceSlider.value;
  });

  windDirectionSlider.addEventListener("input", () => {
    directionInput = windDirectionSlider.value;
  });
}

function calculateWind() {
  let intensityScale = 0.05;
  let dScale = 0.1;
  xOff += 0.01;
  let windFactor = map(noise(xOff), 0, 1, -windC, windC);
  let windSpeed = windFactor * intensityInput * intensityScale;
  let directionScale = intensityInput * windC;
  let directionAddend = (directionInput / 100) * directionScale;
  let windVectorX = windSpeed + directionAddend * dScale;
  var windVector = createVector(windVectorX, 0.0);
  return windVector;
}
