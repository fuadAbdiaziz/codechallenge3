const filmsList = document.getElementById('films');
const moviePoster = document.getElementById('moviePoster');
const movieTitle = document.getElementById('movieTitle');
const movieRuntime = document.getElementById('movieRuntime');
const movieShowtime = document.getElementById('movieShowtime');
const movieAvailableTickets = document.getElementById('movieAvailableTickets');
const buyTicketButton = document.getElementById('buyTicketButton');

function displayFilm(){
    fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(data => {
    const films = data;
    filmsList.innerHTML = '';
    console.log(data)
    films.forEach(film => {
      const { id, poster, title, runtime, showtime, capacity, tickets_sold } = film;
      const availableTickets = capacity - tickets_sold;
     console.log(film)
      const li = document.createElement('li');
      li.classList.add('film', 'item');
      li.textContent = title;
      li.addEventListener('click', () => {
        moviePoster.src = poster;
        movieTitle.textContent = title;
        movieRuntime.textContent = `Runtime: ${runtime} minutes`;
        movieShowtime.textContent = `Showtime: ${showtime}`;
        movieAvailableTickets.textContent = `Available Tickets: ${availableTickets}`;
        buyTicketButton.disabled = availableTickets === 0;
      });
      filmsList.appendChild(li);
    });

    // Update the first movie details
    const { poster, title, runtime, showtime, capacity, tickets_sold } = films[0];
    const availableTickets = capacity - tickets_sold;
    moviePoster.src = poster;
    movieTitle.textContent = title;
    movieRuntime.textContent = `Runtime: ${runtime} minutes`;
    movieShowtime.textContent = `Showtime: ${showtime}`;
    movieAvailableTickets.textContent = `Available Tickets: ${availableTickets}`;
    buyTicketButton.disabled = availableTickets === 0;
  })
 

buyTicketButton.addEventListener('click', () => {
  const availableTicketsText = movieAvailableTickets.textContent;
  const availableTickets = parseInt(availableTicketsText.split(': ')[1]);
  movieAvailableTickets.textContent = `Available Tickets: ${availableTickets - 1}`;
  buyTicketButton.disabled = availableTickets === 1;
});

}
displayFilm();