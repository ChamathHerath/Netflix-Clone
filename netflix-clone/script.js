const searchInput = document.getElementById("searchInput");

if (searchInput) {

    const movieCards = document.querySelectorAll(".movie-card");
    const noResults = document.getElementById("noResults");

    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value.toLowerCase().trim();

        let foundMovies = 0;

        movieCards.forEach(function (card) {

            const movieName =
                card.querySelector("h3")
                    .textContent
                    .toLowerCase();

            if (movieName.includes(searchText)) {

                card.style.display = "block";

                foundMovies++;

            } else {

                card.style.display = "none";

            }

        });


        if (foundMovies === 0 && searchText !== "") {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    });

}