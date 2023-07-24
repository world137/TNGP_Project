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
                localStorage.clear
                
                let name = "ชื่อ : " + response.NameTitle + response.Name + " " + response.Surname
                let tel = "เบอร์โทร : " + response.Tel
                let email = "อีเมล : " + response.Email
                let dob = "วันเกิด  : " + response.DOB
                let job = "อาชีพ : " + response.Job
                let salary = "เงินเดือน : " + response.MinIncome + " - " + response.MaxIncome
                let risk = response.Risk
                let experienceTest = response.ExperienceTest
                let experience = response.Experience
            
                
                localStorage.setItem("name",name)
                localStorage.setItem("tel",tel)
                localStorage.setItem("email",email)
                localStorage.setItem("dob",dob)
                localStorage.setItem("job",job)
                localStorage.setItem("salary",salary)
                localStorage.setItem("risk",risk)
                localStorage.setItem("experienceTest",experienceTest)
                localStorage.setItem("experience",experience)

                window.location.href = "../../frontend/html/customerInfo.html"
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}


