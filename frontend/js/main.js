// // static/js/main.js
// function calculateSum() {
//     var value1 = document.getElementById("inputValue1").value;
//     var value2 = document.getElementById("inputValue2").value;

//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", "/");
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//             document.getElementById("result").innerText = "Sum: " + xhr.responseText;
//         }
//     };
//     xhr.send("value1=" + encodeURIComponent(value1) + "&value2=" + encodeURIComponent(value2));
// }

$(function () {
    console.log("hello")
    // $("#insert_navbar").load("/component/navbar.html")
    
})


function calculateSum() {
    var value1 = $("#inputValue1").val(); // Using jQuery to get the input values
    var value2 = $("#inputValue2").val();

    $.ajax({
        url: "/", // The backend URL
        type: "POST",
        data: { value1: value1, value2: value2 }, // Data to send to the backend
        dataType: "text",
        success: function(result) {
            $("#result").text("Sum: " + result); // Display the result on the page
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

function getUser(userId) {
    $.ajax({
        url: "/user/" + userId, // The user API endpoint with user ID as part of the path
        type: "GET",
        dataType: "json",
        success: function(user) {
            // Display the user data in the userData div
            $("#userData").html("<p>User ID: " + user.Id + "</p><p>User Name: " + user.Name + "</p>");
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}


function getFunFact(id) {
    $.ajax({
        url: "/unique/" + id, // The user API endpoint with user ID as part of the path
        type: "GET",
        dataType: "json",
        success: function(unique) {
            // Display the user data in the userData div
            $("#Funfact").html("<p>Name : " + unique.name_th + "</p><p>User Id: " + unique.unique_id + "</p>");
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

function getAllFunFact(id) {
    $.ajax({
        url: "/allunique/" + id, // The user API endpoint with user ID as part of the path
        type: "GET",
        dataType: "json",
        success: function(response) {
            // Display the user data in the userData div
            html = ""
            for (let index = 0; index < response.length; index++) {
               console.log(response[index])
               html = html + "<p>Name : " + response[index].name_th + "</p><p> Id: " + response[index].unique_id + "</p>"
            }
            $("#Funfact").html(html)
            // $("#Funfact").html("<p>Name : " + unique.name_th + "</p><p>User Id: " + unique.unique_id + "</p>");
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}