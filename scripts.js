// app will be #root from html
const app = document.getElementById('root');

// studio ghibli logo
const logo = document.createElement('img');
logo.src = 'logo.png';

// content from API will go in container
const container = document.createElement('div');
container.setAttribute('class', 'container');

// app consists of 'logo' then 'container'
app.appendChild(logo);
app.appendChild(container);


// create a request variable and assign a new XMLHttpRequest object to it
var request = new XMLHttpRequest();
// opens a new connection, using the GET request on the API endpoint URL
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function () {

    // begin accessing JSON data
    var data = JSON.parse(this.response);
    
    // check for http status code abnormalities
    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {

            // create a div with a card class
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            // create an h1 and set the text content to the film's title
            const h1 = document.createElement('h1');
            h1.textContent = movie.title;
            // console.log(movie.title);

            // create a p and set the text content to the film's description
            const p = document.createElement('p');
            movie.description = movie.description.substring(0, 300); // limit to 300 char
            p.textContent = `${movie.description}...`; // end with an ellipses
            // console.log(movie.description);

            // append the cards to the container element
            container.appendChild(card);
            
            // append h1 (title) and p (description) to each card
            card.appendChild(h1);
            card.appendChild(p);

        });
    } else {
        // create floating / flying warning text
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Error! Something is wrong!!`;
        app.appendChild(errorMessage);
        // console.log('error');
    }
}

request.send();