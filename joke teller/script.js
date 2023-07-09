// @ts-nocheck
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// VoiceRSS Javascript SDK

// Disable/enable button
function toggleButton(){
    button.disabled = !button.disabled;
}

// possing joke to voicerss api
function tellMe(joke){
    VoiceRSS.speech({
        key: 'your api',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from joke api
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text to sceach
        tellMe(joke);
        // disable button
        toggleButton();
    } catch(error) {
        console.log("ops", error);
    }
}


// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
