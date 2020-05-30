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
    return newStateJSON;
  })
}


function reset() {
  initializeObjects(defaultObject2);
}

function loadSessionState() {

  const url = '/saveName/session';

  $.get(url, function (data) {
    //console.log('session data: ', data);
    console.log("data: ", data);

    newSessionState = JSON.parse(data);
    console.log("New session state: ", newSessionState);
    initializeObjects(newSessionState);
    //newSessionState = JSON.parse 

  })


}