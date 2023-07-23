$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");    
    // get_all_fund_fact()
    getData()
})

// function get_all_asset_management() {
//     $.ajax({
//         url: "/getAllAssetManagement/",
//         type: "GET",
//         dataType: "json",
//         success: function(response) {
//             // Display the user data in the userData div
//             html = ""
//             for (let index = 0; index < response.length; index++) {
//                console.log(response[index])
//                html = html + "<p>Name : " + response[index].name_th + "</p><p> Id: " + response[index].unique_id + "</p>"
//             }
//             $("#all_fund_fact").html(html)
//             // $("#Funfact").html("<p>Name : " + unique.name_th + "</p><p>User Id: " + unique.unique_id + "</p>");
//         },
//         error: function(xhr, status, error) {
//             error_notification('ไม่สามารถดึงข้อมูลได้')
//             console.error("Error:", error);
//         }
//     });
// }

function getData() {
    // Replace localhost:8080 with the address where your Golang server is running
    const apiUrl1 = 'http://localhost:8080';
    
  
    // Make an Ajax request to the Golang backend for API 1
    fetch(apiUrl1)
      .then(response => response.json())
      .then(data => {
        // Display the data in the 'result1' div
        const resultDiv1 = document.getElementById('result1');
        resultDiv1.innerHTML = data.message;
      })
      .catch(error => console.error('Error:', error));
  
  }