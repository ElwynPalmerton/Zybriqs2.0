class backgroundObject {

  constructor(color) {

    color.a = parseFloat(color.a);
    //Color variables.
    let assignColor = color || defaultColor;
    let thisColor = {};
    Object.assign(thisColor, assignColor);
    this.color = thisColor;
  }

  display() {
    let backgroundColor = this.color;
    // c.a = parseInt(c.a);
    // console.log("Background color alpha: ", backgroundColor.a)
    let p5bgColor = color(backgroundColor.h, backgroundColor.s, backgroundColor.l, parseFloat(backgroundColor.a));
    background(p5bgColor);
  }

  displayDimmed() {
    let {
      h,
      s,
      l,
      a
    } = this.color;

    //let p5Color = color(h, s - dimAmt, l, parseFloat(a));
    let p5Color = color(h, s - dimAmt, l, a);
    background(p5Color);
  }

}