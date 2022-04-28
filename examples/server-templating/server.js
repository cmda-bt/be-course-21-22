const express = require('express')
const app = express()
const port = 3000

// set static files
app.use(express.static('static'))

// set the view engine to ejs
app.set('view engine', 'ejs');

// render instead of send
app.get('/', (req, res) => {
  res.render('pages/index');
})

app.get('/about', (req, res) => {
  res.render('partials/header');
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})