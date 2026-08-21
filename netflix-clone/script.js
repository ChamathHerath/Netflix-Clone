// ==================================================
// NETFLIX CLONE - FRONTEND JAVASCRIPT
// ==================================================


// ==================================================
// SEARCH FUNCTION
// ==================================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    const movieCards =
        document.querySelectorAll(".movie-card");

    const noResults =
        document.getElementById("noResults");


    searchInput.addEventListener("input", function () {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();

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


        // Show "No movies found"

        if (
            foundMovies === 0 &&
            searchText !== ""
        ) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    });

}


// ==================================================
// TRAILER POPUP
// ==================================================

const trailerBtn =
    document.getElementById("trailerBtn");

const trailerModal =
    document.getElementById("trailerModal");

const closeTrailer =
    document.getElementById("closeTrailer");


if (
    trailerBtn &&
    trailerModal &&
    closeTrailer
) {


    // ----------------------------------------------
    // OPEN TRAILER
    // ----------------------------------------------

    trailerBtn.addEventListener(
        "click",
        function () {

            trailerModal.classList.add("active");

        }
    );


    // ----------------------------------------------
    // CLOSE TRAILER BUTTON
    // ----------------------------------------------

    closeTrailer.addEventListener(
        "click",
        function () {

            trailerModal.classList.remove("active");

        }
    );


    // ----------------------------------------------
    // CLOSE BY CLICKING OUTSIDE
    // ----------------------------------------------

    trailerModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === trailerModal
            ) {

                trailerModal.classList.remove(
                    "active"
                );

            }

        }
    );


    // ----------------------------------------------
    // CLOSE WITH ESCAPE KEY
    // ----------------------------------------------

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                trailerModal.classList.remove(
                    "active"
                );

            }

        }
    );

}