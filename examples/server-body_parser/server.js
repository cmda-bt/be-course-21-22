const express = require('express')
const app = express()
const port = 3000

/* Temporary data storage */
const data = [
  {
    title: 'Redemption',
    story: 'A fantastic movie'
  }
];

// set static files
app.use(express.static('static'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// set the view engine to ejs
app.set('view engine', 'ejs');

// render instead of send
app.get('/', (req, res) => {
  res.render('pages/index', { data: data });
})

app.post('/', (req, res) => {
  console.log(req.body);

  data.push({
    title: req.body.title,
    story: req.body.story
  })

  res.render('pages/index', { data: data });

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})