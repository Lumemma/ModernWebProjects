const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];


function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show newQuote
function newQuote(){
    showLoading();
   //pick a random quote from apiQuotes array
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   //console.log(quote)
   
   //check if author field is null and replace it with "unknown"
   if (!quote.author) {
       authorText.textContent = "unknown";
   }else {
    authorText.textContent = quote.author;
   }
   //dynamically font-size for long quotes (stying)
   if (quote.text.length > 100) {
       quoteText.classList.add("long-quote")
   }else {
    quoteText.classList.remove("long-quote")
   }
   //set quote , hide loader
   quoteText.textContent = quote.text;
   removeLoading();
}
//*---loadQuotes from the file quotes.js---*
// function newQuote(){
//     //pick a random quote from localQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * LocalQuotes.length)];
//  console.log(quote)
//  }

// Getting quotes from API
async function getQuotes(){
    showLoading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[10]);
        newQuote();
    } catch (error) {
        
    }
}

//Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

//Event Listener
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);
//onLoad
getQuotes();

// newQuote //for the local file quote.js