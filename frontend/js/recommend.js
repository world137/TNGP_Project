$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
})

$("#more_fund").on("click",function () {
    window.location.href = "../../frontend/html/assetManagement.html"
})