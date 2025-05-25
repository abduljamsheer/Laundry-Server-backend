const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connection = require("./database/db.js");

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000', // Allow frontend
  credentials: true,               // Support cookies if needed
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));


app.use('/api/v1/order', require('./routes/orderRoute'));
app.use('/api/v1/user', require('./routes/userRoute'));

connection();

app.listen(PORT, () => console.log("server is running on port", PORT));
