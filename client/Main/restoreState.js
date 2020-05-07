function loadData() {

  console.log('Load Data.');


  //I am going to have to put the name in as a parameter.

  const url = "/loadState";

  $.get(url, function (data, status) {
    newStateJSON = JSON.parse(data);
    console.log("New state JSON", newStateJSON);

    initializeObjects(newStateJSON);
  })



}