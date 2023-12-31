var id
$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let name = localStorage.getItem("customername")
    id = localStorage.getItem("id")
    document.getElementById("customer_name").innerHTML += " : " + name
})
var ansArr = []
var score,personal = 0
var riskScore = 0
var isSensitive
$("#submit").on("click", function () {

    // Define an array to hold question numbers
    const questionNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // Loop through each question
    score = 0
    personal = 0
    for (let i = 0; i < questionNumbers.length; i++) {
        const questionNumber = questionNumbers[i];
        const questionValue = document.querySelector(`input[name="no${questionNumber}"]:checked`);

        if (!questionValue) {
            alert(`Please select an option for Question ${questionNumber}.`);
            return;
        }

        if (i >= 5 && i < 10){
            personal += parseInt(questionValue.value)
        }
        
        if (i < 10) {
            score += parseInt(questionValue.value)
        }
        ansArr.push(questionValue.value)

        // console.log(`Question ${questionNumber} Value: ${questionValue.value}`);
    }
    console.log(ansArr)
    console.log(score)
    console.log(personal)
    if (score < 15) {
        riskScore = 1
    } else if (score > 15 && score <= 21) {
        riskScore = 4
    } else if (score > 22 && score <= 29) {
        riskScore = 5
    } else if (score > 30 && score <= 36) {
        riskScore = 7
    } else {
        riskScore = 8
    }

    if(personal >= 13){
        isSensitive = 0
    }else{
        isSensitive = 1
    }  
    setUserData(riskScore,id,ansArr,isSensitive)
})

function setUserData(riskScore,id,ansArr,personal) {
    if(riskScore != null && riskScore != undefined){
        $.ajax({
            url: "/updateriskscore/" + id + "/" + riskScore + "/" + ansArr + "/" + isSensitive,
            type: "POST",
            dataType: "json",
            success: function (response) {
                console.log()
                localStorage.setItem("risk",response)
                window.location.href = "../../frontend/html/customerInfo.html"
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถอัปเดทข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}
