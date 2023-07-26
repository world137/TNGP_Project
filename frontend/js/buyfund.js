$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let id = localStorage.getItem("id")
    let fund_name_th = localStorage.getItem("proj_name_th")
    let nav_show = localStorage.getItem("nav_price")
    console.log(nav_show)
    // document.getElementById("nav_for_buy").innerHTML = 'ราคาต่อหน่วย: ' + nav_show
    // document.getElementById("total_price").innerHTML = parseFloat(nav) 

    getUser(id,fund_name_th)
})

    

function calculate(){
    str_price = document.getElementById("price").value
    total_nav = localStorage.getItem("nav_price")
    console.log(total_nav)
    sum = parseFloat(str_price) / parseFloat(total_nav)
    document.getElementById("total_price").innerHTML = 'จำนวนหน่วย:' + sum.toFixed(2)
    
}
function getUser(citizenId,fund_name_th) {
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
               
                account = response.Account

                document.getElementById("fund_name_th").innerHTML = fund_name_th
                // document.getElementById("balance_saving").innerHTML = `Saving account Balance : ${account[0].AccountBalance} Baht`
                document.getElementById("balance_fund").innerHTML = `ยอดเงินบัญชีกองทุน: ${account[1].AccountBalance} Baht`

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

$("#submit_buy").on("click", function (event) {
    event.preventDefault()
    // Define an array to hold question numbers
    let id = localStorage.getItem("id")
    var amount = document.getElementById("price").value;
    let nav_price = localStorage.getItem("nav_price")
    let fund_name = localStorage.getItem("proj_name_th")
    value = parseInt(amount) / parseFloat(nav_price)
    
    setUserData(parseInt(value),id,fund_name,amount)
})

function setUserData(value,id,fund_name,amount) {
    if(amount != null && amount != undefined){
        $.ajax({
            url: "/updateBalance/" + id + "/" + value + "/" + amount + "/" + fund_name ,
            type: "POST",
            dataType: "json",
            success: function (response) {
                console.log()
                
                window.location.href = "../../frontend/html/customerInfo.html"
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถซื้อกองทุนได้')
                console.error("Error:", error);
            }
        });
    }
}
