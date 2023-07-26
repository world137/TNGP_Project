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
                var feeClassPHeader = ""
                var feeClassBHeader = ""
                var feeClassSSFHeader = ""
                var feeClassSSFXHeader = ""
                var feeClassCHeader = ""
                var feeClassIHeader = ""

                var feeClassless = ""
                var feeClassA = ""
                var feeClassD = ""
                var feeClassE = ""
                var feeClassP = ""
                var feeClassB = ""
                var feeClassSSF = ""
                var feeClassSSFX = ""
                var feeClassC = ""
                var feeClassI = ""

                for (let index = 0; index < data.length; index++) {
                    if (data[index].rate != "-" && data[index].class_abbr_name.endsWith("-")) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassless += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassless += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassless += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-A") || data[index].class_abbr_name.endsWith("(A)") || data[index].class_abbr_name.endsWith("A"))) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassAHeader = data[index].class_abbr_name;
                            feeClassA += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassAHeader = data[index].class_abbr_name;
                            feeClassA += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassAHeader = data[index].class_abbr_name;
                            feeClassA += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-D") || data[index].class_abbr_name.endsWith("(D)") || data[index].class_abbr_name.endsWith("D"))) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassDHeader = data[index].class_abbr_name;
                            feeClassD += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassDHeader = data[index].class_abbr_name;
                            feeClassD += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassDHeader = data[index].class_abbr_name;
                            feeClassD += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-E") || data[index].class_abbr_name.endsWith("(E)" || data[index].class_abbr_name.endsWith("D")))) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassEHeader = data[index].class_abbr_name;
                            feeClassE += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassEHeader = data[index].class_abbr_name;
                            feeClassE += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassEHeader = data[index].class_abbr_name;
                            feeClassE += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-P") || data[index].class_abbr_name.endsWith("(P)" || data[index].class_abbr_name.endsWith("P")))) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassPHeader = data[index].class_abbr_name;
                            feeClassP += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassPHeader = data[index].class_abbr_name;
                            feeClassP += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassPHeader = data[index].class_abbr_name;
                            feeClassP += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-B") || data[index].class_abbr_name.endsWith("(B)" || data[index].class_abbr_name.endsWith("B")))) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassBHeader = data[index].class_abbr_name;
                            feeClassB += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassBHeader = data[index].class_abbr_name;
                            feeClassB += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassBHeader = data[index].class_abbr_name;
                            feeClassB += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-SSF") || data[index].class_abbr_name.endsWith("(SSF)" || data[index].class_abbr_name.endsWith("SSF")))) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassSSFHeader = data[index].class_abbr_name;
                            feeClassSSF += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassSSFHeader = data[index].class_abbr_name;
                            feeClassSSF += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassSSFHeader = data[index].class_abbr_name;
                            feeClassSSF += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-SSFX") || data[index].class_abbr_name.endsWith("(SSFX)" || data[index].class_abbr_name.endsWith("SSFX")))) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassSSFXHeader = data[index].class_abbr_name;
                            feeClassSSFX += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassSSFXHeader = data[index].class_abbr_name;
                            feeClassSSFX += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassSSFXHeader = data[index].class_abbr_name;
                            feeClassSSFX += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-C") || data[index].class_abbr_name.endsWith("(C)" || data[index].class_abbr_name.endsWith("C")))) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassCHeader = data[index].class_abbr_name;
                            feeClassC += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassCHeader = data[index].class_abbr_name;
                            feeClassC += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassCHeader = data[index].class_abbr_name;
                            feeClassC += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                    else if (data[index].rate != "-" && (data[index].class_abbr_name.endsWith("-I") || data[index].class_abbr_name.endsWith("(I)" || data[index].class_abbr_name.endsWith("I")))) {
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการขายหน่วยลงทุน (Front-end Fee)") {
                            feeClassIHeader = data[index].class_abbr_name;
                            feeClassI += "<div>" + "ค่าธรรมเนียมขาย" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการรับซื้อคืนหน่วยลงทุน (Back-end Fee)") {
                            feeClassIHeader = data[index].class_abbr_name;
                            feeClassI += "<div>" + "ค่าธรรมเนียมรับซื้อคืน" + ": " + data[index].rate + "%</div>";
                        }
                        if (data[index].fee_type_desc == "ค่าธรรมเนียมการจัดการ") {
                            feeClassIHeader = data[index].class_abbr_name;
                            feeClassI += "<div>" + data[index].fee_type_desc + ": " + data[index].rate + "%</div>";
                        }
                    }
                }

                if (feeClassless != "") {
                    console.log("feeClassless", feeClassless)
                    $("#feeClassless").append(feeClassless)
                    var havingFeeBlock = document.getElementById('feeblockClassless')
                    var havingClass = document.getElementById('feeClassless')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if (feeClassAHeader != "" && feeClassA != "") {
                    console.log("feeClassA", feeClassA)
                    $("#feeClassA").append("<center><b>" + feeClassAHeader + "</b><center>")
                    $("#feeClassA").append(feeClassA)
                    var havingFeeBlock = document.getElementById('feeblockClassA')
                    var havingClass = document.getElementById('feeClassA')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if (feeClassDHeader != "" && feeClassD != "") {
                    console.log("feeClassD", feeClassD)
                    $("#feeClassD").append("<center><b>" + feeClassDHeader + "</b><center>")
                    $("#feeClassD").append(feeClassD)
                    var havingFeeBlock = document.getElementById('feeblockClassD')
                    var havingClass = document.getElementById('feeClassD')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if (feeClassEHeader != "" && feeClassE != "") {
                    console.log("feeClassE", feeClassE)
                    $("#feeClassE").append("<center><b>" + feeClassEHeader + "</b><center>")
                    $("#feeClassE").append(feeClassE)
                    var havingFeeBlock = document.getElementById('feeblockClassE')
                    var havingClass = document.getElementById('feeClassE')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if (feeClassPHeader != "" && feeClassP != "") {
                    console.log("feeClassP", feeClassP)
                    $("#feeClassP").append("<center><b>" + feeClassPHeader + "</b><center>")
                    $("#feeClassP").append(feeClassP)
                    var havingFeeBlock = document.getElementById('feeblockClassP')
                    var havingClass = document.getElementById('feeClassP')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if (feeClassBHeader != "" && feeClassB != "") {
                    console.log("feeClassB", feeClassB)
                    $("#feeClassB").append("<center><b>" + feeClassBHeader + "</b><center>")
                    $("#feeClassB").append(feeClassB)
                    var havingFeeBlock = document.getElementById('feeblockClassB')
                    var havingClass = document.getElementById('feeClassB')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if (feeClassSSFHeader != "" && feeClassSSF != "") {
                    console.log("feeClassSSF", feeClassSSF)
                    $("#feeClassSSF").append("<center><b>" + feeClassSSFHeader + "</b><center>")
                    $("#feeClassSSF").append(feeClassSSF)
                    var havingFeeBlock = document.getElementById('feeblockClassSSF')
                    var havingClass = document.getElementById('feeClassSSF')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if (feeClassSSFXHeader != "" && feeClassSSFX != "") {
                    console.log("feeClassSSFX", feeClassSSFX)
                    $("#feeClassSSF").append("<center><b>" + feeClassSSFXHeader + "</b><center>")
                    $("#feeClassSSFX").append(feeClassSSFX)
                    var havingFeeBlock = document.getElementById('feeblockClassSSFX')
                    var havingClass = document.getElementById('feeClassSSFX')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if (feeClassCHeader != "" && feeClassC != "") {
                    console.log("feeClassC", feeClassC)
                    $("#feeClassC").append("<center><b>" + feeClassCHeader + "</b><center>")
                    $("#feeClassC").append(feeClassC)
                    var havingFeeBlock = document.getElementById('feeblockClassC')
                    var havingClass = document.getElementById('feeClassC')
                    havingFeeBlock.style.display = 'block'
                    havingClass.style.display = 'inline'
                }

                if (feeClassIHeader != "" && feeClassI != "") {
                    console.log("feeClassI", feeClassI)
                    $("#feeClassI").append("<center><b>" + feeClassIHeader + "</b><center>")
                    $("#feeClassI").append(feeClassI)
                    var havingFeeBlock = document.getElementById('feeblockClassI')
                    var havingClass = document.getElementById('feeClassI')
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
