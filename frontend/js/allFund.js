$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let asset_management_id = localStorage.getItem("asset_management_id")
    localStorage.clear
    show_all_fund(asset_management_id)
})

function show_all_fund(asset_management_id){
    if(asset_management_id != null && asset_management_id != undefined){
        $.ajax({
            url: "/getallFund/" + asset_management_id,
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                for (let index = 0; index < response.length; index++) {
                    $("#all_fund_name").append("<div onclick=send_proj_id('"+ response[index].proj_id + "') class='card' id='card" + response[index].proj_id + "'></div>")
                    $("#card" + response[index].proj_id).append("<div class='card-body'><div id='card_name'><h6>"+ response[index].proj_name_th +"</h6><h6>"+ response[index].proj_name_en +"</h6></div></div>")
                }
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}

function send_proj_id(proj_id) {
    localStorage.setItem("proj_id",proj_id)
    window.location.href = "../../frontend/html/fundDetail.html" //
}
