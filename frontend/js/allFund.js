$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    if (localStorage.getItem("asset_management_id") === null) {
        window.location.href = "../../frontend/html/assetManagement.html"
    }
    let asset_management_id = localStorage.getItem("asset_management_id")


    show_all_fund(asset_management_id)
})
var currentPage = 1;
var cardsPerPage = 10;
var totalCards = 0;
var data = [];
function show_all_fund(asset_management_id) {
    if (asset_management_id != null && asset_management_id != undefined) {
        $.ajax({
            url: "/getallFund/" + asset_management_id,
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response)
                
                data = [];
                totalCards = response.length;
                
                for (let index = 0 ; index < totalCards ;index ++){

                    if (response[index].fund_status != "EX" && response[index].fund_status != "CA" && response[index].fund_status != "LI" ){
                        data.push(response[index])
                    }
                }
                console.log(data)
                var startIndex = (currentPage - 1) * cardsPerPage;
                var endIndex = Math.min(startIndex + cardsPerPage, totalCards);

                $("#all_fund_name").empty();
                
                var cardsHtml = "";

                for (let index = startIndex; index < endIndex; index++) {

                    if (data.length != 0 ){
                      //let params = `${data[index].proj_name_th},${data[index].proj_name_en},${data[index].proj_id}`
                      //console.log(params.split(","))
                      //cardsHtml += "<div onclick=send_proj_id('" + data[index].proj_id + "', '" + data[index].proj_name_th + "', '" + data[index].proj_name_en + "'); class='card' id='card" + data[index].proj_id +  data[index].proj_name_th + data[index].proj_name_en + "'>";
                      cardsHtml += "<div onclick=\"send_proj_id('" + data[index].proj_id + "');send_fund_name('" +data[index].proj_name_th + "');send_fund_en('" + data[index].proj_name_en + "');send_fund_abbr('" + data[index].proj_abbr_name + "')\" class='card' id='card" + data[index].proj_id + "'>";
                      cardsHtml += "<div class='card-body'><div id='card_name'><h6 id='name_th'>" + data[index].proj_name_th + " (" + data[index].proj_abbr_name + ") " + "</h6><h6 id='name_en'>" + data[index].proj_name_en + "</h6></div></div>";
                      cardsHtml += "</div>";
                    }else{
                        cardsHtml += "<div class='card-body'><div id='card_name'><h6 id='name_th'>" + "ไม่มีกองทุน" + "" + "</h6><h6 id='name_en'>" + "</h6></div></div>";
                        cardsHtml += "</div>";
                        break
                    }
                }

                $("#all_fund_name").append(cardsHtml);
                


                var totalPages = Math.ceil(totalCards / cardsPerPage);
                $("#page_info").text("Page " + currentPage + " of " + totalPages);

                if (currentPage > 1) {
                    document.getElementById("prev_button1").disabled = false;
                    document.getElementById("prev_button2").disabled = false;

                } else {
                    document.getElementById("prev_button1").disabled = true;
                    document.getElementById("prev_button2").disabled = true;
                }

                if (endIndex < totalCards) {
                    document.getElementById("next_button1").disabled = false;
                    document.getElementById("next_button2").disabled = false;
                } else {
                    document.getElementById("next_button1").disabled = true;
                    document.getElementById("next_button2").disabled = true;

                }

                $("#current_page1").text(currentPage + "/" + totalPages);
                $("#current_page2").text(currentPage + "/" + totalPages);
            },
            error: function (xhr, status, error) {
                error_notification('ไม่สามารถดึงข้อมูลได้')
                console.error("Error:", error);
            }
        });
    }
}

