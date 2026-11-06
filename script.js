
const movies = [
    {
        name: "The Dark Warrior",
        genre: "Action",
        price: 180,
        image: "https://placehold.co/300x420/222/fff?text=Action"
    },
    {
        name: "Funny Friends",
        genre: "Comedy",
        price: 150,
        image: "https://placehold.co/300x420/333/fff?text=Comedy"
    },
    {
        name: "Haunted Night",
        genre: "Horror",
        price: 170,
        image: "https://placehold.co/300x420/111/fff?text=Horror"
    },
    {
        name: "Love Forever",
        genre: "Romance",
        price: 160,
        image: "https://placehold.co/300x420/633/fff?text=Romance"
    },
    {
        name: "Galaxy Mission",
        genre: "Sci-Fi",
        price: 200,
        image: "https://placehold.co/300x420/124/fff?text=Sci-Fi"
    }
];

let selectedMovie = movies[0];
let selectedSeats = [];

const bookedSeats = ["A3", "B4", "C5"];

function displayMovies(list) {
    const container = document.getElementById("movieList");

    container.innerHTML = list.map((movie) => `
        <div class="movie-card">
            <img src="${movie.image}" alt="${movie.name}">
            <h3>${movie.name}</h3>
            <p>Genre: ${movie.genre}</p>
            <p>Ticket: ₹${movie.price}</p>
            <button class="btn"
                onclick="chooseMovie('${movie.name}')">
                Book Now
            </button>
        </div>
    `).join("");
}

function filterMovies() {
    const genre = document.getElementById("genre").value;
    const search = document.getElementById("search")
        .value.toLowerCase();

    const filtered = movies.filter(movie =>
        (genre === "All" || movie.genre === genre) &&
        movie.name.toLowerCase().includes(search)
    );

    displayMovies(filtered);
}

function chooseMovie(name) {
    selectedMovie = movies.find(movie => movie.name === name);
    selectedSeats = [];

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

    createSeats();
    updateTotal();
}

function createSeats() {
    const container = document.getElementById("seats");
    container.innerHTML = "";

    const rows = ["A", "B", "C", "D", "E"];

    rows.forEach(row => {
        for (let i = 1; i <= 8; i++) {
            const seatName = row + i;
            const seat = document.createElement("div");

            seat.textContent = seatName;
            seat.className = "seat";

            if (bookedSeats.includes(seatName)) {
                seat.classList.add("booked");
            } else {
                seat.onclick = () => toggleSeat(seatName, seat);
            }

            container.appendChild(seat);
        }
    });
}

function toggleSeat(name, element) {
    if (selectedSeats.includes(name)) {
        selectedSeats = selectedSeats.filter(s => s !== name);
        element.classList.remove("selected");
    } else {
        selectedSeats.push(name);
        element.classList.add("selected");
    }

    updateTotal();
}

function updateTotal() {
    const total = selectedSeats.length * selectedMovie.price;

    document.getElementById("selected").textContent =
        selectedSeats.join(", ") || "None";

    document.getElementById("total").textContent = total;
}

function goToPayment() {
    if (!selectedSeats.length) {
        alert("Please select at least one seat!");
        return;
    }

    const date = document.getElementById("date").value;

    if (!date || date < new Date().toISOString().split("T")[0]) {
        alert("Please select a valid booking date!");
        return;
    }

    document.getElementById("paymentAmount").textContent =
        selectedSeats.length * selectedMovie.price;

    document.getElementById("payment").classList.remove("hidden");

    document.getElementById("payment").scrollIntoView({
        behavior: "smooth"
    });
}

function confirmBooking() {
    const bookingId = "CB" + Date.now().toString().slice(-8);

    const city = document.getElementById("city").value;
    const theatre = document.getElementById("theatre").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("showtime").value;
    const amount = selectedSeats.length * selectedMovie.price;

    document.getElementById("ticket").innerHTML = `
        <h2>CINEBOOK 🎬</h2>
        <h3>${selectedMovie.name}</h3>
        <p><b>Booking ID:</b> ${bookingId}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Theatre:</b> ${theatre}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Showtime:</b> ${time}</p>
        <p><b>Seats:</b> ${selectedSeats.join(", ")}</p>
        <p><b>Total Paid:</b> ₹${amount}</p>
        <p><b>Payment Method:</b>
            ${document.getElementById("paymentMethod").value}
        </p>
        <p>🎟️ PAYMENT SUCCESSFUL (DEMO)</p>
    `;

    document.getElementById("payment").classList.add("hidden");
    document.getElementById("confirmation").classList.remove("hidden");

    document.getElementById("confirmation").scrollIntoView({
        behavior: "smooth"
    });
}

displayMovies(movies);
createSeats();
