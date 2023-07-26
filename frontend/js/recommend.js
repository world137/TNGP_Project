
var fundArray = ["M0497_2546", "M0499_2559", "M0697_2562", "M0081_2555", "M0429_2556", "M0096_2545", "M0175_2563", "M0135_2563"]
var nav_date = localStorage.getItem("nav_date")
$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    let isDividendChecked = localStorage.getItem("dividend");
    let isTaxReduceChecked = localStorage.getItem("taxreduce");
    document.getElementById("dividend").checked = false;
    document.getElementById("tax_reduce").checked = false;

    isDividendChecked = JSON.parse(isDividendChecked);
    isTaxReduceChecked = JSON.parse(isTaxReduceChecked);

    console.log(isDividendChecked, isTaxReduceChecked);
    if (isDividendChecked) {
        document.getElementById("dividend").checked = true;
    } else {
        document.getElementById("dividend").checked = false;
    }

    if (isTaxReduceChecked) {
        document.getElementById("tax_reduce").checked = true;
    } else {
        document.getElementById("tax_reduce").checked = false;
    }

    function filterCards() {
        const isDividendChecked = document.getElementById("dividend").checked;
        const isTaxReduceChecked = document.getElementById("tax_reduce").checked;

        $(".fund_card").each(function () {
            const hasDividend = $(this).find(".return").text() === "มีปันผล";
            const hasTaxSSFORRMF = $(this).find(".tax").text() === "SSF" || $(this).find(".tax").text() === "RMF";

            if (isDividendChecked && isTaxReduceChecked) {
                if (hasDividend && hasTaxSSFORRMF) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            } else if (isDividendChecked) {
                if (hasDividend) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            } else if (isTaxReduceChecked) {
                if (hasTaxSSFORRMF) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            } else {
                // Show all cards when both checkboxes are unchecked
                $(this).show();
            }
        });
    }

    // Call the filterCards function initially to show/hide cards on page load
    filterCards();

    // Add event listener to "tax_reduce" checkbox
    $("#tax_reduce").on("change", function () {
        filterCards();
        // Save the state of the checkbox to localStorage
        localStorage.setItem("taxreduce", JSON.stringify(this.checked));
    });

    // Add event listener to "dividend" checkbox
    $("#dividend").on("change", function () {
        filterCards();
        // Save the state of the checkbox to localStorage
        localStorage.setItem("dividend", JSON.stringify(this.checked));
    });


    for (let i = 0; i < fundArray.length; i++) {

        show_NAV(fundArray[i], nav_date)
    }
});


$(document).ready(function () {
    let selectedFunds = [];

    function updateCompareArea() {
        // Clear existing content
        $(".selected_fund_card").empty();

        // Add selected fund cards to the compare_area

        for (let i = 0; i < selectedFunds.length; i++) {

            const fundCard = selectedFunds[i];
            const cloneCard = fundCard.cloneNode(true);
            console.log(cloneCard.querySelector(".data").querySelector(".data_id").innerHTML)
            // cloneCard.querySelector(".view_more").style.display = "none"; // Hide the "Select" button in the selected card
            nav(cloneCard.querySelector(".data").querySelector(".data_id").innerHTML,nav_date,"#selected_fund_" + (i + 1))
            // $("#selected_fund_" + (i + 1)).append(cloneCard);
            $("#selected_fund_" + (i + 1)).append(cloneCard.querySelector(".data").querySelector(".data_id"), cloneCard.querySelector(".data").querySelector(".data_th"), cloneCard.querySelector(".data").querySelector(".data_en"));
           
            
        }
    }

    function removeFromSelected(fundCard) {
        // Remove the fund card from the selectedFunds array
        const index = selectedFunds.indexOf(fundCard);
        if (index !== -1) {
            selectedFunds.splice(index, 1);
            updateCompareArea();
        }
    }

    // Compare button click event
    $("#compare_fund").click(function () {
        // document.getElementById("reset_compare").style.display = "flex"
        document.getElementById("compare_fund").style.display = "none"
        document.getElementById("compare_text").style.display = "flex"



        // Show the compare_area
        $(".compare_area").slideDown();

        // Clear existing selected funds
        selectedFunds = [];

        // Add click event to the fund_card elements
        $(".fund_card").click(function () {
            const fundCard = this;
            document.getElementById("reset_compare").style.display = "flex"
            document.getElementById("compare_text").style.display = "none"

            // Check if the fund card is already selected
            if (selectedFunds.includes(fundCard)) {
                removeFromSelected(fundCard);
            } else {

                if (selectedFunds.length < 2) {
                    // Add the fund card to the selectedFunds array
                    selectedFunds.push(fundCard);
                    updateCompareArea();
                } else {
                    // Show a message that only two funds can be compared at a time
                    warning_notification("You can only compare two funds at a time.");
                }
            }
        });
    });

    $(".compare").on("click", ".re_select", function () {
        document.getElementById("compare_text").style.display = "flex"

        document.getElementById("reset_compare").style.display = "none"
        selectedFunds = []; // Clear the selectedFunds array
        updateCompareArea(); // Update the compare_area to remove all selected fund cards
    });
});

$("#more_fund").on("click", function () {
    window.location.href = "../../frontend/html/assetManagement.html";
});

function find(id, name_th, name_en) {
    localStorage.removeItem("proj_id");
    localStorage.setItem("proj_id", id)
    localStorage.setItem("proj_name_th", name_th)
    localStorage.setItem("proj_name_en", name_en)
    window.location.href = "../../frontend/html/fundDetail.html"

}


function show_NAV(proj_id, nav_date) {
    if (proj_id != null && proj_id != undefined && nav_date != null && nav_date != undefined) {
        $.ajax({
            url: "/getNAV/" + proj_id + "/dailynav/" + nav_date,
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                document.getElementById(proj_id).innerHTML = response.last_val


            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}


function nav(proj_id, nav_date, target) {
    if (proj_id != null && proj_id != undefined && nav_date != null && nav_date != undefined) {
        $.ajax({
            url: "/getNAV/" + proj_id + "/dailynav/" + nav_date,
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                var lastest = parseFloat(response.last_val)
                var previous = parseFloat(response.previous_val)
                var sell = parseFloat(response.amc_info[0].sell_price)

                var diff = (((lastest - sell) / lastest) * 100)

                $(target).append(`<div>วันที่แก้ไขข้อมูลล่าสุด: ${toThaiDateString(response.last_upd_date)}</div>`)
                $(target).append(`<div>วันที่ NAV: ${toThaiDateString(response.nav_date)}</div>`)
                $(target).append(`<div>มูลค่าทรัพย์สินสุทธิ (บาท): ${response.net_asset.toLocaleString("en-US")}</div>`)
                $(target).append(`<div>มูลค่าหน่วยลงทุน (บาท/หน่วย): ${response.last_val}</div>`)
                $(target).append(`<div>มูลค่าหน่วยลงทุนของวันก่อนหน้า (บาท/หน่วย): ${response.previous_val}</div>`)
                $(target).append(`<div>เปอร์เซ็นต์: ${diff.toFixed(2)} %</div>`)

            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}