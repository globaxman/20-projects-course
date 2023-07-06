// @ts-nocheck
// Get quotes form API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


let apiQuotes = [];

// show new quote
function newQuote(){
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // check if author fiels is blank and replace it with 'unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else {
        authorText.textContent = quote.author;
    }

    // check quote length to determine styling
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    
    quoteText.textContent = quote.text;
}

async function getQuotes(){
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response  = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        // Cattch Error here
    }
};

// On load
getQuotes();
