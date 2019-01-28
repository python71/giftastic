var gifArray = ["kittens", "puppies", "kangaroos", "rhinos", "blackbuck", "gazelle", "bighorn sheep", "pronghorn", "bison", "buffalo"];
var gifArea = $("#gifs-appear-here");

function makeButtons() {
    var buttonMaker = $(".test");
    buttonMaker.empty();

    for (var i = 0; i < gifArray.length; i++) {
        var dispButton = $("<button  type='button' class='btn btn-secondary' data-animal='" + gifArray[i] + "'>").text(gifArray[i]);
        buttonMaker.append(dispButton);
    }
}

makeButtons();

// Adding click event listen listener to all buttons
$("body").on("click", "button", function () {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            gifArea.empty();
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");
                animalDiv.css("float", "left").css("padding-left", "3%");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item (still)
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("still", results[i].images.fixed_height_still.url);
                animalImage.attr("animate", results[i].images.fixed_height.url);

                // Creating click event on image to be still or animate
                animalImage.on("click", function () {
                    var still = $(this).attr("still");
                    var animate = $(this).attr("animate");
                    if ($(this).attr("src") == still) {
                        $(this).attr("src", animate);
                    } else {
                        $(this).attr("src", still);
                    };
                })

                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                gifArea.prepend(animalDiv);
                // animalDiv.empty();

            }
        });
});

// takes the user input and makes a button
$(".giphy-input").on("click", function () {
    // This line grabs the input from the textbox
    var newGif = $("#gif-input").val().trim().toLowerCase();
    gifArray.push(newGif);
    // console.log(gifArray);
    makeButtons();
})

// adds a button from user input on keypress and clears input box
$("#gif-input").on("keypress", function search(e) {
    if (e.keyCode == 13) {
        gifArray.push($("#gif-input").val().trim().toLowerCase());
        makeButtons();
        $(this).val("");
    }
});