$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")
    let proj_name_th = localStorage.getItem("proj_name_th")
    let proj_name_en = localStorage.getItem("proj_name_en")
    let proj_abbr_name = localStorage.getItem("proj_abbr_name")
    //localStorage.clear()
    get_factsheet(proj_id,proj_name_th,proj_name_en,proj_abbr_name)

})

function get_factsheet(proj_id,proj_name_th,proj_name_en,proj_abbr_name) {
    if (proj_id != null){ // && proj_id != undefined && proj_name_th != null && proj_name_th != undefined && proj_name_en != null && proj_name_en != undefined) {
        $.ajax({
            url: "/getFactSheet/" + proj_id + "/URLs",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                $("#fundname").append(`<div>${proj_name_th}</div>`)
                $("#fundname").append(`<div>${proj_name_en}</div>`)
                $("#abbr").append(`<div>${proj_abbr_name}</div>`)
                $("#factSheet").append(`
                <iframe src="https://docs.google.com/gview?url=${response.url_factsheet}&embedded=true" style="width:1200px; height:900px;" frameborder="0"></iframe>`)


            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}
