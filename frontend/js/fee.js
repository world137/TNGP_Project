$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")

    // localStorage.clear()
    show_fee(proj_id)
})
var data = [];
function show_fee(proj_id) {
    if (proj_id != null && proj_id != undefined) {
        $.ajax({
            url: "/getFee/" + proj_id + "/fee",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log("Fee = "+response)

                data = response;

                $("#fee").empty();

                for (let index = 0; index < data.length; index++) {
                    if (response[index].rate != "-") {
                        $("#fee").append("<div><h6>" + data[index].class_abbr_name + "</h6><p>" + data[index].fee_type_desc + "</p><p>" + data[index].rate + "</p><p>" + data[index].rate_unit + "</p></div></div>")
                    }

                }
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}
