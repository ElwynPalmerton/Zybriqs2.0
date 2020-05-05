function submitData() {

  const url = "/"

  const data = {
    HelloData: "A data",
  };

  $('.upload').click(function () {
    $.post(url, data, function (data, status) {
      console.log(`${data} and status is ${status}`)
    })
  });

}