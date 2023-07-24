$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")
    localStorage.clear
    show_all_fund(proj_id)
})

function show_all_fund(proj_id){
    if(proj_id != null && proj_id != undefined){
        $.ajax({
            url: "/getFactSheet/" + proj_id + "/URLs",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                
                    $("#test").append(`<a class="btn btn-primary" href=${response.url_factsheet} role="button">Link</a>`)
                    
                
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}
