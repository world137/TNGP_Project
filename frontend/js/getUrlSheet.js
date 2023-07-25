$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")
    let proj_name_th = localStorage.getItem("proj_name_th")
    let proj_name_en = localStorage.getItem("proj_name_en")
    //localStorage.clear()
    get_factsheet(proj_id,proj_name_th,proj_name_en)
})

function get_factsheet(proj_id,proj_name_th,proj_name_en) {
    if (proj_id != null){ // && proj_id != undefined && proj_name_th != null && proj_name_th != undefined && proj_name_en != null && proj_name_en != undefined) {
        $.ajax({
            url: "/getFactSheet/" + proj_id + "/URLs",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                $("#fundname").append(`<div>${proj_name_th}</div>`)
                $("#fundname").append(`<div>${proj_name_en}</div>`)
                $("#factSheet").append(`<a class="btn btn-primary" href=${response.url_factsheet} role="button">Factsheet</a>`)


            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}
