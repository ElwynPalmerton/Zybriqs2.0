function readPhysicsSliders() {
  readGravitySlider();
  readWindSliders();




} //End readPhysicsSliders.



function readGravitySlider() {

  const gravityFactor = 8
  //Refactor this so that it does negative gravity.
  let gravity = document.getElementById('gravity');

  gravity.addEventListener("input", () => {
    let gFactor = gravity.value / 100; //100 should be a constant value.
    gForce = gravityConstant * gFactor * gravityFactor; //The 10 here should also be a constant.
  });
}


function readWindSliders() {

  let windForceSlider = document.getElementById('windForce');
  let windVarianceSlider = document.getElementById('variance');
  let windDirectionSlider = document.getElementById('direction');

  windForceSlider.addEventListener('input', () => {
    intensityInput = windForceSlider.value;
  })

  windDirectionSlider.addEventListener('input', () => {
    directionInput = windDirectionSlider.value;
  })
}

function calculateWind() {
  /*
  const windC = 0.05;
  let intensityInput;
  let varianceInput;
  let directionInput;
  */

  //The intensity input should be scaled.
  let intensityScale = 0.05;
  let dScale = 0.1;

  xOff += 0.01;

  let windFactor = map(noise(xOff), 0, 1, -windC, windC);

  //I could calculate windFactor first and put that into noise instead of windC.

  let windSpeed = windFactor * intensityInput * intensityScale;

  //The intensity input should be scaled.

  //let windForce = intensityInput * windFactor;
  let directionScale = intensityInput * windC;

  let directionAddend = directionInput / 100 * directionScale;
  //Change the input values to -100, 100.
  let windVectorX = windSpeed + directionAddend * dScale;

  var windVector = createVector(windVectorX, 0.0);


  return windVector;
}