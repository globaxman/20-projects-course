 // @ts-nocheck
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let photosArray = [];


// get elements for links & photos, add to DOM
function displayPhotos(){
    // run function for each object in photosArray
    photosArray.forEach(photo => {
        // create <a> to link to unplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //  create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // put <img> inside <a>, and then put both inside imagecontainer elem
        item.appendChild(img);
        imageContainer.appendChild(item)

    });
}

// unsplash API
const count = 10;
const apiKey = 'RASIvQmP-Gloq1jaf8Ubxz-oWuCpA3LKxIeuAoMJ9U8';
const apiUrl = `https://api.unsplash.com//photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
    } catch(error) {
        // catch an error here
    }
}

//  on load
getPhotos();