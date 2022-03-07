const express = require('express');
const slug = require('slug');
const arrayify = require('array-back');
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

/*****************************************************
 * Define some constants and variables
 ****************************************************/

const app = express();
const port = 5555;
const categories = ["action", "adventure", "sci-fi", "animation", "horror", "thriller", "fantasy", "mystery", "comedy", "family"];
let db = null;

/*****************************************************
 * Middleware
 ****************************************************/
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*****************************************************
 * Set template engine
 ****************************************************/
app.set('view engine', 'ejs');

/*****************************************************
 * Routes
 * 
 * GET /                        
 *   home - show movielist
 * GET /movies/:movieId/:slug   
 *   show movie details
 * GET /movies/add              
 *   show form to add movie
 * POST /movies/add             
 *   add movie and show movielist
 ****************************************************/

app.get('/', async (req, res) => {
    // GET LIST OF MOVIES
    const query = {};
    const options = {sort: {year: -1, name: 1}}
    const movies = await db.collection('movies').find(query, options).toArray();

    // RENDER PAGE
    const title  = (movies.length == 0) ? "No movies were found" : "Movies";
    res.render('movielist', {title, movies});
});

app.get('/movies/:movieId/:slug', (req, res) => {

    // FIND MOVIE
    const id = req.params.movieId;
    // TODO
    console.log("TODO: get movie from DB");
    const movie = {};

    // RENDER PAGE
    const title = `Moviedetails for ${movie.name}`;
    res.render('moviedetails', {title, movie});
});

app.get('/movies/add', (req, res) => {
    res.render('addmovie', {title: "Add a movie", categories});
});

app.post('/movies/add', (req, res) => {
    // ADD MOVIE 
    let movie = {
        slug: slug(req.body.name),
        name: req.body.name, 
        year: req.body.year, 
        categories: arrayify(req.body.categories), 
        storyline: req.body.storyline
    };
    // TODO
    console.log("TODO: add movie to database")

    // GET LIST OF ALL MOVIES
    // TODO
    console.log("TODO: get list of all movies from database")
    const movies = [];

    // RENDER PAGE
    const title =  "Succesfully added the movie";
    res.render('movielist', {title, movies})
});

/*****************************************************
 * If no routes give response, show 404 Page
 ****************************************************/

app.use(function (req, res) {
    console.error("Error 404: page nog found");
    res.status(404).render('404', {title: "Error 404: page not found"});
});

/*****************************************************
 * Connect to database
 ****************************************************/
async function connectDB() {
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
    } catch (error) {
        throw error;
    }
}

/*****************************************************
 * Start webserver
 ****************************************************/

app.listen(port, () => {
    console.log('==================================================\n\n')
    console.log(`Webserver running on http://localhost:${port}\n\n`);
    console.log('==================================================\n\n')

    connectDB().then(() => console.log("We have a connection to Mongo!"));
});

