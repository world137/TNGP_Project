$(function () {
    $("#insert_snackbar").load("../component/snackbar.html");
})


$("#analyze").on("click",function () {
    let citizenId = document.getElementById("search_citizen").value
    if(citizenId.length != 13){
        warning_notification('รหัสบัตรประชาชนไม่ถูกต้อง')
        return
    }
    get_customer_data(citizenId)
})

function get_customer_data(citizenId) {
    if (citizenId != null && citizenId != undefined) {
        $.ajax({
            url: "/customerdata/" + citizenId,
            type: "GET",
            dataType: "json",
            success: function (response) {
                if(response.CitizenId == ""){
                    error_notification('ไม่พบหมายเลขบัตรประชาชน')
                    return
                }

                let id = response.CitizenId
                localStorage.setItem("id",id)
                window.location.href = "../../frontend/html/customerInfo.html"
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}


