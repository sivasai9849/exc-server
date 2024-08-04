const express = require("express");
const db = require("./src/config/database");
const apiRoutes = require("./src/routes/apiRoutes");
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
  .catch((err: string) => console.log("Error: " + err));