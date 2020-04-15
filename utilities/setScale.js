function setScale() {


  let wrapper = document.getElementById('wrapper');

  let wrapperSize = wrapper.getBoundingClientRect();
  let ch = document.documentElement.clientHeight;
  let cw = document.body.clientWidth;
  console.log("Height", ch);
  console.log("Width", cw);

  let canvasWidth = cw - 250;
  return canvasWidth;

}