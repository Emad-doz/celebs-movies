const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");
const { update } = require("../models/Celebrity.model");

/* GET - All celebrities */
router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then((foundCelebs) =>
      res.render("celebrities/celebrities", { foundCelebs })
    )
    .catch((err) => console.log(`Error occurred while finding celebs: ${err}`));
});

/* GET - Adding new celebs */
router.get("/celebrities/new", (req, res) =>
  res.render("celebrities/new-celebrities")
);

/* GET - Specific celebrity */
router.get("/celebrities/:id", (req, res) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((foundCeleb) => {
      console.log(foundCeleb);
      res.render("celebrities/celebrity-details", foundCeleb);
    })
    .catch((err) => console.log(`Error: ${err}`));
});

/* POST - add new celeb */
router.post("/celebrities", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCeleb) => {
      newCeleb.save().then(() => res.redirect("/celebrities"));
    })
    .catch((err) => {
      console.error(`Error on create: ${err}`);
      res.render("celebrities/new-celebrities");
    });
});

/* DELETE - deleting celebrity */
router.post("/celebrities/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Celebrity.findByIdAndRemove(id)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      next();
      console.log(`Error when deleting: ${err}`);
    });
});

/* UPDATE - Editing celebrity */
router.get("/celebrities/:id/edit", (req, res) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrityToEdit) => {
      res.render("celebrities/edit-celebrities", celebrityToEdit);
    })
    .catch((err) => console.error(`Error when editing: ${err}`));
});

router.post("/celebrities/:id", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  const { id } = req.params;

  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then((updatedCeleb) => {
      console.log(updatedCeleb);
      res.redirect(`/celebrities/${id}`);
    })
    .catch((err) => console.error(`Error on finding and updating: ${err}`));
});

module.exports = router;
