$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")
    localStorage.clear
    get_factsheet(proj_id)
})

function get_factsheet(proj_id){
    if(proj_id != null && proj_id != undefined){
        $.ajax({
            url: "/getFactSheet/" + proj_id + "/URLs",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                
                    $("#test").append(`<a class="btn btn-primary" href=${response.url_factsheet} role="button">Factsheet</a>`)
                    
                
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}
