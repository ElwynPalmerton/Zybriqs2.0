function colorSliders(name, initialValues, quantity) {
  //Create Div,
  //Create a heading with the name in it.
  //Create Selection Slider (There needs to be a name in it to attach an event listener (Using the name above);
  //Use name to assign an id to this selection field.
  //Create a set of sliders for each existing object.
  //Use name to assign an id to the sliders.
  //Assign initial values.

  //The values need to be assigned to the sliders and also returned from the sliders.

  //Create div and add name:

  let label = name.split(" ")[0];
  // let classLabel = label[0];

  //add the id to the div.    id = name + 'Div';   === ballDiv
  let sliderDiv = document.createElement("div");
  sliderDiv.classList.add(label + "Div");
  let nameElt = document.createElement("p");
  nameElt.textContent = name;
  sliderDiv.appendChild(nameElt);

  // Create the selection and four option elements options:
  let selections = document.createElement("select");
  selections.setAttribute("id", label + "Select");

  let optionAll = document.createElement("option");

  let blankOption = document.createElement("option");
  blankOption.value = "-";
  blankOption.textContent = "-";
  selections.appendChild(blankOption);

  let allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All";

  selections.appendChild(allOption);

  for (let i = 0; i < quantity; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i + 1;
    selections.appendChild(option);
  }

  sliderDiv.appendChild(selections);

  let slideContainer = document.createElement("div");
  //slideContainer.setAttribute("id", label + "Sliders");
  slideContainer.classList.add(label + "Sliders");

  //Add HUE slider.
  let h = document.createElement("input");
  h.type = "range";
  h.min = "0";
  h.max = "360";
  h.value = initialValues.h || 180;
  h.classList.add("hSlider");




  //Create SLIDE CONTAINER with the HSLA sliders.
  slideContainer.appendChild(h);

  //Add SATURATION slider.
  let s = document.createElement("input");
  s.type = "range";
  s.min = "0";
  s.max = "100";
  s.value = initialValues.s || 50;
  s.classList.add("sSlider");


  slideContainer.appendChild(s);

  //Add LIGHTNESS slider.
  let l = document.createElement("input");
  l.type = "range";
  l.min = "0";
  l.max = "100";
  l.value = initialValues.l || 50;
  l.classList.add("lSlider");


  slideContainer.appendChild(l);

  //Add ALPHA slider.
  let a = document.createElement("input");
  a.type = "range";
  a.min = "0";
  a.max = "1";
  a.step = "0.01"
  a.value = initialValues.a || 0.5;
  a.classList.add("aSlider");
  //a.setAttribute("id", "aSlider");

  this.h = h.value;
  this.s = s.value;
  this.l = l.value;
  this.a = a.value;

  slideContainer.appendChild(a);

  sliderDiv.appendChild(slideContainer);

  console.log(sliderDiv);
  return sliderDiv;
} //End of ColorSliders.


function setColors(hslaArray) {
  let tempColArray = [];

  hslaArray.forEach(c => {
    let pColor = color(c.h, c.s, c.l, c.a);
    tempColArray.push(pColor);
  });

  return tempColArray;
}