const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const path = require("path");

const database = require("./utils/database");

const server = express();
const PORT = process.env.PORT || 3000;

server.use(logger("dev"));
server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));
server.use(express.urlencoded({ extended: false }));

server.use((req, res) => {
  res.status(200).json({
    status: "I am alive",
  });
});

function start() {
  try {
    database
      .authenticate()
      .then(console.log("Database has been connected successful."))
      .catch((e) => console.error("Unable to connect to the database:", e));
    server.listen(PORT, () => {
      console.log(`App started on port: ${PORT}.`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
