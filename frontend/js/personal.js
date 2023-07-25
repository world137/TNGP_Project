$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let name = localStorage.getItem("customername")
    id = localStorage.getItem("id")
    document.getElementById("customer_name").innerHTML += " : " + name
})
var ansArr = []
var score = 0
var personalScore = 0
$("#submit").on("click", function () {

    const questionNumbers = [1, 2];

    // Loop through each question
    score = 0
    for (let i = 0; i < questionNumbers.length; i++) {
        const questionNumber = questionNumbers[i];
        const questionValue = document.querySelector(`input[name="no${questionNumber}"]:checked`);

        if (!questionValue) {
            alert(`Please select an option for Question ${questionNumber}.`);
            return;
        }
        
        score += parseInt(questionValue.value)

        ansArr.push(questionValue.value)

        // console.log(`Question ${questionNumber} Value: ${questionValue.value}`);
    }
    console.log(ansArr)
    console.log(score)
    setUserData(score,id)
})

function setUserData(score,id) {
    if(score != null && score != undefined){
        $.ajax({
            url: "/updatepersonal/" + id + "/" + score,
            type: "POST",
            dataType: "json",
            success: function (response) {
                console.log()
                localStorage.setItem("personal_score",response)
                window.location.href = "../../frontend/html/customerInfo.html"
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถอัปเดทข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}