function search_by_card_name(searchTerm) {
    var matchingCards = data.filter(function (card) {
        var cardName = card.proj_name_th.toLowerCase() + card.proj_name_en.toLowerCase() + card.proj_abbr_name.toLowerCase();
        return cardName.includes(searchTerm);
    });

    currentPage = 1;

    totalCards = matchingCards.length;

    var startIndex = (currentPage - 1) * cardsPerPage;
    var endIndex = Math.min(startIndex + cardsPerPage, totalCards);

    $("#all_fund_name").empty();

    var cardsHtml = "";

    for (let index = startIndex; index < endIndex; index++) {
        // cardsHtml += "<div onclick=send_proj_id('" + matchingCards[index].proj_id + "') class='card' id='card" + matchingCards[index].proj_id + "'>";
        // cardsHtml += "<div class='card-body'><div id='card_name'><h6>" + matchingCards[index].proj_name_th + "</h6><h6>" + matchingCards[index].proj_name_en + "</h6></div></div>";
        // cardsHtml += "</div>";
        cardsHtml += "<div onclick=\"send_proj_id('" + matchingCards[index].proj_id + "');send_fund_name('" + matchingCards[index].proj_name_th + "');send_fund_en('" + matchingCards[index].proj_name_en + "');send_fund_abbr('" + matchingCards[index].proj_abbr_name + "')\" class='card' id='card" + matchingCards[index].proj_id + "'>";
        cardsHtml += "<div class='card-body'><div id='card_name'><h6 id='name_th'>" + matchingCards[index].proj_name_th + " (" + matchingCards[index].proj_abbr_name + ") " + "</h6><h6 id='name_en'>" + matchingCards[index].proj_name_en + "</h6></div></div>";
        cardsHtml += "</div>";
    }

    $("#all_fund_name").append(cardsHtml);

    var totalPages = Math.ceil(totalCards / cardsPerPage);
    $("#page_info").text("Page " + currentPage + " of " + totalPages);

    if (currentPage > 1) {
        document.getElementById("prev_button1").disabled = false;
        document.getElementById("prev_button2").disabled = false;
    } else {
        document.getElementById("prev_button1").disabled = true;
        document.getElementById("prev_button2").disabled = true;
    }

    if (endIndex < totalCards) {
        document.getElementById("next_button1").disabled = false;
        document.getElementById("next_button2").disabled = false;
    } else {
        document.getElementById("next_button1").disabled = true;
        document.getElementById("next_button2").disabled = true;
    }

    $("#current_page1").text(currentPage);
    $("#current_page2").text(currentPage);
}

$("#search_button").on("click", function () {
    var searchTerm = $("#search_input").val().toLowerCase();
    search_by_card_name(searchTerm);
});

$("#next_button1").on("click", function () {
    if ((currentPage * cardsPerPage) < totalCards) {
        currentPage++;
        show_all_fund(localStorage.getItem("asset_management_id"));
    }
});

$("#prev_button1").on("click", function () {
    if (currentPage > 1) {
        currentPage--;
        show_all_fund(localStorage.getItem("asset_management_id"));
    }
});
$("#next_button2").on("click", function () {
    if ((currentPage * cardsPerPage) < totalCards) {
        currentPage++;
        show_all_fund(localStorage.getItem("asset_management_id"));
    }
});

$("#prev_button2").on("click", function () {
    if (currentPage > 1) {
        currentPage--;
        show_all_fund(localStorage.getItem("asset_management_id"));
    }
});

show_all_fund(localStorage.getItem("asset_management_id"));

function send_proj_id(proj_id) {
    console.log("send:",proj_id)
    var currentdate = new Date();
    var today = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate()
    localStorage.setItem("proj_id", proj_id)
    localStorage.setItem("nav_date", "2023-07-21")
    
    window.location.href = "../../frontend/html/fundDetail.html" //
}

function send_fund_name(proj_name_th) {
    localStorage.setItem("proj_name_th", proj_name_th)
    
}

function send_fund_en(proj_name_en){
    localStorage.setItem("proj_name_en", proj_name_en)
}

function send_fund_abbr(proj_abbr_name){
    localStorage.setItem("proj_abbr_name", proj_abbr_name)
}