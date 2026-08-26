// ==================================================
// NETFLIX CLONE JAVASCRIPT
// ==================================================


// ==================================================
// MY LIST
// ==================================================

let myList =
    JSON.parse(
        localStorage.getItem("netflixMyList")
    ) || [];


// ==================================================
// SEARCH
// ==================================================

const searchInput =
    document.getElementById("searchInput");

const movieCards =
    document.querySelectorAll(".movie-card");

const noResults =
    document.getElementById("noResults");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();

            let foundMovies = 0;


            movieCards.forEach(
                function (card) {

                    const movieName =
                        card
                            .getAttribute("data-movie")
                            .toLowerCase();


                    const matchesSearch =
                        movieName.includes(
                            searchText
                        );


                    const activeGenre =
                        document
                            .querySelector(
                                ".genre-btn.active"
                            )
                            ?.getAttribute(
                                "data-genre"
                            ) || "all";


                    const movieGenres =
                        card
                            .getAttribute(
                                "data-genre"
                            )
                            .toLowerCase();


                    const matchesGenre =
                        activeGenre === "all" ||
                        movieGenres.includes(
                            activeGenre
                        );


                    if (
                        matchesSearch &&
                        matchesGenre
                    ) {

                        card.style.display =
                            "block";

                        foundMovies++;

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );


            showNoResults(
                foundMovies,
                searchText
            );

        }
    );

}


// ==================================================
// GENRE FILTER
// ==================================================

const genreButtons =
    document.querySelectorAll(
        ".genre-btn"
    );


genreButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                // Remove active class

                genreButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                // Add active class

                button.classList.add(
                    "active"
                );


                const selectedGenre =
                    button.getAttribute(
                        "data-genre"
                    );


                const searchText =
                    searchInput
                        ? searchInput.value
                            .toLowerCase()
                            .trim()
                        : "";


                let foundMovies = 0;


                movieCards.forEach(
                    function (card) {

                        const movieGenres =
                            card
                                .getAttribute(
                                    "data-genre"
                                )
                                .toLowerCase();


                        const movieName =
                            card
                                .getAttribute(
                                    "data-movie"
                                )
                                .toLowerCase();


                        const matchesGenre =
                            selectedGenre ===
                            "all" ||
                            movieGenres.includes(
                                selectedGenre
                            );


                        const matchesSearch =
                            movieName.includes(
                                searchText
                            );


                        if (
                            matchesGenre &&
                            matchesSearch
                        ) {

                            card.style.display =
                                "block";

                            foundMovies++;

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );


                showNoResults(
                    foundMovies,
                    searchText,
                    selectedGenre
                );

            }
        );

    }
);


// ==================================================
// NO RESULTS
// ==================================================

function showNoResults(
    foundMovies,
    searchText,
    selectedGenre
) {

    if (!noResults) {
        return;
    }


    if (
        foundMovies === 0 &&
        (
            searchText !== "" ||
            selectedGenre !== "all"
        )
    ) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }

}


// ==================================================
// OPEN MOVIE
// ==================================================

function openMovie(
    title,
    year,
    rating,
    image
) {

    localStorage.setItem(
        "selectedMovie",
        JSON.stringify({

            title: title,
            year: year,
            rating: rating,
            image: image

        })
    );


    window.location.href =
        "movie.html";

}


// ==================================================
// LOAD MOVIE DETAILS
// ==================================================

const selectedMovie =
    JSON.parse(
        localStorage.getItem(
            "selectedMovie"
        )
    );


const detailsTitle =
    document.getElementById(
        "detailsTitle"
    );

const detailsYear =
    document.getElementById(
        "detailsYear"
    );

const detailsRating =
    document.getElementById(
        "detailsRating"
    );

const detailsPoster =
    document.getElementById(
        "detailsPoster"
    );


