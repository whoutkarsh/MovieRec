document.getElementById('movieForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const year = document.getElementById('year').value;
    const rating = document.getElementById('rating').value;
    const genre = document.getElementById('genre').value;

    // Send a request to the backend
    fetch('http://localhost:3000/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, rating, genre }),
    })
    .then(response => response.json())
    .then(data => {
        const recommendationsDiv = document.getElementById('recommendations');
        recommendationsDiv.innerHTML = '<h3>Recommended Movies:</h3>';
        if (data.movies.length > 0) {
            data.movies.forEach(movie => {
                recommendationsDiv.innerHTML += `<p>${movie.title} (${movie.year}) - IMDb: ${movie.rating}</p>`;
            });
        } else {
            recommendationsDiv.innerHTML += '<p>No movies found.</p>';
        }
    })
    .catch(error => console.error('Error:', error));
});
