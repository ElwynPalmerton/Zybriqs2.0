function loadData(zibID) {

  //I am going to have to put the name in as a parameter.

  const url = "/restore";

  let requestData = {
    zibID: zibID,
  };

  //  console.log("zibURL: ", url);



  $.post(url, requestData, function (data, status) {
    newStateJSON = JSON.parse(data);
    initializeObjects(newStateJSON);
    return newStateJSON;
  })
}


function loadSessionState() {

  const url = '/restore/session';

  $.get(url, function (data, status) {

    console.log(data);
    //newSessionState = JSON.parse 


  })


}