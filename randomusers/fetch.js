// Create the type of element you pass in as a new element
function createNode(elementType) {
    return document.createElement(elementType);
}

// Create the type of element you pass in as a new element, and set its className
function createNode(elementType, className) {
    let node = document.createElement(elementType);
    node.setAttribute('class', className);
    return node;
}

// Append the second parameter(child) to the first parameter(parent)
function append(parent, child) {
    return parent.appendChild(child);
}

// app will be #root from html
const app = document.getElementById('root');

// content from API will go in #pageTitle, with className pageTitle
const pageTitle = createNode('h1', 'pageTitle');
pageTitle.innerHTML = 'Random User Example';

// content from API will go in #container, with className container
const container = createNode('div', 'container');

// app consists of 'title' then 'container'
append(root, pageTitle);
append(root, container);


// fetch response from API endpoint
const url = 'https://randomuser.me/api/?results=10';

fetch(url)
    .then((response) => response.json()) // Get response
    .then(function (data) { // Handle response

        console.log("data starts here");
        console.log(data);
        // Save response to variable
        const randomUsers = data.results;
        
        // Map through the response and for each entry run the code below
        return randomUsers.map(function (randomUsers) { 
            
            // Create the elements we need
            let card = createNode('div', 'card'),
                wrapper = createNode('div', 'wrapper'),
                img = createNode('img', 'img')
                text = createNode('div', 'text');
            
            // Add the source of the image to be the src of the img element
            img.src = randomUsers.picture.medium;
            
            // Make the HTML of our text to be the first and last name of our user
            text.innerHTML = `${randomUsers.name.first} ${randomUsers.name.last}`;
            
            // Append card to container
            append(wrapper, img);
            append(wrapper, text);
            append(card, wrapper);
            append(container, card);
        })

    })
    .catch(function (error) {
        console.log(error);
    });