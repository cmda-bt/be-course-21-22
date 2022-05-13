const express = require('express')
const app = express()
const port = 3000
const find = require('array-find');
const slug = require('slug');

/* Require multer and set uploads folder */
const multer = require('multer')
const upload = multer({ dest: 'static/upload/' })

/* Temporary data storage */
const data = [
  {
    id: 'redemption',
    title: 'Redemption',
    story: 'A fantastic movie'
  }
];

// set static files
app.use(express.static('static'))

// parse .json and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// set the view engine to ejs
app.set('view engine', 'ejs');

// render instead of send
app.get('/', (req, res) => {
  res.render('pages/index', { data: data });
})

app.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const movie = find(data, function (value) {
    return value.id === id
  })

  if (!movie) {
    next()
    return
  }

  res.render('pages/detail.ejs', { data: movie })
});

app.post('/', upload.single('cover'), (req, res) => {
  const id = req.body.title.toLowerCase();

  data.push({
    id: id,
    title: req.body.title,
    story: req.body.story,
    cover: req.file ? req.file.filename : null,
  })

  console.log(data);

  res.redirect('/' + id)
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})