const { Router } = require("express");
const router = Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => res.render("movies/index", { moviesFromDB }))
    .catch((error) => next(error));
});

router.get("/movies/new", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) =>
      res.render("movies/new", { celebritiesFromDB })
    )
    .catch((error) => next(error));
});

router.post("/movies/new", (req, res, next) => {
  // TODO: remember to pass image
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((newMovieSavedInDB) => {
      console.log(newMovieSavedInDB);
      res.redirect("/movies");
    })
    .catch((error) => next(error));
});

router.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((foundMovie) => {
      console.log(foundMovie);
      res.render("movies/show", foundMovie);
    })
    .catch((error) => next(error));
});

router.get("/movies/:id/edit", (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((foundMovieInDB) => {
      // Once we find the movie, we need to make sure we can return existing cast members and all the other celebrities in our db to the edit page.
      console.log(foundMovieInDB.cast);
      // 1. Get the list of cast members of the movie currently being edited.
      const { cast } = foundMovieInDB;
      // 2. Retrieve all the celebs in our db
      Celebrity.find().then((foundCelebsInDB) => {
        console.log(foundCelebsInDB);
        // 3. Loop through foundCelebsInDB to compare each celebrity object's id with the id of the objects found in the class list from foundMovie
        foundCelebsInDB.forEach((celebObj) => {
          cast.forEach((castCelebObj) => {
            if (celebObj._id.equals(castCelebObj._id)) {
              // 4. If the id's are a match, create a temporary property to indicate that the user is in the cast. We will need this temporary value in our views to pre-select the cast.
              celebObj.isInCast = true;
            }
          });
        });
        // 5. Render edit page with the foundMovie and the foundCelebs
        res.render("movies/edit", { foundMovieInDB, foundCelebsInDB });
      });
    })
    .catch((error) => next(error));
});

router.post("/movies/:id/edit", (req, res) => {
  // TODO fix with multer image
  const { title, genre, plot, cast } = req.body;
});

module.exports = router;
