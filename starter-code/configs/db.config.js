const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost/celebs-movies";

// ****************************************************************************************
// DATABASE CONNECTION WITH PROMISES
// ****************************************************************************************
exports.connectDB = () =>
  mongoose
    .connect(mongoURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err);
    });

// ****************************************************************************************
// DATABASE CONNECTION WITH ASYNC ... AWAIT
// ****************************************************************************************
exports.asyncConnectDB = async () => {
  try {
    const db = await mongoose.connect(mongoURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected to Mongo! Database name: "${db.connections[0].name}"`
    );
  } catch (error) {
    console.error(`Error connecting to mongo: ${error}`);
  }
};
