const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");

mongoose.connect("mongodb://localhost/starter-code", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const celebrities = [
  {
    name: "Will Smith",
    occupation: "Actor",
    catchPhrase: "I'm Prince of Bel-Air",
  },
  {
    name: "Dwayne Johnson",
    occupation: "Wrestler/Actor",
    catchPhrase: "Can you smell what The Rock, is cookin?",
  },
  {
    name: "Jennifer Lawrence",
    occupation: "Actress",
    catchPhrase: "May luck be ever in your favor",
  },
];

Celebrity.create(celebrities)
  .then((celebritiesFromDB) => {
    console.log(
      `Created celebrities from ${celebritiesFromDB.length} celebrities`
    );
    mongoose.disconnect()
  })
  .catch((err) => console.log(`Error when seeding celebrities ${err}`));
