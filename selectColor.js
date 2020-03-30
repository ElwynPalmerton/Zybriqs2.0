//Not added into Index.html

let sel;

function setup() {
  textAlign(CENTER);
  background(200);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('pear');
  sel.option('kiwi');
  sel.option('grape');
  sel.selected('kiwi');
  sel.changed(mySelectEvent);
}

f