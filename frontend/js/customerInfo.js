$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    showCustomerData()
})
function showCustomerData() {
    let name = localStorage.getItem("name")
    let tel = localStorage.getItem("tel")
    let email = localStorage.getItem("email")
    let dob = localStorage.getItem("dob")
    let job = localStorage.getItem("job")
    let salary = localStorage.getItem("salary")
    let risk = localStorage.getItem("risk")
    let experienceTest = localStorage.getItem("experienceTest")
    let experience = localStorage.getItem("experience")

    document.getElementById("name").innerHTML = name
    document.getElementById("tel").innerHTML = tel
    document.getElementById("email").innerHTML = email
    document.getElementById("dob").innerHTML = dob
    document.getElementById("job").innerHTML = job
    document.getElementById("salary").innerHTML = salary



    localStorage.clear


    if (risk != "") {
        if (risk == "0") {
            document.getElementById("risk_data").innerHTML = "N/A"
        } else {
            document.getElementById("risk_data").innerHTML = risk
        }
    }
    if (experienceTest != "") {
        if (experienceTest == "false") {
            document.getElementById("experience_data").innerHTML = "N/A"
        } else {
            let experience = localStorage.getItem("experience")
            if (experience == "true"){
                document.getElementById("experience_data").innerHTML = "มีประสบการณ์การลงทุน"
            }else{
                document.getElementById("experience_data").innerHTML = "ไม่มีประสบการณ์การลงทุน"
            }

        }
    }
    if (risk != "0" && experienceTest== "true"){
        document.getElementById("under").style.display = "flex"
    }else{
        document.getElementById("under").style.display = "none"

    }
}


