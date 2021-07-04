//importing
const express = require("express"); //express
const mongoose = require("mongoose"); //importing mongoose package
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const host = "0.0.0.0";
const routes = require("./Routes/index");

//Mongo DB URL
const cloudUrl =
  "mongodb+srv://admin:google1@cluster0.auyca.mongodb.net/ZomatoDB?retryWrites=true&w=majority";

//Middleware
app.use(express.json());
app.use(cors());
//api routes
app.use("/", routes);

//listen
//DB Configuration
mongoose
  .connect(cloudUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at - ${host}:${port}`);
    });
  })
  .catch();
