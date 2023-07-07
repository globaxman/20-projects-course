// @ts-nocheck
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// unsplash API
const count = 10;
const apiKey = 'your api key';
const apiUrl = `https://api.unsplash.com//photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
};


// helper func to set attributes on dom elems
function setAttributes(elem, attributes){
    for (key in attributes){
    elem.setAttribute(key, attributes[key]);
    }
}

// get elements for links & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach(photo => {
        // create <a> to link to unplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        //  create <img> for photo
        setAttributes(item, {href: photo.links.html,
                            target: '_blank',});
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {src: photo.urls.regular,
                            alt: photo.alt_description,
                            title: photo.alt_description});


        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // put <img> inside <a>, and then put both inside imagecontainer elem
        item.appendChild(img);
        imageContainer.appendChild(item)

    });
}


async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // ///////// displaing photos
        displayPhotos();
        console.log(photosArray);
    } catch(error) {
        // catch an error here
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//  on load
getPhotos();