$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")
    //localStorage.clear
    get_FeederFund(proj_id)
})

function get_FeederFund(proj_id){
    var data = ""
    if(proj_id != null && proj_id != undefined){
        $.ajax({
            url: "/getFeederFund/" + proj_id + "/feeder_fund",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                if (response.main_feeder_fund == ""){
                    data = "ไม่ระบุ"
                }else{
                    data = response.main_feeder_fund
                }
                $("#feederfund").append(`<div>กองทุนหลัก:${data}</div>`)
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}



