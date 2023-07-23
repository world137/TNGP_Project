$(function () {
    $("#insert_navbar").load("../component/navbar.html");
    $("#insert_snackbar").load("../component/snackbar.html");
})
$("#search_input").on("change", function() {
    var searchTerm = $(this).val().trim().toLowerCase();

    $(".user_card").each(function() {
        var customerName = $(this).find(".customer_name").text().toLowerCase();
        if (customerName.includes(searchTerm)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});

$(".search_button").click(function () {
    var searchTerm = $("#search_input").val().trim().toLowerCase();

    $(".user_card").each(function () {
        var customerName = $(this).find(".customer_name").text().toLowerCase();
        if (customerName.includes(searchTerm)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
