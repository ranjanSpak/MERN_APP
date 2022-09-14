const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const routes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 4000;
console.log(process.env.PORT)
//Mongoose
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/mernApp",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
mongoose.connection.on("connected", () => {
  console.log("Mongoose connection successfully setup !");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Tells us HTTP request in console
app.use(morgan("tiny"));
app.use("/", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT);
