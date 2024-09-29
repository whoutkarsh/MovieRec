const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(cors());
app.use(express.json());

let movies = [];

// Load movies from CSV file
fs.createReadStream('movies.csv')
    .pipe(csv())
    .on('data', (row) => {
        movies.push(row);
    })
    .on('end', () => {
        console.log('Movies data loaded.');
    });

// Endpoint to get movie recommendations
app.post('/recommend', (req, res) => {
    const { year, rating, genre } = req.body;

    const filteredMovies = movies.filter(movie =>
        movie.year == year &&
        parseFloat(movie.rating) >= parseFloat(rating) &&
        movie.genre.toLowerCase().includes(genre.toLowerCase())
    );

    res.json({ movies: filteredMovies });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
