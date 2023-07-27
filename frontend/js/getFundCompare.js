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

                type = response.fund_compare
                translation = ""
                switch (type){
                    case 'EG':
                        translation = 'Equity General';
                        break;
                    case 'MTGB':
                        translation = 'Mid Term General Bond';
                        break;
                    case 'LTGB':
                        translation = 'Long Term General Bond';
                        break
                    case 'AA':
                        translation = 'Aggressive Allocation'
                        break
                    case 'JPEQ':
                        translation = 'Japan Equity'
                        break
                    case 'FPF': 
                        translation = 'Fund of Property fund'     
                        break
                    case 'ELCE':
                        translation = 'Equity Large Cap'     
                        break                   
                    default:
                        translation = type
                }

                

                
                $("#fundcompare").append(`<div>กลุ่มกองทุน: ${translation}</div>`)

            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}