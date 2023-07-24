$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let name = localStorage.getItem("customername")
    document.getElementById("customer_name").innerHTML += " : " + name
})