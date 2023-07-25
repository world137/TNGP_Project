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
                    else if (data[index].rate != "-" && data[index].class_abbr_name.endsWith("-A")) {
                        feeClassAHeader = data[index].class_abbr_name;
                        feeClassA += "<div>"+data[index].fee_type_desc + ": " + data[index].rate +"</div>";
                    }
                    else if (data[index].rate != "-" && data[index].class_abbr_name.endsWith("-D")) {
                        feeClassDHeader = data[index].class_abbr_name;
                        feeClassD += "<div>"+data[index].fee_type_desc + ": " + data[index].rate +"</div>";
                    }
                    else if (data[index].rate != "-" && data[index].class_abbr_name.endsWith("-E")) {
                        feeClassEHeader = data[index].class_abbr_name;
                        feeClassE += "<div>"+data[index].fee_type_desc + ": " + data[index].rate +"</div>";
                    }
                }

                if(feeClassless != ""){
                    $("#feeClassless").append(feeClassless)
                }

                if(feeClassAHeader != "" && feeClassA != ""){
                    $("#feeClassA").append(feeClassAHeader)
                    $("#feeClassA").append(feeClassA)
                }

                if(feeClassDHeader != "" && feeClassD != ""){
                    $("#feeClassD").append(feeClassDHeader)
                    $("#feeClassD").append(feeClassD)
                }

                if(feeClassEHeader != "" && feeClassE != ""){
                    $("#feeClassE").append(feeClassEHeader)
                    $("#feeClassE").append(feeClassE)
                }

            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}
