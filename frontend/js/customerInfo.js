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
                let age = response.Age
                let gender = response.Gender 
                let province = response.ProvinceName
                let sector = response.Sector
                let marriageStatus = response.MarriageStatus
                let education = response.Education
                let account = response.Account
                console.log(account)

                const summary = {};
                funds = []
                for (let i = 0; i < account[1].FundProfile.length; i++){
                    j = i
                    funds.push(account[1].FundProfile[i])
                }

	
                // Loop through the funds and aggregate the values
                funds.forEach((fund) => {
                    if (!summary[fund.Fund_name]) {
                    summary[fund.Fund_name] = {
                        TotalAmount: fund.Amount,
                        TotalValue: fund.Value,
                    };
                    } else {
                    summary[fund.Fund_name].TotalAmount += fund.Amount;
                    summary[fund.Fund_name].TotalValue += fund.Value;
                    }
                });
               

                // Print the summarized data
                for (const fundName in summary) {
                    $("#transaction").append(`<div>กองทุน: ${fundName} Total Amount: ${summary[fundName].TotalAmount}Total Value: ${summary[fundName].TotalValue.toFixed(2)}</div>`)
                    console.log(`Fund Name: ${fundName}`);
                    console.log(`Total Amount: ${summary[fundName].TotalAmount}`);
                    console.log(`Total Value: ${summary[fundName].TotalValue.toFixed(2)}\n`);
                }

                document.getElementById("name").innerHTML = "ชื่อ : " + name
                document.getElementById("tel").innerHTML = "เบอร์โทร : " + tel
                document.getElementById("email").innerHTML = "อีเมล : " + email
                document.getElementById("dob").innerHTML = "วันเกิด  : " + dob
                document.getElementById("job").innerHTML = "อาชีพ : " + job
                document.getElementById("salary").innerHTML = "เงินเดือน : " + salary
                document.getElementById("age").innerHTML = "อายุ : " + age
                document.getElementById("gender").innerHTML = "เพศ : " + gender
                document.getElementById("provinceName").innerHTML = "จังหวัด : " + province
                document.getElementById("sector").innerHTML = "ภาค : " + sector
                document.getElementById("marriageStatus").innerHTML = "สถานะสมรส : " + marriageStatus
                document.getElementById("education").innerHTML = "การศึกษา : " + education
                text_acc = "save_acc"
                for (let i = 0; i < account.length; i++) {
                    if (account[i].AccountType = 'ออมทรัพย์'){
                        text_acc = "save_acc"
                    }else{
                        text_acc = "fund_acc"
                    }
                    $("#account_data").append('<div class="'+ text_acc +'" id="account_card"><h5>'+account[i].AccountNumber+'</h5><h6>' + account[i].AccountType +'</h6></div>')
                }

                if (PersonalScore == 1) {
                    text = " (กลุ่มอ่อนไหว)"
                } else {
                    text = ""
                }
                console.log(risk)

                if(risk == 1){
                    risktext = "เสี่ยงต่ำ"
                }else if(risk >= 2 && risk <=4){
                    risktext = "เสี่ยงปานกลางค่อนข้างต่ำ"
                }else if(risk == 5){
                    risktext = "เสี่ยงปานกลางค่อนข้างสูง"
                }else if(risk == 6 || risk == 7){
                    risktext = "เสี่ยงสูง"
                }else if(risk == 8){
                    risktext = "เสี่ยงสูงมาก"
                }


                if (risk == 0) {
                    console.log("a")
                    document.getElementById("risk_data").innerHTML = "N/A"
                } else {
                    console.log("b")
                    

                    document.getElementById("risk_data").innerHTML = risktext + text

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

$("#fund_recommend_btn").on("click", function () {
    const dividendCheckbox = document.getElementById("dividend");
    const taxReduceCheckbox = document.getElementById("tax_reduce");

    // Check if the checkboxes are checked or not checked
    const isDividendChecked = dividendCheckbox.checked;
    const isTaxReduceChecked = taxReduceCheckbox.checked;

    // Output the result (for demonstration purposes)
    console.log("Is dividend checked?", isDividendChecked);
    console.log("Is tax reduce checked?", isTaxReduceChecked);
    localStorage.setItem("dividend",isDividendChecked)
    localStorage.setItem("taxreduce",isTaxReduceChecked)

    window.location.href = "../../frontend/html/recommend.html"
})