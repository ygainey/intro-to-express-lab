const express = require('express')

const app = express()

// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.

// Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

// Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”

app.get('/greetings/:name', (req, res) => {
    return res.send(`Hello ${req.params.name}!`)    
})


// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

// Examples: Matches routes like /roll/6 or /roll/20.

// Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.

// Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”

app.get('/roll/:rollNum', (req, res) => {
    const num = parseInt(req.params.rollNum)
    if(isNaN(num)){
        return res.send('You must specify a number')
    }else{
        return res.send(`You rolled a ${req.params.rollNum}`)
    }
})


// 3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter>.

// Examples: Matches routes such as /collectibles/2 or /collectibles/0.

// Validation: If the index does not correspond to an item in the array, respond with “This item is not yet in stock. Check back soon!”

// Response: Should describe the item at the given index, like “So, you want the shiny ball? For 5.95, it can be yours!” Include both the name and price properties.


const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];


app.get('/collectibles/:num', (req, res) => {
    const num = parseInt(req.params.num)
    if(num >= collectibles.length){
        return res.send('This item is not yet in stock. Check back soon')
    }else if(num < collectibles.length){
        return res.send(`So you like ${collectibles[num].name}? For ${collectibles[num].price} it can be yours`)
    }
})

// Q4
// Query Parameters:
// Task: Create a route /shoes that filters the list of shoes based on query parameters.
// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    return res.send(shoes.filter(({price}) => price > req.query.minprice))
})
//http://localhost:3000/shoes?minprice=50

app.get('/shoes', (req, res) => {
    return res.send(shoes.filter(({price}) => price < req.query.maxprice))     
})
//http://localhost:3000/shoes?maxprice=700

app.get('/shoes', (req, res) => {
    return res.send(shoes.filter(({type}) => type === req.query.type)) 
})
//http://localhost:3000/shoes?type=sandal

app.get('/shoes', (req, res) => {
    return res.send(shoes)
})
//http://localhost:3000/shoes


//sams explanation - works for all the conditions
app.get('/shoes', (req, res) => {
    const min = req.query['min-price']
    const max = req.query['max-price']
    const type = req.query['type']

    const filteredShoes = shoes.filter(shoe =>{
        if (
            (!min || min <= shoe.price) &&
            (!max || max >= shoe.price) &&
            (!type || type === shoe.type)
        ){
            return true
        }
    })
})



app.listen(3000, () =>{
    console.log('Listening on port 3000')
})
