$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
    get_all_asset_management()
})
var currentPage = 1;
var cardsPerPage = 5;
var totalCards = 0;
var data = [];

function get_all_asset_management() {
    $.ajax({
        url: "/getallAssetManagement/",
        type: "GET",
        dataType: "json",
        success: function (response) {
            data = response;
            totalCards = response.length;

            var startIndex = (currentPage - 1) * cardsPerPage;
            var endIndex = Math.min(startIndex + cardsPerPage, totalCards);

            $("#all_asset_management_name").empty();

            var cardsHtml = "";

            for (let index = startIndex; index < endIndex; index++) {
                cardsHtml += "<div onclick=show_all_fund('" + data[index].unique_id + "') class='card' id='card" + data[index].unique_id + "'>";
                cardsHtml += "<div class='card-body'><div id='card_name'><h6>" + data[index].name_th + "</h6><h6>" + data[index].name_en + "</h6></div></div>";
                cardsHtml += "</div>";
            }

            $("#all_asset_management_name").append(cardsHtml);

            var totalPages = Math.ceil(totalCards / cardsPerPage);

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
function search_by_card_name(searchTerm) {
    var matchingCards = data.filter(function (card) {
        var cardName = card.name_th.toLowerCase() + card.name_en.toLowerCase();
        return cardName.includes(searchTerm);
    });

    currentPage = 1;

    totalCards = matchingCards.length;

    var startIndex = (currentPage - 1) * cardsPerPage;
    var endIndex = Math.min(startIndex + cardsPerPage, totalCards);

    $("#all_asset_management_name").empty();

    var cardsHtml = "";

    for (let index = startIndex; index < endIndex; index++) {
        cardsHtml += "<div onclick=show_all_fund('" + matchingCards[index].unique_id + "') class='card' id='card" + matchingCards[index].unique_id + "'>";
        cardsHtml += "<div class='card-body'><div id='card_name'><h6>" + matchingCards[index].name_th + "</h6><h6>" + matchingCards[index].name_en + "</h6></div></div>";
        cardsHtml += "</div>";
    }

    $("#all_asset_management_name").append(cardsHtml);

    var totalPages = Math.ceil(totalCards / cardsPerPage);

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
        get_all_asset_management();
    }
});

$("#prev_button1").on("click", function () {
    if (currentPage > 1) {
        currentPage--;
        get_all_asset_management();
    }
});
$("#next_button2").on("click", function () {
    if ((currentPage * cardsPerPage) < totalCards) {
        currentPage++;
        get_all_asset_management();
    }
});

$("#prev_button2").on("click", function () {
    if (currentPage > 1) {
        currentPage--;
        get_all_asset_management();
    }
});
get_all_asset_management();

get_all_asset_management();
function show_all_fund(asset_management_id, asset_management_name) {
    localStorage.setItem("asset_management_id", asset_management_id)
    window.location.href = "../../frontend/html/allFund.html"
}
