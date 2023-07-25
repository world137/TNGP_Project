$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")

    //localStorage.clear()
    get_dividend(proj_id)
})

function get_dividend(proj_id){
    if(proj_id != null && proj_id != undefined){
        $.ajax({
            url: "/getDividend/" + proj_id + "/dividend",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                var dividend = Translate(response.dividend_policy)

                $("#dividend").append( `<div> นโยบายการจ่ายเงินปันผล:${dividend}</div>`)
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}

function Translate(res){
    if (res == "Y"){
        return "มี"
    }
    else{
        return "ไม่มี"
    }
}

