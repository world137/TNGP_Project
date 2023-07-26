$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")

    // localStorage.clear()
    show_fee(proj_id)
})
var data = [];
function show_fee(proj_id) {
    if (proj_id != null && proj_id != undefined) {
        $.ajax({
            url: "/getFee/" + proj_id + "/fee",
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log("Fee = " + response)

                data = response;

                $("#fee").empty();

                var feeClassAHeader = ""
                var feeClassDHeader = ""
                var feeClassEHeader = ""
                var feeClassless = ""
                var feeClassA = ""
                var feeClassD = ""
                var feeClassE = ""

                for (let index = 0; index < data.length; index++) {
                    if (data[index].rate != "-" && data[index].class_abbr_name.endsWith("-")) {
                        feeClassless += "<div>"+data[index].fee_type_desc + ": " + data[index].rate + "</div>";
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-A") || data[index].class_abbr_name.endsWith("(A)"))) {
                        feeClassAHeader = data[index].class_abbr_name;
                        feeClassA += "<div>"+data[index].fee_type_desc + ": " + data[index].rate +"</div>";
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-D") || data[index].class_abbr_name.endsWith("(D)"))) {
                        feeClassDHeader = data[index].class_abbr_name;
                        feeClassD += "<div>"+data[index].fee_type_desc + ": " + data[index].rate +"</div>";
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-E") || data[index].class_abbr_name.endsWith("(E)"))) {
                        feeClassEHeader = data[index].class_abbr_name;
                        feeClassE += "<div>"+data[index].fee_type_desc + ": " + data[index].rate +"</div>";
                    }
                }

                if(feeClassless != ""){
                    console.log("feeClassless",feeClassless)
                    $("#feeClassless").append(feeClassless)
                    var havingFeeBlock = document.getElementById('feeblockClassless')
                    var havingClass = document.getElementById('feeClassless')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if(feeClassAHeader != "" && feeClassA != ""){
                    console.log("feeClassA",feeClassA)
                    $("#feeClassA").append("<center><b>"+feeClassAHeader+"</b><center>")
                    $("#feeClassA").append(feeClassA)
                    var havingFeeBlock = document.getElementById('feeblockClassA')
                    var havingClass = document.getElementById('feeClassA')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if(feeClassDHeader != "" && feeClassD != ""){
                    console.log("feeClassD",feeClassD)
                    $("#feeClassD").append("<center><b>"+feeClassDHeader+"</b><center>")
                    $("#feeClassD").append(feeClassD)
                    var havingFeeBlock = document.getElementById('feeblockClassD')
                    var havingClass = document.getElementById('feeClassD')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if(feeClassEHeader != "" && feeClassE != ""){
                    console.log("feeClassE",feeClassE)
                    $("#feeClassE").append("<center><b>"+feeClassEHeader+"</b><center>")
                    $("#feeClassE").append(feeClassE)
                    var havingFeeBlock = document.getElementById('feeblockClassE')
                    var havingClass = document.getElementById('feeClassE')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}
