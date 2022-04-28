const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const movies -[
  {
    name: 'Titanic',
    url: '/img/titanic.jpg'
  }
]

// Middleware
app.use(express.static('static'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index', movies)
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
