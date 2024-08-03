const express = require("express");
require("dotenv").config();;
const db = require("./config/database");
const apiRoutes = require("./controllers/api");
const { Customer } = require('./models/customer');
const { ExcavatorWork } = require('./models/ExcavatorWork');
const { User } = require('./models/User');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());


app.use("/", apiRoutes);

db.authenticate()
  .then(() => {
    console.log("Database connected...");
    // db.sync({alter: true});  // To migrate the database
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log("Error: " + err));