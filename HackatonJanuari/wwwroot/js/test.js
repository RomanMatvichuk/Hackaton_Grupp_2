
var roverKEY = "api_key=86lFhJYGhotgZg9tabUmZFMJALyrDJOFZF9q4qTY"
var roverURL = "https://api.nasa.gov/mars-photos/api/v1/rovers?";

getList();


async function getList() {
    var rovers = await fetch(roverURL + roverKEY)
        .then(response => response.json())
        .catch(error => document.write(error));
    roverData = JSON.stringify(rovers);



    var roversJson = await JSON.parse(roverData);


    var htmlLines = "";

    for (var i = 0; i < roversJson.rovers.length; i++) {
        htmlLines += "<li class=\"nav-item dropdown\">"
        htmlLines += "<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"" + roversJson.rovers[i].name + "\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">";
        htmlLines += roversJson.rovers[i].name + "</a>";
        htmlLines += "<div class=\"dropdown-menu\" aria-labelledby=\"" + roversJson.rovers[i].name + "\">";

        for (var j = 0; j < roversJson.rovers[i].cameras.length; j++) {
            htmlLines += "<a class=\"dropdown-item\" href=\"#\">" + roversJson.rovers[i].cameras[j].full_name + "</a>";
            

        }
        htmlLines += "</div></li>";
    }


    document.getElementById("home").insertAdjacentHTML("afterend", htmlLines);
}