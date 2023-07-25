$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")
    //localStorage.clear
    show_FundCompare(proj_id)
})

function show_FundCompare(proj_id) {
    if (proj_id != null && proj_id != undefined) {
        $.ajax({
            url: "/getFundCompare/"+ proj_id + "/fund_compare",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)

                $("#fundcompare").append(`<div>กลุ่มกองทุน: ${response.fund_compare}</div>`)

            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}