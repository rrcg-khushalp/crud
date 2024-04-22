const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/userRoute");
const cors = require("cors");
app.use(cors());

app.use(userRoute);
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("connected");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("error", err);
  });

app.use(express.json());
