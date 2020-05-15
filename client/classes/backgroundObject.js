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
    let c = this.color;
    c.a = parseInt(c.a);
    let p5bgColor = color(c.h, c.s, c.l, c.a);
    background(p5bgColor);
  }

  displayDimmed() {
    let {
      h,
      s,
      l,
      a
    } = this.color;

    let p5Color = color(h, s - dimAmt, l, parseFloat(a));
    background(p5Color);
  }

}