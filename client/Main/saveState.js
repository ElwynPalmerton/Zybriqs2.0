function submitData() {
  createP("Hello");


  const url = "/" // "http://localhost:3000";

  const data = "HelloData";

  $('.upload').click(function () {
    $.post(url, data, function (data, status) {
      console.log(`${data} and status is ${status}`)
    })
  });

}