//Load data.json


function loadImages(data) {

    //Gets query param from url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const type = urlSearchParams.get('type');

    const paramData = data[type]['urls'];
    const folderImgPath = type.split(' ').join('_')

    // Create repeating elements
    const parentElement = document.getElementById("image-container");    

    const nameElement = document.getElementById("name");
    nameElement.textContent = type;

    const intoTextElement = document.getElementById("intro-text");
    intoTextElement.textContent += type.toLocaleLowerCase();
    intoTextElement.textContent += " projects";

    console.log(data);
    console.log(paramData);

    paramData.forEach((imageName) => {

        const img = document.createElement("img"); // create img element
        const itemDiv = document.createElement("div");
        const linkDiv = document.createElement("div");
        const textDiv = document.createElement("div");

        itemDiv.classList.add('service-item-lg');
        linkDiv.classList.add('service-link-lg');
        textDiv.classList.add('overlayText-bottom');
        textDiv.textContent = type;

        itemDiv.appendChild(linkDiv);
        linkDiv.appendChild(textDiv);
        linkDiv.appendChild(img);

        img.setAttribute("data-src", `images/${folderImgPath}/${imageName}`); // set data-src attribute
        img.setAttribute("src", `images/thumbnails/loading.gif`); // set src attribute
        img.setAttribute("class", "lazyload"); // set class attribute
        img.setAttribute("alt", type); // set alt attribute
        img.classList.add('img-size');

        parentElement.appendChild(itemDiv);
    });

    // Call Lazy load
    var lazyLoad = new LazyLoad();
}

window.onload = function () {


    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "data.json", true);
    xhttp.responseType = "json";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myData = this.response;
            loadImages(myData);
        }
    };
    xhttp.send();
}

// get query param value for "type"
// load the data.json file
// cast the file data into map
// get data where the key is the value for "type" above.
// generate the repeat elements for each image url in the map
// find the div with the id "image-container"
// add the newly generated elements into that div
// call lazyload function to init the image loading when image is in the view port (ie lazyload())