function loadData(zibID) {

  console.log('Load Data.');


  //I am going to have to put the name in as a parameter.

  const url = "/restore";

  let requestData = {
    zibID: zibID,
  };

  //  console.log("zibURL: ", url);



  $.post(url, requestData, function (data, status) {
    newStateJSON = JSON.parse(data);
    console.log("New state JSON", data);
    console.log("New state JSON", newStateJSON);

    return newStateJSON;


  })



}