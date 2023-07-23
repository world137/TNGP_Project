$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    get_all_asset_management("C0000000021")
})

function get_all_asset_management(id) {
    $.ajax({
        url: "/allAssetManagement/" + id,
        type: "GET",
        dataType: "json",
        success: function (response) {
            // Display the user data in the userData div
            html = ""
            for (let index = 0; index < response.length; index++) {
                $("#all_asset_management_name").append("<div class='card' id='card" + response[index].unique_id + "'></div>")
                $("#card" + response[index].unique_id).append("<div class='card-body'><div id='card_name'><h6>"+ response[index].name_th +"</h6><h6>"+ response[index].name_en +"</h6></div></div>")
            }
            // $("#all_fund_fact").html(html)
            // $("#all_fund_fact").html("<p>Name : " + response[i].name_th + "</p><p>User Id: " + response[i].unique_id + "</p>");
        },
        error: function (xhr, status, error) {
            error_notification('ไม่สามารถดึงข้อมูลได้')
            console.error("Error:", error);
        }
    });
}
