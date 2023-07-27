$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")

    //localStorage.clear

    five_fisrt(proj_id)
})

function five_fisrt(proj_id) {
    var risk = ""
    if (proj_id != null && proj_id != undefined) {
        $.ajax({
            url: "/getFiveMost/" + proj_id + "/getFiveMost/" + "202304",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)

                sum = response[0].secur_Invest_size + response[1].secur_Invest_size + response[2].secur_Invest_size + response[3].secur_Invest_size + response[4].secur_Invest_size
                others = 100-sum   
                const data = {
                    labels: [response[0].secur_name,response[1].secur_name, response[2].secur_name,response[3].secur_name,response[4].secur_name,'others'],
                    datasets: [{
                      data: [response[0].secur_Invest_size,response[1].secur_Invest_size, response[2].secur_Invest_size,response[3].secur_Invest_size,response[4].secur_Invest_size,others],
                      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF','#FFA07A'],
                      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF','#FFA07A']
                    }]
                };
                const options = {
                    responsive: true,
                    maintainAspectRatio : false
                  };

                const ctx = document.getElementById("myChart")
                const myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: data,
                    options: options
                });
               
   
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}