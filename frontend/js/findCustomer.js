$(function () {
    $("#insert_snackbar").load("../component/snackbar.html");
})


$("#analyze").on("click",function () {
    let citizenId = document.getElementById("search_citizen").value
    if(citizenId.length != 13){
        warning_notification('รหัสบัตรประชาชนไม่ถูกต้อง')
    }
    localStorage.setItem("citizenId",citizenId)
    window.location.href = "../../frontend/html/customerInfo.html"
})



