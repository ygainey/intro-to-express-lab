const express = require('express')

const app = express()

// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.

// Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

// Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”

app.get('/greetings/:name', (req, res) => {
    return res.send(`Hello ${req.params.name}!`)    
})


app.listen(3000, () =>{
    console.log('Listening on port 3000')
})