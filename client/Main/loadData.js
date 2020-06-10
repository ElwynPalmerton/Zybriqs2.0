function loadData(zibID) {

  //I am going to have to put the name in as a parameter.

  const url = "/restore";

  let requestData = {
    zibID: zibID,
  };

  //  console.log("zibURL: ", url);



  $.post(url, requestData, function (data, status) {
    newStateJSON = JSON.parse(data);
    console.log("Loading state in loadData: ", newStateJSON);

    initializeObjects(newStateJSON);
    submitSession(); //Sends the session data to the server (saveState.js.)
    return newStateJSON;
  })
}


function reset() {
  initializeObjects(defaultObject2);
}

function loadSessionState() {
  //This is called from setup() in Sketch.js.

  // if the user is not logged in it should return the default object.


  const url = '/saveName/session';

  $.get(url, function (data) {

    newSessionState = JSON.parse(data);
    initializeObjects(newSessionState);
    //newSessionState = JSON.parse 

  })


}