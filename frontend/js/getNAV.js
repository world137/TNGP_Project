$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let proj_id = localStorage.getItem("proj_id")
    let nav_date = localStorage.getItem("nav_date")

    //localStorage.clear()

    show_NAV(proj_id, nav_date)
})

function show_NAV(proj_id, nav_date) {
    if (proj_id != null && proj_id != undefined && nav_date != null && nav_date != undefined) {
        $.ajax({
            url: "/getNAV/" + proj_id + "/dailynav/" + nav_date,
            type: "GET",
            dataType: "json",
            success: function (response) {

                if (response != undefined && response != "" && response != []) {
                    localStorage.setItem("nav_price", response.last_val)
                    console.log(response)
                    if (response.amc_info != null) {
                        var lastest = parseFloat(response.last_val)
                        var previous = parseFloat(response.previous_val)
                        var sell = parseFloat(response.amc_info[0].sell_price)

                        var diff = (((lastest - sell) / lastest) * 100)
                    } else {
                        console.log(response)
                        var lastest = parseFloat(response.last_val)
                        var previous = parseFloat(response.previous_val)
                        var sell = previous

                        var diff = (((lastest - sell) / lastest) * 100)
                    }
                    $("#nav").append(`<div style="color:grey;font-size:12px">ราคา NAV ณ วันที่: ${toThaiDateString(response.nav_date)}</div>`)
                    $("#nav").append(`<div>มูลค่าทรัพย์สินสุทธิ (บาท): ${response.net_asset.toLocaleString("en-US")}</div>`)
                    $("#nav").append(`<div>มูลค่าหน่วยลงทุน (บาท/หน่วย): ${response.last_val}</div>`)
                    $("#nav").append(`<div>เปอร์เซ็นต์: ${diff.toFixed(2)} %</div>`)
                    $("#lastest_date").append(`<div>วันที่แก้ไขข้อมูลล่าสุด: ${toThaiDateString(response.last_upd_date)}</div>`)
                    localStorage.setItem("nav_price", response.last_val)
                    document.getElementById("nav_for_buy").innerHTML = 'ราคาต่อหน่วย: ' + response.last_val
                    console.log(response.last_val)

                } else {
                    console.log(response)
                    var lastest = 0.0
                    var previous = 0.0
                    var sell = 0.0

                    var diff = 0.0

                    $("#nav").append(`<div>วันที่แก้ไขข้อมูลล่าสุด: - </div>`)
                    $("#nav").append(`<div>วันที่ NAV: - </div>`)
                    $("#nav").append(`<div>มูลค่าทรัพย์สินสุทธิ (บาท): - </div>`)
                    $("#nav").append(`<div>มูลค่าหน่วยลงทุน (บาท/หน่วย): - </div>`)
                    $("#nav").append(`<div>มูลค่าหน่วยลงทุนของวันก่อนหน้า (บาท/หน่วย): - </div>`)
                    $("#nav").append(`<div>เปอร์เซ็นต์: - %</div>`)
                }


            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}

function toThaiDateString(date) {
    if (date != "") {
        date = new Date(date)
        let monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
            "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
            "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];

        let year = date.getFullYear() + 543;
        let month = monthNames[date.getMonth()];
        let numOfDay = date.getDate();

        let hour = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");
        let second = date.getSeconds().toString().padStart(2, "0");

        return `${numOfDay} ${month} ${year} ` +
            `${hour}:${minutes}:${second} น.`;
    } else {
        date = new Date()
        let monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
            "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
            "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];

        let year = date.getFullYear() + 543;
        let month = monthNames[date.getMonth()];
        let numOfDay = date.getDate();

        let hour = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");
        let second = date.getSeconds().toString().padStart(2, "0");

        return `${numOfDay} ${month} ${year} ` +
            `${hour}:${minutes}:${second} น.`;
    }

}