if (
    selectedMovie &&
    detailsTitle
) {

    detailsTitle.textContent =
        selectedMovie.title;

    detailsYear.textContent =
        selectedMovie.year;

    detailsRating.textContent =
        selectedMovie.rating;

    detailsPoster.src =
        selectedMovie.image;

    detailsPoster.alt =
        selectedMovie.title;

}


// ==================================================
// TRAILER POPUP
// ==================================================

const trailerBtn =
    document.getElementById(
        "trailerBtn"
    );

const trailerModal =
    document.getElementById(
        "trailerModal"
    );

const closeTrailer =
    document.getElementById(
        "closeTrailer"
    );


if (
    trailerBtn &&
    trailerModal &&
    closeTrailer
) {


    trailerBtn.addEventListener(
        "click",
        function () {

            trailerModal.classList.add(
                "active"
            );

        }
    );


    closeTrailer.addEventListener(
        "click",
        function () {

            trailerModal.classList.remove(
                "active"
            );

        }
    );


    trailerModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                trailerModal
            ) {

                trailerModal.classList.remove(
                    "active"
                );

            }

        }
    );


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


// ==================================================
// MY LIST BUTTON
// ==================================================

const myListBtn =
    document.getElementById(
        "myListBtn"
    );


if (myListBtn) {

    updateMyListButton();


    myListBtn.addEventListener(
        "click",
        function () {

            if (!selectedMovie) {
                return;
            }


            const movieIndex =
                myList.findIndex(
                    function (movie) {

                        return movie.title ===
                            selectedMovie.title;

                    }
                );


            if (movieIndex === -1) {

                myList.push(
                    selectedMovie
                );

                saveMyList();

                updateMyListButton();

                alert(
                    selectedMovie.title +
                    " added to My List ❤️"
                );

            } else {

                myList.splice(
                    movieIndex,
                    1
                );

                saveMyList();

                updateMyListButton();

                alert(
                    selectedMovie.title +
                    " removed from My List"
                );

            }

        }
    );

}


// ==================================================
// UPDATE MY LIST BUTTON
// ==================================================

function updateMyListButton() {

    if (
        !myListBtn ||
        !selectedMovie
    ) {

        return;

    }


    const exists =
        myList.some(
            function (movie) {

                return movie.title ===
                    selectedMovie.title;

            }
        );


    if (exists) {

        myListBtn.textContent =
            "✓ Added to My List";

    } else {

        myListBtn.textContent =
            "+ My List";

    }

}


// ==================================================
// SAVE MY LIST
// ==================================================

function saveMyList() {

    localStorage.setItem(
        "netflixMyList",
        JSON.stringify(
            myList
        )
    );

}


// ==================================================
// DISPLAY MY LIST
// ==================================================

const myListContainer =
    document.getElementById(
        "myListContainer"
    );

const emptyList =
    document.getElementById(
        "emptyList"
    );


function displayMyList() {

    if (!myListContainer) {
        return;
    }


    myListContainer.innerHTML =
        "";


    if (myList.length === 0) {

        if (emptyList) {

            emptyList.style.display =
                "block";

        }

        return;

    }


    if (emptyList) {

        emptyList.style.display =
            "none";

    }


    myList.forEach(
        function (movie, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "my-list-card";


            card.innerHTML = `

                <img
                    src="${movie.image}"
                    alt="${movie.title}"
                >

                <button
                    class="remove-btn"
                    onclick="removeFromMyList(${index})"
                >
                    ✕
                </button>

                <div class="my-list-card-info">

                    <h3>
                        ${movie.title}
                    </h3>

                    <p>
                        ⭐ ${movie.rating}
                        | ${movie.year}
                    </p>

                </div>

            `;


            myListContainer.appendChild(
                card
            );

        }
    );

}


// ==================================================
// REMOVE FROM MY LIST
// ==================================================

function removeFromMyList(index) {

    myList.splice(
        index,
        1
    );


    saveMyList();

    displayMyList();

    updateMyListButton();

}


// ==================================================
// INITIALIZE MY LIST
// ==================================================

displayMyList();