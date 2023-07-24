$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    resiveCitizen()
})
function resiveCitizen() {
    let citizenId = localStorage.getItem("citizenId")
    console.log(citizenId)
    show_customer_data(citizenId)
}

function show_customer_data(citizenId){
    if(citizenId != null && citizenId != undefined){
        $.ajax({
            url: "/customerdata/" + citizenId,
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                console.log(response.name)
                
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}
