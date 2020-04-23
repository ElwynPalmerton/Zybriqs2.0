function readPhysicsSliders() {

  let gravity = document.getElementById('gravity');

  gravity.addEventListener("input", () => {
    let gFactor = gravity.value / 100;

    console.log(gForce);
    gForce = gravityConstant * gFactor * 10;
  });




  

}