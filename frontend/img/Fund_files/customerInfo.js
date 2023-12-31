$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let id = localStorage.getItem("id")
    getUser(id)
})
function getUser(citizenId) {
    if (citizenId != null && citizenId != undefined) {
        $.ajax({
            url: "/customerdata/" + citizenId,
            type: "GET",
            dataType: "json",
            success: function (response) {
                if (response.CitizenId == "") {
                    error_notification('ไม่พบหมายเลขบัตรประชาชน')
                    return
                }

                console.log(response)

                let name = response.NameTitle + response.Name + " " + response.Surname
                let tel = response.Tel
                let email = response.Email
                let dob = response.DOB
                let job = response.Job
                let salary = response.MinIncome + " - " + response.MaxIncome
                let risk = response.Risk
                let PersonalScore = response.PersonalScore

                document.getElementById("name").innerHTML = "ชื่อ : " + name
                document.getElementById("tel").innerHTML = "เบอร์โทร : " + tel
                document.getElementById("email").innerHTML = "อีเมล : " + email
                document.getElementById("dob").innerHTML = "วันเกิด  : " + dob
                document.getElementById("job").innerHTML = "อาชีพ : " + job
                document.getElementById("salary").innerHTML = "เงินเดือน : " + salary
                if (PersonalScore == 1) {
                    text = " (กลุ่มอ่อนไหว)"
                } else {
                    text = ""
                }
                console.log(risk)


                if (risk == 0) {
                    console.log("a")
                    document.getElementById("risk_data").innerHTML = "N/A"
                } else {
                    console.log("b")

                    document.getElementById("risk_data").innerHTML = risk + text

                }


                if (risk != 0) {
                    document.getElementById("under").style.display = "flex"
                } else {
                    document.getElementById("under").style.display = "none"
                }


                localStorage.setItem("id", citizenId)
                localStorage.setItem("customername", name)
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}



$("#risk_test").on("click", function () {
    // localStorage.setItem("customername", customername)
    window.location.href = "../../frontend/html/suitability.html"
})

$("#experience_test").on("click", function () {
    // localStorage.setItem("customername", customername)

    window.location.href = "../../frontend/html/personal.html"
})

$("#fund_recommend").on("click", function () {
    window.location.href = "../../frontend/html/recommend.html"
})