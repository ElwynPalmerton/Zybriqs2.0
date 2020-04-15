class backgroundObject {

  constructor(color) {


    //Color variables.
    let assignColor = color || defaultColor;
    let thisColor = {};
    Object.assign(thisColor, assignColor);
    this.color = thisColor;
  }

  display() {
    let c = this.color;
    c.a = parseInt(c.a);
    let p5bgColor = color(c.h, c.s, c.l, c.a);
    this.p5bgColor = p5bgColor;
    //console.log("p5 color", p5bgColor);
    //background(p5gbColor);
  }
}