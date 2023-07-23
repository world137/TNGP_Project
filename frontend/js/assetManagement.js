$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");    
    get_all_fund_fact()
})

function get_fund_fact(id) {
    $.ajax({
        url: "/unique/" + id, // The user API endpoint with user ID as part of the path
        type: "GET",
        dataType: "json",
        success: function(unique) {
            // Display the user data in the userData div
            $("#fund_fact").html("<p>Name : " + unique.name_th + "</p><p>User Id: " + unique.unique_id + "</p>");
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

function get_all_fund_fact() {
    console.log("hello")
    $.ajax({
        url: "/getAssetManagement/allAssetManagement", // The user API endpoint with user ID as part of the path
        type: "GET",
        dataType: "json",
        success: function(response) {
            // Display the user data in the userData div
            html = ""
            for (let index = 0; index < response.length; index++) {
               console.log(response[index])
               html = html + "<p>Name : " + response[index].name_th + "</p><p> Id: " + response[index].unique_id + "</p>"
            }
            $("#all_fund_fact").html(html)
            // $("#Funfact").html("<p>Name : " + unique.name_th + "</p><p>User Id: " + unique.unique_id + "</p>");
        },
        error: function(xhr, status, error) {
            error_notification('ไม่สามารถดึงข้อมูลได้')
            console.error("Error:", error);
        }
    });
}