// Get quotes form API

let apiQuotes = [];

async function getQuotes(){
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response  = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes[3]);
    } catch(error) {
        // Cattch Error here
    }
};

// On load
getQuotes();
