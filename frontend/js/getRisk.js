$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")

    //localStorage.clear

    show_risk(proj_id)
})

function show_risk(proj_id) {
    if (proj_id != null && proj_id != undefined) {
        $.ajax({
            url: "/getRisk/" + proj_id + "/suitability",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)

                $("#risk").append(`<div>ความเสี่ยงของกองทุนรวม: ${response.risk_spectrum}</div>`)

            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}