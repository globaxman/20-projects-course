// @ts-nocheck
const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Promt to select media stream, pass to video element, then play
async function selectMediaStream(){
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.onplay();
        }
    } catch(error){

    }
}

button.addEventListener('click', async () => {
    // disalble button
    button.disabled = true;
    // Start Picture in picture
    await videoElement.requestPictureInPicture();
    // reset button
    button.disabled = false;
})

//  on load
selectMediaStream();