let images = document.getElementById("images");

var KEY = "86lFhJYGhotgZg9tabUmZFMJALyrDJOFZF9q4qTY"
var roverURL = "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=";

getList();

function showImages(Sol, Rover, Camera, MAX_NUM) {
    let myJSON = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + Rover + "/photos?sol=" + Sol + "&camera=" + Camera + "&api_key=" + KEY;
    console.log(myJSON);
    fetch(myJSON)
        .then(response => response.json())
        .then(function (jsonHackathon) {
            images.innerHTML = "";
            for (let i = 0; i < jsonHackathon.photos.length || i < MAX_NUM; i++) {
                images.innerHTML += "<div class=\"col-3\"> <div class=\"thumbnail\"> <a href=\" " + jsonHackathon.photos[i].img_src + "\"><img src=\" " + jsonHackathon.photos[i].img_src + "\" alt=\" " + jsonHackathon.photos[i].camera.full_name + " \" style=\"width:100%\"/> <div class=\"caption\"> <p>" + jsonHackathon.photos[i].camera.full_name + "</p> </div> </a> </div> </div>";
            }
        })
        .catch(err => console.log(JSON.stringify(err)));
}

async function getList() {
    var roversJson = await fetch(roverURL + KEY)
        .then(response => response.json())
        .catch(error => document.write(error));

    var htmlLines = "";

    for (var i = 0; i < roversJson.rovers.length; i++) {
        htmlLines += `<li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="${roversJson.rovers[i].name}" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${roversJson.rovers[i].name}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="${roversJson.rovers[i].name}">`;

        for (var j = 0; j < roversJson.rovers[i].cameras.length; j++) {
            var func = `"showImages(1000, '${roversJson.rovers[i].name}', '${roversJson.rovers[i].cameras[j].name}', 5)">${roversJson.rovers[i].cameras[j].full_name}`;
            htmlLines += `<a class="dropdown-item" href="javascript:void(0);" onclick=${func}</a>`;
        }

        htmlLines += "</div></li>";
    }

    document.getElementById("home").insertAdjacentHTML("afterend", htmlLines);
}