
var fundArray = ["C0000000623"]

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
    if(isDividendChecked){
        document.getElementById("dividend").checked = true;
    }else{
        document.getElementById("dividend").checked = false;
    }

    if(isTaxReduceChecked){
        document.getElementById("tax_reduce").checked = true;
    }else{
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
});

$("#more_fund").on("click", function () {
    window.location.href = "../../frontend/html/assetManagement.html";
});

function find(id,name_th,name_en) {
    localStorage.removeItem("proj_id");
    localStorage.setItem("proj_id",id)
    localStorage.setItem("proj_name_th",name_th)
    localStorage.setItem("proj_name_en",name_en)
    window.location.href = "../../frontend/html/fundDetail.html" 

}