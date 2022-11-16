function loadData(zibID) {
  const url = "/restore";
  let requestData = {
    zibID: zibID,
  };

  $.post(url, requestData, function (data, status) {
    newStateJSON = JSON.parse(data);
    console.log("Loading state in loadData: ", newStateJSON);
    if (newStateJSON) {
      initializeObjects(newStateJSON);
      submitSession();
    }
    return newStateJSON;
  });
}

function reset() {
  initializeObjects(defaultObject2);
}

function loadSessionState() {
  const url = "/saveName/session";
  $.get(url, function (data) {
    if (data) {
      newSessionState = JSON.parse(data);
      initializeObjects(newSessionState);
    }
  });
}
