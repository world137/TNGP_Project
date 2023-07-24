$(function () {
    $("#insert_navbar").load("./component/navbar.html");
    $("#insert_snackbar").load("./component/snackbar.html");
})

$("#find_customer").on("click",function () {
    window.location.href = "../../frontend/html/findCustomer.html"
})
