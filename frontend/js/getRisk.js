$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")

    //localStorage.clear

    show_risk(proj_id)
})

function show_risk(proj_id) {
    var risk = ""
    if (proj_id != null && proj_id != undefined) {
        $.ajax({
            url: "/getRisk/" + proj_id + "/suitability",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)

                switch (response.risk_spectrum) {
                    case "-":
                        risk = "ไม่ระบุ"
                        break;
                    case "RS1":
                        risk = "ความเสี่ยงระดับ 1"
                    case "RS2":
                        risk = "ความเสี่ยงระดับ 2"
                    case "RS3":
                        risk = "ความเสี่ยงระดับ 3" 
                    case "RS4":
                        risk = "ความเสี่ยงระดับ 4" 
                    case "RS5":
                        risk = "ความเสี่ยงระดับ 5"
                    case "RS6":
                        risk = "ความเสี่ยงระดับ 6"
                    case "RS7":
                        risk = "ความเสี่ยงระดับ 7"    
                    case "RS8":
                        risk = "ความเสี่ยงระดับ 8"
                    case "RS8":
                        risk = "ความเสี่ยงระดับ 8+"                                   
                    default:
                        risk = "ไม่ระบุ"
                        break
                }

                $("#risk").append(`<div>ความเสี่ยงของกองทุนรวม: ${risk}</div>`)

            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}