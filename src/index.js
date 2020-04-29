require("./models/User");
require("./models/Track");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = process.env.DBURI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connection to mongo", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
