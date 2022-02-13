const express = require('express');

/*****************************************************
 * Define some constants and variables
 ****************************************************/

const app = express();
const port = 5555;
const movies = [
        {
                "id": 1,
                "slug": "black-panther",
                "name": "Black Panther",
                "year": "2018",
                "categories": ["action", "adventure", "sci-fi"],
                "storyline": "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past."
        },
        {
                "id": 2,
                "slug": "incredibles-3",
                "name": "Incredibles 2",
                "year": "2018",
                "categories": ["animation", "action", "adventure"],
                "storyline": "While the Parr family has accepted its collective calling as superheroes, the fact remains that their special heroism is still illegal. After they are arrested after unsuccessfully trying to stop the Underminer, their future seems bleak. However, the wealthy Deavor siblings of Devtech offer new hope with a bold project to rehabilitate the public image and legal status of Supers, with Elastigirl being assigned on point to be the shining example. Now having agreed for now to stay at home to care of the kids, Mr. Incredible finds domestic life a daunting challenge, especially with baby Jack-Jack's newly emerged powers making him almost impossible to manage. However, Elastigirl soon has her own concerns dealing with the menace of a new supervillain, Screenslaver, who is wreaking havoc with his mind control abilities. Now, Elastigirl must solve the mystery of this enemy, who has malevolent designs on the world with the Parr family and friends key targets of this evil. Written by Kenneth Chisholm (kchishol@rogers.com)"
        },
        {
                "id": 3,
                "slug": "halloween",
                "name": "Halloween",
                "year": "2018",
                "categories": ["horror", "thriller"],
                "storyline": "Laurie Strode comes to her final confrontation with Michael Myers, the masked figure who has haunted her since she narrowly escaped his killing spree on Halloween night four decades ago."
        },
        {
                "id": 4,
                "slug": "ad-astra",
                "name": "Ad Astra",
                "year": "2019",
                "categories": ["adventure", "fantasy", "mystery", "thriller", "sci-fi"],
                "storyline": "Thirty years ago, Clifford McBride led a voyage into deep space, but the ship and crew were never heard from again. Now his son -- a fearless astronaut -- must embark on a daring mission to Neptune to uncover the truth about his missing father and a mysterious power surge that threatens the stability of the universe."
        },
        {
                "id": 5,
                "slug": "toy-story-4",
                "name": "Toy Story 4",
                "year": "2019",
                "categories": ["animation", "adventure", "comedy", "family", "fantasy"],
                "storyline": "When a new toy called Forky joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy."
        }
];

/*****************************************************
 * Middleware
 ****************************************************/
app.use(express.static('public'));

/*****************************************************
 * Routes
 * 
 * GET /                        
 *   home - show movielist
 * GET /movies/:movieId/:slug   
 *   show movie details
 ****************************************************/

app.get('/',  (req, res) => {
    let doc = '<!doctype html>';
    doc += '<title>Movies</title>'
    doc += '<h1>Movies</h1>'

    movies.forEach(movie => {
        doc += "<section>";
        doc += `<h2>${movie.name}</h2>`;
        doc += `<h3>${movie.year}</h3>`;
        doc += "<h3>Categories:</h3>";
        doc += "<ul>";
        movie.categories.forEach(category => {
            doc += `<li>${category}</li>`;
        });
        doc += "</ul>";
        doc += `<a href="/movies/${movie.id}/${movie.slug}">More info</a>`;
        doc += "</section>";
    });
    res.send(doc);
});

app.get('/movies/:movieId/:slug', (req, res) => {
    const id = req.params.movieId;
    const movie = movies.find( element => element.id == id);
    console.log(movie);
    let doc = '<!doctype html>';
    doc += `<title>Movie details for ${movie.name}</title>`;
    doc += `<h1>${movie.name}</h1>`;
    doc += `<h2>${movie.year}</h2>`;
    doc += "<h2>Categories</h2>";
    doc += "<ul>";
    movie.categories.forEach( category => {
        doc += `<li>${category}</li>`;
    })
    doc += "</ul>";
    doc += `<p>${movie.storyline}</p>`;
    res.send(doc);
});


/*****************************************************
 * Start webserver
 ****************************************************/

app.listen(port, () => {
  console.log('==================================================\n\n')
  console.log(`Webserver running on http://localhost:${port}\n\n`);
  console.log('==================================================\n\n')
});