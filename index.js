// Import the express lirbary
const express = require('express')

// Import the axios library, to make HTTP requests
const axios = require('axios')

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = 'cbBVF0wO6fnwg65L1qRD3QxwBxxqk4WETD4Po9YP'
const clientSecret = 'Dtj0al4xTYMSuO7htOtdX3ToNsBk5nUZZNPzYSJZCGW93iIw4yKM9Iei3PPds689uXlNNhvtSQdmDmrELXmUEd7DBCw9IuLWrLKDP7XogxThbiidxVahXnNdSqEpRLyHaVVHUnO8hQywKUAwPvZA3rpMr7g9eLMLjo5OZ10sOmK6Ytn8COGeSuMkW4zZG3ocyp7RHCVdIoQf5UkatChe7AwujvlfG9m101NCF1ShNoLPTW6DD9lP0t3qKCbYlO'

// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
const app = express()
app.use(express.static(__dirname + '/public'))

app.get('/oauth/redirect', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `http://52.172.36.138/api/authorize?client_id=cbBVF0wO6fnwg65L1qRD3QxwBxxqk4WETD4Po9YP&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&state=JkVRNYhB3OpfD6btsqCwhWfLA8mJZ2ur&scope=&response_type=code&approval_prompt=auto`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
    res.redirect(`/welcome.html?access_token=${accessToken}`)
  })
})

// Start the server on port 8080
app.listen(8080)
